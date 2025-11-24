import { conf } from "../conf";
import apiRequest from "./apiRequest";

const inspectionServices = {

  // CREATE INSPECTION (POST)
  createInspection(payload, token) {
    return apiRequest(
      "POST",
      `${conf.apiBaseURL}/admin/inspections`,
      payload,
      token
    );
  },

  // UPDATE INSPECTION (PUT)
  updateInspection(inspectionId, payload, token) {
    return apiRequest(
      "PUT",
      `${conf.apiBaseURL}/admin/inspections`,
      {
        id: inspectionId,
        ...payload
      },
      token
    );
  },

  // DELETE INSPECTION (DELETE)
  deleteInspection(inspectionId, token) {
    return apiRequest(
      "DELETE",
      `${conf.apiBaseURL}/admin/inspections`,
      {
        id: inspectionId
      },
      token
    );
  },

  // GET ALL INSPECTIONS (GET)
  getInspections(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest(
      "GET",
      `${conf.apiBaseURL}/admin/inspections?${params}`,
      null,
      token
    );
  },

  // GET SINGLE INSPECTION (OPTIONAL)
  getInspection(inspectionId, token) {
    return apiRequest(
      "GET",
      `${conf.apiBaseURL}/admin/inspections?id=${inspectionId}`,
      null,
      token
    );
  }
};

export default inspectionServices;
