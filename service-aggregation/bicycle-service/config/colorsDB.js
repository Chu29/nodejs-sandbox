import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE colors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  color TEXT NOT NULL
  ) STRICT
`);

db.exec(`
  INSERT INTO colors (color) VALUES ('Yellow'), ('Red'), ('Orange'), ('Green'), ('Blue'), ('Indigo')
  `);

export default db;
