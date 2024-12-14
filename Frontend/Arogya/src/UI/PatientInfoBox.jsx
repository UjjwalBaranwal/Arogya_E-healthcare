import React from 'react';

function PatientInfoBox({ name, value }) {
  return (
    <div className="flex items-center bg-blue-50 p-3 rounded-lg shadow-sm hover:shadow-md transition gap-2">
      <span className="font-semibold text-blue-800 text-sm">{name}:</span>
      <span className={`text-gray-700 text-sm ${name === "email" && "lowercase"}`}>
        {value}
      </span>
    </div>
  );
}

export default PatientInfoBox;

