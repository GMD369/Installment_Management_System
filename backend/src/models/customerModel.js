const db = require('../config/db');

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        cnic TEXT NOT NULL,
        address TEXT,
        reference_name TEXT,
        reference_phone TEXT,
        document_path TEXT
    )
`);

module.exports = db;
