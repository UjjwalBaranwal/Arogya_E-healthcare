function PatientInfoBox({ name, value }) {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg hover:shadow-md transition gap-2">
      <span className="font-bold text-gray-700 mr-2">{name}: </span>
      <span className={`text-gray-600 ${name === "email" && "lowercase"}`}>
        {value}
      </span>
    </div>
  );
}

export default PatientInfoBox;
