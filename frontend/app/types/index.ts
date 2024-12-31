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
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  originalAmount: number;
  discountedAmount: number;
  isFirstTime: boolean;
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