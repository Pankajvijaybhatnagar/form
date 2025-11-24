"use client";

import React, { useEffect, useState } from "react";
import inspectionServices from "@/lib/services/inspectionServices";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import { GrPowerReset } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { FaFilterCircleXmark, FaTrash } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";

import { Card, Button } from "@radix-ui/themes";

export default function AdminSchoolInspections() {
  const { access_token } = useAuth();

  const [inspections, setInspections] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadInspections = async () => {
    setLoading(true);
    const res = await inspectionServices.getInspections({}, access_token);

    if (res.success) {
      setInspections(res.data.data || []);
      setFiltered(res.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (access_token) loadInspections();
  }, [access_token]);

  // Filtering Logic
  useEffect(() => {
    let temp = [...inspections];

    if (search.trim()) {
      temp = temp.filter(
        (i) =>
          i.school_name?.toLowerCase().includes(search.toLowerCase()) ||
          i.inspector_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (schoolFilter) temp = temp.filter((i) => i.school_name === schoolFilter);
    if (statusFilter) temp = temp.filter((i) => i.status === statusFilter);

    setFiltered(temp);
    setPage(1);
  }, [search, schoolFilter, statusFilter, inspections]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const res = await inspectionServices.deleteInspection(deleteId, access_token);

    if (res.success) {
      alert("Inspection deleted successfully!");
      loadInspections();
    } else {
      alert(res.error || "Failed to delete inspection");
    }

    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="">
      <h4 className="fw-bold mb-1">Manage School Inspections</h4>

      {/* Filters */}
      <div className="row g-1 pb-2 align-items-center">

        {/* Search */}
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by school or inspector..."
            className="form-control form-control-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* School Filter */}
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Filter by school..."
            className="form-control form-control-sm"
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="col-md-3">
          <select
            className="form-select form-select-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="col-md-2 d-flex gap-1">

          {/* Reset Filters */}
          <button
            className="btn"
            onClick={() => {
              setSearch("");
              setSchoolFilter("");
              setStatusFilter("");
            }}
            title="Reset Filters"
          >
            <FaFilterCircleXmark />
          </button>

          {/* Refresh */}
          <button
            className="btn btn-sm btn-outline-primary w-50 d-flex align-items-center justify-content-center"
            onClick={loadInspections}
            title="Refresh List"
          >
            <GrPowerReset color="black" size={20} />
          </button>

        </div>
      </div>

      {/* TABLE */}
      <Card className="p-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-sm table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>School</th>
                <th>Inspector</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ width: "110px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading inspections...</td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No inspections found.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.school_name}</td>
                    <td>{item.inspector_name}</td>
                    <td>{item.inspection_date}</td>

                    <td>
                      <span
                        className={`badge text-capitalize ${
                          item.status === "completed"
                            ? "bg-success"
                            : item.status === "in-progress"
                            ? "bg-warning"
                            : item.status === "pending"
                            ? "bg-secondary"
                            : "bg-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-1">

                        {/* Edit */}
                        <Link
                          href={`/admin/school-inspections/${item.id}`}
                          className="wp-btn-edit"
                        >
                          <FaRegEdit size={14} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="wp-btn-delete"
                        >
                          <FaTrash size={14} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Showing {paginated.length} of {filtered.length} inspections
          </small>

          <div className="d-flex gap-1">
            <Button size="1" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                size="1"
                color={page === i + 1 ? "brown" : "gray"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="1"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="radix-modal">
          <DialogTitle className="fw-bold">Confirm Delete</DialogTitle>
          <DialogDescription className="mb-3">
            Are you sure you want to delete this inspection record?
            This action cannot be undone.
          </DialogDescription>

          <div className="d-flex justify-content-end gap-2">
            <DialogClose asChild>
              <Button variant="soft" color="gray" size="2">Cancel</Button>
            </DialogClose>

            <Button color="red" size="2" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* GLOBAL STYLES (same as events/appraisal pages) */}
      <style jsx global>{`
        .wp-btn-edit,
        .wp-btn-delete {
          width: 28px;
          height: 28px;
          padding: 0;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .wp-btn-edit {
          background: #f2f2f2;
          color: #555;
          border: 1px solid #ddd;
        }
        .wp-btn-edit:hover {
          background: #e6e6e6;
          color: #000;
        }

        .wp-btn-delete {
          background: #f8d7da;
          color: #c33;
          border: 1px solid #f5c2c7;
        }
        .wp-btn-delete:hover {
          background: #dc3545;
          color: white;
          border-color: #b02a37;
        }

        .radix-modal {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          width: 360px;
          max-width: 90%;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
