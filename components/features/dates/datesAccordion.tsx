import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import { DateEvent } from "@/types/db";
import { DatesPageContent } from "@/types/page-contents";
import { useMemo } from "react";
import DateList from "./dateList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function NextDates({
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
  const { pageContext, update } = usePageState<DatesPageContent>(DatesPageContext);
  const { state } = pageContext;

  const upcoming = useMemo(
    () =>
      [...dates]
        .filter((d) => d.date.getTime() > Date.now())
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [dates],
  );

  return (
    <>
      <EditableText
        as="h2"
        className="title text-left"
        content={state.nextTitle}
        setContent={(newContent) => update("nextTitle", newContent)}
      />
      <DateList
        dates={upcoming}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        allDates={dates}
        setDates={setDates}
      />
    </>
  );
}

export function PrevDates({
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
  const { pageContext, update } = usePageState<DatesPageContent>(DatesPageContext);
  const { state } = pageContext;

  const pastByYear = useMemo(() => {
    return [...dates]
      .filter((d) => d.date.getTime() < Date.now())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce<Record<number, DateEvent[]>>((acc, d) => {
        acc[d.date.getFullYear()] ||= [];
        acc[d.date.getFullYear()].push(d);
        return acc;
      }, {});
  }, [dates]);

  return (
    <>
      <EditableText
        as="h2"
        className="title text-left"
        content={state.prevTitle}
        setContent={(newContent) => update("prevTitle", newContent)}
      />
      <Accordion type="multiple" className="w-full">
        {Object.entries(pastByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearDates]) => (
            <AccordionItem key={year} value={year}>
              <AccordionTrigger className="paragraph">Année {year}</AccordionTrigger>
              <AccordionContent>
                <DateList
                  dates={yearDates}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  allDates={dates}
                  setDates={setDates}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
}
