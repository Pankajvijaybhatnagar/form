"use client";

import { useEffect, useState } from "react";
import schoolServices from "@/lib/services/schoolServices";
import { useAuth } from "@/context/AuthContext";

export default function SchoolListPage() {
  const { access_token } = useAuth();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Popup control
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // BULK ADD rows
  const [rows, setRows] = useState([
    { school_name: "", school_code: "" },
  ]);
  const [errors, setErrors] = useState([]);

  // EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    id: null,
    school_name: "",
    school_code: "",
  });
  const [editErrors, setEditErrors] = useState({});

  const fetchSchools = async () => {
    setLoading(true);
    const res = await schoolServices.getAdminSchools({ search }, access_token);
    if (res.success) setSchools(res.data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchools();
  }, [search]);

  const openModal = (item = null) => {
    if (item) {
      // Edit mode
      setEditMode(true);
      setEditForm({
        id: item.id,
        school_name: item.school_name,
        school_code: item.school_code || "",
      });
      setEditErrors({});
    } else {
      // Bulk add mode
      setEditMode(false);
      setRows([{ school_name: "", school_code: "" }]);
      setErrors([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openDeletePopup = (id) => {
    setDeleteId(id);
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setDeleteId(null);
    setDeletePopupOpen(false);
  };

  // UPDATE BULK ROW
  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // ADD NEW ROW
  const addRow = () => {
    setRows([...rows, { school_name: "", school_code: "" }]);
    setErrors([...errors, {}]);
  };

  // REMOVE ROW
  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // VALIDATE EDIT MODE
      let errs = {};
      if (!editForm.school_name.trim())
        errs.school_name = "School name is required";
      if (!editForm.school_code.trim())
        errs.school_code = "School code is required";

      setEditErrors(errs);

      if (Object.keys(errs).length > 0) return;

      const res = await schoolServices.updateSchool(editForm, access_token);
      if (res.success) {
        closeModal();
        fetchSchools();
      }
      return;
    }

    // BULK ADD VALIDATION
    let newErrors = [];
    let hasError = false;

    rows.forEach((row, index) => {
      let rowErr = {};

      if (!row.school_name.trim()) {
        rowErr.school_name = "School name is required";
        hasError = true;
      }
      if (!row.school_code.trim()) {
        rowErr.school_code = "School code is required";
        hasError = true;
      }

      newErrors[index] = rowErr;
    });

    setErrors(newErrors);

    if (hasError) return;

    // SUBMIT ALL
    for (const row of rows) {
      await schoolServices.createSchool(row, access_token);
    }

    closeModal();
    fetchSchools();
  };

  const deleteSchool = async () => {
    const res = await schoolServices.deleteSchool({ id: deleteId }, access_token);
    if (res.success) {
      closeDeletePopup();
      fetchSchools();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">School List</h1>

        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Schools
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Search schools..."
          className="border border-gray-300 p-2 pl-10 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-3 top-3 text-gray-500">🔍</span>
      </div>

      {/* Ghost Table */}
      <div className="rounded-xl overflow-hidden shadow bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">School Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading...</td>
              </tr>
            ) : schools.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No schools found
                </td>
              </tr>
            ) : (
              schools.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.school_name}</td>
                  <td className="p-3">{item.school_code || "-"}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => openModal(item)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => openDeletePopup(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit School" : "Add Multiple Schools"}
            </h2>

            {/* -------- Bulk Add Mode -------- */}
            {!editMode && (
              <form onSubmit={handleSubmit}>
                <table className="w-full text-sm border mb-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">School Name</th>
                      <th className="p-2 text-left">School Code</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">
                          <input
                            type="text"
                            className={`border p-2 rounded w-full ${
                              errors[i]?.school_name ? "border-red-500" : ""
                            }`}
                            value={row.school_name}
                            onChange={(e) =>
                              handleRowChange(i, "school_name", e.target.value)
                            }
                          />
                          {errors[i]?.school_name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[i].school_name}
                            </p>
                          )}
                        </td>

                        <td className="p-2">
                          <input
                            type="text"
                            className={`border p-2 rounded w-full ${
                              errors[i]?.school_code ? "border-red-500" : ""
                            }`}
                            value={row.school_code}
                            onChange={(e) =>
                              handleRowChange(i, "school_code", e.target.value)
                            }
                          />
                          {errors[i]?.school_code && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[i].school_code}
                            </p>
                          )}
                        </td>

                        <td className="p-2 text-center">
                          {rows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRow(i)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ❌
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  type="button"
                  onClick={addRow}
                  className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded mb-4"
                >
                  + Add Row
                </button>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit All
                  </button>
                </div>
              </form>
            )}

            {/* -------- Edit Mode -------- */}
            {editMode && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    className={`w-full border p-2 rounded ${
                      editErrors.school_name ? "border-red-500" : ""
                    }`}
                    value={editForm.school_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        school_name: e.target.value,
                      })
                    }
                  />
                  {editErrors.school_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.school_name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    className={`w-full border p-2 rounded ${
                      editErrors.school_code ? "border-red-500" : ""
                    }`}
                    value={editForm.school_code}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        school_code: e.target.value,
                      })
                    }
                  />
                  {editErrors.school_code && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.school_code}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DELETE POPUP */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this school?</p>

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={deleteSchool}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
