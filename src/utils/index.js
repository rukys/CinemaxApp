// Parses a JSON array string (e.g. genres stored in Firestore). Returns an
// empty array for missing or malformed values instead of throwing.
export const safeParseArray = value => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'string' || value === '') {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

// Returns today's date as YYYY-MM-DD in the device's local timezone.
// `toISOString()` uses UTC, which is still "yesterday" for early-morning
// users east of UTC (e.g. WIB, UTC+7).
export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
