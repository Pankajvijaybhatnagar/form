import { conf } from "../conf";

/**
 * Helper: Standardized API request wrapper
 */
async function apiRequest(method, url, body = null, token = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    let data;
    try {
      data = await response.json();
      console.log("API Response Data:", data);
      console.log("Token Used:", token);    
    } catch {
      data = { message: "Invalid JSON Response" };
    }

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: data.message || "Something went wrong",
        data,
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      success: false,
      status: 0,
      error: err.message || "Network error",
    };
  }
}

/**
 * USER SERVICES
 */
const userServices = {
  /**
   * GET USERS WITH FILTERS
   * Example filters: { limit: 10, page: 1, name: "ankit" }
   */
  async getUsers(filters = {}, token) {
    const params = new URLSearchParams(filters);
    const url = `${conf.apiBaseURL}/admin/users?${params.toString()}`;
    return apiRequest("GET", url, null, token);
  },

  /**
   * CREATE USER (Admin)
   */
  async createUser(userData, token) {
    const url = `${conf.apiBaseURL}/admin/users`;
    return apiRequest("POST", url, userData, token);
  },

  /**
   * UPDATE USER (Admin)
   * Requires: { id: number, name, email, role, ... }
   */
  async updateUser(payload, token) {
    const url = `${conf.apiBaseURL}/admin/users`;
    return apiRequest("PUT", url, payload, token);
  },

  /**
   * DELETE USER (Admin)
   * Requires: { id: number }
   */
  async deleteUser(payload, token) {
    const url = `${conf.apiBaseURL}/admin/users`;
    return apiRequest("DELETE", url, payload, token);
  },
};

export default userServices;
