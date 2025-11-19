'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TeacherSelfAppraisalForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

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
    "Review"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <header className="bg-neutral text-neutral-content shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="navbar">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-lg sm:text-xl">Teacher Portal</a>
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
            <h1 className="text-xl sm:text-3xl font-bold text-center">TEACHER SELF-APPRAISAL FORM</h1>
            <p className="text-center mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-content/80">Complete all sections honestly and accurately</p>
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
              {/* Personal Information */}
              {activeTab === 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">1. Personal Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Full Name</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("fullName", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Employee Code</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("employeeCode", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Designation</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("designation", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Department / Subject</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("department", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Date of Birth</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register("dateOfBirth", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Gender</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("gender", { required: true })}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Contact Number</span>
                      </label>
                      <input type="tel" className="input input-bordered w-full focus:border-error" {...register("contactNumber", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Email ID</span>
                      </label>
                      <input type="email" className="input input-bordered w-full focus:border-error" {...register("email", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Date of Joining</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register("dateOfJoining", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Total Experience (years)</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("totalExperience", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Highest Qualification</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("highestQualification", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Professional Qualification</span>
                      </label>
                      <input type="text" className="input input-bordered w-full focus:border-error" {...register("professionalQualification")} />
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Additional Certifications</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("additionalCertifications")}></textarea>
                  </div>
                </div>
              )}

              {/* Academic Responsibilities */}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">2. Academic Responsibilities</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Classes & Subjects Taught</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("classesSubjectsTaught", { required: true })}></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Teaching Hours per Week</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("teachingHours", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Syllabus Completion (%)</span>
                      </label>
                      <input type="number" className="input input-bordered w-full focus:border-error" {...register("syllabusCompletion", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Lesson Planning</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("lessonPlanning", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly">Regularly</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="rarely">Rarely</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Use of Teaching Aids</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("teachingAids", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly">Regularly</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="rarely">Rarely</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Teaching Methods Adopted</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("teachingMethods", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Student Engagement Techniques</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("studentEngagement", { required: true })}></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Homework Management</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("homeworkManagement", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Remedial Classes</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("remedialClasses", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly">Regularly</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="rarely">Rarely</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Slow Learner Support Plan</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("slowLearnerSupport", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Classroom Management */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">3. Classroom Management</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Classroom Discipline</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("classroomDiscipline", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Seating Plan</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("seatingPlan", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly-updated">Regularly Updated</option>
                        <option value="sometimes-updated">Sometimes Updated</option>
                        <option value="rarely-updated">Rarely Updated</option>
                        <option value="not-updated">Not Updated</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Classroom Cleanliness</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("classroomCleanliness", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Notice Board</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("noticeBoardMaintenance", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly-maintained">Regularly Maintained</option>
                        <option value="sometimes-maintained">Sometimes Maintained</option>
                        <option value="rarely-maintained">Rarely Maintained</option>
                        <option value="not-maintained">Not Maintained</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Behaviour Handling</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("behaviourHandling", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Inclusiveness for Special Needs</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("inclusivenessSpecialNeeds", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">PTM Interactions</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("ptmInteractions", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Student Performance & Outcomes */}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">4. Student Performance & Outcomes</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-xs sm:text-sm">Class Result (%)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full focus:border-error" {...register("classResult", { required: true })} />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Board Exam Performance</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("boardExamPerformance", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Olympiad Participation</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("olympiadParticipation", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Outstanding Students</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("outstandingStudents", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Remedial & Enrichment Results</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("remedialEnrichmentResults", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Co-curricular / Extra Responsibilities */}
              {activeTab === 4 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">5. Co-curricular Activities</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Exam Duties</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("examDuties", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly-performed">Regularly Performed</option>
                        <option value="sometimes-performed">Sometimes Performed</option>
                        <option value="rarely-performed">Rarely Performed</option>
                        <option value="never-performed">Never Performed</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Discipline Duties</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("disciplineDuties", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="regularly-performed">Regularly Performed</option>
                        <option value="sometimes-performed">Sometimes Performed</option>
                        <option value="rarely-performed">Rarely Performed</option>
                        <option value="never-performed">Never Performed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Event Management</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("eventManagement", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">House/Club Activities</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("houseClubActivities", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Assembly Duties</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("assemblyDuties", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="regularly-performed">Regularly Performed</option>
                      <option value="sometimes-performed">Sometimes Performed</option>
                      <option value="rarely-performed">Rarely Performed</option>
                      <option value="never-performed">Never Performed</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Competition Training</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("competitionTraining", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Committee Participation</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("committeeParticipation", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Professional Development */}
              {activeTab === 5 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">6. Professional Development</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Trainings Attended</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("trainingsAttended", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Workshops Conducted</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("workshopsConducted", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Courses Completed</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("coursesCompleted", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Academic Innovation</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("academicInnovation", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Research/Publications</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("researchPublications", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Personal Strengths & Skills */}
              {activeTab === 6 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">7. Personal Strengths & Skills</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Areas of Expertise</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("areasOfExpertise", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Leadership Qualities</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("leadershipQualities", { required: true })}></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Communication</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("communicationSkills", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Time Management</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("timeManagement", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Team Collaboration</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("teamCollaboration", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Creativity</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("creativity", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Technology Usage</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("technologyUsage", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="needs-improvement">Needs Improvement</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Areas of Improvement */}
              {activeTab === 7 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">8. Areas of Improvement</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Skills to Improve</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("skillsToImprove", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Training Required</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("trainingRequired", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Weaknesses Identified</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("weaknessesIdentified", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Support Expected from School</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("supportExpected", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Contribution to School */}
              {activeTab === 8 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">9. Contribution to School</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-xs sm:text-sm">Discipline Support</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("disciplineSupport", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">School Growth Contribution</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("schoolGrowthContribution", { required: true })}></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Student Relationship</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("studentRelationship", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Colleague Relationship</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("colleagueRelationship", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Teaching Innovations</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("teachingInnovations", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Extra Initiatives</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("extraInitiatives", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Goals for Next Year */}
              {activeTab === 9 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">10. Goals for Next Year</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-xs sm:text-sm">Academic Goals</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("academicGoals", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Professional Development Goals</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("professionalDevelopmentGoals", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Student Learning Goals</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("studentLearningGoals", { required: true })}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Personal Goals</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("personalGoals", { required: true })}></textarea>
                  </div>
                </div>
              )}

              {/* Code of Conduct Compliance */}
              {activeTab === 10 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">11. Code of Conduct Compliance</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Punctuality</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("punctuality", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Dress Code</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("dressCode", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="always-followed">Always Followed</option>
                        <option value="mostly-followed">Mostly Followed</option>
                        <option value="sometimes-followed">Sometimes Followed</option>
                        <option value="rarely-followed">Rarely Followed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Ethical Behaviour</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("ethicalBehaviour", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-improvement">Needs Improvement</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Confidentiality</span>
                      </label>
                      <select className="select select-bordered w-full focus:border-error" {...register("confidentiality", { required: true })}>
                        <option value="">Select Option</option>
                        <option value="always-maintained">Always Maintained</option>
                        <option value="mostly-maintained">Mostly Maintained</option>
                        <option value="sometimes-maintained">Sometimes Maintained</option>
                        <option value="rarely-maintained">Rarely Maintained</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">School Policies Adherence</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("schoolPoliciesAdherence", { required: true })}>
                      <option value="">Select Option</option>
                      <option value="always-followed">Always Followed</option>
                      <option value="mostly-followed">Mostly Followed</option>
                      <option value="sometimes-followed">Sometimes Followed</option>
                      <option value="rarely-followed">Rarely Followed</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Overall Self-Rating */}
              {activeTab === 11 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">12. Overall Self-Rating (1-10)</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Teaching Quality</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("teachingQualityRating", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Classroom Management</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("classroomManagementRating", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Communication</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("communicationRating", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Co-curricular Involvement</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("coCurricularRating", { required: true })} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Professional Development</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("professionalDevelopmentRating", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Student Relationship</span>
                      </label>
                      <input type="number" min="1" max="10" className="input input-bordered w-full focus:border-error" {...register("studentRelationshipRating", { required: true })} />
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher Declaration */}
              {activeTab === 12 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">13. Teacher Declaration</h2>
                  
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-error checkbox-sm" {...register("declaration", { required: true })} />
                      <span className="label-text ml-2 text-xs sm:text-sm">I declare that all information provided is true to the best of my knowledge.</span>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Teacher Signature</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("teacherSignature", { required: true })} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Date</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register("declarationDate", { required: true })} />
                    </div>
                  </div>
                </div>
              )}

              {/* Reporting Officer / Principal Review */}
              {activeTab === 13 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-error">14. Review Section</h2>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Comments by HOD</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("hodComments")}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Comments by Vice Principal</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("vicePrincipalComments")}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Comments by Principal</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("principalComments")}></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Final Rating</span>
                    </label>
                    <select className="select select-bordered w-full focus:border-error" {...register("finalRating")}>
                      <option value="">Select Rating</option>
                      <option value="outstanding">Outstanding</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="satisfactory">Satisfactory</option>
                      <option value="needs-improvement">Needs Improvement</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-sm">Recommendations</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 focus:border-error" {...register("recommendations")}></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Principal Signature</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered w-full focus:border-error" {...register("principalSignature")} />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-sm">Date</span>
                      </label>
                      <input type="date" className="input input-bordered w-full focus:border-error" {...register("reviewDate")} />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
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
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Teacher Portal</h3>
              <p className="text-xs sm:text-sm">Comprehensive teacher evaluation and professional development system.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><a href="/" className="hover:text-error">Home</a></li>
                <li><a href="#" className="hover:text-error">Dashboard</a></li>
                <li><a href="#" className="hover:text-error">Reports</a></li>
                <li><a href="#" className="hover:text-error">Help</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><a href="#" className="hover:text-error">User Guide</a></li>
                <li><a href="#" className="hover:text-error">Evaluation Criteria</a></li>
                <li><a href="#" className="hover:text-error">FAQs</a></li>
                <li><a href="#" className="hover:text-error">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li>Teacher Evaluation Department</li>
                <li>Education Department</li>
                <li>Email: appraisal@school.edu</li>
                <li>Phone: +91-11-22509256</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-neutral-focus text-center text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} Teacher Self-Appraisal Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeacherSelfAppraisalForm;