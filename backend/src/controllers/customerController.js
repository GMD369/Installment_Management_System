const db = require('../models/customerModel');

exports.addCustomer = (req, res) => {
    const { name, phone, cnic, address, reference_name, reference_phone } = req.body;

    const document_path = req.file ? req.file.path : null;

    const query = `
        INSERT INTO customers 
        (name, phone, cnic, address, reference_name, reference_phone, document_path)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, 
        [name, phone, cnic, address, reference_name, reference_phone, document_path],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            return res.json({
                message: "Customer added successfully",
                customer_id: this.lastID
            });
        }
    );
};

exports.getCustomers = (req, res) => {
    db.all("SELECT * FROM customers", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.json(rows);
    });
};

exports.getCustomerById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM customers WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.json(row);
    });
};

exports.updateCustomer = (req, res) => {
    const id = req.params.id;
    const { name, phone, cnic, address, reference_name, reference_phone } = req.body;

    const document_path = req.file ? req.file.path : null;

    const query = `
        UPDATE customers
        SET name=?, phone=?, cnic=?, address=?, reference_name=?, reference_phone=?, 
            document_path=COALESCE(?, document_path)
        WHERE id=?
    `;

    db.run(query,
        [name, phone, cnic, address, reference_name, reference_phone, document_path, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            return res.json({ message: "Customer updated successfully" });
        }
    );
};

exports.deleteCustomer = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM customers WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        return res.json({ message: "Customer deleted successfully" });
    });
};
