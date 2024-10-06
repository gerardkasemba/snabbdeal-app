// Utility function to convert time to AM/PM format
export const formatTimeToAmPm = (time) => {
  if (!time) return ''; // Return empty string if time is undefined or null
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const adjustedHour = hourInt % 12 || 12; // Convert 24-hour time to 12-hour format
  return `${adjustedHour}:${minute} ${ampm}`;
};
