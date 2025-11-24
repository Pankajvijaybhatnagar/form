"use client";

import { useAuth } from "@/context/AuthContext";
import userServices from "@/lib/services/userServices";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const accessGroups = [
  { group: "Dashboard", keys: ["dashboard_view", "dashboard_stats"] },
  { group: "Users", keys: ["user_view", "user_edit", "user_delete"] },
  {
    group: "Content",
    keys: ["content_view", "content_create", "content_edit", "content_delete"],
  },
  { group: "Settings", keys: ["settings_view", "settings_update"] },
];

const Page = () => {
  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [canSave, setCanSave] = useState(false);

  const { id } = useParams();
  const { access_token } = useAuth();

  /** ------------ LOAD USER -------------- **/
  const loadUser = async () => {
    setLoading(true);
    const response = await userServices.getUsers({ id }, access_token);

    if (response.success) {
      const fetched = response.data.data[0];
      setUser(fetched);
      setOriginalUser(fetched);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  /** ------------ CHANGE DETECTOR -------------- **/
  const detectChanges = (updatedUser) => {
    setCanSave(JSON.stringify(updatedUser) !== JSON.stringify(originalUser));
  };

  const handleInput = (field, value) => {
    const updated = { ...user, [field]: value };

    // If role changes to non-admin → clear access
    if (field === "role") {
      if (value === "user" || value === "volunteer") {
        updated.access = {};
      }
    }

    setUser(updated);
    detectChanges(updated);
  };

  const toggleAccess = (key) => {
    const updatedAccess = {
      ...(user.access || {}),
      [key]: !user.access?.[key],
    };
    const updatedUser = { ...user, access: updatedAccess };
    setUser(updatedUser);
    detectChanges(updatedUser);
  };

  /** ------------ SAVE USER -------------- **/
  const saveUser = async () => {
    const payload = { id: user.id, ...user };
    const response = await userServices.updateUser(payload, access_token);

    if (response.success) {
      alert("User updated successfully!");
      setOriginalUser(payload);
      setCanSave(false);
    } else {
      alert("Failed to update.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  /** ------------ ROLE CHECK: SHOW ACCESS? -------------- **/
  const showAccess = user.role === "admin" || user.role === "superadmin";

  return (
    <div className="container py-3">

      {/* HEADER */}
      <div className="d-flex gap-3 align-items-center mb-3">
        <div style={{ width: 100, height: 100 }}>
          <img
            className="rounded-circle shadow-sm"
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src={
              user?.avatar ||
              "https://cdn-icons-png.flaticon.com/256/149/149071.png"
            }
            alt={user?.name}
          />
        </div>
        <div>
          <h4 className="mb-1 d-flex align-items-center gap-2">
            {user?.name}
            {user?.is_verified == 1 && (
              <RiVerifiedBadgeFill className="text-primary" size={20} />
            )}
          </h4>
          <p className="text-muted mb-0">{user.email}</p>
          <p className="text-muted mb-0">Role: {user.role}</p>
        </div>
      </div>

      <hr />

      {/* ACCOUNT INFORMATION */}
      <h6 className="fw-bold mb-2">Account Information</h6>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <label className="form-label mb-1">Username</label>
          <input
            className="form-control form-control-sm"
            value={user.username || ""}
            onChange={(e) => handleInput("username", e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label mb-1">Email</label>
          <input
            className="form-control form-control-sm"
            value={user.email || ""}
            onChange={(e) => handleInput("email", e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label mb-1">Phone</label>
          <input
            className="form-control form-control-sm"
            value={user.phone || ""}
            onChange={(e) => handleInput("phone", e.target.value)}
          />
        </div>
      </div>

      <hr />

      {/* PERSONAL DETAILS */}
      <h6 className="fw-bold mb-2">Personal Details</h6>
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <label className="form-label mb-1">DOB</label>
          <input
            className="form-control form-control-sm"
            value={user.dob || ""}
            onChange={(e) => handleInput("dob", e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label mb-1">Country</label>
          <input
            className="form-control form-control-sm"
            value={user.country || ""}
            onChange={(e) => handleInput("country", e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label mb-1">State</label>
          <input
            className="form-control form-control-sm"
            value={user.state || ""}
            onChange={(e) => handleInput("state", e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label mb-1">District</label>
          <input
            className="form-control form-control-sm"
            value={user.district || ""}
            onChange={(e) => handleInput("district", e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label mb-1">Address</label>
          <input
            className="form-control form-control-sm"
            value={user.address || ""}
            onChange={(e) => handleInput("address", e.target.value)}
          />
        </div>
      </div>

      <hr />

      {/* ROLE FIELD JUST BEFORE ACCESS */}
      <h6 className="fw-bold mb-2">User Role</h6>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <label className="form-label mb-1">Select Role</label>
          <select
            className="form-select form-select-sm"
            value={user.role || ""}
            onChange={(e) => handleInput("role", e.target.value)}
          >
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
      </div>

      <hr />

      {/* ACCESS PERMISSIONS (ONLY FOR ADMIN / SUPERADMIN) */}
      {showAccess && (
        <>
          <h6 className="fw-bold mb-2">Access Permissions</h6>

          <div className="row g-3 mb-5">
            {accessGroups.map((group, index) => (
              <div className="col-md-6" key={index}>
                <div className="border rounded p-3 small shadow-sm">
                  <h6 className="fw-bold mb-2">{group.group}</h6>

                  {group.keys.map((key) => (
                    <div className="form-check mb-1" key={key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={user?.access?.[key] || false}
                        onChange={() => toggleAccess(key)}
                      />
                      <label className="form-check-label text-capitalize">
                        {key.replace(/_/g, " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* FLOATING SAVE BUTTON */}
      <button
        className="btn btn-success px-4 py-2 shadow position-fixed"
        style={{
          bottom: "25px",
          right: "25px",
          zIndex: 999,
          borderRadius: "30px",
        }}
        disabled={!canSave}
        onClick={saveUser}
      >
        Save
      </button>
    </div>
  );
};

export default Page;
