import { conf } from "../conf";

async function apiRequest(method, url, body = null, token = null) {
  try {
    const headers = {
      "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    let data;
    try { data = await response.json(); } catch { data = {}; }

    if (!response.ok) {
      return { success: false, status: response.status, error: data.message || "Error", data };
    }
    return { success: true, status: response.status, data };

  } catch (err) {
    return { success: false, status: 0, error: err.message };
  }
}

const inquiriesServices = {
  getInquiries(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/admin/inquiries?${params}`, null, token);
  }
};

export default inquiriesServices;
