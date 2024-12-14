import React from 'react';

const PastAppointment = () => {
    // Dummy data for past appointments
    const appointments = [
        {
            id: 1,
            date: '2023-01-15',
            doctor: 'Dr. John Smith',
            specialty: 'Cardiology',
            notes: 'Follow-up on heart health.',
            image: 'https://plus.unsplash.com/premium_photo-1664475450083-5c9eef17a191?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yJTIwZmVtYWxlfGVufDB8fDB8fHww', // Placeholder image
        },
        {
            id: 2,
            date: '2023-03-22',
            doctor: 'Dr. Emily Johnson',
            specialty: 'Dermatology',
            notes: 'Skin check-up and consultation.',
            image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg', // Placeholder image
        },
        {
            id: 3,
            date: '2023-05-10',
            doctor: 'Dr. Sarah Brown',
            specialty: 'Pediatrics',
            notes: 'Routine check-up for vaccination.',
            image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', // Placeholder image
        },
        {
            id: 4,
            date: '2023-07-30',
            doctor: 'Dr. Michael Lee',
            specialty: 'Orthopedics',
            notes: 'Consultation for knee pain.',
            image: 'https://thumbs.dreamstime.com/b/african-male-doctor-happy-tablet-computer-34481166.jpg', // Placeholder image
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Past Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map(appointment => (
                    <div key={appointment.id} className="bg-white rounded-lg shadow-md p-4">
                        <img src={appointment.image} alt={appointment.doctor} className="w-full h-32 object-cover rounded-md mb-4" />
                        <h3 className="text-lg font-bold">{appointment.doctor}</h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                        <p className="text-gray-500">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="mt-2 text-gray-700">{appointment.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastAppointment;
