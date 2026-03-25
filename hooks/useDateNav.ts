import { getNextDate } from "@/lib/utils";
import { DatesPageContent } from "@/types/page-contents";
import { useEffect, useState } from "react";

export default function useDateNav(state: DatesPageContent) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const nextDate = getNextDate(state.dates);
    return state.dates.findIndex((d) => d.id === nextDate.id) ?? 0;
  });

  useEffect(() => {
    const nextDate = getNextDate(state.dates);
    const dateIndex = state.dates.findIndex((d) => d.id === nextDate.id) ?? 0;
    setCurrentIndex(dateIndex);
  }, [state.dates]);

  return { currentIndex, setCurrentIndex };
}
