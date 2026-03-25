import ParagraphGroup from "@/components/layout/paragraphGroup";
import DayPicker from "@/components/common/dayPicker";
import EditableText from "@/components/common/editableText";
import HourPicker from "@/components/common/hourPicker";
import Image from "@/components/common/image";
import NavButton from "@/components/ui/navButton";
import { useSize } from "@/providers/screenSizeProvider";
import { DateEvent } from "@/types/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarDialog, CalendarDialogButton } from "./calendarDialog";
import { useAdmin } from "@/providers/adminProvider";
import AddDateDialog from "./addDateDialog";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import ButtonMinus from "@/components/ui/buttonMinus";

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
  const { isAdmin } = useAdmin();
  const size = useSize();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const goPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const goNext = () => currentIndex < dates.length - 1 && setCurrentIndex(currentIndex + 1);

  const currentDate = dates[currentIndex];

  if (!currentDate) return null;

  if (currentDate) {
    return (
      <>
        <div className="flex flex-col w-full items-center gap-4 p-4" key={currentIndex}>
          <div className="flex w-full justify-between items-center">
            <NavButton disabled={currentIndex === 0} onClick={goPrev}>
              <ChevronLeft />
              précédent
            </NavButton>
            <NavButton disabled={currentIndex === dates.length - 1} onClick={goNext}>
              suivant
              <ChevronRight />
            </NavButton>
          </div>

          <EditableText
            as="h2"
            content={currentDate.title}
            setContent={(newText) => {
              setDates(dates.map((d, i) => (i === currentIndex ? { ...d, title: newText } : d)));
            }}
            className="title"
          />
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-center w-full max-w-[50rem] gap-4">
            <div className="w-[15rem] md:w-[20rem] aspect-2/3 overflow-hidden rounded-md">
              <Image
                key={currentDate.id}
                width={320}
                height={480}
                imageProps={currentDate.image}
                onChange={(newImage) => {
                  setDates(
                    dates.map((d, i) => (i === currentIndex ? { ...d, image: newImage } : d)),
                  );
                }}
              />
            </div>

            <div
              className={`flex flex-1 flex-col gap-3 cursor-pointer`}
              onClick={() => {
                if (size === "sm" || size === "md") setCalendarOpen(true);
              }}
            >
              <div className="w-full border rounded-lg px-4 py-2 flex relative gap-4">
                {size !== "sm" && size !== "md" && (
                  <div className="absolute right-[-2rem] top-0 z-10">
                    <CalendarDialogButton setOpen={setCalendarOpen} />
                    {isAdmin && (
                      <div className="w-full flex justify-center">
                        <ButtonMinus
                          onClick={() =>
                            setDates([...dates.filter((date) => date.id !== currentDate.id)])
                          }
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
                        dates.map((d, i) => (i === currentIndex ? { ...d, date: newDate } : d)),
                      );
                    }}
                  />
                  <HourPicker
                    as="p"
                    className="subtitle w-fit"
                    date={currentDate.date}
                    onValueChange={(newDate) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, date: newDate } : d)),
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
                        dates.map((d, i) => (i === currentIndex ? { ...d, adress: newText } : d)),
                      );
                    }}
                  />
                  <EditableText
                    as="p"
                    className="subtitle text-right"
                    content={currentDate.city}
                    setContent={(newText) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, city: newText } : d)),
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
                    dates.map((d, i) =>
                      i === currentIndex ? { ...d, description: newContent } : d,
                    ),
                  );
                }}
                classNameForEachParagraph="paragraph text-left"
              />
            </div>
          </div>
          {isAdmin && <AddDateDialog onDate={(newDate) => setDates([...dates, newDate])} />}
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
}
