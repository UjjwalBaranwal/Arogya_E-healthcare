import React from 'react';

const InsuranceHome = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/health-still-life-with-copy-space_23-2148854034.jpg?ga=GA1.1.548073198.1729585099&semt=ais_hybrid')" }}>
      <div className="absolute inset-0 bg-black opacity-60 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-4">Welcome to Our Insurance Services</h1>
        <p className="text-white text-lg md:text-xl text-center px-4 mb-2">
          "Your safety is our priority."
        </p>
        <p className="text-white text-lg md:text-xl text-center px-4 mb-2">
          "Protecting what matters most."
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default InsuranceHome;
