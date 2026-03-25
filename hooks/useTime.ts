export default function useTime(date: Date, onChange: (newTime: Date) => void) {
  const updateHour = (hours: string) => {
    const hoursInNumber = parseInt(hours);
    if (hoursInNumber < 0) return;
    const newDate = new Date(date.getTime());
    newDate.setHours(hoursInNumber);
    onChange(newDate);
  };

  const updateMinutes = (minutes: string) => {
    const minutesInNumber = parseInt(minutes);
    if (minutesInNumber < 0) return;
    const newDate = new Date(date.getTime());
    newDate.setMinutes(minutesInNumber);
    onChange(newDate);
  };

  return { updateHour, updateMinutes };
}
