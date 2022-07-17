use rocket::{serde::{Serialize, Deserialize, json::Json}, fairing::AdHoc};

mod auth;

#[macro_use]
extern crate rocket;

#[derive(Serialize)]
struct Hello {
    message: String,
}

#[derive(Deserialize)]
pub struct Config {
    api_key: String
}

#[get("/")]
fn index() -> Json<Hello> {
   Json(Hello { message: "Hello, world!".to_string() })
}

#[get("/protected")]
fn protected(_key: auth::ApiKey<'_>) -> Json<Hello> {
    Json(Hello { message: "secret hello!".to_string() })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, protected])
        .mount("/hello", routes![index])
        .attach(AdHoc::config::<Config>())
}
