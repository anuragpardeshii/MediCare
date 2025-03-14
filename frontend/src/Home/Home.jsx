import React from "react";
// import Navbar from './Navbar'

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="text-black pt-28 pb-16 md:pt-32 md:pb-24 min-h-[70vh] flex items-center"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate__animated animate__fadeInLeft">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                 <span className="text-emerald-400">Healthcare</span> at Your Fingertips
              </h1>
              <p className="text-lg md:text-xl mb-8 text-black">
              Connect with expert doctors, manage appointments effortlessly, and receive timely healthcare support
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/dashboard"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-center"
                >
                  Book Appointment
                </a>
                <a
                  href="/doctor"
                  className="bg-transparent hover:bg-gray-100 border border-emerald-500 text-emerald-400 font-medium py-3 px-6 rounded-lg transition duration-300 text-center"
                >
                  Doctor's Dashboard
                </a>
              </div>
              {/* <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-600 flex items-center justify-center text-sm border-2 border-neutral-800">
                    DR
                  </div>
                </div>
              </div> */}
            </div>
            <div className="animate__animated animate__fadeInRight">
            <div className="relative">
              <div className="bg-gray-100 bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-xl relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Appointment Management System</h3>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm mb-2 text-black">
                    Describe your symptoms:
                  </p>
                  <div className="flex items-center bg-gray-50 rounded-lg p-3">
                    <p className="text-black">
                      I've been having headaches and...
                    </p>
                    <button className="ml-auto bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm">Choose from expert doctors.</span>
                  </div>
                  <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm">Select your preferred date and time.</span>
                  </div>
                  <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm">Select Consultation Type.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
