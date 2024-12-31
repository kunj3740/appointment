'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Appointment {
  _id: string;
  date: string;
  status: string;
  slot: {
    startTime: string;
    endTime: string;
  };
  doctorId: {
    name: string;
    specialization: string;
    consultationFee: number;
    firstTimeDiscount: number;
  };
  isPast: boolean;
}

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError('Unauthorized. Please log in.');
        router.push('/login'); // Redirect to login if no token
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/api/appointments/my-appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            limit: 10, // You can modify this or make it dynamic
          },
        });

        setAppointments(response.data.data.appointments);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-700">
        <p>Loading your appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-700">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-700 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-slate-500">You have no appointments.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border border-slate-300 p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{appointment.doctorId.name}</h2>
                  <p className="text-sm text-slate-500">{appointment.doctorId.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{appointment.date}</p>
                  <p className="text-sm">
                    {appointment.slot.startTime} - {appointment.slot.endTime}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <p className={`text-sm font-medium ${appointment.isPast ? 'text-slate-500' : 'text-green-600'}`}>
                  {appointment.isPast ? 'Past Appointment' : 'Upcoming Appointment'}
                </p>
                <p
                  className={`text-sm ${
                    appointment.status === 'scheduled'
                      ? 'text-blue-600'
                      : appointment.status === 'completed'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
