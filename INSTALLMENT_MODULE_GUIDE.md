# 💳 Installment Module - Complete Guide

## ✅ Module Status: FULLY INTEGRATED

The installment module is now **completely functional and linked with customers and products**.

---

## 🔗 How Installments Work

### Data Flow
```
Customer → Product → Installment → Payment Tracking
   ↓          ↓           ↓              ↓
  Name     Product    Due Date      Paid/Pending
  Phone    Price      Amount        Payment Date
  CNIC     Model      Notes         Status
```

---

## 📍 Where to Manage Installments

### Option 1: Customer Dashboard (Recommended for specific customer)
1. Go to **Customers** page
2. Click on any customer row (or click "View Full Dashboard")
3. Scroll to **"Installment Schedule"** section
4. Click **"Add Installment"** button
5. Select product, enter amount and due date
6. Save

### Option 2: Global Installments Page
1. Click **"Installments"** in sidebar
2. View all installments from all customers
3. Click **"+ Add Installment"** button (top right)
4. Select both customer AND product
5. Enter amount and due date
6. Save

---

## ➕ Adding an Installment

### From Customer Dashboard (Pre-selected customer):
```
Fields to fill:
✓ Product (dropdown) - Select from available products
✓ Due Date (calendar) - When payment is due
✓ Amount (PKR) - Payment amount
✓ Notes (optional) - Any additional information
```

### From Global Installments Page (All customers):
```
Fields to fill:
✓ Customer (dropdown) - Select customer
✓ Product (dropdown) - Select from available products
✓ Due Date (calendar) - When payment is due
✓ Amount (PKR) - Payment amount
✓ Notes (optional) - Any additional information
```

---

## ✏️ Editing an Installment

1. Find the installment in the list
2. Click **"Edit"** button
3. Modify:
   - Due Date
   - Amount
   - Notes
4. Click **"Save Changes"**

**Note**: Customer and Product cannot be changed after creation. Delete and recreate if needed.

---

## ✅ Marking as Paid

1. Find pending installment
2. Click **"Mark as Paid"** button
3. Status changes from orange (Pending) to green (Paid)
4. Payment date is automatically recorded
5. Appears in reports as paid

---

## 🗑️ Deleting an Installment

1. Find the installment
2. Click **"Delete"** button
3. Confirm deletion
4. Installment is permanently removed

**Warning**: This action cannot be undone!

---

## 🔍 Filtering and Searching

### Status Filter
- **All Status** - Show everything
- **Paid** - Only completed payments
- **Pending** - Only unpaid installments

### Search Function
- Search by customer name
- Search by customer phone number
- Real-time filtering as you type

---

## 📊 Viewing Installments

### Customer Dashboard View
Shows installments for ONE specific customer:
- Organized by date
- Color-coded status (Green=Paid, Orange=Pending)
- Shows payment dates for paid installments
- Displays notes if any

### Global Installments View
Shows ALL installments from ALL customers:
- Customer name and phone visible
- Product name visible
- Sortable by any column
- Quick access to customer dashboard

---

## 🎨 Visual Indicators

### Status Colors
```
✅ Green - Paid
   - Payment completed
   - Shows payment date

⏰ Orange - Pending
   - Payment not yet received
   - Shows due date
   - Can be marked as paid

❌ Red - Overdue (Future Enhancement)
   - Payment past due date
   - Requires attention
```

---

## 💡 Best Practices

### 1. Creating Installments
- Always select the correct customer and product
- Set realistic due dates
- Add notes for special conditions
- Consider product's installment duration

### 2. Payment Tracking
- Mark as paid immediately when payment received
- Verify amount before marking paid
- Use notes to record payment method if needed

### 3. Regular Review
- Check pending installments daily
- Follow up on overdue payments
- Generate reports weekly/monthly

---

## 🔄 Complete Workflow Example

### Scenario: Selling a Product on Installments

**Step 1: Add Customer**
```
Go to Customers → Add Customer
Fill: Name, Phone, CNIC, Address
Save
```

**Step 2: Add Product**
```
Go to Products → Add Product
Fill: Product Name, Model, Price, Sale Price
Set: Down Payment, Installment Duration
Save
```

**Step 3: Create Installment Schedule**
```
Method A - From Customer Dashboard:
1. Click on customer
2. Click "Add Installment"
3. Select product
4. Enter first installment amount and due date
5. Repeat for each installment

Method B - From Global Installments:
1. Go to Installments page
2. Click "+ Add Installment"
3. Select customer
4. Select product
5. Enter amount and due date
```

**Step 4: Track Payments**
```
When payment received:
1. Find installment
2. Click "Mark as Paid"
3. Status updates automatically
```

