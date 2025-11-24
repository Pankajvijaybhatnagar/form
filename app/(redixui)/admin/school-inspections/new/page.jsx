"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import schoolServices from "@/lib/services/schoolServices";
import inspectionServices from "@/lib/services/inspectionServices";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function NewSchoolInspection() {
  const { access_token } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchoolCode, setSelectedSchoolCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  const tabs = [
    "School Details",
    "Affiliation Details",
    "Management Details",
    "Land & Building",
    "Infrastructure",
    "Staff Details",
    "Student Details",
    "Academic Details",
    "Laboratory School inspection",
    "Library School inspection",
    "Safety & Security",
    "Transport Details",
    "Mandatory Certificates",
    "Financial Information",
    "Inspector Observations",
    "Final Recommendation"
  ];

  // Fetch schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await schoolServices.getPublicSchools();
        if (response.success && response.data && response.data.data) {
          setSchools(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  // Watch for school name changes and auto-fill school code
  const selectedSchool = watch("schoolName");
  useEffect(() => {
    if (selectedSchool) {
      const school = schools.find(s => s.school_name === selectedSchool);
      if (school) {
        setSelectedSchoolCode(school.school_code);
      }
    } else {
      setSelectedSchoolCode("");
    }
  }, [selectedSchool, schools]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        ...data,
        school_code: selectedSchoolCode,
      };
      
      const response = await inspectionServices.createInspection(payload, access_token);
      
      if (response.success) {
        alert("School inspection created successfully!");
        reset();
        setActiveTab(0);
        setSelectedSchoolCode("");
      } else {
        alert(response.error || "Failed to create inspection");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral mb-2">New School Inspection</h1>
          <Link href="/admin/school-inspections" className="btn btn-sm btn-outline">
            ← Back to List
          </Link>
        </div>

        <div className="bg-base-100 rounded-lg shadow-xl p-6">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Select Section</span>
              </label>
              <select 
                className="select select-bordered w-full focus:border-error" 
                value={activeTab} 
                onChange={(e) => setActiveTab(Number(e.target.value))}
              >
                {tabs.map((tab, index) => (
                  <option key={index} value={index}>{index + 1}. {tab}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <div className="tabs tabs-boxed mb-6 overflow-x-auto bg-base-200 p-1 rounded-lg">
              {tabs.map((tab, index) => (
                <a 
                  key={index}
                  className={`tab text-xs px-2 py-1 ${activeTab === index ? 'tab-active bg-error text-white' : ''} hover:bg-error hover:text-white cursor-pointer`}
                  onClick={() => setActiveTab(index)}
                >
                  {index + 1}. {tab}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* School Details */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">1. School Details</h2>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">School Name</span>
                  </label>
                  {loading ? (
                    <div className="input input-bordered w-full flex items-center justify-center">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    <select className="select select-bordered w-full focus:border-error" {...register("schoolName", { required: true })}>
                      <option value="">Select School</option>
                      {schools.map((school) => (
                        <option key={school.id} value={school.school_name}>
                          {school.school_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">School Code</span>
                  </label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full focus:border-error" 
                    value={selectedSchoolCode}
                    disabled
                    placeholder="Auto-filled from selected school"
                  />
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Complete Postal Address</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("address", { required: true })}></textarea>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">City / District</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("city", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">State</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("state", { required: true })} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Pincode</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("pincode", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">School Email ID</span>
                    </label>
                    <input type="email" className="input input-bordered w-full focus:border-error" {...register("email", { required: true })} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">School Phone Number</span>
                    </label>
                    <input type="tel" className="input input-bordered w-full focus:border-error" {...register("phone", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">School Website</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("website")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Year of Establishment</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("yearEstablished", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">School Type</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("schoolType", { required: true })}>
                      <option value="">Select Type</option>
                      <option value="residential">Residential</option>
                      <option value="non-residential">Non-Residential</option>
                      <option value="day-boarding">Day Boarding</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Medium of Instruction</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("medium", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Type of School</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("schoolCategory", { required: true })}>
                      <option value="">Select Category</option>
                      <option value="co-ed">Co-Ed</option>
                      <option value="boys">Boys</option>
                      <option value="girls">Girls</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Affiliation Details */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">2. Affiliation Details</h2>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Application Type</span>
                  </label>
                  <select className="select select-bordered w-full focus:border-error" {...register("applicationType", { required: true })}>
                    <option value="">Select Type</option>
                    <option value="fresh">Fresh</option>
                    <option value="extension">Extension</option>
                    <option value="upgradation">Upgradation</option>
                    <option value="switch-over">Switch-over</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Current Affiliation Number</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("affiliationNumber")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Affiliation Status</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("affiliationStatus", { required: true })}>
                      <option value="">Select Status</option>
                      <option value="provisional">Provisional</option>
                      <option value="regular">Regular</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Last Affiliation Validity</span>
                    </label>
                    <input type="date" className="input input-bordered w-full focus:border-error" {...register("affiliationValidity")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Proposed Classes for Affiliation</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("proposedClasses")} />
                  </div>
                </div>
              </div>
            )}

            {/* Management Details */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">3. Management Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Name of Trust / Society / Company</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("trustName", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Registration Number</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("registrationNumber", { required: true })} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Registration Validity</span>
                    </label>
                    <input type="date" className="input input-bordered w-full focus:border-error" {...register("registrationValidity")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">PAN Number of Trust</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("panNumber")} />
                  </div>
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Registered Address</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("registeredAddress", { required: true })}></textarea>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Chairman Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("chairmanName", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Manager / Secretary Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("managerName", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Principal Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("principalName", { required: true })} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Principal Qualification</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("principalQualification", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Principal Experience (in years)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("principalExperience", { required: true })} />
                  </div>
                </div>
              </div>
            )}

            {/* Land & Building Details */}
            {activeTab === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">4. Land & Building Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Land Area (in sq. meters)</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("landArea", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Ownership Type</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("ownershipType", { required: true })}>
                      <option value="">Select Type</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Built-up Area (in sq. meters)</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("builtUpArea", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Playground Area (in sq. meters)</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("playgroundArea", { required: true })} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Number of Floors</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("numFloors", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Boundary Wall</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("boundaryWall", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Infrastructure & Facilities */}
            {activeTab === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">5. Infrastructure & Facilities</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Classrooms</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("totalClassrooms", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Smart Classrooms</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("smartClassrooms")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Computer Lab</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("computerLab", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Science Labs</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("scienceLabs", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Medical Room</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("medicalRoom", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Library Area (in sq. meters)</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("libraryArea")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">CCTV Cameras</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("cctvCameras", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">RO Drinking Water</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("roWater", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Washrooms</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("washrooms", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Ramps for Divyang</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("ramps", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Staff Details */}
            {activeTab === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">6. Staff Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Teachers</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("totalTeachers", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">PGT Count</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("pgtCount")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">TGT Count</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("tgtCount")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">PRT Count</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("prtCount")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Special Educator</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("specialEducator")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Counsellor</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("counsellor")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Admin Staff</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("adminStaff")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Support Staff</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("supportStaff")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Salary Through Bank</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("salaryThroughBank", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Police Verification</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("policeVerification", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Student Details */}
            {activeTab === 6 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">7. Student Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Students</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("totalStudents", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Boys Count</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("boysCount")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Girls Count</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("girlsCount")} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Section per Class</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("sectionPerClass")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Special Needs Students</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("specialNeedsStudents")} />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Details */}
            {activeTab === 7 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">8. Academic Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">House System</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("houseSystem")}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Laboratory School inspection */}
            {activeTab === 8 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">9. Laboratory School inspection</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Physics Lab Equipment</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("physicsLabEquipment", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Chemistry Lab Equipment</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("chemistryLabEquipment", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Biology Lab Equipment</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("biologyLabEquipment", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Library School inspection */}
            {activeTab === 9 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">10. Library School inspection</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Total Books</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("totalBooks", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Reference Books</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("referenceBooks")} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">E-Library</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("eLibrary", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Safety & Security */}
            {activeTab === 10 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">11. Safety & Security</h2>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">CCTV Details</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("cctvDetails", { required: true })}></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Fire Extinguishers</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("fireExtinguishers", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">First Aid Kits</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("firstAidKits", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Transport Details */}
            {activeTab === 11 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">12. Transport Details</h2>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Number of Buses</span>
                  </label>
                  <input type="number" className="input input-bordered w-full focus:border-error" {...register("numBuses")} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">GPS Installed</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("gpsInstalled")}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">CCTV in Bus</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("cctvInBus")}>
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Mandatory Certificates */}
            {activeTab === 12 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">13. Mandatory Certificates</h2>
                <p className="text-sm text-gray-600 mb-4">File uploads would be handled here in a real implementation</p>
              </div>
            )}

            {/* Financial Information */}
            {activeTab === 13 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">14. Financial Information</h2>
                <p className="text-sm text-gray-600 mb-4">Financial details would be recorded here</p>
              </div>
            )}

            {/* Inspector Observations */}
            {activeTab === 14 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">15. Inspector Observations</h2>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Overall Observations</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("observations")}></textarea>
                </div>
              </div>
            )}

            {/* Final Recommendation */}
            {activeTab === 15 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-error">16. Final Recommendation</h2>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Recommendation</span>
                  </label>
                  <select className="select select-bordered w-full focus:border-error" {...register("recommendation", { required: true })}>
                    <option value="">Select Recommendation</option>
                    <option value="recommended">Recommended</option>
                    <option value="conditional">Conditional</option>
                    <option value="not-recommended">Not Recommended</option>
                  </select>
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Reasons</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("reasons", { required: true })}></textarea>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Inspector Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("inspectorName", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Inspection Date</span>
                    </label>
                    <input type="date" className="input input-bordered w-full focus:border-error" {...register("inspectionDate", { required: true })} />
                  </div>
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <button 
                type="button" 
                className="btn btn-outline hover:bg-error hover:text-white hover:border-error w-full sm:w-auto"
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
              >
                Previous
              </button>
              
              <button 
                type="button" 
                className="btn btn-outline hover:bg-error hover:text-white hover:border-error w-full sm:w-auto"
                onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
                disabled={activeTab === tabs.length - 1}
              >
                Next
              </button>

              {activeTab === tabs.length - 1 && (
                <button 
                  type="submit" 
                  className="btn btn-error text-white w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Submit Inspection"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
