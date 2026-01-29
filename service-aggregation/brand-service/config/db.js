import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL
  ) STRICT
`);

db.exec(`
  INSERT INTO brands (brand) VALUES ('Gazelle'), ('Batavus'), ('Azor'), ('Cortina'), ('Giant'), ('Sparta')
  `);

export default db;
