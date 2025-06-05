export function scoreForecast(buoyData, tideData, cdipData) {
  let score = 0;

  const waveHeight = parseFloat(buoyData.waveHeight);
  const wavePeriod = parseFloat(buoyData.wavePeriod);

  if (waveHeight >= 6) score += 3;
  else if (waveHeight >= 3) score += 2;
  else score += 1;

  if (wavePeriod >= 14) score += 3;
  else if (wavePeriod >= 10) score += 2;
  else score += 1;

  // Add more factors later: wind, tide trend, swell direction, etc

  return {
    rawScore: score,
    quality:
      score >= 6 ? 'good' :
      score >= 4 ? 'fair' :
      'poor'
  };
}
