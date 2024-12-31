'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Doctor } from '@/app/types';
import { DoctorCard } from '@/components/doctors/doctor-card';
import axios from 'axios';

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] as const;

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorId = searchParams.get('id');
      if (!doctorId) {
        setError('No doctor ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/doctor/${doctorId}`);

        if ( response.status >= 400 ) {
          throw new Error('Failed to fetch doctor details');
        }

        const data = response.data;
        setDoctor(data.doctor);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [searchParams]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time slot.');
      return;
    }

    const doctorId = searchParams.get('id');
    const token = localStorage.getItem("token"); // Replace with actual token logic

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const endTime = `${String((hours + 1) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    const payload = {
      doctorId,
      date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      slot: {
        startTime: selectedTime,
        endTime
      }
    };

    try {
      console.log(token)
      const response = await axios.post(
        'http://localhost:8000/api/appointments',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.data)
      if (response.status >= 400 ) {
        throw new Error('Slot already booked. Please select a different slot.');
      }
      const getUser = await axios.get(
        'http://localhost:8000/api/auth/getUser',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        // const userString = localStorage.getItem('user');
        // if (!userString) {
        // throw new Error('User information not found in localStorage.');
        // }
        // const user = JSON.parse(userString);
        // user.appointedDoctors.push(doctorId);
        // // Update localStorage
        localStorage.setItem('user', JSON.stringify(getUser.data.user));
      console.log(getUser.data.user)
      alert(response.data.message); // Optional success message
      router.push('/wallet');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment.');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-muted-foreground">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Doctor Details</CardTitle>
          </CardHeader>
          <CardContent>{doctor && <DoctorCard doctor={doctor} />}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                min={new Date().toISOString().split('T')[0]} // Only allow today onwards
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Appointment Time</label>
              <select
                value={selectedTime || ''}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                {TIME_SLOTS.map((slot) => {
                  const [hours, minutes] = slot.split(':').map(Number);
                  const endTime = `${String((hours + 1) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                  return (
                    <option key={slot} value={slot}>
                      {slot} - {endTime}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button onClick={handleBooking} className="mt-4">
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
