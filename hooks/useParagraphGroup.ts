import { ParagraphGroupProps } from "@/components/layout/paragraphGroup";
import PLAHECOLDERS from "@/config/placeholders";
import { EditableParagraphContent, ParagraphInGroup } from "@/types/db";

export default function useParagraphGroup(props: ParagraphGroupProps) {
  const { content, onChange } = props;

  const addParagraph = () => {
    const maxId = content.sort((a, b) => b.position - a.position)[0].position ?? 0;
    onChange([
      ...content,
      {
        paragraph: {
          hyperlinks: [],
          content: PLAHECOLDERS.paragraph,
          id: maxId + 1,
        },
        position: maxId + 1,
      },
    ]);
  };

  const removeParagraph = (position: number) => {
    onChange(content.filter((cont) => cont.position !== position));
  };

  const changeParagraph = (paragraph: EditableParagraphContent) => {
    const newParagraphs = content.map((p) => {
      if (p.paragraph.id === paragraph.id) {
        return { ...p, paragraph: paragraph };
      }
      return p;
    });
    onChange(newParagraphs);
  };

  const handleReorder = (reorderedElements: any[]) => {
    setTimeout(() => {
      const newOrder = reorderedElements.map((element) => {
        return Number(element.props.id);
      });
      const reorderedContent = newOrder.map((id, newIndex) => {
        const paragraph = content.find((p) => p.paragraph.id === id);
        return {
          ...paragraph!,
          position: newIndex,
        };
      });

      onChange(reorderedContent);
    }, 100);
  };

  return { addParagraph, removeParagraph, changeParagraph, handleReorder };
}
