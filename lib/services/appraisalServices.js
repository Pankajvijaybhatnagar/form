import { conf } from "../conf";
import apiRequest from "./apiRequest"; // if apiRequest is separate, else remove this line

const appraisalServices = {
  // CREATE APPRAISAL
  createAppraisal(payload, token) {
    return apiRequest(
      "POST",
      `${conf.apiBaseURL}/admin/appraisals`,
      payload,
      token
    );
  },

  // UPDATE APPRAISAL
  updateAppraisal(appraisalId, payload, token) {
    return apiRequest(
      "PUT",
      `${conf.apiBaseURL}/admin/appraisals/${appraisalId}`,
      payload,
      token
    );
  },

  // DELETE APPRAISAL
  deleteAppraisal(appraisalId, token) {
    return apiRequest(
      "DELETE",
      `${conf.apiBaseURL}/admin/appraisals/${appraisalId}`,
      null,
      token
    );
  },

  // GET ALL APPRAISALS (ADMIN)
  getAppraisals(filters = {}, token) {
    const params = new URLSearchParams(filters).toString();
    return apiRequest(
      "GET",
      `${conf.apiBaseURL}/admin/appraisals?${params}`,
      null,
      token
    );
  },

  // GET SINGLE APPRAISAL (ADMIN) — Since backend does not have specific route, we filter by id
  getAppraisal(appraisalId, token) {
    return apiRequest(
      "GET",
      `${conf.apiBaseURL}/admin/appraisals?id=${appraisalId}`,
      null,
      token
    );
  }
};

export default appraisalServices;
