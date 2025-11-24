const db = require('../models/productModel');

exports.addProduct = (req, res) => {
    const { product_name, model, price, sale_price, down_payment, installment_duration, notes } = req.body;

    const query = `
        INSERT INTO products (product_name, model, price, sale_price, down_payment, installment_duration, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, 
        [product_name, model, price, sale_price, down_payment, installment_duration, notes],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            return res.json({
                message: "Product added successfully",
                product_id: this.lastID
            });
        }
    );
};

exports.getAllProducts = (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(rows);
    });
};

exports.getProductById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(row);
    });
};

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const { product_name, model, price, sale_price, down_payment, installment_duration, notes } = req.body;

    const query = `
        UPDATE products
        SET product_name=?, model=?, price=?, sale_price=?, down_payment=?, installment_duration=?, notes=?
        WHERE id=?
    `;

    db.run(query,
        [product_name, model, price, sale_price, down_payment, installment_duration, notes, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            return res.json({ message: "Product updated successfully" });
        }
    );
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Product deleted successfully" });
    });
};
