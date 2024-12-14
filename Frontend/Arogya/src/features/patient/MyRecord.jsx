import React from 'react';

const MyRecord = () => {
    // Dummy patient records data
    const records = [
        {
            id: 1,
            date: '2023-01-15',
            diagnosis: 'Flu',
            notes: 'Patient showed mild symptoms and was advised rest.',
        },
        {
            id: 2,
            date: '2023-03-22',
            diagnosis: 'Allergy',
            notes: 'Prescribed antihistamines and advised to avoid allergens.',
        },
        {
            id: 3,
            date: '2023-05-10',
            diagnosis: 'Check-up',
            notes: 'Routine check-up; all vitals normal.',
        },
        {
            id: 4,
            date: '2023-07-30',
            diagnosis: 'Back Pain',
            notes: 'Recommended physiotherapy and pain relief medication.',
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Patient Past Records</h2>
            {records.length === 0 ? (
                <p className="text-gray-500">No records found.</p>
            ) : (
                <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Diagnosis</th>
                            <th className="py-2 px-4 border-b">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(record => (
                            <tr key={record.id} className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{record.diagnosis}</td>
                                <td className="py-2 px-4 border-b">{record.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyRecord;
