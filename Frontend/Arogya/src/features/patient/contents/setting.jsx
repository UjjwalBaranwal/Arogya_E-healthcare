import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Setting = () => {
  const { user } = useSelector((state) => state.auth);
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

  // Load initial data
  useEffect(() => {
    if (user) {
      setPatientData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || '',
      });
    }
    
  }, [user]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/patient/updatePatient/${user._id}`, patientData);
    //   {{URL}}api/v1/patient/updatePatient/675aad5b4cc4c0e6a6014894
        

      toast.success('Patient information updated successfully!');
      console.log(response.data); // Optionally log the response
    } catch (error) {
      toast.error('Failed to update patient information. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="settings-container mx-15 mt-0">
      <h2 className="text-2xl font-bold mb-1">Update Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-0" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-0" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-0" htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={patientData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-0" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {/* <option value="">Select Gender</option> */}
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2  rounded">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default Setting;
