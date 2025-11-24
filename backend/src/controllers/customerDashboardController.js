const db = require('../config/db');

// Single API → combine customer + product + installments + stats
exports.getCustomerDashboard = (req, res) => {
    const customer_id = req.params.customer_id;

    // Step 1: Fetch customer info
    const customerQuery = `
        SELECT * FROM customers WHERE id = ?
    `;

    db.get(customerQuery, [customer_id], (err, customer) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        // Step 2: Fetch products purchased by customer
        const productQuery = `
            SELECT p.* FROM products p
            JOIN installments i ON i.product_id = p.id
            WHERE i.customer_id = ?
            GROUP BY p.id
        `;

        db.all(productQuery, [customer_id], (err, products) => {
            if (err) return res.status(500).json({ error: err.message });

            // Step 3: Fetch all installments
            const installmentQuery = `
                SELECT * FROM installments
                WHERE customer_id = ?
                ORDER BY due_date ASC
            `;

            db.all(installmentQuery, [customer_id], (err, installments) => {
                if (err) return res.status(500).json({ error: err.message });

                // Step 4: Calculate stats
                const paid = installments.filter(i => i.status === "paid");
                const pending = installments.filter(i => i.status === "pending");

                const total_paid = paid.reduce((sum, i) => sum + i.amount, 0);
                const total_remaining = pending.reduce((sum, i) => sum + i.amount, 0);

                const next_due = pending.length > 0 ? pending[0] : null;

                return res.json({
                    customer,
                    products,
                    installments,
                    stats: {
                        total_paid,
                        total_remaining,
                        paid_count: paid.length,
                        pending_count: pending.length,
                        next_due
                    }
                });
            });
        });
    });
};
