const db = require('../config/db');

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        model TEXT,
        price REAL NOT NULL,
        sale_price REAL NOT NULL,
        down_payment REAL,
        installment_duration INTEGER,
        notes TEXT
    )
`);

module.exports = db;
