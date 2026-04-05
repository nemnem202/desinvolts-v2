import { useCallback, useMemo } from "react";
import type { Hyperlink } from "@/prisma/generated/prisma/browser";
import { useAdmin } from "@/providers/adminProvider";
import type { EditableTextProps } from "@/types/general";

export default function UseEditableText(props: EditableTextProps) {
  const { content } = props;
  const { isAdminDisplay } = useAdmin();
  const isHyperlink = (val: string | Hyperlink): val is Hyperlink => {
    return typeof val === "object" && val !== null && "text" in val && "link" in val;
  };

  const extractHyperLink = useCallback(
    (text: string): Array<string | Hyperlink> => {
      let result: Array<string | Hyperlink> = [text];

      content.hyperlinks?.forEach((h) => {
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
    },
    [content.hyperlinks]
  );

  const convertToString = (array: Array<string | Hyperlink>): string => {
    const text = array
      .map((element) => {
        if (isHyperlink(element)) return element.text;
        else return element;
      })
      .join("");
    return text;
  };

  const parsed = useMemo(
    () => extractHyperLink(content.content),
    [content.content, extractHyperLink]
  );

  return { parsed, convertToString, isAdminDisplay, isHyperlink };
}
