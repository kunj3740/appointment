import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { data: patient, error } = await supabase
      .from('patients')
      .select('wallet_balance')
      .eq('id', params.patientId)
      .single();

    if (error) throw error;

    return NextResponse.json({ balance: patient.wallet_balance });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wallet balance' },
      { status: 500 }
    );
  }
}