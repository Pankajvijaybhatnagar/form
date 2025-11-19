'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const    inspectionForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const tabs = [
    "School Details",
    "Affiliation Details",
    "Management Details",
    "Land & Building",
    "Infrastructure",
    "Staff Details",
    "Student Details",
    "Academic Details",
    "Laboratory  School inspection",
    "Library  School inspection",
    "Safety & Security",
    "Transport Details",
    "Mandatory Certificates",
    "Financial Information",
    "Inspector Observations",
    "Final Recommendation"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <header className="bg-neutral text-neutral-content shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="navbar">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-lg sm:text-xl">   School inspection Portal</a>
            </div>
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral text-neutral-content rounded-box w-52">
                  <li><a className="hover:bg-error hover:text-white">Home</a></li>
                  <li><a className="hover:bg-error hover:text-white">Dashboard</a></li>
                  <li><a className="hover:bg-error hover:text-white">Reports</a></li>
                  <li><a className="hover:bg-error hover:text-white">Help</a></li>
                </ul>
              </div>
              <ul className="menu menu-horizontal px-1 hidden lg:flex">
                <li><a className="hover:bg-error hover:text-white">Home</a></li>
                <li><a className="hover:bg-error hover:text-white">Dashboard</a></li>
                <li><a className="hover:bg-error hover:text-white">Reports</a></li>
                <li><a className="hover:bg-error hover:text-white">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto bg-base-100 rounded-lg shadow-xl">
          <div className="p-3 sm:p-6 border-b border-base-300 bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content rounded-t-lg">
            <h1 className="text-xl sm:text-3xl font-bold text-center">   School Inspection FORM</h1>
            <p className="text-center mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-content/80">Complete all fields as required</p>
          </div>
          
          <div className="p-3 sm:p-6">
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
                  className={`tab text-xs px-2 py-1 ${activeTab === index ? 'tab-active bg-error text-white' : ''} hover:bg-error hover:text-white`}
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">1. School Details</h2>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">School Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full focus:border-error" {...register("schoolName", { required: true })} />
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">2. Affiliation Details</h2>
                  
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
                        <span className="label-text font-semibold">School Code</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("schoolCode")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Last Affiliation Validity</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register("affiliationValidity")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Classes Running (From - To)</span>
                      </label>
                      <div className="flex gap-2">
                        <input type="text" placeholder="From" className="input input-bordered w-full focus:border-error" {...register("classesFrom")} />
                        <input type="text" placeholder="To" className="input input-bordered w-full focus:border-error" {...register("classesTo")} />
                      </div>
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">3. Management Details</h2>
                  
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Audit Reports</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("auditReports")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">MOA / AOA / By-laws</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("moaDocs")} />
                    </div>
                  </div>
                </div>
              )}

              {/* Land & Building Details */}
              {activeTab === 3 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">4. Land & Building Details</h2>
                  
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
                        <span className="label-text font-semibold">Land Document Type</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("landDocType", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Land Title in Name of Trust?</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("landTitle", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Land Contiguous</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("landContiguous", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Total Built-up Area (in sq. meters)</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("builtUpArea", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Playground Area (in sq. meters)</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("playgroundArea", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Number of Floors</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("numFloors", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Building Safety Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("buildingSafetyCert")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Fire Safety Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("fireSafetyCert")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Sanitation Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("sanitationCert")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Water Testing Report</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("waterTestingReport")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Nearby Hazardous Areas</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("hazardousAreas", { required: true })}>
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">5. Infrastructure & Facilities</h2>
                  
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
                        <span className="label-text font-semibold">Composite Lab</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("compositeLab", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Mathematics Lab</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("mathLab", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Library Area (in sq. meters)</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("libraryArea")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Number of Books</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("numBooks")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Digital Library</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("digitalLibrary")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Art Room</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("artRoom")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Music Room</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("musicRoom")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Dance Room</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("danceRoom")}>
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
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Counselling Room</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("counsellingRoom")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Staff Room</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("staffRoom", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
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
                        <span className="label-text font-semibold">Lift</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("lift")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">6. Staff Details</h2>
                  
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
                        <span className="label-text font-semibold">Accountant</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("accountant")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Lab Assistants</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("labAssistants")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Library Assistant</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("libraryAssistant")} />
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
                        <span className="label-text font-semibold">Teacher Qualification Records</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("teacherQualificationRecords")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Appointment Letters</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("appointmentLetters")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Salary Slip (3 months)</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("salarySlips")} />
                    </div>
                    
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
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Driver Verification</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("driverVerification", { required: true })}>
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">7. Student Details</h2>
                  
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
                        <span className="label-text font-semibold">Class-wise Enrollment</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("classWiseEnrollment")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Section per Class</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("sectionPerClass")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Student-Teacher Ratio</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("studentTeacherRatio")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Special Needs Students</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("specialNeedsStudents")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Attendance Records</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("attendanceRecords")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Discipline Records</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("disciplineRecords")} />
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Details */}
              {activeTab === 7 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">8. Academic Details</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">School Timetable</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("schoolTimetable", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Lesson Plans</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("lessonPlans", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Teaching Aids</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("teachingAids")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Classroom Observation</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("classroomObservation")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Homework Policy</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("homeworkPolicy")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Internal Assessment</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("internalAssessment")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Result Analysis</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("resultAnalysis")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Olympiads Participation</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("olympiadsParticipation")} />
                    </div>
                  </div>
                  
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
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Co-curricular Activities</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("coCurricularActivities")} />
                    </div>
                  </div>
                </div>
              )}

              {/* Laboratory  School inspection */}
              {activeTab === 8 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">9. Laboratory  School inspection</h2>
                  
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Safety Equipment</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("safetyEquipment", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="adequate">Adequate</option>
                        <option value="inadequate">Inadequate</option>
                        <option value="not-available">Not Available</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Chemical Storage Safety</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("chemicalStorageSafety", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="adequate">Adequate</option>
                        <option value="inadequate">Inadequate</option>
                        <option value="not-available">Not Available</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Lab Assistant Qualification</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("labAssistantQualification")} />
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Composite Lab</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("compositeLabStatus", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="adequate">Adequate</option>
                      <option value="inadequate">Inadequate</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Library  School inspection */}
              {activeTab === 9 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">10. Library  School inspection</h2>
                  
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
                        <span className="label-text font-semibold">Magazines</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("magazines")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Library Management System</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("libraryManagementSystem", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Issue/Return Register</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("issueReturnRegister", { required: true })}>
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
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">11. Safety & Security</h2>
                  
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
                        <span className="label-text font-semibold">Fire Drill Records</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("fireDrillRecords")} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Disaster Management Plan</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("disasterManagementPlan", { required: true })} />
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Visitor Register</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("visitorRegister", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Police Verification</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("policeVerificationStatus", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Child Protection Policy</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("childProtectionPolicy", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Complaint/Suggestion Box</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("complaintBox", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Transport Details */}
              {activeTab === 11 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">12. Transport Details</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Number of Buses</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("numBuses")} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Driver License Verification</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("driverLicenseVerification")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Driver Police Verification</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("driverPoliceVerification")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">First Aid Box in Bus</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("firstAidBoxInBus")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Fire Extinguisher in Bus</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("fireExtinguisherInBus")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Speed Governor</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("speedGovernor")}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">RTO Documents</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("rtoDocuments")} />
                    </div>
                  </div>
                </div>
              )}

              {/* Mandatory Certificates */}
              {activeTab === 12 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">13. Mandatory Certificates</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Building Safety Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("buildingSafetyCertificate", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Fire Safety Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("fireSafetyCertificate", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Sanitation Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("sanitationCertificate", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Water Testing Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("waterTestingCertificate", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">DEO Certificate</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("deoCertificate", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Land Documents</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("landDocuments", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Affidavit of Trust</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("affidavitOfTrust", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Health & Safety Audit Report</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("healthSafetyAuditReport", { required: true })} />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Information */}
              {activeTab === 13 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">14. Financial Information</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Fee Structure</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("feeStructure", { required: true })} />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Staff Salary Statement</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("staffSalaryStatement", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">EPF/ESI Details</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("epfEsiDetails", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Audited Report</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("auditedReport", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Bank Statements (Last 3 Months)</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("bankStatements", { required: true })} />
                    </div>
                  </div>
                </div>
              )}

              {/* Inspector Observations */}
              {activeTab === 14 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">15. Inspector Observations</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Classroom Observation</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("classroomObservationNotes", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Teacher Interaction</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("teacherInteractionNotes", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Student Interaction</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("studentInteractionNotes", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Infrastructure Condition</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("infrastructureCondition", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Discipline</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("disciplineNotes", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Strengths</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("strengths", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Weaknesses</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("weaknesses", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Final Recommendation */}
              {activeTab === 15 && (
                <div className="space-y-4 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">16. Final Recommendation</h2>
                  
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
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">Compliance Required</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("complianceRequired", { required: true })}></textarea>
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
                        <span className="label-text font-semibold">Designation</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("inspectorDesignation", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Signature</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("inspectorSignature", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">Date</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register(" School inspectionDate", { required: true })} />
                    </div>
                  </div>
                </div>
              )}

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
              </div>
              
              {activeTab === tabs.length - 1 && (
                <div className="flex justify-center mt-8">
                  <button type="submit" className="btn bg-error hover:bg-red-600 text-white border-none w-full sm:w-auto">Submit Form</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content mt-8">
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">   School inspection Portal</h3>
              <p className="text-xs sm:text-sm">Comprehensive  School inspection management system for   affiliated schools.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><a href="#" className="hover:text-error">Home</a></li>
                <li><a href="#" className="hover:text-error">Dashboard</a></li>
                <li><a href="#" className="hover:text-error">Reports</a></li>
                <li><a href="#" className="hover:text-error">Help</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><a href="#" className="hover:text-error">User Guide</a></li>
                <li><a href="#" className="hover:text-error">  Guidelines</a></li>
                <li><a href="#" className="hover:text-error">FAQs</a></li>
                <li><a href="#" className="hover:text-error">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li>   School inspection Department</li>
                <li>Shiksha Kendra, 2, Community Centre</li>
                <li>Preet Vihar, Delhi - 110092</li>
                <li>Email:  School inspection@ .gov.in</li>
                <li>Phone: +91-11-22509256</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-neutral-focus text-center text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()}    School inspection Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default    inspectionForm;