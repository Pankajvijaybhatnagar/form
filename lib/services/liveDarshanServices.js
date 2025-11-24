// services/liveDarshanServices.js

import { conf } from "../conf";

/**
 * Generic API request helper function.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} url - The full API endpoint URL
 * @param {object|FormData|null} body - The request body
 * @param {string|null} token - The auth token
 * @returns {Promise<object>} - { success: boolean, status: number, data: any, error?: string }
 */
async function apiRequest(method, url, body = null, token = null) {
  try {
    const headers = {};
    
    // Don't set Content-Type for FormData; browser does it
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = { method, headers };
    
    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);
    let data;
    
    // Try to parse JSON, but default to empty object if body is empty
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      // Use the error message from the API, or a default
      return { 
        success: false, 
        status: response.status, 
        error: data.message || "Request failed", 
        data 
      };
    }
    
    return { success: true, status: response.status, data };

  } catch (err) {
    // Network error or other fetch-related issue
    return { success: false, status: 0, error: err.message };
  }
}

/**
 * Collection of services for the Live Darshan API
 */
const liveDarshanServices = {
  
  /**
   * ADMIN: Create a new live darshan
   * @param {object} payload - The darshan data
   * @param {string} token - Admin auth token
   */
  createDarshan(payload, token) {
    return apiRequest("POST", `${conf.apiBaseURL}/admin/live-darshan`, payload, token);
  },

  /**
   * ADMIN: Update an existing live darshan
   * @param {object} payload - The darshan data (must include "id")
   * @param {string} token - Admin auth token
   */
  updateDarshan(payload, token) {
    return apiRequest("PUT", `${conf.apiBaseURL}/admin/live-darshan`, payload, token);
  },

  /**
   * ADMIN: Delete a live darshan
   * @param {object} payload - { "id": darshanId }
   * @param {string} token - Admin auth token
   */
  deleteDarshan(payload, token) {
    return apiRequest("DELETE", `${conf.apiBaseURL}/admin/live-darshan`, payload, token);
  },

  /**
   * ADMIN: Get live darshans with filters
   * @param {object} filters - e.g., { status: 'live', search: 'aarti' }
   * @param {string} token - Admin auth token
   */
  getAdminDarshans(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest("GET", `${conf.apiBaseURL}/admin/live-darshan?${params}`, null, token);
  },

  /**
   * PUBLIC: Get public-facing live darshans
   * @param {object} filters - e.g., { show: 'upcoming' } or { slug: '...' }
   */
  getPublicDarshans(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    // Note: No token is passed for this public route
    return apiRequest("GET", `${conf.apiBaseURL}/live-darshan?${params}`);
  }
};

export default liveDarshanServices;
