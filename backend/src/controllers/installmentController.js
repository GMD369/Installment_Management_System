const db = require('../models/installmentModel');

// Add new installment
exports.addInstallment = (req, res) => {
    const { customer_id, product_id, due_date, amount, notes } = req.body;

    const query = `
        INSERT INTO installments (customer_id, product_id, due_date, amount, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [customer_id, product_id, due_date, amount, notes], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({
            message: "Installment added",
            installment_id: this.lastID
        });
    });
};

// Get all installments for one customer
exports.getInstallmentsByCustomer = (req, res) => {
    const customer_id = req.params.customer_id;

    const query = `
        SELECT * FROM installments
        WHERE customer_id = ?
        ORDER BY due_date ASC
    `;

    db.all(query, [customer_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(rows);
    });
};

// Mark installment as paid
exports.markInstallmentPaid = (req, res) => {
    const id = req.params.id;

    const query = `
        UPDATE installments
        SET status='paid', paid_date=datetime('now')
        WHERE id=?
    `;

    db.run(query, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({ message: "Installment marked as paid" });
    });
};

// Update installment
exports.updateInstallment = (req, res) => {
    const id = req.params.id;
    const { due_date, amount, notes } = req.body;

    const query = `
        UPDATE installments
        SET due_date=?, amount=?, notes=?
        WHERE id=?
    `;

    db.run(query, [due_date, amount, notes, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({ message: "Installment updated" });
    });
};

// Delete installment
exports.deleteInstallment = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM installments WHERE id=?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({ message: "Installment deleted" });
    });
};
