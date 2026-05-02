import { CirclePlus, File } from "lucide-react";
import { useRef, useState } from "react";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import ContactForm from "@/components/features/contact/contactForm";
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { ContactPageContext } from "@/types/contexts";
import type { DownloadableFile, EditableTextContent } from "@/types/db";
import onFileUpload from "@/telefunc/uploadFile.telefunc";
import { errorToast, successToast } from "@/lib/utils";
import getRandomId from "@giapspzoo/get-random-id";
import ButtonMinus from "@/components/ui/buttonMinus";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const { isAdminDisplay } = useAdmin();
  const { pageContext, update } = usePageState<"contact">(ContactPageContext);
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
        {state.files.length > 0 && (
          <EditableText
            as={"h2"}
            content={state.subtitle}
            setContent={(newContent: EditableTextContent) => update("subtitle", newContent)}
            className="title w-full shrink-0 text-left"
          />
        )}
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
    const newFiles: DownloadableFile[] = [
      ...files.filter((f) => f !== file),
      { ...file, filename: newTitleText.content },
    ];
    onChange(newFiles);
  };

  const { isAdminDisplay } = useAdmin();

  if (isAdminDisplay)
    return (
      <div className="relative flex flex-col items-center justify-center w-[8rem] cursor-pointer hover:bg-[var(--muted-second)] p-2 rounded group transition-colors group">
        <div className="absolute top-0 right-0">
          <ButtonMinus
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange(files.filter((f) => f.id !== file.id));
            }}
          />
        </div>
        <div className="w-full flex justify-center">
          <File className="w-[2.5rem] h-[2.5rem] shrink-0 group-hover:stroke-primary transition-colors" />
        </div>

        <div className="w-full mt-2">
          <EditableText
            as={"p"}
            className="paragraph text-center w-full block"
            content={{ content: file.filename, hyperlinks: [], id: file.id }}
            setContent={(newContent) => handleFileTitleChange(newContent)}
          />
        </div>
      </div>
    );

  return (
    <a
      href={file.downloadUrl}
      download={file.filename}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center w-[8rem] cursor-pointer hover:bg-[var(--muted-second)] p-2 rounded group transition-colors group"
    >
      <div className="w-full flex justify-center">
        <File className="w-[2.5rem] h-[2.5rem] shrink-0 group-hover:stroke-primary transition-colors" />
      </div>

      <div className="w-full mt-2">
        <EditableText
          as={"p"}
          className="paragraph text-center w-full block"
          content={{ content: file.filename, hyperlinks: [], id: file.id }}
          setContent={(newContent) => handleFileTitleChange(newContent)}
        />
      </div>
    </a>
  );
}

function MoreFileComponent() {
  const { pageContext, update } = usePageState<"contact">(ContactPageContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;

    const res = await onFileUpload(file);

    if (res.success) {
      successToast("File uploaded !");
      update("files", [
        ...pageContext.state.files,
        {
          date: new Date(Date.now()),
          downloadUrl: res.publicUrl,
          filename: "New file",
          id: getRandomId(),
        },
      ]);
    } else {
      errorToast("An error occured");
    }

    if (inputRef.current) inputRef.current.value = "";
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        className="flex flex-col items-center justify-center w-[6rem] cursor-pointer hover:bg-[var(--muted-second)] p-2 rounded"
        onClick={handleButtonClick}
      >
        {isLoading ? (
          <Spinner className="w-[2.5rem] h-[2.5rem]" />
        ) : (
          <CirclePlus className="w-[2.5rem] h-[2.5rem]" />
        )}
      </button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx, .txt, .odt, .csv, .xlsx, .pptx, .md"
      />
    </>
  );
}
