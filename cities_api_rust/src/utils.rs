use rocket::serde::json::from_str;
use serde::{Serialize, Deserialize};

use crate::City;

#[derive(sqlx::FromRow, Serialize)]
pub struct FormattedCity {
    id: i32,
    name: String,
    state: String,
    country: String,
    combinedName: String,
    normalized: String,
    coord: Coordinates
}

#[derive(Serialize, Deserialize)]
pub struct Coordinates {
    lon: f32,
    lat: f32
}

/** Format a city from the database into a suitable object for client-side */
pub fn format_city(city: &City)-> FormattedCity{
    FormattedCity {
        id: city.cityId,
        combinedName: String::from(&city.combinedName),
        name: String::from(&city.name),
        state: String::from(&city.state),
        country: String::from(&city.country),
        normalized: String::from(&city.normalized),
        coord: from_str::<Coordinates>(&city.coord).expect("Error parsing coordinates!")
    }
}