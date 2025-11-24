import { conf } from "../conf";

async function apiRequest(method, url, body = null, token = null) {
  try {
    const headers = {};
    if (!(body instanceof FormData)) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = body instanceof FormData ? body : JSON.stringify(body);

    const response = await fetch(url, options);
    let data;
    try { data = await response.json(); } catch { data = {}; }

    console.log(data);


    if (!response.ok) {
      return { success: false, status: response.status, error: data.message || "Request failed", data };
    }
    return { success: true, status: response.status, data };
  } catch (err) {
    return { success: false, status: 0, error: err.message };
  }
}

const eventServices = {
  // ADMIN: CREATE EVENT
  createEvent(payload, token) {
    return apiRequest("POST", `${conf.apiBaseURL}/admin/events`, payload, token);
  },

  // ADMIN: UPDATE EVENT
  updateEvent(payload, token) {
    return apiRequest("PUT", `${conf.apiBaseURL}/admin/events`, payload, token);
  },

  // ADMIN: DELETE EVENT
  deleteEvent(payload, token) {
    return apiRequest("DELETE", `${conf.apiBaseURL}/admin/events`, payload, token);
  },

  // ADMIN: GET EVENTS (FILTERS)
  getAdminEvents(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/admin/events?${params}`, null, token);
  },

  // PUBLIC EVENTS
  getPublicEvents(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/events?${params}`);
  },

  // PUBLIC EVENT
  getPublicEvent(slug) {
    return apiRequest("GET", `${conf.apiBaseURL}/events?slug=${slug}`);
  }
};

export default eventServices;
