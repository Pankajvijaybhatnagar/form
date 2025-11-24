"use client";

import React, { useState, useEffect } from "react";
import liveDarshanServices from "@/lib/services/liveDarshanServices";
import { useAuth } from "@/context/AuthContext";
import { Button, Card } from "@radix-ui/themes";

// slugify helper
const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// URL VALIDATION FUNCTION
const isValidStreamUrl = (url) => {
  if (!url) return false;

  const patterns = [
    /^https?:\/\/[\w.-]+\.\w{2,}/,
    /^https?:\/\/.*youtube\.com\/watch\?v=/,
    /^https?:\/\/youtu\.be\//,
    /^https?:\/\/.*facebook\.com\//,
    /^https?:\/\/vimeo\.com\//,
    /^https?:\/\/.*\.m3u8$/,
    /^rtsp:\/\//,
  ];

  return patterns.some((regex) => regex.test(url));
};

// Format Date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminLiveDarshan() {
  const { access_token, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [darshans, setDarshans] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const blankForm = {
    id: null,
    title: "",
    slug: "",
    description: "",
    stream_url: "",
    status: "live",
    meta_title: "",
    meta_description: "",
    created_by: "",
    updated_by: "",
  };

  const [form, setForm] = useState(blankForm);
  const [errorMsg, setErrorMsg] = useState("");

  // Load list with pagination + filters
  const loadDarshans = async () => {
    if (!access_token) return;

    setLoading(true);

    const filters = {
      page,
      limit,
      user_id: user?.id,
      search: search || "",
    };

    if (filterStatus) {
      filters.status = filterStatus;
    }

    const res = await liveDarshanServices.getAdminDarshans(filters, access_token);

    if (res.success) {
      setDarshans(res.data.data || []);
      setTotal(res.data.total || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (access_token) loadDarshans();
  }, [page, access_token, filterStatus, search]);

  // Auto slug (when creating)
  useEffect(() => {
    if (!isEdit) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title]);

  const openAddModal = () => {
    setIsEdit(false);
    setForm({ ...blankForm, created_by: user?.id });
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEdit(true);
    setForm({ ...item, updated_by: user?.id });
    setErrorMsg("");
    setShowModal(true);
  };

  // Save Darshan
  const saveDarshan = async () => {
    if (!form.title.trim()) return setErrorMsg("Title is required");
    if (!form.stream_url.trim())
      return setErrorMsg("Streaming URL is required");
    if (!isValidStreamUrl(form.stream_url))
      return setErrorMsg("❌ Invalid streaming URL format");

    let payload = { ...form };

    if (!isEdit) delete payload.updated_by;

    let res;
    if (isEdit)
      res = await liveDarshanServices.updateDarshan(payload, access_token);
    else
      res = await liveDarshanServices.createDarshan(payload, access_token);

    if (res.success) {
      setShowModal(false);
      loadDarshans();
    } else {
      setErrorMsg(res.error || "Failed to save");
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const deleteDarshan = async () => {
    const res = await liveDarshanServices.deleteDarshan(
      { id: deleteId },
      access_token
    );
    if (res.success) {
      setDeleteModal(false);

      if (darshans.length === 1 && page > 1) setPage(page - 1);

      loadDarshans();
    }
  };

  // pagination helper
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-semibold">📺 Live Darshan</h5>

        <Button
          size="1"
          style={{ background: "#4a2c0a", color: "white" }}
          onClick={openAddModal}
        >
          + Add
        </Button>
      </div>

      {/* FILTERS */}
      <div className="row mb-2">
        <div className="col-md-3 mb-1">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Title..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="col-md-3 mb-1">
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => {
              setPage(1);
              setFilterStatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="live">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-3 text-center">Loading...</div>
      ) : (
        <table className="table table-sm table-striped align-middle">
          <thead className="table-light">
            <tr style={{ fontSize: "12px" }}>
              <th style={{ width: 40 }}>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>URL</th>
              <th>Created At</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {darshans.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-2">
                  No Items Found
                </td>
              </tr>
            ) : (
              darshans.map((item, i) => (
                <tr key={item.id}>
                  <td style={{ fontSize: "14px" }}>
                    {(page - 1) * limit + (i + 1)}
                  </td>
                  <td style={{ fontSize: "14px" }}>{item.title}</td>
                  <td>
                    <span
                      className={`badge bg-${item.status === "live"
                          ? "success"
                          : item.status === "upcoming"
                            ? "primary"
                            : "secondary"
                        }`}
                      style={{ fontSize: "14px" }}
                    >
                      {item.status === "live" ? "Published" : item.status}
                    </span>
                  </td>

                  <td
                    style={{
                      fontSize: "12px",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.stream_url}
                  </td>

                  <td style={{ fontSize: "14px" }}>
                    {formatDate(item.created_at)}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      style={{ fontSize: 11, padding: "2px 6px" }}
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      style={{ fontSize: 11, padding: "2px 6px" }}
                      onClick={() => openDeleteModal(item.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-2">
          <ul className="pagination pagination-sm m-0">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Prev
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${page === totalPages ? "disabled" : ""
                }`}
            >
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ======================== Modal: Add/Edit ======================== */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "#0003" }}>
          <div className="modal-dialog modal-md">
            <div className="modal-content" style={{ fontSize: "13px" }}>
              <div className="modal-header py-2">
                <h6 className="modal-title">
                  {isEdit ? "Edit Darshan" : "Add Darshan"}
                </h6>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                {errorMsg && (
                  <div className="alert alert-danger py-1 mb-2">{errorMsg}</div>
                )}

                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label mb-1">Title *</label>
                    <input
                      className="form-control form-control-sm"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-6 mb-2">
                    <label className="form-label mb-1">Slug *</label>
                    <input
                      className="form-control form-control-sm"
                      value={form.slug}
                      onChange={(e) =>
                        setForm({ ...form, slug: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label mb-1">Streaming URL *</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      style={{ resize: "vertical" }}
                      value={form.stream_url}
                      onChange={(e) =>
                        setForm({ ...form, stream_url: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="col-6 mb-2">
                    <label className="form-label mb-1">Status</label>
                    <select
                      className="form-select form-select-sm"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option selected value="live">
                        Published
                      </option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label mb-1">Description</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="col-6 mb-2">
                    <label className="form-label mb-1">Meta Title</label>
                    <input
                      className="form-control form-control-sm"
                      value={form.meta_title}
                      onChange={(e) =>
                        setForm({ ...form, meta_title: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-6 mb-2">
                    <label className="form-label mb-1">Meta Description</label>
                    <input
                      className="form-control form-control-sm"
                      value={form.meta_description}
                      onChange={(e) =>
                        setForm({ ...form, meta_description: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer py-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <Button onClick={saveDarshan}>
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================== Delete Modal ======================== */}
      {deleteModal && (
        <div className="modal fade show d-block" style={{ background: "#0003" }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content" style={{ fontSize: "13px" }}>
              <div className="modal-header py-2">
                <h6 className="modal-title text-danger">Confirm Delete</h6>
                <button className="btn-close" onClick={() => setDeleteModal(false)} />
              </div>

              <div className="modal-body">
                Are you sure you want to delete this darshan?
              </div>

              <div className="modal-footer py-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={deleteDarshan}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
