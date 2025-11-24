"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userServices from "@/lib/services/userServices";
import { useAuth } from "@/context/AuthContext";

const NewUserPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const { access_token } = useAuth();

  // input handler
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const createUser = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!form.name || !form.email || !form.password) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);

    const response = await userServices.createUser(form, access_token);

    setLoading(false);

    if (response.success) {
      const newUserId = response.data?.data?.id;

      if (!newUserId) {
        setErrorMsg("User created, but ID missing in API response.");
        return;
      }

      setSuccessMsg("User created successfully! Redirecting...");

      // redirect after short delay
      setTimeout(() => {
        router.push(`/users/${newUserId}`);
      }, 1000);
    } else {
      setErrorMsg(response.error || "Failed to create user.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "14px",
        }}
      >
        <h4 className="text-center mb-3 fw-semibold">Create New User</h4>
        <p className="text-center text-muted small mb-4">
          Enter basic details to create the user.
        </p>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div className="alert alert-danger py-2 small">{errorMsg}</div>
        )}

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div className="alert alert-success py-2 small">{successMsg}</div>
        )}

        {/* Name */}
        <div className="mb-3">
          <label className="form-label small fw-semibold">Name</label>
          <input
            type="text"
            className="form-control form-control-sm rounded-2"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label small fw-semibold">Email</label>
          <input
            type="email"
            className="form-control form-control-sm rounded-2"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label small fw-semibold">Password</label>
          <input
            type="password"
            className="form-control form-control-sm rounded-2"
            placeholder="Choose password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        {/* Create Button */}
        <button
          className="btn btn-primary w-100 py-2 fw-semibold"
          style={{ borderRadius: "8px" }}
          disabled={loading}
          onClick={createUser}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
};

export default NewUserPage;
