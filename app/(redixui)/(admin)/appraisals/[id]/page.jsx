"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import appraisalServices from "@/lib/services/appraisalServices";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";

export default function AdminEditAppraisal() {
  const { id } = useParams();
  const { access_token } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const tabs = [
    "Personal Info",
    "Academic",
    "Classroom",
    "Performance",
    "Co-curricular",
    "Professional",
    "Strengths",
    "Improvement",
    "Contribution",
    "Goals",
    "Conduct",
    "Self-Rating",
    "Declaration",
    "Review",
  ];

  // Fetch appraisal
  const loadData = async () => {
    const res = await appraisalServices.getAppraisal(id, access_token);
    if (res.success && res.data?.data?.length > 0) {
      reset(res.data.data[0]); // Pre-fill form
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && access_token) loadData();
  }, [id, access_token]);

  // Submit update
  const onSubmit = async (data) => {
    const res = await appraisalServices.updateAppraisal(id, data, access_token);
    if (res.success) {
      alert("Appraisal updated successfully!");
    } else {
      alert("Update failed!");
    }
  };

  if (loading)
    return <div className="p-6 text-center text-lg">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Teacher Appraisal #{id}</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded text-sm ${
              activeTab === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-300"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {index + 1}. {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* -------------------------------------- */}
        {/* TAB 1 — PERSONAL INFO */}
        {/* -------------------------------------- */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div>
              <label>Full Name</label>
              <input className="input input-bordered w-full"
                {...register("full_name", { required: true })}
              />
            </div>

            <div>
              <label>Employee Code</label>
              <input className="input input-bordered w-full"
                {...register("employee_code", { required: true })}
              />
            </div>

            <div>
              <label>Designation</label>
              <input className="input input-bordered w-full"
                {...register("designation")}
              />
            </div>

            <div>
              <label>Department</label>
              <input className="input input-bordered w-full"
                {...register("department")}
              />
            </div>

            <div>
              <label>Date of Birth</label>
              <input type="date" className="input input-bordered w-full"
                {...register("date_of_birth")}
              />
            </div>

            <div>
              <label>Gender</label>
              <select className="select select-bordered w-full"
                {...register("gender")}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label>Contact Number</label>
              <input className="input input-bordered w-full"
                {...register("contact_number")}
              />
            </div>

            <div>
              <label>Email</label>
              <input className="input input-bordered w-full"
                {...register("email")}
              />
            </div>

            <div>
              <label>Date of Joining</label>
              <input type="date" className="input input-bordered w-full"
                {...register("date_of_joining")}
              />
            </div>

            <div>
              <label>Total Experience</label>
              <input className="input input-bordered w-full"
                {...register("total_experience")}
              />
            </div>

            <div>
              <label>Highest Qualification</label>
              <input className="input input-bordered w-full"
                {...register("highest_qualification")}
              />
            </div>

            <div>
              <label>Professional Qualification</label>
              <input className="input input-bordered w-full"
                {...register("professional_qualification")}
              />
            </div>

            <div>
              <label>Additional Certifications</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("additional_certifications")}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------- */}
        {/* TAB 2 — ACADEMIC */}
        {/* -------------------------------------- */}
        {activeTab === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Academic Responsibilities</h3>

            <div>
              <label>Classes & Subjects Taught</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("classes_subjects_taught")}
              />
            </div>

            <div>
              <label>Teaching Hours</label>
              <input className="input input-bordered w-full"
                {...register("teaching_hours")}
              />
            </div>

            <div>
              <label>Syllabus Completion (%)</label>
              <input className="input input-bordered w-full"
                {...register("syllabus_completion")}
              />
            </div>

            <div>
              <label>Lesson Planning</label>
              <input className="input input-bordered w-full"
                {...register("lesson_planning")}
              />
            </div>

            <div>
              <label>Teaching Methods</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("teaching_methods")}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------- */}
        {/* TAB 3 — CLASSROOM */}
        {/* -------------------------------------- */}
        {activeTab === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Classroom Management</h3>

            <div>
              <label>Classroom Discipline</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("classroom_discipline")}
              />
            </div>

            <div>
              <label>Seating Plan</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("seating_plan")}
              />
            </div>

            <div>
              <label>Cleanliness</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("classroom_cleanliness")}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------- */}
        {/* TAB 4 — PERFORMANCE */}
        {/* -------------------------------------- */}
        {activeTab === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Student Performance</h3>

            <div>
              <label>Class Result (%)</label>
              <input className="input input-bordered w-full"
                {...register("class_result")}
              />
            </div>

            <div>
              <label>Board Exam Performance</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("board_exam_performance")}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------- */}
        {/* TAB 5 TO TAB 13 FOLLOW SAME PATTERN */}
        {/* -------------------------------------- */}

        {/* navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setActiveTab(Math.max(activeTab - 1, 0))}
            className="btn"
          >
            Previous
          </button>

          {activeTab < tabs.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setActiveTab(Math.min(activeTab + 1, tabs.length - 1))
              }
              className="btn btn-primary"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Update Appraisal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
