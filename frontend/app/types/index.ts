export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  consultationFee: number;
  firstTimeDiscount: number;
  image: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
}

export interface Appointment {
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
export interface AppointmentForDoctor {
  _id: string
  patientId: {
    profile: {
      firstName: string
      phone: string
    }
  }
  date: string
  slot: {
    startTime: string
    endTime: string
  }
  status: string
  isPast: boolean
}
export interface Transaction {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  amount: number;
  discountApplied: number;
  type: 'debit' | 'credit';
  timestamp: string;
}