import React from 'react';

const DoctorDashboard = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/health-still-life-with-copy-space_23-2148854034.jpg?ga=GA1.1.548073198.1729585099&semt=ais_hybrid')" }}>
      <div className="absolute inset-0 bg-black opacity-60 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold text-center mb-2">Welcome to Your Dashboard</h1>
        <p className="text-white text-md md:text-lg text-center px-4 mb-1">
          "The best way to find yourself is to lose yourself in the service of others."
        </p>
        <p className="text-white text-md md:text-lg text-center px-4">
          "- Mahatma Gandhi"
        </p>
        <p className="text-white text-md md:text-lg text-center px-4 mb-1 mt-3">
          "Wherever the art of medicine is loved, there is also a love of humanity."
        </p>
        <p className="text-white text-md md:text-lg text-center px-4">
          "- Hippocrates"
        </p>
      </div>
    </div>
  );
}

export default DoctorDashboard;
