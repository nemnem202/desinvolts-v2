import { Calendar } from "@/components/ui/calendar";
import { logger } from "@/lib/logger";
import { DateEvent } from "@/types/db";

export default function CalendarComponent({
  dates,
  currentDate,

  setCurrentIndex,
}: {
  dates: DateEvent[];
  currentDate: DateEvent;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const handleSelect = (date?: Date) => {
    if (!date) return;

    const dateEvent = dates.findIndex((d) => isSameDay(d.date, date));
    if (!dateEvent) return logger.error("Date non trouvée");

    setCurrentIndex(dateEvent);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-y-auto items-center gap-5 w-[15rem] md:w-[25rem]">
      <div className="">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          className="rounded-lg shadow-sm w-[15rem] md:w-[25rem] [--cell-size:4rem] border"
          selected={currentDate.date}
          datesWithEvents={dates.map((dateEvent) => dateEvent.date)}
          defaultMonth={currentDate.date}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
