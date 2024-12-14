import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../../UI/DataTable'; // Import the DataTable component

const GetAllDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch doctors from the API
    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/doctor/getAll/');
            console.log(response.data); // Log response data for debugging
            setDoctors(response.data.data); // Adjust based on actual response structure
        } catch (err) {
            console.error(err); // Log error for debugging
            setError(err.message || 'An error occurred while fetching doctors.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    // Define the columns for the table
    const columns = ['Name', 'Email', 'Specialization', 'Phone Number', 'Experience'];

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-4">Doctors List</h2>
            <DataTable columns={columns} data={doctors} />
        </div>
    );
};

export default GetAllDoctor;
