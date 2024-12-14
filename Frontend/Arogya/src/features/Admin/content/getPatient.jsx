import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../../UI/DataTable'; // Import the DataTable component

const GetAllPatient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patients from the API
    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/patient/getAll/');
            setPatients(response.data.data); // Assuming response structure matches your API response
        } catch (err) {
            setError(err.message || 'An error occurred while fetching patients.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    // Define the columns for the table
    const columns = ['Name', 'Email', 'Specialization', 'Phone Number', 'Experience'];

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-4">Patients List</h2>
            <DataTable columns={columns} data={patients} />
        </div>
    );
};

export default GetAllPatient;
