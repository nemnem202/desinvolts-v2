import useParagraphGroup from "@/hooks/useParagraphGroup";
import { useAdmin } from "@/providers/adminProvider";
import type { ParagraphInGroup } from "@/types/db";
import EditableTextarea from "../common/editableTextarea";
import { ReorderList } from "../common/reorder-list";
import ButtonMinus from "../ui/buttonMinus";
import ButtonPlus from "../ui/buttonPlus";

export interface ParagraphGroupProps {
  className?: string;
  classNameForEachParagraph?: string;
  content: ParagraphInGroup[];
  onChange: (newParagraphs: ParagraphInGroup[]) => void;
  as: React.ElementType;
}

export default function ParagraphGroup(props: ParagraphGroupProps) {
  const { className = "", classNameForEachParagraph = "", content, as: Tag = "span" } = props;
  const { isAdminDisplay } = useAdmin();

  const { addParagraph, changeParagraph, handleReorder, removeParagraph } =
    useParagraphGroup(props);

  if (isAdminDisplay) {
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        <ReorderList
          withDragHandle
          onReorderFinish={handleReorder}
          key={content.map((c) => c.paragraph.id).join("-")}
        >
          {content
            .sort((a, b) => a.position - b.position)
            .map((content) => (
              <div
                className={`relative ${isAdminDisplay && "pl-5"}`}
                key={content.position}
                id={`${content.paragraph.id}`}
              >
                <EditableTextarea
                  as={Tag}
                  className={classNameForEachParagraph}
                  content={content.paragraph}
                  setContent={(newParagraph) => changeParagraph(newParagraph)}
                />
                {isAdminDisplay && (
                  <div className="absolute left-0  h-full flex items-center justify-center inset-y-0">
                    <ButtonMinus onClick={() => removeParagraph(content.position)} />
                  </div>
                )}
              </div>
            ))}
        </ReorderList>

        <div className="w-full flex justify-center h-min">
          <ButtonPlus onClick={addParagraph} size="1.5rem" />
        </div>
      </div>
    );
  } else
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {content
          .sort((a, b) => a.position - b.position)
          .map((content) => (
            <div className="relative" key={content.position}>
              <EditableTextarea
                as={Tag}
                className={classNameForEachParagraph}
                content={content.paragraph}
                setContent={changeParagraph}
              />
            </div>
          ))}
      </div>
    );
}
