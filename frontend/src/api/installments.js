const API_URL = "http://localhost:5000/api/installments";

export const addInstallment = async (payload) => {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const getInstallmentsByCustomer = async (customer_id) => {
  const res = await fetch(`${API_URL}/customer/${customer_id}`);
  return res.json();
};

export const markInstallmentPaid = async (id) => {
  const res = await fetch(`${API_URL}/pay/${id}`, { method: "PUT" });
  return res.json();
};

export const updateInstallment = async (id, payload) => {
  const res = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteInstallment = async (id) => {
  const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
  return res.json();
};
