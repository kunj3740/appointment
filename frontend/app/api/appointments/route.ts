import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkFirstTimeDiscount } from '@/lib/appointments';
import { updatePatientWallet } from '@/lib/wallet';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorId, patientId, date, time } = body;

    // Start a Supabase transaction
    const { data: doctor } = await supabase
      .from('doctors')
      .select('consultation_fee, first_time_discount')
      .eq('id', doctorId)
      .single();

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    // Check if this is a first-time appointment
    const isFirstTime = await checkFirstTimeDiscount(doctorId, patientId);
    const discountedAmount = isFirstTime
      ? doctor.consultation_fee * (1 - doctor.first_time_discount / 100)
      : doctor.consultation_fee;

    // Create appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        doctor_id: doctorId,
        patient_id: patientId,
        appointment_date: date,
        appointment_time: time,
        original_amount: doctor.consultation_fee,
        discounted_amount: discountedAmount,
        is_first_time: isFirstTime,
      })
      .select()
      .single();

    if (appointmentError) throw appointmentError;

    // Update patient's wallet and create transaction
    await updatePatientWallet(
      patientId,
      doctorId,
      appointment.id,
      discountedAmount,
      isFirstTime ? doctor.first_time_discount : 0
    );

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}