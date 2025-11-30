import React from "react";
import CustomerList from "../components/customers/CustomerList";

export default function Customers() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <CustomerList />
    </div>
  );
}
