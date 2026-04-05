import TextareaAutosize from "react-textarea-autosize";
import useEditableTextArea from "@/hooks/useEditableTextArea";
import type { EditableTextAreaProps } from "@/types/general";

export default function EditableTextarea(props: EditableTextAreaProps) {
  const { className = "", content, setContent, as: Tag = "span" } = props;
  const { isAdminDisplay, isHyperlink, convertToString, parsed } = useEditableTextArea(props);

  if (isAdminDisplay) {
    return (
      <TextareaAutosize
        value={convertToString(parsed)}
        onChange={(e) => {
          setContent({
            ...content,
            content: e.target.value,
          });
        }}
        className={`${className} size-min w-full text-center resize-none`}
      />
    );
  }

  return (
    <Tag className={className}>
      {parsed.map((part, i) =>
        isHyperlink(part) ? (
          <a href={part.link} key={i}>
            {part.text}
          </a>
        ) : (
          <span key={i}>{String(part)}</span>
        )
      )}
    </Tag>
  );
}
