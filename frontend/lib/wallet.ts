import { supabase } from './supabase';
import { trackDiscountUsage } from './appointments';

export async function updatePatientWallet(
  patientId: string,
  doctorId: string,
  appointmentId: string,
  amount: number,
  discountApplied: number
): Promise<void> {
  // Deduct amount from wallet
  await supabase.rpc('deduct_from_wallet', {
    p_patient_id: patientId,
    p_amount: amount,
  });

  // Create transaction record
  await supabase.from('transactions').insert({
    appointment_id: appointmentId,
    patient_id: patientId,
    doctor_id: doctorId,
    amount: amount,
    discount_applied: discountApplied,
    type: 'debit',
  });

  // If discount was applied, track its usage
  if (discountApplied > 0) {
    await trackDiscountUsage(doctorId, patientId);
  }
}