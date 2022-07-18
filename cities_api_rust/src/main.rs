#![allow(non_snake_case)]

use rocket::{
    fairing::AdHoc,
    serde::{json::Json, Deserialize, Serialize},
};
use rocket_db_pools::{Connection, Database};
use utils::format_city;

use crate::utils::FormattedCity;

mod auth;
mod utils;

#[macro_use]
extern crate rocket;

#[derive(Deserialize)]
pub struct Config {
    api_key: Option<String>,
}

#[derive(Database)]
#[database("cities")]
struct CitiesDB(sqlx::SqlitePool);

#[derive(sqlx::FromRow, Serialize)]
pub struct City {
    id: i32,
    cityId: i32,
    name: String,
    state: String,
    country: String,
    combinedName: String,
    normalized: String,
    coord: String,
}

#[get("/health")]
fn index() -> String {
    String::from("OK")
}

#[get("/cities/<id>")]
async fn get_city(
    _key: auth::ApiKey<'_>,
    mut db: Connection<CitiesDB>,
    id: i64,
) -> Option<Json<FormattedCity>> {
    sqlx::query_as::<_, City>("SELECT * FROM City WHERE id = ?")
        .bind(id)
        .fetch_one(&mut *db)
        .await
        .and_then(|city| Ok(Json(format_city(&city))))
        .ok()
}

#[get("/cities/lookup?<search>")]
async fn lookup_city(
    _key: auth::ApiKey<'_>,
    mut db: Connection<CitiesDB>,
    search: &str,
) -> Option<Json<Vec<FormattedCity>>> {
    sqlx::query_as::<_, City>("SELECT * FROM City WHERE normalized LIKE ? LIMIT 10")
        .bind(search.to_owned() + "%")
        .fetch_all(&mut *db)
        .await
        .and_then(|cities| {
            Ok(Json(
                cities.iter().map(|db_city| format_city(db_city)).collect(),
            ))
        })
        .ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, get_city, lookup_city])
        .attach(AdHoc::config::<Config>())
        .attach(CitiesDB::init())
}
