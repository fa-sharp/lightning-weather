CREATE TABLE if not exists City (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cityId INTEGER,
    name TEXT,
    state TEXT,
    country TEXT,
    combinedName TEXT,
    normalized TEXT,
    coord TEXT
)