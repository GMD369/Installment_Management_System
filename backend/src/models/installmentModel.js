const db = require('../config/db');

db.run(`
    CREATE TABLE IF NOT EXISTS installments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        due_date TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        paid_date TEXT,
        notes TEXT,
        
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )
`);

module.exports = db;
