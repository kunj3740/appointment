'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ConsultationFee {
  amount: number;
  currency: string;
}

interface FirstTimeDiscount {
  percentage: number;
  maxAmount: number;
}

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  consultationFee: ConsultationFee;
  firstTimeDiscount: FirstTimeDiscount;
}

export function DoctorCard({ doctor }: { doctor: any }) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isEligibleForDiscount = () => {
    return !user?.appointedDoctors?.includes(doctor._id);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">
          {doctor.specialization}
        </p>
        {isEligibleForDiscount() && doctor.firstTimeDiscount && (
          <p className="text-sm text-green-600 mt-1">
            First-time discount: {doctor.firstTimeDiscount.percentage}% off
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          Consultation Fee: {doctor.consultationFee.currency} {doctor.consultationFee.amount}
        </p>
      </div>
    </div>
  );
}