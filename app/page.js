import { supabase } from '@/lib/supabase';
import ForecastTable from '@/components/ForecastTable';

export default async function Home() {
  const { data: forecastRows } = await supabase
    .from('forecast')
    .select('*')
    .gte('observation_time', getTodayCutoff())
    .order('observation_time', { ascending: true });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SwellChecker Forecast</h1>
      {!forecastRows || forecastRows.length === 0 ? (
        <div>No forecast data available</div>
      ) : (
        <ForecastTable forecastRows={forecastRows} />
      )}
    </main>
  );
}

function getTodayCutoff() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
