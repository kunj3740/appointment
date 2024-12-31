import { supabase } from './supabase';

export async function checkFirstTimeDiscount(
  doctorId: string,
  patientId: string
): Promise<boolean> {
  const { data } = await supabase
    .from('doctor_patient_discounts')
    .select('id')
    .eq('doctor_id', doctorId)
    .eq('patient_id', patientId)
    .single();

  return !data;
}

export async function trackDiscountUsage(
  doctorId: string,
  patientId: string
): Promise<void> {
  await supabase
    .from('doctor_patient_discounts')
    .insert({ doctor_id: doctorId, patient_id: patientId });
}