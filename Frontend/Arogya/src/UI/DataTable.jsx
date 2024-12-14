import React from 'react';

const DataTable = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="py-3 px-4 border-b border-gray-300 text-left">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border-b border-gray-200">{item.name || 'N/A'}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{item.email || 'N/A'}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{item.specialization || 'N/A'}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{item.phoneNumber || 'N/A'}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{item.experience ? `${item.experience} years` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
