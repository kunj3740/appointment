'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock, Star, Calendar, User, DollarSign, Stethoscope } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

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
  imageUrl?: string;
  rating?: number;
  experience?: number;
}

export function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>({});
  const router = useRouter();

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

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule consultations with experienced healthcare professionals who provide personalized care and treatment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary h-full flex flex-col">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {doctor.name}
                      </h3>
                      <Badge variant="secondary" className="text-sm font-medium">
                        {doctor.specialization}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        {doctor.consultationFee.currency} {doctor.consultationFee.amount} per session
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-sm">Next available slot: Today</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-sm">{doctor.experience || 5}+ years experience</span>
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
                    )}
                    {!isEligibleForDiscount(doctor._id) && doctor.firstTimeDiscount && (
                      <div className="h-[65px]"></div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full group-hover:bg-primary/90 transition-colors flex items-center justify-center gap-2" 
                    variant="default"
                    onClick={() => {
                      router.push(`/book?id=${doctor._id}`)
                    }}
                  >
                    <Clock className="h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;

