import { conf } from "../conf";

/**
 * Universal API Request Handler
 * - Supports JSON + FormData
 * - Handles Authorization token
 * - Returns: { success, status, data, error }
 */

export default async function apiRequest(method, url, body = null, token = null) {
  try {
    const headers = {};

    // Add JSON headers unless sending FormData
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Add token if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = { method, headers };

    // Apply request body
    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, options);

    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      data = {};
    }

    console.log("API RESPONSE:", data);

    // Handle HTTP errors (non-2xx)
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: data.message || data.error || "Request failed",
        data,
      };
    }

    // Success result
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
