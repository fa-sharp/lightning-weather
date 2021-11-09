import betterSQLite from 'better-sqlite3'


const db = betterSQLite('data/cities.db');

const searchCitiesSQL = db.prepare('SELECT * FROM City WHERE normalized LIKE ? LIMIT 10');

console.time("sql0");
const r0 = searchCitiesSQL.all('a%');
console.timeEnd("sql0")

console.time("sql1");
const r1 = searchCitiesSQL.all('aus%');
console.timeEnd("sql1")

console.time("sql2")
const r2 = searchCitiesSQL.all('aust%')
console.timeEnd("sql2")

console.time("sql3")
const r3 = searchCitiesSQL.all('austin,tx%');
console.timeEnd("sql3")

console.log(r3)