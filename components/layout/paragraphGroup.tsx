import { useEffect, useState } from "react";
import EditableTextarea from "../common/editableTextarea";
import { useAdmin } from "@/providers/adminProvider";
import PLAHECOLDERS from "@/config/placeholders";
import ButtonPlus from "../ui/buttonPlus";
import ButtonMinus from "../ui/buttonMinus";
import { ReorderList } from "../common/reorder-list";
import useParagraphGroup from "@/hooks/useParagraphGroup";
import { EditableParagraphContent, ParagraphInGroup } from "@/types/db";

export interface ParagraphGroupProps {
  className?: string;
  classNameForEachParagraph?: string;
  content: ParagraphInGroup[];
  onChange: (newParagraphs: ParagraphInGroup[]) => void;
  as: React.ElementType;
}

export default function ParagraphGroup(props: ParagraphGroupProps) {
  const { className = "", classNameForEachParagraph = "", content, as: Tag = "span" } = props;
  const { isAdmin } = useAdmin();

  const { addParagraph, changeParagraph, handleReorder, removeParagraph } =
    useParagraphGroup(props);

  if (isAdmin) {
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
                className={`relative ${isAdmin && "pl-5"}`}
                key={content.position}
                id={`${content.paragraph.id}`}
              >
                <EditableTextarea
                  as={Tag}
                  className={classNameForEachParagraph}
                  content={content.paragraph}
                  setContent={(newParagraph) => changeParagraph(newParagraph)}
                />
                {isAdmin && (
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
