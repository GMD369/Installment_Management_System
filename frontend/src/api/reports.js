import api from "./axiosClient";

// Get daily report
export function getDailyReport(date) {
  return api.get(`/reports/daily?date=${date}`);
}

// Get weekly report
export function getWeeklyReport(start, end) {
  return api.get(`/reports/weekly?start=${start}&end=${end}`);
}

// Get monthly report
export function getMonthlyReport(month) {
  return api.get(`/reports/monthly?month=${month}`);
}

// Get custom date range report
export function getCustomReport(start, end) {
  return api.get(`/reports/custom?start=${start}&end=${end}`);
}
