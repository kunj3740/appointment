import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: doctors, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('available', true);

    if (error) throw error;

    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}