**Step 5: Generate Reports**
```
Go to Reports → Select report type
View all paid installments
Export to CSV if needed
```

---

## 🔧 Technical Integration

### Database Relationships
```sql
Installments Table:
- id (Primary Key)
- customer_id (Foreign Key → customers.id)
- product_id (Foreign Key → products.id)
- due_date
- amount
- status (paid/pending)
- paid_date
- notes
```

### API Endpoints Used
```
POST   /api/installments/add           - Create new installment
GET    /api/installments/customer/:id  - Get customer installments
PUT    /api/installments/pay/:id       - Mark as paid
PUT    /api/installments/update/:id    - Update installment
DELETE /api/installments/delete/:id    - Delete installment
```

---

## ✅ Feature Checklist

### Core Features
- ✅ Add installments with customer & product selection
- ✅ Edit installment details (date, amount, notes)
- ✅ Delete installments
- ✅ Mark installments as paid
- ✅ View all installments globally
- ✅ View customer-specific installments
- ✅ Filter by status (all/paid/pending)
- ✅ Search by customer name or phone
- ✅ Professional UI with color coding
- ✅ Loading states and error handling
- ✅ Customer-product linking
- ✅ Payment date tracking
- ✅ Statistics dashboard

### Integration Points
- ✅ Linked with Customer module
- ✅ Linked with Product module
- ✅ Appears in Customer Dashboard
- ✅ Appears in Reports
- ✅ Data validation on forms
- ✅ Dropdown selections for easy data entry

---

## 🎯 User Scenarios

### Scenario 1: Monthly Installments
**Product**: Laptop - PKR 100,000
**Plan**: 10 months @ PKR 10,000/month

1. Add customer
2. Add product (set installment_duration = 10)
3. Create 10 installments:
   - Each for PKR 10,000
   - Due dates: 1st of each month
4. Mark as paid when received

### Scenario 2: Custom Payment Plan
**Product**: Mobile - PKR 50,000
**Plan**: Irregular amounts

1. Add customer
2. Add product
3. Create installments:
   - 1st: PKR 20,000 (down payment)
   - 2nd: PKR 15,000 (after 1 month)
   - 3rd: PKR 15,000 (after 2 months)
4. Track each payment individually

---

## 📈 Reporting Integration

Installments automatically appear in:
- **Daily Reports** - Payments made today
- **Weekly Reports** - Payments in date range
- **Monthly Reports** - Payments in month
- **Custom Reports** - Any date range
- **Customer Dashboard** - Individual stats

---

## 🚀 Quick Actions

### For Fast Data Entry
```
1. Keep Customers page open in one tab
2. Keep Products page open in another tab
3. Use Installments page for quick entry
4. Use dropdowns instead of typing IDs
```

### For Payment Collection
```
1. Go to Installments → Filter: Pending
2. Sort by Due Date
3. Mark as paid as payments come in
4. Generate daily report at end of day
```

---

## ✨ What's New (Improvements Made)

### Previous Issues (Fixed)
- ❌ Had to manually enter product ID
- ❌ Had to manually enter customer ID
- ❌ No validation on forms
- ❌ Basic styling
- ❌ No customer linking

### Current Features (Working)
- ✅ Dropdown to select products
- ✅ Dropdown to select customers
- ✅ Full form validation
- ✅ Professional styling with labels
- ✅ Fully integrated with customer dashboard
- ✅ Shows customer & product names in tables
- ✅ Add installments from multiple places
- ✅ Better error handling

---

## 🎓 Training Tips

### For New Users
1. Start with adding one customer
2. Add one product
3. Create one installment
4. Mark it as paid
5. View in reports
6. Repeat for real data

### For Daily Operations
1. Morning: Check pending installments
2. Collect payments throughout day
3. Mark as paid in real-time
4. Evening: Generate daily report
5. Weekly: Review all pending payments

---

## 📞 Support Scenarios

### "I can't add an installment"
- Ensure you have at least one customer
- Ensure you have at least one product
- Check that all required fields are filled
- Verify due date is valid

### "Product/Customer dropdown is empty"
- Go to Customers page and add customers
- Go to Products page and add products
- Refresh the Installments page

### "Can't mark as paid"
- Ensure installment status is 'pending'
- Check backend is running
- Verify network connection

---

## ✅ Module Complete!

The installment module is **fully functional and production-ready** with:
- ✅ Customer integration
- ✅ Product integration  
- ✅ Professional UI
- ✅ Complete CRUD operations
- ✅ Payment tracking
- ✅ Reporting integration

**Ready for client use!** 🎉
