'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Star, Calendar } from "lucide-react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  consultationFee: {
    amount: number;
    currency: string;
  };
  firstTimeDiscount: {
    percentage: number;
    maxAmount: number;
  };
}

export function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>({});
  const route  = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctor');
        setDoctors(response.data.doctors);
      } catch (err) {
        setError('Failed to fetch doctors');
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const isEligibleForDiscount = (doctorId: string) => {
    return !user?.appointedDoctors?.includes(doctorId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Medical background for cards - using a generic medical symbol pattern
  const medicalBackground = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M45 20h10v25h25v10H55v25H45V55H20V45h25V20z' fill='%23f0f0f0'/%3E%3C/svg%3E";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule consultations with experienced healthcare professionals who provide personalized care and treatment
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card 
              key={doctor._id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary"
            >
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {doctor.specialization}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Tag className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      {doctor.consultationFee.currency} {doctor.consultationFee.amount} per session
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm">Next available slot: Today</span>
                  </div>
                  {isEligibleForDiscount(doctor._id) && doctor.firstTimeDiscount && (
                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Tag className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="text-sm text-green-800 font-medium">
                          {doctor.firstTimeDiscount.percentage}% off first visit
                        </span>
                        <p className="text-xs text-green-600">
                          Save up to {doctor.consultationFee.currency} {doctor.firstTimeDiscount.maxAmount}
                        </p>
                      </div>
                    </div>
                  )}{!isEligibleForDiscount(doctor._id) && doctor.firstTimeDiscount && (
                    <div className="h-[65px]">
                      
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full group-hover:bg-primary/90 transition-colors flex items-center gap-2" 
                  variant="default"
                  onClick={() => {
                    route.push(`/book?id=${doctor._id}`)
                  }}
                >
                  <Clock className="h-4 w-4" />
                  Schedule Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;