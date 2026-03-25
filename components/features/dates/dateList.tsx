import EditableText from "@/components/common/editableText";
import { DateEvent } from "@/types/db";

export default function DateList({
  dates,
  currentIndex,
  setCurrentIndex,
  allDates,
  setDates,
}: {
  dates: DateEvent[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  allDates: DateEvent[];
  setDates: (dates: DateEvent[]) => void;
}) {
  const currentDate = allDates[currentIndex];

  return (
    <div className="flex flex-col w-full">
      {dates.map((date, index) => (
        <div
          key={date.id}
          onClick={() => {
            const newIndex = allDates.findIndex((d) => d.id === date.id);
            if (newIndex !== -1) setCurrentIndex(newIndex);
          }}
          className={`cursor-pointer hover:bg-muted ${
            currentDate?.id === date.id && "bg-[var(--muted-second)]"
          }`}
        >
          <div className={`flex flex-col md:mx-4 py-4 ${index < dates.length - 1 && "border-b"}`}>
            <EditableText
              className="title-sm text-left"
              content={date.title}
              setContent={(newText) => {
                setDates(allDates.map((d) => (d.id === date.id ? { ...d, title: newText } : d)));
              }}
            />
            <div className="paragraph italic text-muted-foreground text-xs truncate text-left">
              {date.paragraphs.map((d) => d.paragraph.content + " ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
