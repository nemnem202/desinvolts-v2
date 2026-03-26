import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { ContactPageContext } from "@/types/contexts";
import { DownloadableFile, EditableTextContent } from "@/types/db";
import { ContactPageContent } from "@/types/page-contents";
import { CirclePlus, File } from "lucide-react";
import { useRef } from "react";
import ContactForm from "@/components/features/contact/contactForm";

export default function Page() {
  const { isAdminDisplay } = useAdmin();
  const { pageContext, update } = usePageState<ContactPageContent>(ContactPageContext);
  const { state } = pageContext;
  return (
    <ClassicPageLayout>
      <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center max-w-[40rem]">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent) => update("title", newContent)}
          className="headline w-full text-center shrink-0"
        />
        <EditableTextarea
          as={"p"}
          content={state.paragraph}
          setContent={(newContent) => update("paragraph", newContent)}
          className="paragraph text-center"
        />
        <ContactForm />
      </section>
      <section className="flex flex-col w-full max-w-[60rem] gap-8">
        <EditableText
          as={"h2"}
          content={state.subtitle}
          setContent={(newContent: EditableTextContent) => update("subtitle", newContent)}
          className="title w-full shrink-0 text-left"
        />
        <div className="flex flex-wrap w-full gap-10">
          {state.files
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((file, index) => (
              <FileComponent
                key={index}
                file={file}
                files={state.files}
                onChange={(newFiles: DownloadableFile[]) => update("files", newFiles)}
              />
            ))}
          {isAdminDisplay && <MoreFileComponent />}
        </div>
      </section>
    </ClassicPageLayout>
  );
}

function FileComponent({
  file,
  files,
  onChange,
}: {
  file: DownloadableFile;
  files: DownloadableFile[];
  onChange: (newFile: DownloadableFile[]) => void;
}) {
  const handleFileTitleChange = (newTitleText: EditableTextContent) => {
    let newFiles = files.filter((f) => f !== file);
    onChange(newFiles);
  };
  return (
    <button
      className="flex flex-col items-center justify-top w-[6rem] cursor-pointer hover:bg-[var(--muted-second)] p-2 rounded"
      type="button"
    >
      <File className="w-[2.5rem] h-[2.5rem]" />
      <EditableText
        as={"p"}
        className="paragraph text-center w-full"
        content={{ content: file.filename, hyperlinks: [], id: file.id }}
        setContent={(newContent) => handleFileTitleChange(newContent)}
      ></EditableText>
    </button>
  );
}

function MoreFileComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  return (
    <>
      <button
        type="button"
        className="flex flex-col items-center justify-center w-[6rem] cursor-pointer hover:bg-[var(--muted-second)] p-2 rounded"
        onClick={handleButtonClick}
      >
        <CirclePlus className="w-[2.5rem] h-[2.5rem]" />
      </button>
      <input type="file" className="hidden" ref={inputRef}></input>
    </>
  );
}
