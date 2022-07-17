use rocket::{serde::{Serialize, Deserialize, json::Json}, fairing::AdHoc};
use rocket_db_pools::{Database, Connection, sqlx::{self, Row}};

mod auth;

#[macro_use]
extern crate rocket;

#[derive(Serialize)]
struct Hello {
    message: String,
}

#[derive(Deserialize)]
pub struct Config {
    api_key: Option<String>
}

#[derive(Database)]
#[database("cities")]
struct CitiesDB(sqlx::SqlitePool);


#[get("/")]
fn index() -> Json<Hello> {
   Json(Hello { message: "Hello, world!".to_string() })
}

#[get("/protected")]
fn protected(_key: auth::ApiKey<'_>) -> Json<Hello> {
    Json(Hello { message: "secret hello!".to_string() })
}

#[get("/cities/<id>")]
async fn cities(_key: auth::ApiKey<'_>, mut db: Connection<CitiesDB>, id: i64) -> Option<String> {
    sqlx::query("SELECT * FROM City WHERE id = ?").bind(id)
        .fetch_one(&mut *db).await
        .and_then(|row| Ok(row.try_get("name")?))
        .ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, protected, cities])
        .mount("/hello", routes![index])
        .attach(AdHoc::config::<Config>())
        .attach(CitiesDB::init())
}
