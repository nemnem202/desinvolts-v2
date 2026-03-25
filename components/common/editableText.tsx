import UseEditableText from "@/hooks/useEditableText";
import { EditableTextProps } from "@/types/general";

export default function EditableText(props: EditableTextProps) {
  const { className = "", content, setContent, as: Tag = "span" } = props;
  const { convertToString, isAdmin, isHyperlink, parsed } = UseEditableText(props);

  if (isAdmin) {
    return (
      <input
        type="text"
        value={convertToString(parsed)}
        onChange={(e) =>
          setContent({
            ...content,
            content: e.target.value,
            hyperlinks: content.hyperlinks,
          })
        }
        className={className + " size-min w-full text-center"}
      />
    );
  } else {
    return (
      <Tag className={className}>
        {parsed.map((content, index) => {
          if (isHyperlink(content)) {
            return (
              <a href={content.link} className="text-secondary" key={index}>
                {content.text}
              </a>
            );
          } else {
            return <span key={index}>{String(content)}</span>;
          }
        })}
      </Tag>
    );
  }
}
