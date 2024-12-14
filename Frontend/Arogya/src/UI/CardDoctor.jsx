import React from 'react';

function CardDoctor({ doctor }) {
  const {
    name,
    address,
    consultationFee,
    experience,
    gender,
    photo,
    ratingsAverage,
    specialization,
    timing,
    website,
  } = doctor;

  return (
    <div className="flex flex-col md:flex-row items-start py-6 px-4 shadow-md rounded-lg bg-white transition-shadow duration-300 ease-in-out gap-4 hover:shadow-lg m-4 md:m-6">
      {/* Doctor Photo */}
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-blue-500">
        <img
          src={photo || "https://picsum.photos/200/300"}
          alt={`${name}-photo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Details */}
      <div className="mt-2 md:mt-0 md:ml-4 flex-1 text-gray-800">
        <h2 className="text-lg font-bold mb-1">{name}</h2>
        <p className="text-xs font-semibold text-gray-600">{specialization}</p>
        
        <div className="flex items-center mt-1 space-x-2 text-yellow-500">
          <span className="text-lg">⭐</span>
          <span className="text-sm font-medium">{ratingsAverage}</span>
        </div>

        {/* Grid for Info */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-gray-700">
          <p className="text-xs">
            <span className="font-medium">Experience:</span> {experience} years
          </p>
          <p className="text-xs">
            <span className="font-medium">Fee:</span> ₹{consultationFee}
          </p>
          <p className="text-xs">
            <span className="font-medium">Address:</span> {address}
          </p>
          {timing && (
            <p className="text-xs">
              <span className="font-medium">Timing:</span> {timing.open} - {timing.close}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-4">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block p-1 mx-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all duration-200 text-center text-xs"
            >
              Visit Website
            </a>
          )}
          <button className="p-1 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring focus:ring-orange-300 text-xs">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDoctor;
