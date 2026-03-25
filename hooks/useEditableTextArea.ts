import { Hyperlink } from "@/prisma/generated/prisma/browser";
import { useAdmin } from "@/providers/adminProvider";
import { EditableTextAreaProps } from "@/types/general";
import { useMemo } from "react";

export default function useEditableTextArea(props: EditableTextAreaProps) {
  const { content } = props;
  const { isAdminDisplay } = useAdmin();

  const isHyperlink = (val: string | Hyperlink): val is Hyperlink =>
    typeof val === "object" && val !== null && "text" in val && "link" in val;

  const extractHyperLink = (text: string): Array<string | Hyperlink> => {
    let result: Array<string | Hyperlink> = [text];

    if (!content.hyperlinks || !Array.isArray(content.hyperlinks)) return result;

    content.hyperlinks.forEach((h) => {
      const newResult: Array<string | Hyperlink> = [];

      result.forEach((part) => {
        if (typeof part !== "string") {
          newResult.push(part);
          return;
        }

        const pieces = part.split(h.text);
        pieces.forEach((piece, idx) => {
          if (piece) newResult.push(piece);
          if (idx < pieces.length - 1) newResult.push(h);
        });
      });

      result = newResult;
    });

    return result;
  };

  const convertToString = (array: Array<string | Hyperlink>) =>
    array.map((e) => (isHyperlink(e) ? e.text : e)).join("");

  const parsed = useMemo(
    () => extractHyperLink(content.content),
    [content.content, content.hyperlinks],
  );

  return { isAdminDisplay, isHyperlink, convertToString, parsed };
}
