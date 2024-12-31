'use client';

import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
  slots: readonly string[];
  onSelect: (time: string | null) => void; // Add the onSelect prop
}
export function TimeSlotPicker({ slots }: TimeSlotPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((time) => (
        <Button
          key={time}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          {time}
        </Button>
      ))}
    </div>
  );
}