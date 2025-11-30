import React, { useState } from "react";
import {
  Calendar,
  Download,
  FileText,
  Filter,
  TrendingUp
} from "lucide-react";
import {
  getDailyReport,
  getWeeklyReport,
  getMonthlyReport,
  getCustomReport
} from "../api/reports";

export default function Reports() {
  const [reportType, setReportType] = useState("daily");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Date filters
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      let data;
      switch (reportType) {
        case "daily":
          data = await getDailyReport(selectedDate);
          break;
        case "weekly":
          if (!startDate || !endDate) {
            alert("Please select start and end dates");
            setLoading(false);
            return;
          }
          data = await getWeeklyReport(startDate, endDate);
          break;
        case "monthly":
          data = await getMonthlyReport(selectedMonth);
          break;
        case "custom":
          if (!startDate || !endDate) {
            alert("Please select start and end dates");
            setLoading(false);
            return;
          }
          data = await getCustomReport(startDate, endDate);
          break;
        default:
          break;
      }
      setReportData(data);
    } catch (err) {
      alert(err.message || "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!reportData) return;

    const csvContent = [
      ["Date", "Amount", "Status", "Customer ID", "Product ID", "Notes"],
      ...(reportData.payments || []).map((p) => [
        p.paid_date || p.due_date,
        p.amount,
        p.status,
        p.customer_id,
        p.product_id,
        p.notes || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${reportType}_${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">Generate and view payment reports</p>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Report Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <button
              onClick={() => setReportType("daily")}
              className={`p-4 rounded-lg border-2 transition ${
                reportType === "daily"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Calendar className="w-6 h-6 mb-2 text-blue-600" />
              <p className="font-semibold text-gray-800">Daily Report</p>
            </button>

            <button
              onClick={() => setReportType("weekly")}
              className={`p-4 rounded-lg border-2 transition ${
                reportType === "weekly"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Calendar className="w-6 h-6 mb-2 text-blue-600" />
              <p className="font-semibold text-gray-800">Weekly Report</p>
            </button>

            <button
              onClick={() => setReportType("monthly")}
              className={`p-4 rounded-lg border-2 transition ${
                reportType === "monthly"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Calendar className="w-6 h-6 mb-2 text-blue-600" />
              <p className="font-semibold text-gray-800">Monthly Report</p>
            </button>

            <button
              onClick={() => setReportType("custom")}
              className={`p-4 rounded-lg border-2 transition ${
                reportType === "custom"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Calendar className="w-6 h-6 mb-2 text-blue-600" />
              <p className="font-semibold text-gray-800">Custom Range</p>
            </button>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {reportType === "daily" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {reportType === "monthly" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {(reportType === "weekly" || reportType === "custom") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>

        {/* Report Results */}
        {reportData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Report Results</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                </p>
              </div>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <p className="text-sm text-blue-700 font-medium mb-1">Total Received</p>
                <h3 className="text-3xl font-bold text-blue-900">
                  PKR {reportData.total_received?.toLocaleString() || 0}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <p className="text-sm text-green-700 font-medium mb-1">Total Payments</p>
                <h3 className="text-3xl font-bold text-green-900">
                  {reportData.payments?.length || 0}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <p className="text-sm text-purple-700 font-medium mb-1">Average Payment</p>
                <h3 className="text-3xl font-bold text-purple-900">
                  PKR{" "}
                  {reportData.payments?.length
                    ? (reportData.total_received / reportData.payments.length).toFixed(0)
                    : 0}
                </h3>
              </div>
            </div>

            {/* Payment List */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Customer ID</th>
                    <th className="px-4 py-3 text-left">Product ID</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reportData.payments?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No payments found for this period
                      </td>
                    </tr>
                  ) : (
                    reportData.payments?.map((payment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{payment.paid_date || payment.due_date}</td>
                        <td className="px-4 py-3">{payment.customer_id}</td>
                        <td className="px-4 py-3">{payment.product_id}</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          PKR {payment.amount?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {payment.notes || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
