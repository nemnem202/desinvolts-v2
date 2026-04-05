import DatePicker from "@/components/common/datePicker";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import { useAdmin } from "@/providers/adminProvider";
import type { PostData } from "@/types/db";
import AddImageButton from "../image-editor/addImageButton";

export default function Post({
  props,
  onChange,
  borderBottom = true,
}: {
  props: PostData & { className?: string };
  borderBottom?: boolean;
  onChange: (newPost: PostData) => void;
}) {
  const { isAdminDisplay } = useAdmin();
  return (
    <div
      className={`flex flex-col relative ${borderBottom && "border-border border-b"} ${isAdminDisplay && "!border"} ${
        props.className
      } items-start py-8`}
    >
      <DatePicker
        className="paragraph muted"
        dayValue={props.date}
        onValueChange={(date) => onChange({ ...props, date: date })}
      />
      <EditableText
        content={{ ...props.title, hyperlinks: [] }}
        setContent={(newValue) => onChange({ ...props, title: newValue })}
        as={"h3"}
        className="title whitespace-nowrap text-left mb-3"
      />
      <ParagraphGroup
        as={"p"}
        content={props.paragraphs}
        onChange={(newParagraphs) => onChange({ ...props, paragraphs: newParagraphs })}
        className="paragraph"
        classNameForEachParagraph="text-left"
      />
      <div className="flex flex-wrap gap-[1rem] py-5">
        {props.images.length > 0 &&
          props.images.map((image, index) => (
            <div className="max-w-[8rem] max-h-[8rem] rounded overflow-hidden " key={index}>
              <Image
                width={128}
                height={128}
                imageProps={image.image}
                onRemove={() =>
                  onChange({
                    ...props,
                    images: props.images.filter((img) => img.image.id !== image.image.id),
                  })
                }
                onChange={(newValue) =>
                  onChange({
                    ...props,
                    images: props.images.map((image) => {
                      if (image.image.id === newValue.id) return { ...image, image: newValue };
                      return image;
                    }),
                  })
                }
              />
            </div>
          ))}
        {isAdminDisplay && (
          <div className="my-auto">
            <AddImageButton
              onImage={(image) =>
                onChange({
                  ...props,
                  images: [...props.images, { position: props.images.length, image: image }],
                })
              }
            ></AddImageButton>
          </div>
        )}
      </div>
    </div>
  );
}
