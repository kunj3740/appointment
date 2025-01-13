'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Appointment } from '../types';


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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <p className="text-center mt-4 text-slate-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 text-center font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-900">My Appointments</h1>
        {appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-slate-500 text-lg">You have no appointments.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-indigo-900">{appointment.doctorId.name}</h2>
                    <p className="text-sm text-indigo-600 mt-1">{appointment.doctorId.specialization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{appointment.date}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {appointment.slot.startTime} - {appointment.slot.endTime}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <p className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    appointment.isPast
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {appointment.isPast ? 'Past Appointment' : 'Upcoming Appointment'}
                  </p>
                  <p
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      appointment.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
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
    </div>
  );
}

