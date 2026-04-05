import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import DayPicker from "@/components/common/dayPicker";
import EditableText from "@/components/common/editableText";
import HourPicker from "@/components/common/hourPicker";
import Image from "@/components/common/image";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import ButtonMinus from "@/components/ui/buttonMinus";
import NavButton from "@/components/ui/navButton";
import { useAdmin } from "@/providers/adminProvider";
import { useSize } from "@/providers/screenSizeProvider";
import type { DateEvent } from "@/types/db";
import AddDateDialog from "./addDateDialog";
import { CalendarDialog, CalendarDialogButton } from "./calendarDialog";

export default function DatePresentation({
  dates,
  currentIndex,
  setCurrentIndex,
  setDates,
}: {
  currentIndex: number;
  dates: DateEvent[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDates: (dates: DateEvent[]) => void;
}) {
  const { isAdminDisplay } = useAdmin();
  const size = useSize();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const sortedDates = useMemo(() => {
    return [...dates].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [dates]);

  const currentDate = dates[currentIndex];

  const currentSortedIndex = sortedDates.findIndex((d) => d.id === currentDate?.id);

  const goPrev = () => {
    if (currentSortedIndex > 0) {
      const prevId = sortedDates[currentSortedIndex - 1].id;
      const originalIndex = dates.findIndex((d) => d.id === prevId);
      setCurrentIndex(originalIndex);
    }
  };

  const goNext = () => {
    if (currentSortedIndex < sortedDates.length - 1) {
      const nextId = sortedDates[currentSortedIndex + 1].id;
      const originalIndex = dates.findIndex((d) => d.id === nextId);
      setCurrentIndex(originalIndex);
    }
  };

  if (!currentDate) return <AddDateDialog onDate={(newDate) => setDates([...dates, newDate])} />;

  const isPast = currentDate.date.getTime() < Date.now();

  return (
    <>
      <div className="flex flex-col w-full items-center gap-4 p-4 relative">
        {isPast && (
          <div className="absolute top-1/2 z-9 text-destructive title !text-7xl -rotate-45 pointer-events-none select-none opacity-50">
            <p>Date passée</p>
          </div>
        )}
        <div className="flex w-full justify-between items-center">
          <NavButton disabled={currentSortedIndex <= 0} onClick={goPrev}>
            <ChevronLeft /> précédent
          </NavButton>
          <NavButton disabled={currentSortedIndex >= sortedDates.length - 1} onClick={goNext}>
            suivant <ChevronRight />
          </NavButton>
        </div>
        <div className={`w-full flex flex-col items-center ${isPast && "opacity-40"}`}>
          <EditableText
            as="h2"
            content={currentDate.title}
            setContent={(newText) => {
              setDates(dates.map((d) => (d.id === currentDate.id ? { ...d, title: newText } : d)));
            }}
            className="title"
          />

          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-center w-full max-w-[50rem] gap-4">
            <div className="w-[15rem] md:w-[20rem] aspect-2/3 overflow-hidden rounded-md shrink-0">
              <Image
                width={320}
                height={480}
                imageProps={currentDate.image}
                onChange={(newImage) => {
                  setDates(
                    dates.map((d) => (d.id === currentDate.id ? { ...d, image: newImage } : d))
                  );
                }}
              />
            </div>

            <div
              className="flex flex-1 flex-col gap-3 cursor-pointer w-full"
              onClick={() => (size === "sm" || size === "md") && setCalendarOpen(true)}
            >
              <div className="w-full border rounded-lg px-4 py-2 flex relative gap-4">
                {size !== "sm" && size !== "md" && (
                  <div className="absolute right-[-2rem] top-0 z-9">
                    <CalendarDialogButton setOpen={setCalendarOpen} />
                    {isAdminDisplay && (
                      <div className="w-full flex justify-center mt-2">
                        <ButtonMinus
                          onClick={() => setDates(dates.filter((d) => d.id !== currentDate.id))}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <DayPicker
                    as="p"
                    className="subtitle w-fit"
                    date={currentDate.date}
                    onValueChange={(newDate) => {
                      setDates(
                        dates.map((d) => (d.id === currentDate.id ? { ...d, date: newDate } : d))
                      );
                    }}
                  />
                  <HourPicker
                    as="p"
                    className="subtitle w-fit"
                    date={currentDate.date}
                    onValueChange={(newDate) => {
                      setDates(
                        dates.map((d) => (d.id === currentDate.id ? { ...d, date: newDate } : d))
                      );
                    }}
                  />
                </div>
                <div className="flex-1">
                  <EditableText
                    as="p"
                    className="subtitle text-right"
                    content={currentDate.adress}
                    setContent={(newText) => {
                      setDates(
                        dates.map((d) => (d.id === currentDate.id ? { ...d, adress: newText } : d))
                      );
                    }}
                  />
                  <EditableText
                    as="p"
                    className="subtitle text-right"
                    content={currentDate.city}
                    setContent={(newText) => {
                      setDates(
                        dates.map((d) => (d.id === currentDate.id ? { ...d, city: newText } : d))
                      );
                    }}
                  />
                </div>
              </div>

              <ParagraphGroup
                as="p"
                content={currentDate.paragraphs}
                onChange={(newContent) => {
                  setDates(
                    dates.map((d) =>
                      d.id === currentDate.id ? { ...d, paragraphs: newContent } : d
                    )
                  );
                }}
                classNameForEachParagraph="paragraph text-left w-full"
              />
            </div>
          </div>
        </div>
        {isAdminDisplay && <AddDateDialog onDate={(newDate) => setDates([...dates, newDate])} />}
      </div>

      <CalendarDialog
        open={calendarOpen}
        setOpen={setCalendarOpen}
        currentDate={currentDate}
        dates={dates}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  );
}
