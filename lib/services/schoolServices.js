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

    if (!response.ok) {
      return { success: false, status: response.status, error: data.message || "Request failed", data };
    }
    return { success: true, status: response.status, data };
  } catch (err) {
    return { success: false, status: 0, error: err.message };
  }
}

const schoolServices = {
  // -----------------------------------------------------
  // ADMIN CRUD OPERATIONS
  // -----------------------------------------------------

  // CREATE SCHOOL
  createSchool(payload, token) {
    return apiRequest("POST", `${conf.apiBaseURL}/admin/schools`, payload, token);
  },

  // UPDATE SCHOOL
  updateSchool(payload, token) {
    return apiRequest("PUT", `${conf.apiBaseURL}/admin/schools`, payload, token);
  },

  // DELETE SCHOOL
  deleteSchool(payload, token) {
    return apiRequest("DELETE", `${conf.apiBaseURL}/admin/schools`, payload, token);
  },

  // GET ALL SCHOOLS (ADMIN)
  getAdminSchools(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/admin/schools?${params}`, null, token);
  },

  // -----------------------------------------------------
  // PUBLIC ROUTES
  // -----------------------------------------------------

  // GET ACTIVE SCHOOL LIST (FULL DATA)
  getPublicSchools(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/schools?${params}`);
  },

  // GET DROPDOWN — ONLY ACTIVE SCHOOLS (id + school_name)
  getSchoolDropdown() {
    return apiRequest("GET", `${conf.apiBaseURL}/schools?dropdown=true`);
  }
};

export default schoolServices;
