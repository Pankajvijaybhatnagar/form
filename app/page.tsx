'use client';
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-100 to-base-200">
      {/* Header */}
      <header className="bg-neutral text-neutral-content shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="navbar">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">Education Portal</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal p-0">
                <li><a className="hover:bg-error hover:text-white">Home</a></li>
                <li><a className="hover:bg-error hover:text-white">About</a></li>
                <li><a className="hover:bg-error hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
              Welcome to <span className="text-error">Education Portal</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-neutral-content/70 max-w-2xl mx-auto">
              Choose your path to excellence with our comprehensive evaluation systems
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/*    School inspection Form Button */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full sm:w-96">
                <figure className="px-10 pt-10">
                  <div className="w-24 h-24 mx-auto bg-error/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl">   School inspection</h2>
                  <p className="content/70">Complete school  School inspection forms for   compliance</p>
                  <div className="card-actions mt-4">
                    <Link href="/school-inspection">
                      <button className="btn btn-error text-white">Open Form</button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Teacher Self-Appraisal Button */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full sm:w-96">
                <figure className="px-10 pt-10">
                  <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl">Teacher Appraisal</h2>
                  <p className="content/70">Submit your self-appraisal for professional development</p>
                  <div className="card-actions mt-4">
                    <Link href="/teacher-report">
                      <button className="btn btn-primary text-white">Open Form</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="stats shadow bg-base-100 w-full">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Help & Support</div>
                  <div className="stat-value text-primary">24/7</div>
                  <div className="stat-desc">Available assistance</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Forms Processed</div>
                  <div className="stat-value text-secondary">1,200+</div>
                  <div className="stat-desc">This month</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-error">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Institutions</div>
                  <div className="stat-value text-error">500+</div>
                  <div className="stat-desc">Registered with us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Education Portal</h3>
              <p className="text-sm">Comprehensive evaluation and professional development system for educational institutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/" className="hover:text-error">Home</a></li>
                <li><a href="#" className="hover:text-error">About Us</a></li>
                <li><a href="#" className="hover:text-error">Services</a></li>
                <li><a href="#" className="hover:text-error">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-error">User Guide</a></li>
                <li><a href="#" className="hover:text-error">FAQs</a></li>
                <li><a href="#" className="hover:text-error">Support</a></li>
                <li><a href="#" className="hover:text-error">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="text-sm space-y-2">
                <li>Email: info@educationportal.edu</li>
                <li>Phone: +91-11-22509256</li>
                <li>Address: Education Complex, Delhi</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-neutral-focus text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Education Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;