import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import DatePresentation from "@/components/features/dates/datePresentation";
import { NextDates, PrevDates } from "@/components/features/dates/datesAccordion";
import useDateNav from "@/hooks/useDateNav";
import AddDateDialog from "@/components/features/dates/addDateDialog";

export default function Page() {
  const { pageContext, update } = usePageState(DatesPageContext);
  const { state } = pageContext;
  const { currentIndex, setCurrentIndex } = useDateNav(state);
  return (
    <ClassicPageLayout>
      <Section>
        <EditableText
          as="h1"
          content={state.title}
          setContent={(newContent) => update("title", newContent)}
          className="headline w-full text-center"
        />
      </Section>
      <Section>
        {state.dates.length > 0 ? (
          <DatePresentation
            dates={state.dates}
            setDates={(dates) => update("dates", dates)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <AddDateDialog onDate={(date) => update("dates", [date])} />
        )}
      </Section>
      <Section>
        <NextDates
          dates={state.dates}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setDates={(dates) => update("dates", dates)}
        />
      </Section>
      <Section>
        <PrevDates
          dates={state.dates}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setDates={(dates) => update("dates", dates)}
        />
      </Section>
    </ClassicPageLayout>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:py-[2.5rem] flex flex-col gap-[3rem] items-center w-full">
      {children}
    </section>
  );
}
