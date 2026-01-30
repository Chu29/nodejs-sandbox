import { DatabaseSync } from "node:sqlite";

// const db = new DatabaseSync(":memory:");
const db = new DatabaseSync(`${import.meta.dirname}/brands.db`);

db.exec(`
  CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL
  ) STRICT
`);

// db.exec(`
//   INSERT OR IGNORE INTO brands (brand) VALUES ('Gazelle'), ('Batavus'), ('Azor'), ('Cortina'), ('Giant'), ('Sparta')
//   `);

export default db;
