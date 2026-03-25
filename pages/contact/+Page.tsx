import ClassicPageLayout from "@/components/layout/classicPageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { ContactPageContext } from "@/types/contexts";
import { DownloadableFile, EditableTextContent } from "@/types/db";
import { ContactPageContent } from "@/types/page-contents";
import { CirclePlus, File } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { isAdmin } = useAdmin();
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
        <Form />
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
          {isAdmin && <MoreFileComponent />}
        </div>
      </section>
    </ClassicPageLayout>
  );
}

function Form() {
  return (
    <form className="flex flex-col gap-6 rounded-xl border p-5 justify-between" id="contactform">
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="firstname" className="subtitle">
            Prénom
          </Label>
          <Input id="firstname" placeholder="John" className="italic paragraph"></Input>
        </div>
        <div className="flex-1">
          <Label htmlFor="lastname" className="subtitle">
            Nom de famille
          </Label>
          <Input id="lastname" placeholder="Doe" className="italic paragraph"></Input>
        </div>
      </div>
      <div className="flex-1">
        <Label htmlFor="email" className="subtitle">
          Email
        </Label>
        <Input
          id="email"
          placeholder="johndoe@gmail.com"
          className="italic paragraph"
          type="email"
        ></Input>
      </div>
      <div className="flex-1">
        <Label htmlFor="object" className="subtitle">
          Objet
        </Label>
        <Input id="object" placeholder="Objet" className="italic paragraph"></Input>
      </div>
      <div>
        <Label htmlFor="message" className="subtitle">
          Message
        </Label>
        <Textarea placeholder="Votre message" className="italic paragraph"></Textarea>
      </div>
      <div className="flex items-top">
        <div className="flex items-start gap-3">
          <Checkbox id="terms-2" className="mt-1" defaultChecked />
          <Label htmlFor="terms-2" className="text-muted-foreground text-sm paragraph">
            J’accepte la transmission de ces informations par email au groupe Désinvolts,
            conformément à la politique de confidentialité.
          </Label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" form="contactform" onClick={(e) => e.preventDefault()}>
          Envoyer
        </Button>
      </div>
    </form>
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
    // newFiles.push({
    //   filename: newTitleText.content,
    //   date: file.date,
    //   downloadUrl: file.downloadUrl,
    // });

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
