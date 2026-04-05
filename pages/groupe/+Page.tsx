import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import Trombinoscope from "@/components/features/trombinoscope/trombinoscope";
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import { usePageState } from "@/providers/stateProvider";
import { GroupePageContext } from "@/types/contexts";

export default function Page() {
  const { pageContext, update } = usePageState(GroupePageContext);
  const { state } = pageContext;

  return (
    <ClassicPageLayout>
      <section className="md:pt-[2.5rem] flex flex-col gap-[3rem] items-center w-full max-w-[40rem]">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newTitle) => update("title", newTitle)}
          className="headline w-full text-center shrink-0"
        />
      </section>
      <section className="pt-[2.5rem] flex flex-col gap-[3rem] min-h-0 items-center max-w-[56rem] w-full">
        <div className="flex items-center gap-[2rem] flex-col w-full">
          <ParagraphGroup
            as={"p"}
            className=""
            classNameForEachParagraph="text-center paragraph"
            content={state.first_section_paragraphs}
            onChange={(newParagraphs) => update("first_section_paragraphs", newParagraphs)}
          />
          <div className="w-full rounded-md overflow-hidden aspect-video">
            <Image
              width={600}
              height={320}
              imageProps={{ ...state.presentation_image }}
              onChange={(newImage) => update("presentation_image", newImage)}
            />
          </div>
        </div>
      </section>
      <section className="md:py-[2.5rem] min-h-0 h-min items-center  w-full max-w-[56rem]">
        <ParagraphGroup
          as={"p"}
          classNameForEachParagraph="paragraph text-left"
          content={state.second_section_paragraphs}
          onChange={(newParaphs) => update("second_section_paragraphs", newParaphs)}
        />
      </section>
      <section className="md:py-[2.5rem] min-h-0 h-min items-center  w-full">
        <Trombinoscope
          elements={state.trombinoscope}
          setElements={(newTombinoscope) => update("trombinoscope", newTombinoscope)}
        />
      </section>
    </ClassicPageLayout>
  );
}
