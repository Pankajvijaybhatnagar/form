"use client";

import React, { useEffect, useState } from "react";
import eventServices from "@/lib/services/eventServices";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { conf } from "@/lib/conf";

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

export default function AdminEvents() {
  const { access_token } = useAuth();

  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadEvents = async () => {
    setLoading(true);
    const res = await eventServices.getAdminEvents({}, access_token);

    if (res.success) {
      setEvents(res.data.data || []);
      setFiltered(res.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (access_token) loadEvents();
  }, [access_token]);

  // Filtering Logic
  useEffect(() => {
    let temp = [...events];

    if (search.trim()) {
      temp = temp.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      temp = temp.filter((e) => e.status === statusFilter);
    }

    if (dateFilter) {
      temp = temp.filter((e) => e.start_date === dateFilter);
    }

    setFiltered(temp);
    setPage(1);
  }, [search, statusFilter, dateFilter, events]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Delete Handler
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await eventServices.deleteEvent({ id: deleteId }, access_token);

    if (res.success) {
      alert("Event deleted successfully!");
      loadEvents();
    } else {
      alert(res.error || "Failed to delete event");
    }

    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="">
      <h4 className="fw-bold mb-1">Manage Events</h4>

      {/* Filters */}
   
        <div className="row g-1 pb-2 align-items-center">

  {/* Search */}
  <div className="col-md-4">
    <input
      type="text"
      placeholder="Search by title..."
      className="form-control form-control-sm"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
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
      <option value="published">Published</option>
      <option value="draft">Draft</option>
      <option value="archived">Archived</option>
    </select>
  </div>

  {/* Date Filter */}
  <div className="col-md-3">
    <input
      type="date"
      className="form-control form-control-sm"
      value={dateFilter}
      onChange={(e) => setDateFilter(e.target.value)}
    />
  </div>

  {/* Buttons */}
  <div className="col-md-2 d-flex gap-1">

    {/* Reset Filters */}
    <button
      className="btn"
      onClick={() => {
        setSearch("");
        setStatusFilter("");
        setDateFilter("");
      }}
      title="Reset Filters"
    >
      <FaFilterCircleXmark />
    </button>

    {/* Refresh */}
    <button
      className="btn btn-sm btn-outline-primary w-50 d-flex align-items-center justify-content-center"
      onClick={loadEvents}
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
                <th style={{ width: "70px" }}>Image</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>Location</th>
                <th>Status</th>
                <th style={{ width: "110px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading events...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No events found.
                  </td>
                </tr>
              ) : (
                paginated.map((event) => (
                  <tr key={event.id}>
                    <td>
                      {event.cover_image_url ? (
                        <img
                          src={`${conf.apiBaseURL.slice(
                            0,
                            -2
                          )}/uploads/events/${event.cover_image_url}`}
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <small>No Img</small>
                      )}
                    </td>

                    <td>{event.title}</td>
                    <td>{event.start_date}</td>
                    <td>{event.location_name || "—"}</td>

                    <td>
                      <span
                        className={`badge text-capitalize ${
                          event.status === "published"
                            ? "bg-success"
                            : event.status === "draft"
                            ? "bg-secondary"
                            : "bg-warning"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-1">

                        {/* Edit */}
                        <Link
                          href={`/admin/events/${event.slug}`}
                          className="wp-btn-edit"
                        >
                          <FaRegEdit size={14} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => confirmDelete(event.id)}
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
            Showing {paginated.length} of {filtered.length} events
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

      {/* DELETE CONFIRMATION MODAL (RADIX UI) */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="radix-modal">
          <DialogTitle className="fw-bold">Confirm Delete</DialogTitle>
          <DialogDescription className="mb-3">
            Are you sure you want to delete this event? This action cannot
            be undone.
          </DialogDescription>

          <div className="d-flex justify-content-end gap-2">
            <DialogClose asChild>
              <Button variant="soft" color="gray" size="2">
                Cancel
              </Button>
            </DialogClose>

            <Button
              color="red"
              size="2"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* WordPress-style Action Buttons CSS */}
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
