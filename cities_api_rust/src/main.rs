mod auth;

#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/protected")]
fn protected(_key: auth::ApiKey< '_>) -> &'static str {
    "protected content!"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, protected])
        .mount("/hello", routes![index])
}
