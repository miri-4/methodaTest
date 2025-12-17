import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../..', 'config.db');
export const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS statuses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS transitions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    from_status TEXT NOT NULL,
    to_status TEXT NOT NULL,
    FOREIGN KEY (from_status) REFERENCES statuses(id),
    FOREIGN KEY (to_status) REFERENCES statuses(id)
  );

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

export default db;