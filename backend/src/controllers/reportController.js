const db = require('../config/db');

// Helper function
function runQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Daily Report
exports.dailyReport = async (req, res) => {
    try {
        const today = req.query.date;

        const query = `
            SELECT * FROM installments
            WHERE paid_date LIKE ? AND status='paid'
            ORDER BY paid_date ASC
        `;

        const rows = await runQuery(query, [`${today}%`]);

        const total = rows.reduce((sum, i) => sum + i.amount, 0);

        res.json({
            date: today,
            total_received: total,
            payments: rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Weekly Report
exports.weeklyReport = async (req, res) => {
    try {
        const { start, end } = req.query;

        const query = `
            SELECT * FROM installments
            WHERE paid_date BETWEEN ? AND ?
            AND status='paid'
            ORDER BY paid_date ASC
        `;

        const rows = await runQuery(query, [start, end]);
        const total = rows.reduce((sum, i) => sum + i.amount, 0);

        res.json({
            start_date: start,
            end_date: end,
            total_received: total,
            payments: rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Monthly Report
exports.monthlyReport = async (req, res) => {
    try {
        const { month } = req.query;

        const query = `
            SELECT * FROM installments
            WHERE paid_date LIKE ? AND status='paid'
            ORDER BY paid_date ASC
        `;

        const rows = await runQuery(query, [`${month}%`]);
        const total = rows.reduce((sum, i) => sum + i.amount, 0);

        res.json({
            month,
            total_received: total,
            payments: rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Custom Date Range
exports.customReport = async (req, res) => {
    try {
        const { start, end } = req.query;

        const query = `
            SELECT * FROM installments
            WHERE paid_date BETWEEN ? AND ?
            AND status='paid'
            ORDER BY paid_date ASC
        `;

        const rows = await runQuery(query, [start, end]);
        const total = rows.reduce((sum, i) => sum + i.amount, 0);

        res.json({
            range: { start, end },
            total_received: total,
            payments: rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
