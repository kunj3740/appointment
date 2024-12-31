import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(`
        *,
        appointments (
          appointment_date,
          appointment_time
        ),
        doctors (
          name,
          specialization
        )
      `)
      .eq('patient_id', params.patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}