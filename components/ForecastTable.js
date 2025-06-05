'use client';
import React from 'react';

export default function ForecastTable({ forecastRows }) {
  const grouped = forecastRows.reduce((acc, row) => {
    const dateKey = row.observation_time.slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(row);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, rows]) => (
        <div key={date} className="bg-white shadow p-4 rounded">
          <h3 className="font-bold text-lg mb-2">{formatDate(date)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {rows.map(row => (
              <div key={row.observation_time} className="border p-2 rounded text-center">
                <div className="text-sm">{formatTime(row.observation_time)}</div>
                <div className="text-xl font-bold">{row.wave_height.toFixed(1)} ft</div>
                <div className="text-xs">{row.wave_period} sec</div>
                <div className="text-xs">{row.wind_speed} mph @ {row.wind_direction}°</div>
                <div className={`text-sm font-bold ${colorForQuality(row.quality)}`}>
                  {row.quality.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function colorForQuality(quality) {
  if (quality === 'good') return 'text-green-600';
  if (quality === 'fair') return 'text-yellow-500';
  return 'text-red-500';
}
