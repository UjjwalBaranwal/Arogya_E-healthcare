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
    <div className="flex flex-col md:flex-row items-center p-6 shadow-lg rounded-lg transition-shadow duration-300 ease-in-out gap-4">
      {/* Doctor Photo */}
      <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full border-4">
        <img
          src={"https://picsum.photos/200/300" || photo}
          alt={`${name}-photo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Details */}
      <div className="mt-4 md:mt-0 md:ml-6 flex-1 text-gray-700">
        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <div className="flex items-center mt-2 space-x-2 text-yellow-500 gap-10">
          <p className="text-md font-semibold text-gray-500">
            {specialization}
          </p>
          <div className="flex items-center">
            <span className="text-xl">⭐</span>
            <span className="font-medium">{ratingsAverage}</span>
          </div>
        </div>

        {/* Grid for Info */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Experience:</span>{" "}
            {experience} years
          </p>
          <p>
            <span className="font-medium text-gray-800">Fee:</span> ₹
            {consultationFee}
          </p>
          <p>
            <span className="font-medium text-gray-800">Address:</span>{" "}
            {address}
          </p>
          {timing && (
            <p>
              <span className="font-medium text-gray-800">Timing:</span>{" "}
              {timing.open} - {timing.close}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block p-2 bg-blue-600  rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
            >
              Visit Website
            </a>
          )}
          <button className="p-2  bg-orange-500  rounded-lg shadow hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-0">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDoctor;
