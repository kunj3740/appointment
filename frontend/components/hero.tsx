'use client';

import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                HealthConnect
              </h1>
            </div>
            <p className="mt-4 text-xl text-muted-foreground">
              Book your first consultation with top doctors and enjoy special discounts. 
              Quality healthcare made affordable and accessible.
            </p>
          </div>
          <div className="mt-10">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6">
              <div>
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="mt-2 text-muted-foreground">Verified Doctors</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">50k+</p>
                <p className="mt-2 text-muted-foreground">Happy Patients</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">4.9/5</p>
                <p className="mt-2 text-muted-foreground">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}