import { NextResponse } from 'next/server';
import { supabase } from '../../../src/supabaseClient.js';
import { scoreForecast } from '../../../src/forecastScorer.js';

export async function GET() {
  const { data: forecasts, error } = await supabase.from('forecast').select('*').limit(10);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }

  const scoredForecasts = forecasts.map(forecast => {
    const score = scoreForecast(forecast, {}, {});
    return { ...forecast, ...score };
  });

  return NextResponse.json({ scoredForecasts });
}
