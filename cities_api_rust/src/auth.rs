use rocket::http::Status;
use rocket::request::{Outcome, Request, FromRequest};

use crate::Config;

pub struct ApiKey<'r>(&'r str);

#[derive(Debug)]
pub enum ApiKeyError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey<'r> {
    type Error = ApiKeyError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {

        let api_key = &req.rocket().state::<Config>().expect("Config not found!").api_key;

        match req.headers().get_one("cities_api_key") {
            None => Outcome::Failure((Status::BadRequest, ApiKeyError::Missing)),
            Some(key) if key == api_key => Outcome::Success(ApiKey(key)),
            Some(_) => Outcome::Failure((Status::BadRequest, ApiKeyError::Invalid)),
        }
    }
}