This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: node_modules/, *.json, *.md
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
components/
  common/
    datePicker.tsx
    dayPicker.tsx
    editableText.tsx
    editableTextarea.tsx
    hourPicker.tsx
    image.tsx
    reorder-list.tsx
    video.tsx
  features/
    album/
      albumForm.tsx
      albumSection.tsx
      albumTabsTrigger.tsx
      musicUrlForm.tsx
    backup/
      download-state-button.tsx
      upload-state-button.tsx
    dates/
      addDateDialog.tsx
      calendarComponent.tsx
      calendarDialog.tsx
      dateList.tsx
      datePresentation.tsx
      datesAccordion.tsx
    image-editor/
      addImageButton.tsx
      imageCropper.tsx
      imageForm.tsx
    media/
      picturesContainter.tsx
      picturesGallery.tsx
      videoGallery.tsx
      videoGalleryForm.tsx
      videoWindowForm.tsx
    posts/
      post-form.tsx
      post-section.tsx
      post.tsx
    trombinoscope/
      addTrombinoscopeItem.tsx
      trombinoscope.tsx
      trombinoscopeItem.tsx
  layout/
    classicPageLayout.tsx
    footer.tsx
    header.tsx
    navbar.tsx
    paragraphGroup.tsx
  ui/
    accordion.tsx
    button.tsx
    buttonMinus.tsx
    buttonPlus.tsx
    calendar.tsx
    card.tsx
    caroussel.tsx
    checkbox.tsx
    context-menu.tsx
    dialog.tsx
    field.tsx
    form.tsx
    input-group.tsx
    input.tsx
    label.tsx
    logo.tsx
    navButton.tsx
    select.tsx
    separator.tsx
    skeleton.tsx
    socialLinksGroup.tsx
    sonner.tsx
    spinner.tsx
    switch.tsx
    tabs.tsx
    textarea.tsx
  windows/
    devToolsWindow.tsx
    imageWindow.tsx
    videoWindow.tsx
    window.tsx
    windowsManager.tsx
config/
  constants.ts
  frontendFormSchemas.ts
  placeholders.ts
doc/
  Charte graphique Desinvolts-1.pdf
  data-constraints.md
  data-dictionnary.md
  Looping1.lo1
  Looping1.loo
  LoopingImage.jpg
  map.png
  use-case.wsd
  user-stories.md
hooks/
  forms/
    useAlbumForm.ts
    useAlbumUrlForm.ts
    useConnexionForm.ts
    useDateForm.ts
    useImageForm.ts
    usePostForm.ts
    useTrombinoscopeItemForm.ts
    useVideoGalleryForm.ts
    useVideoWindowForm.ts
  useBannerScroll.ts
  useCaroussel.ts
  useDateNav.ts
  useEditableText.ts
  useEditableTextArea.ts
  useImageCrop.ts
  useParagraphGroup.ts
  useRaisedShadow.ts
  useReorderLink.ts
  useStateProvider.ts
  useTime.ts
  useTrombinoscopeItem.ts
  useVideo.ts
  useWindowControls.ts
  useWindowManager.ts
lib/
  apiHandler.ts
  devTools.ts
  logger.ts
  utils.ts
pages/
  _error/
    +Page.tsx
  assets/
    +Page.tsx
  connexion/
    +Page.tsx
    Connexion.telefunc.ts
  contact/
    +Page.tsx
  dates/
    +Page.tsx
  groupe/
    +Page.tsx
  index/
    +Page.tsx
  médias/
    +Page.tsx
    getVideo.elefunc.ts
  nous-écouter/
    +Page.tsx
  +config.ts
  +data.ts
  +Head.tsx
  +Layout.tsx
  +onCreatePageContext.ts
  getAllPageContent.telefunc.ts
  handleStateChange.telefunc.ts
  setAllPageContent.telefunc.ts
providers/
  adminProvider.tsx
  mouseProvider.tsx
  screenSizeProvider.tsx
  stateProvider.tsx
  windowsProvider.tsx
public/
  assets/
    banner.png
    cover.png
    group-pres-img.png
    homedates.png
    img-placeholder.webp
    logo.svg
    member1.png
    member2.png
    member3.png
    member4.png
    member5.png
  fonts/
    ContrailOne-Regular.woff
    ContrailOne-Regular.woff2
    Overpass-Regular.woff
    Overpass-Regular.woff2
    RoadRage.woff
    RoadRage.woff2
    ZingRustDemo-Base.woff
    ZingRustDemo-Base.woff2
server/
  cloud/
    file.ts
    OpenStackSdk.ts
    streamToBuffer.ts
  config/
    openStack.ts
  controller/
    controller.ts
    file-controller.ts
  entry.ts
  file-upload-handler.ts
  telefunc-handler.ts
styleSheets/
  Layout.css
  tailwind.css
  typography.css
types/
  contexts.ts
  db.ts
  general.ts
  page-contents.ts
  server.ts
  window.ts
.gitignore
dockerfile.dev
dockerfile.prod
notes.txt
tailwind.config.js
vite.config.ts
```

# Files

## File: components/common/datePicker.tsx
```typescript
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogDescription } from "../ui/dialog";
import { ClientOnly } from "vike-react/ClientOnly";
import { useAdmin } from "@/providers/adminProvider";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/lib/utils";

export default function DatePicker({
  dayValue,
  className = "",
  as: Tag = "span",
  onValueChange,
}: {
  dayValue: Date;
  className?: string;
  as?: React.ElementType;
  onValueChange: (date: Date) => void;
}) {
  const { isAdmin } = useAdmin();

  const handleDayChange = (date: Date | undefined) => {
    if (!date) return;
    onValueChange(date);
  };

  if (isAdmin) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={"hover:bg-muted rounded cursor-pointer w-fit! " + className}>
              {formatDate(dayValue)}
            </Tag>
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogTitle className="hidden">Un sélécteur d'heures</DialogTitle>
            <DialogDescription className="hidden">Un sélécteur d'heures</DialogDescription>
            <div>
              <Calendar
                captionLayout="dropdown"
                mode="single"
                className="rounded-lg shadow-sm w-[25rem] [--cell-size:4rem]"
                selected={dayValue}
                datesWithEvents={[]}
                defaultMonth={dayValue}
                onSelect={handleDayChange}
              />
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    );
  } else return <Tag className={className}>{formatDate(dayValue)}</Tag>;
}
```

## File: components/common/dayPicker.tsx
```typescript
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogDescription } from "../ui/dialog";
import { ClientOnly } from "vike-react/ClientOnly";
import { useAdmin } from "@/providers/adminProvider";
import { Calendar } from "../ui/calendar";

export default function DayPicker({
  date,
  className = "",
  as: Tag = "span",
  onValueChange,
}: {
  date: Date;
  className?: string;
  as?: React.ElementType;
  onValueChange: (date: Date) => void;
}) {
  const { isAdmin } = useAdmin();

  const handleDayChange = (date: Date | undefined) => {
    if (!date) return;
    onValueChange(date);
  };

  if (isAdmin) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={"hover:bg-muted rounded cursor-pointer w-fit! " + className}>
              {date.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Tag>
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogTitle className="hidden">Un sélécteur d'heures</DialogTitle>
            <DialogDescription className="hidden">Un sélécteur d'heures</DialogDescription>
            <div>
              <Calendar
                captionLayout="dropdown"
                mode="single"
                className="rounded-lg shadow-sm w-[25rem] [--cell-size:4rem]"
                selected={date}
                datesWithEvents={[]}
                defaultMonth={date}
                onSelect={handleDayChange}
              />
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    );
  } else
    return (
      <Tag className={className}>
        {date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Tag>
    );
}
```

## File: components/common/editableText.tsx
```typescript
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
```

## File: components/common/editableTextarea.tsx
```typescript
import useEditableTextArea from "@/hooks/useEditableTextArea";
import { useAdmin } from "@/providers/adminProvider";
import { Hyperlink } from "@/types/dist/types/db-public";
import { EditableTextAreaProps } from "@/types/general";
import { useEffect, useMemo, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function EditableTextarea(props: EditableTextAreaProps) {
  const { className = "", content, setContent, as: Tag = "span" } = props;
  const { isAdmin, isHyperlink, convertToString, parsed } = useEditableTextArea(props);

  if (isAdmin) {
    return (
      <TextareaAutosize
        // ref={textareaRef}
        value={convertToString(parsed)}
        onChange={(e) => {
          setContent({
            ...content,
            content: e.target.value,
          });
        }}
        className={className + " size-min w-full text-center resize-none"}
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
        ),
      )}
    </Tag>
  );
}
```

## File: components/common/hourPicker.tsx
```typescript
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogDescription } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ClientOnly } from "vike-react/ClientOnly";
import { useAdmin } from "@/providers/adminProvider";
import useTime from "@/hooks/useTime";

export default function HourPicker({
  date,
  className = "",
  as: Tag = "span",
  onValueChange,
}: {
  date: Date;
  className?: string;
  as?: React.ElementType;
  onValueChange: (date: Date) => void;
}) {
  const { isAdmin } = useAdmin();

  const { updateHour, updateMinutes } = useTime(date, onValueChange);

  if (isAdmin) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={"hover:bg-muted rounded cursor-pointer " + className}>
              {String(date.getHours()).padStart(2, "0")}:
              {String(date.getMinutes()).padStart(2, "0")}
            </Tag>
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogTitle className="hidden">Un sélécteur d'heures</DialogTitle>
            <DialogDescription className="hidden">Un sélécteur d'heures</DialogDescription>
            <h3 className="title">Sélectionnez une heure</h3>
            <div className="flex w-fit justify-center items-center gap-5">
              <Select defaultValue={String(date.getHours())} onValueChange={updateHour}>
                <SelectTrigger className="w-[5rem] text-center subtitle-xl">
                  <SelectValue className="subtitle-xl" />
                </SelectTrigger>

                <SelectContent className="w-[5rem] min-w-[5rem] !min-w-[5rem] h-[20rem] min-h[20rem] overflow-y-auto ">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <SelectItem
                      value={String(index)}
                      key={index}
                      className="w-min flex justify-center items-center text-center align-center subtitle-xl"
                    >
                      {String(index).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="subtitle-xl">:</span>
              <Select defaultValue={String(date.getMinutes())} onValueChange={updateMinutes}>
                <SelectTrigger className="w-[5rem] text-center subtitle-xl">
                  <SelectValue className="subtitle-xl" />
                </SelectTrigger>
                <SelectContent className="w-[5rem] min-w-[5rem] !min-w-[5rem] h-[20rem] min-h[20rem] overflow-y-auto">
                  {Array.from({ length: 60 }).map((_, index) => (
                    <SelectItem
                      key={index}
                      value={String(index)}
                      className="w-min flex justify-center items-center text-center align-center subtitle-xl"
                    >
                      {String(index).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    );
  } else
    return (
      <ClientOnly>
        <Tag className={className}>
          {String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}
        </Tag>
      </ClientOnly>
    );
}
```

## File: components/common/image.tsx
```typescript
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowDownUp, X } from "lucide-react";
import AddImageButton from "../features/image-editor/addImageButton";
import { Image as ImageDb } from "@/types/dist/types/db-public";
import { Skeleton } from "../ui/skeleton";
import { useAdmin } from "@/providers/adminProvider";
import { useEffect, useRef, useState } from "react";

export interface ImageProps {
  width?: number;
  height?: number;
  imageProps: ImageDb;
  onChange: (newImage: ImageDb) => void;
  onRemove?: () => void;

  changeButtonSideY?: "top" | "bottom";
}

export default function Image(props: ImageProps) {
  const { imageProps, onChange, onRemove, changeButtonSideY = "top" } = props;
  const { isAdmin } = useAdmin();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);

  const getUrl = (src: string): string => {
    const params = new URLSearchParams();

    if (props.width != null) params.append("width", String(props.width));
    if (props.height != null) params.append("height", String(props.height));

    const query = params.toString();

    return `/image/${encodeURIComponent(src)}${query ? `?${query}` : ""}`;
  };

  useEffect(() => {
    setLoadingState(true);
  }, [imageProps.source]);

  if (isAdmin) {
    return (
      <div className="w-full h-full relative" ref={containerRef}>
        <div
          className={`absolute left-2 pointer-events-auto ${changeButtonSideY === "top" ? "top-2" : "bottom-2"}`}
        >
          <AddImageButton onImage={onChange}>
            <ArrowDownUp className="hover:stroke-primary" />
          </AddImageButton>
        </div>
        {onRemove && (
          <div className="absolute right-2 top-2">
            <button onClick={onRemove} className="cursor-pointer" type="button">
              <X className="hover:stroke-primary" />
            </button>
          </div>
        )}
        {
          <img
            height={props.height}
            width={props.width}
            ref={imgRef}
            src={getUrl(props.imageProps.source)}
            alt={imageProps.alt ?? ""}
            className="w-full h-full object-cover pointer-events-none"
            onLoad={() => setLoadingState(false)}
          />
        }
      </div>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="relative flex items-center justify-center w-full h-full"
            ref={containerRef}
          >
            <img
              height={props.height}
              width={props.width}
              ref={imgRef}
              src={getUrl(props.imageProps.source)}
              alt={imageProps.alt ?? ""}
              className="w-full h-full object-cover pointer-events-none"
              onLoad={() => setLoadingState(false)}
            />

            {loadingState && <Skeleton className="absolute inset-0 z-9" />}
          </div>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-transparent p-0 flex items-center justify-center min-w-0 min-h-0 h-min w-min">
          <DialogTitle className="hidden">Une image du groupe Desinvolts</DialogTitle>

          <img
            height={props.height}
            width={props.width}
            src={getUrl(props.imageProps.source)}
            alt={imageProps.alt ?? ""}
            className="max-w-[70vw] max-h-[70vh] object-cover"
          />
        </DialogContent>
      </Dialog>
    );
  }
}
```

## File: components/common/reorder-list.tsx
```typescript
"use client";
import React, { useState, useEffect } from "react";

import { Grip } from "lucide-react";
import { Reorder, useDragControls, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

const ReorderList: React.FC<ReorderListProps> = ({
  className,
  itemClassName,
  withDragHandle = false,
  onReorderFinish,
  ...props
}) => {
  const [items, setItems] = useState<React.ReactElement[]>(
    React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child),
    ) as React.ReactElement[],
  );
  const [isDragging, setIsDragging] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<React.ReactElement[] | null>(null);

  useEffect(() => {
    const newItems = React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child),
    ) as React.ReactElement[];
    setItems(newItems);
  }, [props.children]);

  const handleReorder = (newOrder: unknown[]) => {
    const ordered = newOrder as React.ReactElement[];
    setItems(ordered);
    setPendingOrder(ordered);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (pendingOrder) {
      onReorderFinish?.(pendingOrder);
      setPendingOrder(null);
    }
  };

  return (
    <Reorder.Group
      data-slot="reorder-list-group"
      axis="y"
      className={cn("flex flex-col gap-1 select-none list-none !p-0 !m-0", className)}
      values={items}
      onReorder={handleReorder}
      {...props}
    >
      {items.map((item, index) => (
        <ReorderListItem
          key={item?.key || index}
          item={item}
          withDragHandle={withDragHandle}
          className={itemClassName}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </Reorder.Group>
  );
};

const ReorderListItem: React.FC<{
  item: React.ReactElement;
  className?: string;
  withDragHandle?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}> = ({ item, className, withDragHandle = false, onDragStart, onDragEnd }) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      data-slot="reorder-list-item"
      id={item?.key ?? ""}
      value={item}
      className={cn(" list-none !p-0 !m-0", !withDragHandle ? "cursor-grab" : "", className)}
      style={{ y }}
      dragListener={!withDragHandle}
      dragControls={withDragHandle ? dragControls : undefined}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {withDragHandle ? (
        <div className="relative flex items-center gap-2">
          {React.isValidElement<{ className?: string }>(item)
            ? React.cloneElement(item, {
                className: cn("pr-5 w-full", item.props.className),
              })
            : item}
          <Grip
            className="size-4 absolute cursor-grab right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
            onPointerDown={(e) => dragControls.start(e)}
          />
        </div>
      ) : (
        item
      )}
    </Reorder.Item>
  );
};

export interface ReorderListProps extends Partial<React.ComponentProps<typeof Reorder.Group>> {
  children: React.ReactElement[];
  className?: string;
  itemClassName?: string;
  withDragHandle?: boolean;
  onReorderFinish?: (newOrder: React.ReactElement[]) => void;
}

export { ReorderList };
```

## File: components/common/video.tsx
```typescript
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";
import useVideo from "@/hooks/useVideo";

export interface VideoProps {
  url?: string;
  onClose?: () => void;
}

export default function Video(props: VideoProps) {
  const {
    url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
    onClose = () => {},
  } = props;

  const { getVideoThumbnail, isAdmin, loadingState, videoId, setLoadingState, imgRef } =
    useVideo(props);

  if (videoId) {
    return (
      <Dialog>
        <div className="w-full h-full relative">
          <div className="relative flex items-center justify-center w-full h-full">
            {loadingState && (
              <div className="absolute inset-0 flex items-center justify-center z-[-1]">
                <Spinner className="w-[50%] h-auto! aspect-square" />
              </div>
            )}
            <img
              src={getVideoThumbnail(videoId)}
              className="w-full h-full object-cover pointer-events-none"
              ref={imgRef}
              onLoad={() => setLoadingState(false)}
            />
          </div>
          {isAdmin && (
            <div className="absolute right-2 top-2 flex gap-2 z-50">
              <button
                type="button"
                className="cursor-pointer rounded-full aspect-square"
                onClick={onClose}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <X className="hover:stroke-primary" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <DialogTrigger asChild>
              <button
                className="cursor-pointer opacity-50 hover:opacity-100"
                aria-label="Ouvrir le player youtube de la vidéo"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Play className="fill-foreground " size={64} />
              </button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="overflow-hidden max-w-[90vw] mx-auto md:max-w-[60vw] md:max-h-[70vh]  bg-transparent border-transparent p-0 flex items-center justify-center">
          <DialogTitle className="hidden">Une vidéo youtube du groupe Desinvolts</DialogTitle>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  } else return null;
}
```

## File: components/features/album/albumForm.tsx
```typescript
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import Image from "@/components/common/image";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useAlbumForm } from "@/hooks/forms/useAlbumForm";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export interface AlbumFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AlbumForm({ setOpen }: AlbumFormProps) {
  const { form, formRef, onSubmit } = useAlbumForm({ setOpen });

  return (
    <DialogContent className="flex flex-col justify-center">
      <DialogTitle className="title text-center">Ajouter un album</DialogTitle>

      <DialogDescription className="hidden">
        Un dialogue qui permet d'ajouter un album
      </DialogDescription>
      <Form {...form}>
        <form
          id="albumform"
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-5 justify-between"
        >
          {/* IMAGE */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Image</FormLabel>

                <FormControl>
                  <div className="w-full flex flex-col items-center">
                    {field.value ? (
                      <div className="h-50 w-50">
                        <Image
                          width={200}
                          height={200}
                          imageProps={field.value}
                          onChange={(img) => field.onChange({ ...img, label: null })}
                        />
                      </div>
                    ) : (
                      <AddImageButton onImage={(img) => field.onChange({ ...img, label: null })}>
                        <div>Ajouter une image</div>
                      </AddImageButton>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Titre</FormLabel>

                <FormControl>
                  <Input {...field} placeholder="Votre titre" className="italic paragraph" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Description</FormLabel>

                <FormControl>
                  <Textarea {...field} placeholder="Votre description" className="paragraph" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* URLS */}
          <div className="flex flex-col gap-2">
            <div className="title-sm">Url d'intégrations</div>

            <div className="rounded-lg border p-5 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="spotifyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Spotify</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://open.spotify.com/album/..."
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deezerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Deezer</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://www.deezer.com/album/..."
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appleMusicUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Apple Music</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://music.apple.com/.../album/.../123456789"
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button form="albumform" type="submit">
              Envoyer
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
```

## File: components/features/album/albumSection.tsx
```typescript
import ParagraphGroup from "@/components/layout/paragraphGroup";
import ButtonMinus from "@/components/ui/buttonMinus";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useAdmin } from "@/providers/adminProvider";
import { Album } from "@/types/db";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import AlbumTabsTigger from "./albumTabsTrigger";
import MusicUrlForm from "./musicUrlForm";

export default function AlbumSection({
  album,
  albums,
  setAlbums,
}: {
  album: Album;
  albums: Album[];
  setAlbums: (newAlbums: Album[]) => void;
}) {
  const { isAdmin } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);

  const availableUrls = [album.spotifyUrl, album.appleMusicUrl, album.deezerUrl].filter(
    (url) => url !== null,
  );

  const [currentTag, setCurrentTag] = useState<"spotify" | "deezer" | "applemusic">(
    availableUrls[0]?.text.toLowerCase() as "spotify" | "deezer" | "applemusic",
  );

  const updateAlbum = (updates: Partial<Album>) => {
    const filteredAlbums = albums.filter((alb) => alb.id !== album.id);
    setAlbums([...filteredAlbums, { ...album, ...updates }]);
  };

  const removeAlbum = () => {
    setAlbums(albums.filter((alb) => alb.id !== album.id));
  };

  return (
    <section className="pt-[2.5rem] flex flex-col gap-[3rem] min-h-0 items-center relative">
      {isAdmin && (
        <div className="absolute left-[-4rem]">
          <ButtonMinus onClick={removeAlbum} />
        </div>
      )}

      <div className="flex flex-col items-center md:flex-row md:items-start gap-[2rem]">
        <div className="w-[20rem] aspect-square shrink-0 rounded-md overflow-hidden">
          <Image
            width={320}
            height={320}
            imageProps={album.cover}
            onChange={(newImage) => updateAlbum({ cover: newImage })}
          />
        </div>

        <div className="flex flex-col gap-4 items-top max-w-[35rem]">
          <EditableText
            as="h2"
            content={album.title}
            setContent={(newtitle) => updateAlbum({ title: newtitle })}
            className="headline text-center md:text-left shrink-0"
          />
          <div className="flex flex-col gap-3">
            <ParagraphGroup
              as="p"
              content={album.paragraphs}
              onChange={(newParagraphs) => updateAlbum({ paragraphs: newParagraphs })}
              classNameForEachParagraph="text-center md:text-left paragraph"
            />
          </div>
        </div>
      </div>
      <Tabs
        defaultValue={currentTag}
        className="w-full"
        onValueChange={(value) => setCurrentTag(value as "spotify" | "deezer" | "applemusic")}
      >
        <div className="w-full flex justify-center">
          <TabsList className="rounded-full">
            {availableUrls.map((url, index) => (
              <AlbumTabsTigger availableUrls={availableUrls} index={index} url={url} />
            ))}
          </TabsList>
        </div>

        {availableUrls.map((url) => (
          <TabsContent
            key={url.text}
            value={url.text}
            forceMount
            className="data-[state=inactive]:hidden relative"
          >
            {isAdmin && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <div className="absolute right-[-3rem]">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full aspect-square"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <ArrowDownUp className="hover:stroke-primary" />
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <MusicUrlForm
                    currentTag={currentTag}
                    album={album}
                    updateAlbum={updateAlbum}
                    setDialogOpen={setDialogOpen}
                  />
                </DialogContent>
              </Dialog>
            )}

            <iframe
              src={url.link}
              width="100%"
              height="500"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
```

## File: components/features/album/albumTabsTrigger.tsx
```typescript
import { TabsTrigger } from "@/components/ui/tabs";
import { NavLink } from "@/types/dist/types/db-public";

export default function AlbumTabsTigger({
  index,
  url,
  availableUrls,
}: {
  index: number;
  url: NavLink;
  availableUrls: NavLink[];
}) {
  const isFirst = index === 0;
  const isLast = index === availableUrls.length - 1;
  const roundedClass = `${isFirst && "rounded-s-full"} ${isLast && "rounded-e-full"}`;

  return (
    <div className={`${roundedClass} overflow-hidden`} key={url.text}>
      <TabsTrigger value={url.text} className="rounded-sm">
        {url.text}
      </TabsTrigger>
    </div>
  );
}
```

## File: components/features/album/musicUrlForm.tsx
```typescript
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAlbumUrlForm } from "@/hooks/forms/useAlbumUrlForm";
import { Album } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";

export interface MusicUrlForm {
  currentTag: "spotify" | "deezer" | "applemusic";
  album: Album;
  updateAlbum: (updates: Partial<Album>) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MusicUrlForm(props: MusicUrlForm) {
  const { currentTag } = props;
  const { form, formValue, handleUrlChange, onSubmit } = useAlbumUrlForm(props);

  return (
    <>
      <DialogTitle className="hidden">Un formulaire d'url</DialogTitle>
      <DialogDescription className="hidden">Un formulaire d'url</DialogDescription>
      <form
        id="musicurlform"
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="subtitle mb-5">Url de l'album {currentTag}</FieldLabel>

              <Input
                placeholder={`https://${currentTag}.com/...`}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleUrlChange(e.currentTarget.value);
                }}
                aria-invalid={fieldState.invalid}
              />

              {formValue && (
                <iframe
                  src={formValue}
                  width="100%"
                  height="500"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="mt-2"
                />
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-end">
          <Button form="musicurlform" type="submit" className="mt-2">
            Ajouter
          </Button>
        </div>
      </form>
    </>
  );
}
```

## File: components/features/backup/download-state-button.tsx
```typescript
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import { getAllPageStates } from "@/pages/getAllPageContent.telefunc";

export default function DonwloadStateButton() {
  const handleDownload = async () => {
    const states = await getAllPageStates();
    const dataStr = JSON.stringify(states, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    logger.info("All pages: ", states);
    link.href = url;
    link.download = `backup-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Button onClick={handleDownload} type="button">
      Télécharger la sauvegarde
    </Button>
  );
}
```

## File: components/features/backup/upload-state-button.tsx
```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logger } from "@/lib/logger";
import { setAllPages } from "@/pages/setAllPageContent.telefunc";
import { ChangeEvent, useRef } from "react";

export default function UploadStateButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      console.info(json);

      const res = await setAllPages(json);
      window.location.reload();
    } catch (err) {
      logger.error("Erreur lecture JSON :", err);
    }
  };
  return (
    <div>
      <Input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button onClick={handleClick} variant={"outline"} type="button">
        Importer une sauvegare
      </Button>
    </div>
  );
}
```

## File: components/features/dates/addDateDialog.tsx
```typescript
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import ButtonPlus from "@/components/ui/buttonPlus";
import DayPicker from "@/components/common/dayPicker";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HourPicker from "@/components/common/hourPicker";
import Image from "@/components/common/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateEvent } from "@/types/db";
import { useEffect, useState } from "react";
import useDateForm from "@/hooks/forms/useDateForm";
import { logger } from "@/lib/logger";

export default function AddDateDialog({ onDate }: { onDate: (newDate: DateEvent) => void }) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useDateForm({
    onDate: (date) => {
      logger.info("Date ajoutée");
      setOpen(false);
      onDate(date);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonPlus onClick={() => setOpen(true)} />
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-center">
        <DialogTitle className="title text-center">Ajouter une date</DialogTitle>

        <Form {...form}>
          <form
            id="adddateform"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-5"
          >
            {/* Titre */}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormLabel className="subtitle">Image</FormLabel>

                  <FormControl>
                    {field.value ? (
                      <div className="h-50 w-50">
                        <Image
                          width={200}
                          height={200}
                          imageProps={field.value}
                          onChange={(img) => form.setValue("image", { ...img, label: null })}
                        />
                      </div>
                    ) : (
                      <AddImageButton
                        onImage={(img) => form.setValue("image", { ...img, label: null })}
                      >
                        <div>Ajouter une image</div>
                      </AddImageButton>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="subtitle">Titre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Titre de l'événement"
                      className="italic paragraph"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="subtitle">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" className="paragraph" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between gap-4">
              {/* Jour */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1 gap-2">
                    <FormLabel className="subtitle">Jour: </FormLabel>
                    <FormControl>
                      <DayPicker
                        date={field.value}
                        onValueChange={(newDate) => {
                          field.onChange(
                            new Date(
                              newDate.getFullYear(),
                              newDate.getMonth(),
                              newDate.getDate(),
                              field.value.getHours(),
                              field.value.getMinutes(),
                            ),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Heure */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1 gap-2">
                    <FormLabel className="subtitle">Heure: </FormLabel>
                    <FormControl>
                      <HourPicker
                        date={field.value}
                        onValueChange={(newDate) => {
                          field.onChange(
                            new Date(
                              field.value.getFullYear(),
                              field.value.getMonth(),
                              field.value.getDate(),
                              newDate.getHours(),
                              newDate.getMinutes(),
                            ),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-col flex">
              <Label className="subtitle">Lieu</Label>
              <div className="flex w-full gap-4">
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Rue" className="paragraph" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Ville" className="paragraph" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" form="adddateform">
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

## File: components/features/dates/calendarComponent.tsx
```typescript
import { Calendar } from "@/components/ui/calendar";
import { logger } from "@/lib/logger";
import { DateEvent } from "@/types/db";

export default function CalendarComponent({
  dates,
  currentDate,

  setCurrentIndex,
}: {
  dates: DateEvent[];
  currentDate: DateEvent;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const handleSelect = (date?: Date) => {
    if (!date) return;

    const dateEvent = dates.findIndex((d) => isSameDay(d.date, date));
    if (!dateEvent) return logger.error("Date non trouvée");

    setCurrentIndex(dateEvent);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-y-auto items-center gap-5 w-[15rem] md:w-[25rem]">
      <div className="">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          className="rounded-lg shadow-sm w-[15rem] md:w-[25rem] [--cell-size:4rem] border"
          selected={currentDate.date}
          datesWithEvents={dates.map((dateEvent) => dateEvent.date)}
          defaultMonth={currentDate.date}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
```

## File: components/features/dates/calendarDialog.tsx
```typescript
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DateEvent } from "@/types/db";
import { CalendarDays } from "lucide-react";
import CalendarComponent from "./calendarComponent";

export function CalendarDialogButton({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="cursor-pointer" onClick={() => setOpen(true)} type="button">
      <CalendarDays />
    </button>
  );
}

export function CalendarDialog({
  dates,
  currentDate,
  setCurrentIndex,
  open,
  setOpen,
}: {
  dates: DateEvent[];
  currentDate: DateEvent;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="p-0 m-0 border-none flex items-top justify-center w-min h-min bg-transparent">
        <DialogTitle className="hidden">Calendrier</DialogTitle>
        <CalendarComponent
          dates={dates}
          currentDate={currentDate}
          setCurrentIndex={setCurrentIndex}
        />
      </DialogContent>
    </Dialog>
  );
}
```

## File: components/features/dates/dateList.tsx
```typescript
import EditableText from "@/components/common/editableText";
import { DateEvent } from "@/types/db";

export default function DateList({
  dates,
  currentIndex,
  setCurrentIndex,
  allDates,
  setDates,
}: {
  dates: DateEvent[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  allDates: DateEvent[];
  setDates: (dates: DateEvent[]) => void;
}) {
  const currentDate = allDates[currentIndex];

  return (
    <div className="flex flex-col w-full">
      {dates.map((date, index) => (
        <div
          key={date.id}
          onClick={() => {
            const newIndex = allDates.findIndex((d) => d.id === date.id);
            if (newIndex !== -1) setCurrentIndex(newIndex);
          }}
          className={`cursor-pointer hover:bg-muted ${
            currentDate?.id === date.id && "bg-[var(--muted-second)]"
          }`}
        >
          <div className={`flex flex-col md:mx-4 py-4 ${index < dates.length - 1 && "border-b"}`}>
            <EditableText
              className="title-sm text-left"
              content={date.title}
              setContent={(newText) => {
                setDates(allDates.map((d) => (d.id === date.id ? { ...d, title: newText } : d)));
              }}
            />
            <div className="paragraph italic text-muted-foreground text-xs truncate text-left">
              {date.paragraphs.map((d) => d.paragraph.content + " ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## File: components/features/dates/datePresentation.tsx
```typescript
import ParagraphGroup from "@/components/layout/paragraphGroup";
import DayPicker from "@/components/common/dayPicker";
import EditableText from "@/components/common/editableText";
import HourPicker from "@/components/common/hourPicker";
import Image from "@/components/common/image";
import NavButton from "@/components/ui/navButton";
import { useSize } from "@/providers/screenSizeProvider";
import { DateEvent } from "@/types/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarDialog, CalendarDialogButton } from "./calendarDialog";
import { useAdmin } from "@/providers/adminProvider";
import AddDateDialog from "./addDateDialog";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import ButtonMinus from "@/components/ui/buttonMinus";

export default function DatePresentation({
  dates,
  currentIndex,
  setCurrentIndex,

  setDates,
}: {
  currentIndex: number;
  dates: DateEvent[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDates: (dates: DateEvent[]) => void;
}) {
  const { isAdmin } = useAdmin();
  const size = useSize();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const goPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const goNext = () => currentIndex < dates.length - 1 && setCurrentIndex(currentIndex + 1);

  const currentDate = dates[currentIndex];

  if (!currentDate) return null;

  if (currentDate) {
    return (
      <>
        <div className="flex flex-col w-full items-center gap-4 p-4" key={currentIndex}>
          <div className="flex w-full justify-between items-center">
            <NavButton disabled={currentIndex === 0} onClick={goPrev}>
              <ChevronLeft />
              précédent
            </NavButton>
            <NavButton disabled={currentIndex === dates.length - 1} onClick={goNext}>
              suivant
              <ChevronRight />
            </NavButton>
          </div>

          <EditableText
            as="h2"
            content={currentDate.title}
            setContent={(newText) => {
              setDates(dates.map((d, i) => (i === currentIndex ? { ...d, title: newText } : d)));
            }}
            className="title"
          />
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-center w-full max-w-[50rem] gap-4">
            <div className="w-[15rem] md:w-[20rem] aspect-2/3 overflow-hidden rounded-md">
              <Image
                key={currentDate.id}
                width={320}
                height={480}
                imageProps={currentDate.image}
                onChange={(newImage) => {
                  setDates(
                    dates.map((d, i) => (i === currentIndex ? { ...d, image: newImage } : d)),
                  );
                }}
              />
            </div>

            <div
              className={`flex flex-1 flex-col gap-3 cursor-pointer`}
              onClick={() => {
                if (size === "sm" || size === "md") setCalendarOpen(true);
              }}
            >
              <div className="w-full border rounded-lg px-4 py-2 flex relative gap-4">
                {size !== "sm" && size !== "md" && (
                  <div className="absolute right-[-2rem] top-0 z-10">
                    <CalendarDialogButton setOpen={setCalendarOpen} />
                    {isAdmin && (
                      <div className="w-full flex justify-center">
                        <ButtonMinus
                          onClick={() =>
                            setDates([...dates.filter((date) => date.id !== currentDate.id)])
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <DayPicker
                    as="p"
                    className="subtitle w-fit"
                    date={currentDate.date}
                    onValueChange={(newDate) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, date: newDate } : d)),
                      );
                    }}
                  />
                  <HourPicker
                    as="p"
                    className="subtitle w-fit"
                    date={currentDate.date}
                    onValueChange={(newDate) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, date: newDate } : d)),
                      );
                    }}
                  />
                </div>
                <div className="flex-1">
                  <EditableText
                    as="p"
                    className="subtitle text-right"
                    content={currentDate.adress}
                    setContent={(newText) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, adress: newText } : d)),
                      );
                    }}
                  />
                  <EditableText
                    as="p"
                    className="subtitle text-right"
                    content={currentDate.city}
                    setContent={(newText) => {
                      setDates(
                        dates.map((d, i) => (i === currentIndex ? { ...d, city: newText } : d)),
                      );
                    }}
                  />
                </div>
              </div>
              <ParagraphGroup
                as="p"
                content={currentDate.paragraphs}
                onChange={(newContent) => {
                  setDates(
                    dates.map((d, i) =>
                      i === currentIndex ? { ...d, description: newContent } : d,
                    ),
                  );
                }}
                classNameForEachParagraph="paragraph text-left"
              />
            </div>
          </div>
          {isAdmin && <AddDateDialog onDate={(newDate) => setDates([...dates, newDate])} />}
        </div>
        <CalendarDialog
          open={calendarOpen}
          setOpen={setCalendarOpen}
          currentDate={currentDate}
          dates={dates}
          setCurrentIndex={setCurrentIndex}
        />
      </>
    );
  }
}
```

## File: components/features/dates/datesAccordion.tsx
```typescript
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import { DateEvent } from "@/types/db";
import { DatesPageContent } from "@/types/page-contents";
import { useMemo } from "react";
import DateList from "./dateList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function NextDates({
  dates,
  currentIndex,
  setCurrentIndex,
  setDates,
}: {
  currentIndex: number;
  dates: DateEvent[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDates: (dates: DateEvent[]) => void;
}) {
  const { pageContext, update } = usePageState<DatesPageContent>(DatesPageContext);
  const { state } = pageContext;

  const upcoming = useMemo(
    () =>
      [...dates]
        .filter((d) => d.date.getTime() > Date.now())
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [dates],
  );

  return (
    <>
      <EditableText
        as="h2"
        className="title text-left"
        content={state.nextTitle}
        setContent={(newContent) => update("nextTitle", newContent)}
      />
      <DateList
        dates={upcoming}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        allDates={dates}
        setDates={setDates}
      />
    </>
  );
}

export function PrevDates({
  dates,
  currentIndex,
  setCurrentIndex,
  setDates,
}: {
  currentIndex: number;
  dates: DateEvent[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDates: (dates: DateEvent[]) => void;
}) {
  const { pageContext, update } = usePageState<DatesPageContent>(DatesPageContext);
  const { state } = pageContext;

  const pastByYear = useMemo(() => {
    return [...dates]
      .filter((d) => d.date.getTime() < Date.now())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce<Record<number, DateEvent[]>>((acc, d) => {
        acc[d.date.getFullYear()] ||= [];
        acc[d.date.getFullYear()].push(d);
        return acc;
      }, {});
  }, [dates]);

  return (
    <>
      <EditableText
        as="h2"
        className="title text-left"
        content={state.prevTitle}
        setContent={(newContent) => update("prevTitle", newContent)}
      />
      <Accordion type="multiple" className="w-full">
        {Object.entries(pastByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearDates]) => (
            <AccordionItem key={year} value={year}>
              <AccordionTrigger className="paragraph">Année {year}</AccordionTrigger>
              <AccordionContent>
                <DateList
                  dates={yearDates}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  allDates={dates}
                  setDates={setDates}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
}
```

## File: components/features/image-editor/addImageButton.tsx
```typescript
import { ReactNode, useEffect, useRef, useState } from "react";
import ButtonPlus from "../../ui/buttonPlus";
import { Dialog } from "../../ui/dialog";
import { Image } from "@/types/dist/types/db-public";
import ImageForm from "./imageForm";
import { createPortal } from "react-dom";

export const CANVAS_WIDTH = 300;
export const RESIZE_HANDLE_SIZE = 20;

export default function AddImageButton({
  children,
  onImage,
}: {
  children?: ReactNode;
  onImage: (image: Image) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImage] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const loadImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    imageFile && setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (imageFile) {
      setDialogOpen(true);
    }
  }, [imageFile]);

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  return (
    <>
      {children ? (
        <button onClick={loadImage} className="cursor-pointer" type="button">
          {children}
        </button>
      ) : (
        <ButtonPlus onClick={loadImage} />
      )}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageLoad}
        accept="image/*"
      />
      {createPortal(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {imageFile && (
            <ImageForm
              image={imageFile}
              onImage={onImage}
              loadImage={loadImage}
              setImage={setImage}
              setDialogOpen={setDialogOpen}
            />
          )}
        </Dialog>,
        document.body,
      )}
    </>
  );
}
```

## File: components/features/image-editor/imageCropper.tsx
```typescript
import { Dispatch, SetStateAction } from "react";
import { Bounds } from "@/types/window";
import useImageCrop from "@/hooks/useImageCrop";
import { CANVAS_WIDTH } from "./addImageButton";

export interface ImageCropperProps {
  imageSrc: string;
  squareArea: Bounds;
  setSquare: Dispatch<SetStateAction<Bounds>>;
}

export default function ImageCropper(props: ImageCropperProps) {
  const { handleImageLoad, overlayCanvasRef, imageRef, imageSrc } = useImageCrop(props);
  return (
    <>
      <div className="relative w-[300px]">
        <canvas ref={overlayCanvasRef} className="absolute top-0 left-0" width={CANVAS_WIDTH} />
        <img src={imageSrc} alt="" onLoad={handleImageLoad} ref={imageRef} className="w-full" />
      </div>
    </>
  );
}
```

## File: components/features/image-editor/imageForm.tsx
```typescript
import { Dispatch, SetStateAction } from "react";
import { DialogContent, DialogDescription, DialogTitle } from "../../ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../../ui/input-group";
import { formatDate } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { Image } from "@/types/dist/types/db-public";
import { useImageForm } from "@/hooks/forms/useImageForm";
import ImageCropper from "./imageCropper";

export interface ImageFormProps {
  image: File;
  setImage: Dispatch<SetStateAction<File | null>>;
  onImage: (image: Image) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  loadImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ImageForm(props: ImageFormProps) {
  const { image, loadImage } = props;
  const { form, handleSubmit, onError, formLoading, squareArea, setSquare } = useImageForm(props);
  return (
    <DialogContent className="flex items-start justify-center max-w-screen w-fit">
      <DialogDescription className="hidden">Un dialogue pour ajouter une image.</DialogDescription>
      <DialogTitle className="hidden">Image dialog</DialogTitle>
      <ImageCropper
        imageSrc={URL.createObjectURL(image)}
        squareArea={squareArea}
        setSquare={setSquare}
      />
      <div className="w-fit">
        <form
          id="form-rhf-image"
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="w-[20rem]"
        >
          <FieldGroup>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <p>
                    <span className="subtitle muted">Modifié le : </span>
                    <span className="paragraph italic">{formatDate(field.value)}</span>
                  </p>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-image-title" className="subtitle">
                    Titre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-image-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={field.value}
                    autoComplete="off"
                    className="paragraph"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-image-content" className="subtitle">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-image-content"
                      placeholder="Une photo du groupe Désinvolts"
                      rows={6}
                      className="min-h-24 resize-none focus:border-none focus-visible:ring-offset-0 paragraph"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums paragraph-sm">
                        {field.value ? field.value.length : 0}/250 caractères
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription className="paragraph">
                    La description d'une image permet une meilleure accessibilité pour les personnes
                    en situtation de handicap ainsi qu'un meilleur référencement par les moteurs de
                    recherche.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field orientation={"horizontal"} className="justify-end">
              <Button
                form="form-rhf-image"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  loadImage(e);
                }}
                variant={"outline"}
              >
                Changer d'image
              </Button>
              <Button type="submit" form="form-rhf-image">
                {formLoading ? <Spinner /> : "Ajouter"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </DialogContent>
  );
}
```

## File: components/features/media/picturesContainter.tsx
```typescript
import WindowsProvider from "@/providers/windowsProvider";
import { FocusEvent, ReactNode, useState } from "react";
import { useAdmin } from "@/providers/adminProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSize } from "@/providers/screenSizeProvider";
import Image from "@/components/common/image";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import { FloatingWindow } from "@/types/dist/types/db-public";
import { MediasPageContent } from "@/types/page-contents";

export default function PicturesContainer({
  showDots,
  children,
}: {
  showDots: boolean;
  children?: ReactNode;
}) {
  const { pageContext, update } = usePageState<MediasPageContent>(MediasPageContext);
  const { state } = pageContext;
  const { isAdmin } = useAdmin();
  const size = useSize();

  const updateChanges = (e: FocusEvent<HTMLInputElement, Element>) => {
    update("config", {
      ...state.config,
      mediaImagesContainerHeight: parseInt(e.currentTarget.value),
    });
  };

  const getY = (win: FloatingWindow) => win.y ?? -Infinity;
  if (size === "sm") {
    return (
      <div className="grid grid-cols-2 w-full gap-3">
        {state.windows
          .sort((a, b) => getY(b) - getY(a))
          .flatMap((window, index) => {
            if (window.image) {
              return (
                <div className="w-full  aspect-2/3 rounded-md overflow-hidden " key={index}>
                  <Image
                    imageProps={{
                      alt: window.image.alt ? window.image.alt : "",
                      id: window.image.id,
                      source: window.image.source,
                    }}
                    onChange={() => {}}
                  />
                </div>
              );
            }
          })}
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-col flex-1 items-center w-full relative`}
        style={{ height: `${state.config.mediaImagesContainerHeight}rem` }}
      >
        <WindowsProvider
          windows={state.windows}
          managerProps={{
            setWindows: (windows) => {
              const filteredWindows = windows.map((w) => ({
                ...w,
                children: undefined,
              }));
              update("windows", filteredWindows);
            },
            showDots: showDots,
            colnumber: 100,
            rowSize: 20,
          }}
        >
          {children}
        </WindowsProvider>
        {isAdmin && (
          <div className="absolute right-[-5rem]">
            <Label htmlFor="size" className="subtitle">
              Hauteur
            </Label>
            <Input
              type="number"
              id="size"
              className="subtitle w-[4rem]"
              defaultValue={state.config.mediaImagesContainerHeight}
              // onChange={handleInputChange}
              onBlur={updateChanges}
            />
          </div>
        )}
      </div>
    );
  }
}
```

## File: components/features/media/picturesGallery.tsx
```typescript
import { useWindows } from "@/providers/windowsProvider";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAdmin } from "@/providers/adminProvider";
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import PLAHECOLDERS from "@/config/placeholders";
import { MediasPageContext } from "@/types/contexts";
import PicturesContainer from "./picturesContainter";
import VideoWindowForm from "./videoWindowForm";
import { Image } from "@/types/dist/types/db-public";
import { Dialog } from "@/components/ui/dialog";
import ImageForm from "../image-editor/imageForm";
import { createPortal } from "react-dom";

export default function PicturesGallery() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;
  const { isAdmin } = useAdmin();
  const [showDots, setShowDots] = useState(true);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const addImageTriggerRef = useRef<() => void>(() => {});
  return (
    <>
      <EditableText
        className="title text-left w-full"
        content={state.pictures_section_title}
        setContent={(newContent) => update("pictures_section_title", newContent)}
        as={"h2"}
      />
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full">
          <PicturesContainer showDots={showDots}>
            {isAdmin && (
              <>
                <VideoWindowForm setOpen={setVideoDialogOpen} isOpen={videoDialogOpen} />
                <AddImageDialog triggerRef={addImageTriggerRef} />
              </>
            )}
          </PicturesContainer>
        </ContextMenuTrigger>
        {isAdmin && (
          <ContextMenuContent className="w-52 overflow-hidden">
            <ContextMenuItem inset onClick={() => setShowDots(!showDots)}>
              {showDots ? "Masquer le cadrillage" : "Afficher le cadrillage"}
            </ContextMenuItem>

            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Ajouter</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem inset onClick={() => addImageTriggerRef.current()}>
                  Image
                </ContextMenuItem>
                <ContextMenuItem inset onClick={() => setVideoDialogOpen(true)}>
                  Vidéo
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </>
  );
}

function AddImageDialog({ triggerRef }: { triggerRef: React.RefObject<() => void> }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImage] = useState<File | null>(null);
  const { addWindow } = useWindows();

  useEffect(() => {
    triggerRef.current = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.click();
      }
    };
  }, []);

  useEffect(() => {
    if (imageFile) {
      setDialogOpen(true);
    }
  }, [imageFile]);

  const onImage = (image: Image) => {
    addWindow({
      ...PLAHECOLDERS.defaultWindow,
      image,
    });
  };

  const loadImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    imageFile && setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (imageFile) {
      setDialogOpen(true);
    }
  }, [imageFile]);

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };
  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageLoad}
        accept="image/*"
      />
      {createPortal(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {imageFile && (
            <ImageForm
              image={imageFile}
              onImage={onImage}
              loadImage={loadImage}
              setImage={setImage}
              setDialogOpen={setDialogOpen}
            />
          )}
        </Dialog>,
        document.body,
      )}
    </>
  );
}
```

## File: components/features/media/videoGallery.tsx
```typescript
import EditableText from "@/components/common/editableText";
import Video from "@/components/common/video";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import VideoGalleryForm from "./videoGalleryForm";

export default function VideoGallery() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;
  return (
    <>
      <EditableText
        className="title text-left w-full"
        content={state.video_section_title}
        setContent={(newContent) => update("video_section_title", newContent)}
        as={"h2"}
      />
      <div className="grid grid-cols-2 md:flex md:flex-wrap w-full min-h-[10rem] gap-3">
        {state.videos.map((video, index) => (
          <div className="w-full md:w-[15rem] aspect-video rounded-md overflow-hidden" key={index}>
            <Video
              url={video.url ?? undefined}
              onClose={() =>
                update(
                  "videos",
                  state.videos.filter((v) => v.id !== video.id),
                )
              }
            />
          </div>
        ))}
        <VideoGalleryForm onVideo={(video) => update("videos", [...state.videos, video])} />
      </div>
    </>
  );
}
```

## File: components/features/media/videoGalleryForm.tsx
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Video as VideoDb } from "@/types/dist/types/db-public";

import { useVideoGalleyProps } from "@/hooks/forms/useVideoGalleryForm";

export interface VideoGalleryProps {
  onVideo: (newVideo: VideoDb) => void;
}

export default function VideoGalleryForm(props: VideoGalleryProps) {
  const { isAdmin } = useAdmin();

  const { form, open, onSubmit, handleChange, setOpen, videoData } = useVideoGalleyProps(props);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isAdmin && (
          <div className="w-[15rem] aspect-video flex items-center justify-center">
            <ButtonPlus onClick={() => {}} />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="space-y-8 bg-background border rounded-lg p-5 w-3xl">
        <Form {...form}>
          <form
            id="videogalleryform"
            onClick={(e) => e.stopPropagation()}
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormLabel className="subtitle mb-5">Url de la vidéo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?=..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                  {videoData && (
                    <div className="flex gap-3">
                      <img
                        className="w-2xs"
                        src={videoData.thumbnail_url}
                        alt={`l'image d'une vidéo de ${videoData.author_name}`}
                      ></img>
                      <div className="flex flex-col gap-2 mt-3">
                        <p className="subtitle">{videoData.title}</p>
                        <p className="paragraph">{videoData.author_name}</p>
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="float-right mt-2" form="videogalleryform">
              Ajouter
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

## File: components/features/media/videoWindowForm.tsx
```typescript
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useVideoWindowForm } from "@/hooks/forms/useVideoWindowForm";

export interface VideoWindowFormProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
}

export default function VideoWindowForm(props: VideoWindowFormProps) {
  const { isOpen, setOpen } = props;
  const { videoData, form, onSubmit, handleChange } = useVideoWindowForm(props);

  if (isOpen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/60"
        onClick={() => setOpen(false)}
      >
        <Form {...form}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-background border rounded-lg p-5 w-3xl"
          >
            <FormField
              control={form.control}
              name="url"
              id="videowindowform"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormLabel className="subtitle mb-5">Url de la vidéo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?=..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                  {videoData && (
                    <div className="flex gap-3">
                      <img
                        className="w-2xs"
                        src={videoData.thumbnail_url}
                        alt={`l'image d'une vidéo de ${videoData.author_name}`}
                      ></img>
                      <div className="flex flex-col gap-2 mt-3">
                        <p className="subtitle">{videoData.title}</p>
                        <p className="paragraph">{videoData.author_name}</p>
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" form="videowindowform" className="float-right mt-2">
              Ajouter
            </Button>
          </form>
        </Form>
      </div>
    );
  } else return null;
}
```

## File: components/features/posts/post-form.tsx
```typescript
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Image from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { PostData } from "@/types/db";
import { usePostForm } from "@/hooks/forms/usePostForm";
import { logger } from "@/lib/logger";

export interface PostFormProps {
  setDialogOpen: (open: boolean) => void;
  onPost: (post: PostData) => void;
}

export default function PostForm(props: PostFormProps) {
  const { handleSubmit, images, form } = usePostForm(props);

  return (
    <DialogContent>
      <DialogDescription className="hidden">
        Un dialogue pour ajouter un nouveau post.
      </DialogDescription>
      <DialogTitle className="hidden">Post dialog</DialogTitle>
      <Card className="unset-all">
        <CardHeader>
          <CardTitle className="title">Créer un post</CardTitle>
          <CardDescription className="paragraph">
            Partagez vos idées ou vos nouvelles publications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-rhf-post"
            onSubmit={(e) => {
              logger.info("POST FORM onSubmit triggered", e.target);
              form.handleSubmit(handleSubmit)(e);
            }}
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-post-title" className="subtitle">
                      Titre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-post-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Mon premier post"
                      autoComplete="off"
                      className="paragraph"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-post-content" className="subtitle">
                      Contenu
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-post-content"
                        placeholder="Écrivez ici votre contenu..."
                        rows={6}
                        className="min-h-24 resize-none focus:border-none focus-visible:ring-offset-0 paragraph"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums paragraph-sm">
                          {field.value ? field.value.length : 0}/500 caractères
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription className="paragraph">
                      Le contenu est optionnel.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="images"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FieldLabel htmlFor="images" className="subtitle">
                      Images
                    </FieldLabel>
                    <div className="flex gap-3">
                      {field.value.map((field, index) => (
                        <Image
                          width={200}
                          height={200}
                          imageProps={field}
                          onChange={(newImage) =>
                            form.setValue(
                              "images",

                              images.map((img) =>
                                img.id === newImage.id ? { ...img, ...newImage } : img,
                              ),
                            )
                          }
                          key={index}
                        />
                      ))}
                      <AddImageButton
                        onImage={(newImage) =>
                          form.setValue("images", [...images, { ...newImage, label: null }])
                        }
                      />
                    </div>
                  </div>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Réinitialiser
            </Button>
            <Button type="submit" form="form-rhf-post">
              Envoyer
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </DialogContent>
  );
}
```

## File: components/features/posts/post-section.tsx
```typescript
import ButtonMinus from "@/components/ui/buttonMinus";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { PostData } from "@/types/db";
import { HomePageContext } from "@/types/contexts";
import PostForm from "./post-form";
import Post from "./post";

export default function PostsSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { isAdmin } = useAdmin();

  const handlePostsChange = (newPost: PostData) => {
    const newPosts = pageContext.state.posts.map((post) => {
      if (post.id === newPost.id) {
        post = newPost;
      }
      return post;
    });
    update("posts", newPosts);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <PostForm
          setDialogOpen={setDialogOpen}
          onPost={(post) => update("posts", [...pageContext.state.posts, post])}
        />
      </Dialog>
      <div className="flex flex-col">
        {pageContext.state.posts
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((post, index) => (
            <div className="relative" key={index}>
              <Post
                props={post}
                onChange={(e) => handlePostsChange(e)}
                borderBottom={index !== pageContext.state.posts.length - 1}
              />
              {isAdmin && (
                <div className="absolute flex items-center -right-8 top-4">
                  <ButtonMinus
                    onClick={() =>
                      update("posts", [...pageContext.state.posts.filter((p) => p.id !== post.id)])
                    }
                  />
                </div>
              )}
            </div>
          ))}
        {isAdmin && (
          <div className="mx-auto w-min">
            <ButtonPlus onClick={() => setDialogOpen(true)} />
          </div>
        )}
      </div>
    </>
  );
}
```

## File: components/features/posts/post.tsx
```typescript
import DatePicker from "@/components/common/datePicker";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import { useAdmin } from "@/providers/adminProvider";
import { PostData } from "@/types/db";
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
  const { isAdmin } = useAdmin();
  return (
    <div
      className={`flex flex-col relative ${borderBottom && "border-border border-b"} ${isAdmin && "!border"} ${
        props.className
      } items-start py-8`}
    >
      <DatePicker
        className="paragraph muted"
        dayValue={props.date}
        onValueChange={(date) => onChange({ ...props, date: date })}
      />
      <EditableText
        content={props.title}
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
        {isAdmin && (
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
```

## File: components/features/trombinoscope/addTrombinoscopeItem.tsx
```typescript
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useRef } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { TrombinoscopeElement } from "@/types/db";
import { useTrombinoscopeItemForm } from "@/hooks/forms/useTrombinoscopeItemForm";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import Image from "@/components/common/image";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

export interface AddTrombinoscopeItemProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  elements: TrombinoscopeElement[];
  onItem: (item: TrombinoscopeElement) => void;
}

export default function AddTrombinoscopeItem(props: AddTrombinoscopeItemProps) {
  const { form, formRef, onSubmit } = useTrombinoscopeItemForm(props);

  return (
    <DialogContent className="flex flex-col justify-center">
      <DialogTitle className="title text-center">Ajouter un Element</DialogTitle>

      <DialogDescription className="hidden">
        Un dialogue qui permet d'ajouter un Element trombinoscope
      </DialogDescription>
      <form
        id="trombinoscopeitemform"
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-5 justify-between"
      >
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Image</FieldLabel>

                <div className="w-full flex flex-col items-center">
                  {field.value ? (
                    <div className="h-50 w-50">
                      <Image
                        width={320}
                        height={320}
                        imageProps={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  ) : (
                    <AddImageButton onImage={field.onChange}>
                      <div>Ajouter une image</div>
                    </AddImageButton>
                  )}
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Titre</FieldLabel>

                <Input
                  {...field}
                  placeholder="Votre titre"
                  className="italic paragraph"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Description</FieldLabel>

                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    placeholder="Votre description"
                    className="paragraph"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Couleur</FieldLabel>

                <HexColorPicker color={field.value} onChange={field.onChange} />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Button type="submit" form="trombinoscopeitemform">
            Envoyer
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
```

## File: components/features/trombinoscope/trombinoscope.tsx
```typescript
import { useEffect, useState } from "react";
import { useAdmin } from "@/providers/adminProvider";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TrombinoscopeElement } from "@/types/db";
import TrombinoscopeItem from "./trombinoscopeItem";
import ButtonPlus from "@/components/ui/buttonPlus";
import AddTrombinoscopeItem from "./addTrombinoscopeItem";

export default function Trombinoscope({
  elements,
  setElements,
}: {
  elements: TrombinoscopeElement[];
  setElements: (newElements: TrombinoscopeElement[]) => void;
}) {
  const { isAdmin } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const onItem = (item: TrombinoscopeElement) => {
    setElements([...elements, item]);
  };
  return (
    <>
      <div className="flex w-full h-full items-center relative gap-2">
        <div className="flex w-full flex-wrap justify-center gap-3 md:gap-0 md:flex-nowrap md:aspect-3/2 overflow-hidden md:rounded-lg">
          {elements
            .sort((a, b) => a.position - b.position)
            .map((element, index) => (
              <TrombinoscopeItem
                element={element}
                elements={elements}
                key={index}
                setElement={(newElement) =>
                  setElements([
                    ...elements.filter((e) => e.position !== newElement.position),
                    newElement,
                  ])
                }
                setElements={setElements}
              />
            ))}
        </div>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <ButtonPlus onClick={() => setDialogOpen(true)} />
            </DialogTrigger>
            <AddTrombinoscopeItem setOpen={setDialogOpen} elements={elements} onItem={onItem} />
          </Dialog>
        )}
      </div>
    </>
  );
}
```

## File: components/features/trombinoscope/trombinoscopeItem.tsx
```typescript
import ParagraphGroup from "@/components/layout/paragraphGroup";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import useTrombinoscopeItem from "@/hooks/useTrombinoscopeItem";
import { TrombinoscopeElement } from "@/types/db";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";
import ButtonMinus from "@/components/ui/buttonMinus";
import AddImageButton from "../image-editor/addImageButton";

export interface TrombinoscopeItemProps {
  element: TrombinoscopeElement;
  elements: TrombinoscopeElement[];
  setElement: (newElement: TrombinoscopeElement) => void;
  setElements: (newElements: TrombinoscopeElement[]) => void;
}

export default function TrombinoscopeItem(props: TrombinoscopeItemProps) {
  const { isAdmin, handleIsHovered, reorderItem, hovered, element, setElement } =
    useTrombinoscopeItem(props);

  return (
    <div
      className="w-[10rem] md:flex-1 relative overflow-hidden rounded-md md:rounded-none"
      onMouseEnter={() => handleIsHovered(true)}
      onMouseLeave={() => handleIsHovered(false)}
      onTouchStart={() => handleIsHovered(true)}
      onTouchEnd={() => handleIsHovered(false)}
    >
      {isAdmin && (
        <div className="absolute top-0 absolute top-0 flex w-full p-2 z-5 justify-between items-center">
          <button
            className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
            onClick={() => reorderItem(-1)}
          >
            <ChevronLeft />
          </button>
          <ButtonMinus
            onClick={() =>
              props.setElements([...props.elements.filter((e) => e.id !== props.element.id)])
            }
          />
          <button
            type="button"
            className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
            onClick={() => reorderItem(1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <div
        className={`absolute inset-0 cursor-pointer  z-1 ${hovered ? "opacity-100" : "opacity-0 md:opacity-100"}`}
      >
        <div className="w-full h-[10rem] md:h-full p-[1rem] relative flex flex-col items-center justify-center">
          <div className="absolute top-[50%] md:top-[40%] left-0 w-full aspect-square h-auto flex items-center -translate-y-1/2">
            <div
              className={`relative
                w-full 
                transition-all! duration-300!
                before:content-[''] before:absolute
                before:left-0 before:top-1/2
                before:w-full before:h-[1px]
                before:transition-all! before:duration-300!
                after:content-[''] after:absolute
                after:left-0 after:top-1/2
                after:w-full after:h-[1px]
                after:transition-all! after:duration-300!
                ${hovered && "h-[5rem] before:rotate-45 after:-rotate-45"}  
                `}
              style={{
                // @ts-ignore
                "--before-bg": `${element.color}`,
                "--after-bg": `${element.color}`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 z-2 flex flex-col justify-start  transition-all! duration-300! px-2 [container-type:inline-size]`}
      >
        <div
          className={`transition-all! duration-300! w-full flex h-[5rem] md:h-[40%] items-end justify-center ${hovered ? "opacity-100 -translate-y-[10cqw] md:-translate-y-[40cqw]" : "opacity-0 md:opacity-100"}`}
        >
          <EditableText
            setContent={(newText) =>
              setElement({ ...element, title: { ...element.title, content: newText.content } })
            }
            content={{ ...element.title, hyperlinks: [] }}
            as={"h2"}
            className="title md:text-[12cqw]!"
          />
        </div>
        <div className="w-full flex h-full md:h-[60%] items-center justify-start flex-col mt-5">
          <ParagraphGroup
            content={element.paragraphs}
            onChange={(newParagraphs) => setElement({ ...element, paragraphs: newParagraphs })}
            className={`transition-all! duration-300! text-center mb-5 paragraph text-xs! md:text-[8cqw]! ${hovered ? "opacity-100 translate-y-[40cqw]" : "opacity-0"}`}
            classNameForEachParagraph="!bg-transparent"
            as={"p"}
          ></ParagraphGroup>
        </div>
        {isAdmin && (
          <div className="h-fit w-full flex justify-center p-2">
            <AddImageButton onImage={(newImage) => setElement({ ...element, image: newImage })}>
              <ArrowDownUp className="hover:stroke-primary" />
            </AddImageButton>
          </div>
        )}
      </div>
      <div
        className={`h-full w-full duration-300! bg-background  ${
          hovered ? "scale-101 blur-sm" : "scale-130"
        }`}
      >
        <Image
          width={160}
          height={600}
          imageProps={element.image}
          onChange={(newImage) => setElement({ ...element, image: newImage })}
        />
      </div>
    </div>
  );
}
```

## File: components/layout/classicPageLayout.tsx
```typescript
import { ReactNode } from "react";
import Footer from "./footer";

export default function ClassicPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden background-noise relative px-3">
      <div className="absolute top-0 left-0 right-0 h-[4rem] z-10">
        <div className="h-full w-full background-noise"></div>
      </div>
      <div className="min-h-screen overflow-y-auto flex flex-col">
        <main className="flex-1 flex flex-col container max-w-[80rem] mx-auto items-center pb-16 gap-8 pt-[4rem] ">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
```

## File: components/layout/footer.tsx
```typescript
import SocialLinksGroup from "../ui/socialLinksGroup";

export default function Footer() {
  return (
    <footer className="flex flex-col w-[99%] mx-auto items-center gap-3 py-3 relative  border-border border-t">
      <SocialLinksGroup />
      {/* <nav className="flex gap-3 w-fit">
        <a className="decoration-solid paragraph text-center">mentions légales</a>
        <a className="decoration-solid paragraph text-center">politique de confidentialité</a>
      </nav> */}
    </footer>
  );
}
```

## File: components/layout/header.tsx
```typescript
import { Context, useMemo } from "react";
import Logo from "../ui/logo";
import Navbar, { MobileNavbar } from "./navbar";
import { useSize } from "@/providers/screenSizeProvider";
import { StateContent, usePageState } from "@/providers/stateProvider";
import { BasePageContent } from "@/types/page-contents";
import { NavLink } from "@/types/dist/types/db-public";

export default function Header<S extends BasePageContent>({
  context,
}: {
  context: Context<StateContent<any> | null>;
}) {
  const { pageContext, update } = usePageState<S>(context);
  const { state } = useMemo(() => pageContext, [pageContext]);
  const size = useSize();
  return (
    <header
      className="flex w-full px-[2rem] h-[4rem] items-center justify-between fixed z-11"
      id="header"
    >
      <Logo />
      {size === "sm" ? (
        <MobileNavbar links={state.navlinks} />
      ) : (
        <Navbar
          links={state.navlinks}
          setLinks={(newLinks: NavLink[]) => {
            update("navlinks", newLinks);
          }}
        />
      )}
    </header>
  );
}
```

## File: components/layout/navbar.tsx
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import ButtonPlus from "../ui/buttonPlus";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { NavLink as NavlinkDb } from "@/types/dist/types/db-public";
import useReorderLink from "@/hooks/useReorderLink";
import getRandomId from "@giapspzoo/get-random-id";

export default function Navbar({
  links,
  setLinks,
}: {
  links: NavlinkDb[];
  setLinks: (newLinks: NavlinkDb[]) => void;
}) {
  const { isAdmin } = useAdmin();
  const [anotherLinkIsHover, setAnotherLinkIsHover] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const path = String(formData.get("link"));
    setLinks([
      ...links,
      {
        text: name,
        position: links.length,
        link: path,
        id: getRandomId(),
      },
    ]);
    e.currentTarget.reset();
  };
  return (
    <nav className="flex items-center">
      {isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <ButtonPlus onClick={() => {}} size="1rem" />
          </DialogTrigger>
          <DialogContent>
            <DialogDescription className="hidden">
              Un dialogue pour ajouter un lien
            </DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <Label className="subtitle" htmlFor="name">
                  Nom du lien
                </Label>
                <Input
                  className="subtitle"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="accueil"
                ></Input>
              </div>
              <div>
                <Label className="subtitle" htmlFor="link">
                  Url du lien
                </Label>
                <Input
                  className="subtitle"
                  type="text"
                  id="link"
                  name="link"
                  placeholder="/accueil"
                ></Input>
              </div>
              <div className="w-full flex justify-end">
                <Button type="submit">Ajouter</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {links
        .sort((a, b) => a.position - b.position)
        .map((link) => (
          <NavLink
            key={link.id}
            link={link}
            links={links}
            setLinks={setLinks}
            anotherLinkIsHover={anotherLinkIsHover}
            setHover={setAnotherLinkIsHover}
            className="subtitle text-xl!"
          />
        ))}
    </nav>
  );
}

export interface NavlinkProps {
  link: NavlinkDb;
  links: NavlinkDb[];
  setLinks: (newLinks: NavlinkDb[]) => void;
  anotherLinkIsHover: boolean;
  setHover: (value: boolean) => void;
  className?: string;
  onClick?: () => void;
}

function NavLink(props: NavlinkProps) {
  const { link, anotherLinkIsHover, setHover, className = "", onClick = () => {} } = props;
  const { isAdmin } = useAdmin();
  const pageContext = usePageContext();
  const isSelected = pageContext.urlPathname === "/" + link.link;
  const { reorderItem, removeItem } = useReorderLink(props);

  return (
    <div
      className="px-2 relative w-fit flex justify-center items-center gap-1"
      onMouseEnter={() => setHover(!isSelected)}
      onMouseLeave={() => setHover(false)}
    >
      {isAdmin && (
        <button
          type="button"
          className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
          onClick={() => reorderItem(-1)}
        >
          <ChevronLeft />
        </button>
      )}
      <a
        href={"/" + link.link}
        className={`${className} ${isSelected && !anotherLinkIsHover ? "selected" : ""} `}
        onClick={onClick}
      >
        {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
      </a>
      {isAdmin && (
        <button
          type="button"
          className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
          onClick={() => reorderItem(1)}
        >
          <ChevronRight />
        </button>
      )}
      {isAdmin && (
        <div className="absolute w-full bottom-[-2rem] h-[2rem] flex justify-center px-1">
          <button
            type="button"
            className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
            onClick={removeItem}
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}

export function MobileNavbar({ links }: { links: NavlinkDb[] }) {
  const [anotherLinkIsHover, setAnotherLinkIsHover] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className="cursor-pointer z-[12] relative h-6 w-6"
      >
        <div
          className={`relative
          flex items-center
          w-full 
          h-full
          transition-all! duration-300!
          before:content-[''] before:absolute
          before:left-0 before:top-0
          before:w-full before:h-[2px]
          before:transition-all! before:duration-300!
          before:bg-foreground
          before:rounded-full
          after:content-[''] after:absolute
          after:left-0 after:bottom-0
          after:w-full after:h-[2px]
          after:transition-all! after:duration-300!
          after:bg-foreground
          after:rounded-full
      ${showMenu && "before:top-1/2 before:-translate-y-1/2 before:rotate-45 after:bottom-1/2 after:translate-y-1/2 after:-rotate-45"}
    `}
        >
          <div
            className={`w-full bg-foreground h-[2px] transition-all! duration-300! ${showMenu && "translate-x-full opacity-0"}`}
          ></div>
        </div>
      </button>
      <div
        className={`fixed w-full top-0 left-0
        transition-[height]! duration-300! ease-in-out! overflow-hidden bg-black/90 ${showMenu ? "h-[100vh]" : "h-0"}`}
      >
        <div className="w-full h-screen flex items-center justify-center relative">
          <nav className="flex flex-col items-center justify-center gap-1">
            {links.map((link) => (
              <MobileNavLink
                link={link}
                key={link.text}
                anotherLinkIsHover={anotherLinkIsHover}
                setHover={setAnotherLinkIsHover}
                className="subtitle text-2xl!"
                onClick={() => setShowMenu(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

interface MobileNavlinkProps {
  link: NavlinkDb;
  anotherLinkIsHover: boolean;
  setHover: (value: boolean) => void;
  className?: string;
  onClick?: () => void;
}

function MobileNavLink(props: MobileNavlinkProps) {
  const { link, anotherLinkIsHover, setHover, className = "", onClick = () => {} } = props;
  const pageContext = usePageContext();
  const isSelected = pageContext.urlPathname === "/" + link.link;

  return (
    <div
      className="px-1"
      onMouseEnter={() => setHover(!isSelected)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={"/" + link.link}
        className={`${className} ${isSelected && !anotherLinkIsHover ? "selected" : ""} `}
        onClick={onClick}
      >
        {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
      </a>
    </div>
  );
}
```

## File: components/layout/paragraphGroup.tsx
```typescript
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
```

## File: components/ui/accordion.tsx
```typescript
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "cursor-pointer flex flex-1 items-center justify-between py-4 font-medium transition-all hover:bg-[var(--muted-secondary)] [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

## File: components/ui/button.tsx
```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex paragraph leading-0! items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## File: components/ui/buttonMinus.tsx
```typescript
import { CircleMinus } from "lucide-react";

export default function ButtonMinus({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className={`hover:bg-[var(--muted-second)] h-[1rem] aspect-square flex items-center justify-center rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <CircleMinus
        className={`w-full h-full stroke-[var(--color-error)] hover:fill-[var(--color-error)] hover:stroke-background cursor-pointer`}
        // className="w-[1.5rem] h-[1.5rem] stroke-[var(--color-error)] hover:fill-[var(--color-error)] hover:stroke-background cursor-pointer"
      />
    </button>
  );
}
```

## File: components/ui/buttonPlus.tsx
```typescript
import { CirclePlus } from "lucide-react";

export default function ButtonPlus({
  onClick,
  size = "3rem",
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: string;
}) {
  return (
    <button
      type="button"
      className={`hover:bg-[var(--muted-second)] h-[${size}] aspect-square flex items-center justify-center rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <CirclePlus className={`w-[${size}] h-[${size}]`} />
    </button>
  );
}
```

## File: components/ui/calendar.tsx
```typescript
"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  datesWithEvents,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  datesWithEvents?: Date[];
}) {
  const defaultClassNames = getDefaultClassNames();

  const isDateDisabled = (date: Date) => {
    if (!datesWithEvents || datesWithEvents.length === 0) {
      return false;
    }
    const dateStr = date.toDateString();
    return !datesWithEvents.some((eventDate) => eventDate.toDateString() === dateStr);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={isDateDisabled}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:4rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-[--cell-size] select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn("bg-muted text-accent-foreground rounded-md ", defaultClassNames.today),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("!size-[1.5rem]", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("!size-[1.5rem]", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("!size-[1.5rem]", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      type="button"
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none rounded-md  data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
```

## File: components/ui/card.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## File: components/ui/caroussel.tsx
```typescript
import Image from "../common/image";

import { useAdmin } from "@/providers/adminProvider";
import AddImageButton from "../features/image-editor/addImageButton";
import useCaroussel from "@/hooks/useCaroussel";
import { Carousel } from "@/types/db";

export interface CarouselProps {
  content: Carousel;
  onChange: (newContent: Carousel) => void;
}

export default function Caroussel({ content, onChange }: CarouselProps) {
  const { isAdmin } = useAdmin();

  const {
    handleImageChange,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    carousselRef,
    chunks,
    lastelementRef,
  } = useCaroussel({
    content,
    onChange,
  });

  const images = content.images || [];

  if (!isAdmin) {
    return (
      <div
        className="w-full overflow-x-auto h-[15rem] items-center flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        ref={carousselRef}
      >
        <div className="flex w-fit overflow-y-visible gap-5">
          {Array.from({ length: chunks }).map((_, chunkIndex) =>
            images
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <div
                  key={chunkIndex * 10 + index + 1}
                  className="relative aspect-square scroll-smooth h-[10rem] w-[10rem] hover:scale-120 hover:z-10 before:content-[''] 
            before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-30 before:transition-opacity 
            overflow-hidden rounded-md before:pointer-events-none"
                  ref={
                    index === images.length - 1 && chunkIndex === chunks - 1 ? lastelementRef : null
                  }
                >
                  <Image
                    width={160}
                    height={160}
                    imageProps={item.image}
                    onChange={handleImageChange}
                  />
                </div>
              )),
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full overflow-x-auto h-[15rem] items-center flex">
        <div className="flex w-fit overflow-y-visible gap-5">
          {Array.from({ length: chunks }).map((_, chunkIndex) =>
            images
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <div
                  key={chunkIndex * 10 + index + 1}
                  className="relative aspect-square scroll-smooth h-[10rem] w-[10rem] hover:scale-120 hover:z-10 before:content-[''] 
            before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-30 before:transition-opacity 
            overflow-hidden rounded-md before:pointer-events-none"
                >
                  <Image
                    width={160}
                    height={160}
                    imageProps={item.image}
                    onChange={handleImageChange}
                    onRemove={() =>
                      onChange({
                        ...content,
                        images: images.filter((i) => i.image.id !== item.image.id),
                      })
                    }
                  />
                </div>
              )),
          )}
          <div className="my-auto">
            <AddImageButton
              onImage={(image) => {
                onChange({
                  ...content,
                  images: [
                    ...images,
                    {
                      image,
                      position:
                        images.length > 0 ? Math.max(...images.map((i) => i.position)) + 1 : 0,
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
```

## File: components/ui/checkbox.tsx
```typescript
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

## File: components/ui/context-menu.tsx
```typescript
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```

## File: components/ui/dialog.tsx
```typescript
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {/* <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close> */}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

## File: components/ui/field.tsx
```typescript
"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field data-[invalid=true]:text-destructive flex w-full gap-3",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start",
        ],
        responsive: [
          "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>[data-slot=field]]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm font-normal leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```

## File: components/ui/form.tsx
```typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

## File: components/ui/input-group.tsx
```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
```

## File: components/ui/input.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

## File: components/ui/label.tsx
```typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

## File: components/ui/logo.tsx
```typescript
export default function Logo() {
  return (
    <a className="unset desktop-logo text-[1.5rem]! sm:text-[2rem]!" href="/">
      Desinvolts
    </a>
  );
}
```

## File: components/ui/navButton.tsx
```typescript
export default function NavButton({
  children,
  onClick,
  disabled,
  reverse,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  reverse?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 subtitle p-1 rounded-full ${
        disabled ? "opacity-70 cursor-not-allowed" : "hover:underline"
      }`}
    >
      {children}
    </button>
  );
}
```

## File: components/ui/select.tsx
```typescript
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

## File: components/ui/separator.tsx
```typescript
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

## File: components/ui/skeleton.tsx
```typescript
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted/20", className)} {...props} />;
}

export { Skeleton };
```

## File: components/ui/socialLinksGroup.tsx
```typescript
export default function SocialLinksGroup() {
  return (
    <nav className="flex gap-5 ">
      <a href="https://www.facebook.com/desinvoltsgroupe/?locale=fr_FR">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
        </svg>
      </a>
      <a href="https://www.instagram.com/desinvolts/">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        </svg>
      </a>
      <a href="https://soundcloud.com/user-976545296">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 640 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M111.4 256.3l5.8 65-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.2-4.4l-5.6-68.3 5.6-65c0-2.2 1.9-4.2 4.2-4.2 2.2 0 4.1 2 4.4 4.2zm21.4-45.6c-2.8 0-4.7 2.2-5 5l-5 105.6 5 68.3c.3 2.8 2.2 5 5 5 2.5 0 4.7-2.2 4.7-5l5.8-68.3-5.8-105.6c0-2.8-2.2-5-4.7-5zm25.5-24.1c-3.1 0-5.3 2.2-5.6 5.3l-4.4 130 4.4 67.8c.3 3.1 2.5 5.3 5.6 5.3 2.8 0 5.3-2.2 5.3-5.3l5.3-67.8-5.3-130c0-3.1-2.5-5.3-5.3-5.3zM7.2 283.2c-1.4 0-2.2 1.1-2.5 2.5L0 321.3l4.7 35c.3 1.4 1.1 2.5 2.5 2.5s2.2-1.1 2.5-2.5l5.6-35-5.6-35.6c-.3-1.4-1.1-2.5-2.5-2.5zm23.6-21.9c-1.4 0-2.5 1.1-2.5 2.5l-6.4 57.5 6.4 56.1c0 1.7 1.1 2.8 2.5 2.8s2.5-1.1 2.8-2.5l7.2-56.4-7.2-57.5c-.3-1.4-1.4-2.5-2.8-2.5zm25.3-11.4c-1.7 0-3.1 1.4-3.3 3.3L47 321.3l5.8 65.8c.3 1.7 1.7 3.1 3.3 3.1 1.7 0 3.1-1.4 3.1-3.1l6.9-65.8-6.9-68.1c0-1.9-1.4-3.3-3.1-3.3zm25.3-2.2c-1.9 0-3.6 1.4-3.6 3.6l-5.8 70 5.8 67.8c0 2.2 1.7 3.6 3.6 3.6s3.6-1.4 3.9-3.6l6.4-67.8-6.4-70c-.3-2.2-2-3.6-3.9-3.6zm241.4-110.9c-1.1-.8-2.8-1.4-4.2-1.4-2.2 0-4.2.8-5.6 1.9-1.9 1.7-3.1 4.2-3.3 6.7v.8l-3.3 176.7 1.7 32.5 1.7 31.7c.3 4.7 4.2 8.6 8.9 8.6s8.6-3.9 8.6-8.6l3.9-64.2-3.9-177.5c-.4-3-2-5.8-4.5-7.2zm-26.7 15.3c-1.4-.8-2.8-1.4-4.4-1.4s-3.1.6-4.4 1.4c-2.2 1.4-3.6 3.9-3.6 6.7l-.3 1.7-2.8 160.8s0 .3 3.1 65.6v.3c0 1.7.6 3.3 1.7 4.7 1.7 1.9 3.9 3.1 6.4 3.1 2.2 0 4.2-1.1 5.6-2.5 1.7-1.4 2.5-3.3 2.5-5.6l.3-6.7 3.1-58.6-3.3-162.8c-.3-2.8-1.7-5.3-3.9-6.7zm-111.4 22.5c-3.1 0-5.8 2.8-5.8 6.1l-4.4 140.6 4.4 67.2c.3 3.3 2.8 5.8 5.8 5.8 3.3 0 5.8-2.5 6.1-5.8l5-67.2-5-140.6c-.2-3.3-2.7-6.1-6.1-6.1zm376.7 62.8c-10.8 0-21.1 2.2-30.6 6.1-6.4-70.8-65.8-126.4-138.3-126.4-17.8 0-35 3.3-50.3 9.4-6.1 2.2-7.8 4.4-7.8 9.2v249.7c0 5 3.9 8.6 8.6 9.2h218.3c43.3 0 78.6-35 78.6-78.3.1-43.6-35.2-78.9-78.5-78.9zm-296.7-60.3c-4.2 0-7.5 3.3-7.8 7.8l-3.3 136.7 3.3 65.6c.3 4.2 3.6 7.5 7.8 7.5 4.2 0 7.5-3.3 7.5-7.5l3.9-65.6-3.9-136.7c-.3-4.5-3.3-7.8-7.5-7.8zm-53.6-7.8c-3.3 0-6.4 3.1-6.4 6.7l-3.9 145.3 3.9 66.9c.3 3.6 3.1 6.4 6.4 6.4 3.6 0 6.4-2.8 6.7-6.4l4.4-66.9-4.4-145.3c-.3-3.6-3.1-6.7-6.7-6.7zm26.7 3.4c-3.9 0-6.9 3.1-6.9 6.9L227 321.3l3.9 66.4c.3 3.9 3.1 6.9 6.9 6.9s6.9-3.1 6.9-6.9l4.2-66.4-4.2-141.7c0-3.9-3-6.9-6.9-6.9z"></path>
        </svg>
      </a>
      <a href="https://open.spotify.com/intl-fr/artist/6Dmy8sG6J2eM5IH53VMhbq">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 496 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
        </svg>
      </a>
      <a href="https://www.youtube.com/@_desinvolt">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 576 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
        </svg>
      </a>
      <a href="https://www.deezer.com/fr/artist/124688992">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 576 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          className="social-icon"
        >
          <path d="M451.46,244.71H576V172H451.46Zm0-173.89v72.67H576V70.82Zm0,275.06H576V273.2H451.46ZM0,447.09H124.54V374.42H0Zm150.47,0H275V374.42H150.47Zm150.52,0H425.53V374.42H301Zm150.47,0H576V374.42H451.46ZM301,345.88H425.53V273.2H301Zm-150.52,0H275V273.2H150.47Zm0-101.17H275V172H150.47Z"></path>
        </svg>
      </a>
    </nav>
  );
}
```

## File: components/ui/sonner.tsx
```typescript
"use client";

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-950 dark:group-[.toaster]:text-red-100 dark:group-[.toaster]:border-red-800",
          success:
            "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-green-950 dark:group-[.toaster]:text-green-100 dark:group-[.toaster]:border-green-800",
          warning:
            "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-900 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-yellow-950 dark:group-[.toaster]:text-yellow-100 dark:group-[.toaster]:border-yellow-800",
          info: "group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-900 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-950 dark:group-[.toaster]:text-blue-100 dark:group-[.toaster]:border-blue-800",

          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
```

## File: components/ui/spinner.tsx
```typescript
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## File: components/ui/switch.tsx
```typescript
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

## File: components/ui/tabs.tsx
```typescript
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-[var(--muted-second)] p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

## File: components/ui/textarea.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
```

## File: components/windows/devToolsWindow.tsx
```typescript
import { showBorders, toggleTheme } from "@/lib/devTools";
import { useAdmin } from "@/providers/adminProvider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Context, useEffect, useRef, useState } from "react";
import DownloadStateButton from "../features/backup/download-state-button";
import UploadStateButton from "../features/backup/upload-state-button";
import { Rnd } from "react-rnd";
import { StateContent, usePageState } from "@/providers/stateProvider";
import { logger } from "@/lib/logger";
import { handleStateChange } from "@/pages/handleStateChange.telefunc";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { successToast } from "@/lib/utils";

export default function DevToolsWindow({
  context,
}: {
  context: Context<StateContent<any> | null>;
}) {
  const nodeRef = useRef(null);
  const { isAdmin, toggleAdmin } = useAdmin();
  const [currentTheme, setCurrentTheme] = useState<boolean>(true);
  const [borders, setBorders] = useState(false);
  const { pageContext } = usePageState(context);
  const { state, updatePath } = pageContext;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains("dark"));
  }, []);

  const syncState = async () => {
    setLoading(true);
    logger.info("State update request", state);
    await handleStateChange(state, updatePath);
    successToast("Page synchronisée !");
    setLoading(false);
  };

  return (
    <Rnd default={{ x: 20, y: 20, width: 300, height: 300 }} className="z-50">
      <div className="flex flex-col h-full w-full p-5 gap-3 border rounded-md bg-background">
        <p className="title text-center">Dev tools</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Switch
              id="theme"
              defaultChecked={currentTheme}
              onClick={() => {
                toggleTheme();
                setCurrentTheme((prev) => !prev);
              }}
            />
            <Label htmlFor="theme" className="subtitle">
              Dark mode
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="admin" onClick={toggleAdmin} />
            <Label htmlFor="admin" className="subtitle">
              Admin Display
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="borders"
              onClick={() => {
                showBorders();
                setBorders((prev) => !prev);
              }}
            />
            <Label htmlFor="borders" className="subtitle">
              Borders
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <DownloadStateButton />
          </div>
          <div className="flex items-center space-x-2">
            <UploadStateButton />
          </div>
          <div>
            <Button onClick={() => syncState()} disabled={loading}>
              {loading ? <Spinner /> : "Synchroniser la page"}
            </Button>
          </div>
        </div>
      </div>
    </Rnd>
  );
}
```

## File: components/windows/imageWindow.tsx
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { ArrowDownUp, X } from "lucide-react";
import Image from "../common/image";
import { useEffect } from "react";
import { Window } from "@/types/window";
import { WindowProps } from "@/types/db";
import { Image as ImageDb } from "@/types/dist/types/db-public";

export default function ImageWindow({ image, window }: { image: ImageDb; window: WindowProps }) {
  const { isAdmin } = useAdmin();
  const { removeWindow, setWindows, windows } = useWindows();

  return (
    <div className="w-full h-full">
      <Image
        imageProps={image}
        onChange={(newImage) =>
          setWindows(
            windows.map((w) => {
              if (w.id === window.id && window.image) {
                window.image = newImage;
              }
              return w;
            }),
          )
        }
        onRemove={() => removeWindow(window.id)}
      />
    </div>
  );
}
```

## File: components/windows/videoWindow.tsx
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { Play, X } from "lucide-react";
import { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Video } from "@/types/dist/types/db-public";

export default function VideoWindow({ video }: { video: Video }) {
  const { isAdmin } = useAdmin();
  const { windows, setWindows } = useWindows();

  const getVideoID = (url: string | null): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const videoId = useMemo(() => getVideoID(video.url), [video.url]);

  const handleClose = () => {
    setWindows(windows.filter((window) => window.id !== video.id));
  };

  if (videoId) {
    return (
      <Dialog>
        <div className="w-full h-full">
          <img
            src={getVideoThumbnail(videoId)}
            className="w-full h-full object-cover pointer-events-none"
          />
          {isAdmin && (
            <div className="absolute right-2 top-2 flex gap-2 z-50">
              <button
                type="button"
                className="cursor-pointer rounded-full aspect-square"
                onClick={handleClose}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <X className="hover:stroke-primary" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <DialogTrigger asChild>
              <button
                className="cursor-pointer opacity-50 hover:opacity-100"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Play className="fill-foreground " size={64} />
              </button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="overflow-hidden max-w-[60vw] max-h-[70vh] bg-transparent border-transparent p-0 flex items-center justify-center">
          <DialogTitle className="hidden">Une vidéo youtube du groupe Desinvolts</DialogTitle>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  } else return null;
}
```

## File: components/windows/window.tsx
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { MoveDiagonal2 } from "lucide-react";
import useWindowControls from "@/hooks/useWindowControls";
import { WindowProps } from "@/types/db";
import { useEffect, useMemo } from "react";

export default function Window(props: WindowProps) {
  const { isAdmin } = useAdmin();
  const { zIndex, zIndexPriorityFactor, children } = props;
  const {
    handleMouseDownForDrag,
    handleMouseDownForResize,
    localBounds,
    windowRef,
    columnSize,
    rowSize,
  } = useWindowControls(props);
  const { windows } = useWindows();

  return (
    <div
      className={`absolute ${
        isAdmin && "cursor-move"
      } bg-background pointer-events-auto rounded-md overflow-hidden`}
      onMouseDown={handleMouseDownForDrag}
      ref={windowRef}
      style={{
        zIndex: `${zIndex + windows.length * (zIndexPriorityFactor ?? 0) * 10}`,
        width: `${localBounds.width * columnSize}px`,
        height: `${localBounds.height * rowSize}px`,
        transform: `translate(${localBounds.x * columnSize}px, ${localBounds.y * rowSize}px)`,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0">{children}</div>
        {isAdmin && (
          <div
            className="absolute cursor-nwse-resize absolute right-2 bottom-2 flex gap-2 border"
            onMouseDown={handleMouseDownForResize}
          >
            <MoveDiagonal2 />
          </div>
        )}
      </div>
    </div>
  );
}
```

## File: components/windows/windowsManager.tsx
```typescript
import { useWindows } from "@/providers/windowsProvider";
import Window from "./window";
import { createContext, useContext } from "react";
import useWindowManager from "@/hooks/useWindowManager";
import { WindowProps } from "@/types/db";
import { Bounds } from "@/types/window";

export type WindowManagerProps = {
  setWindows: (windows: WindowProps[]) => void;
  colnumber?: number;
  rowSize?: number;
  showDots?: boolean;
  zIndexPriorityFactor?: number;
};

interface WindowManagerData {
  containerBounds: Bounds & { top: number; left: number };
  rowSize: number;
  columnSize: number;
  isReady: boolean;
}

const WindowsManagerContext = createContext<WindowManagerData | undefined>(undefined);

export default function WindowsManager(props: WindowManagerProps) {
  const { colnumber, rowSize = 1, zIndexPriorityFactor = 0 } = props;
  const { windows } = useWindows();
  const { containerRef, containerBounds, canvasRef } = useWindowManager(props);

  return (
    <WindowsManagerContext.Provider
      value={{
        isReady: !!containerBounds,
        rowSize: rowSize,
        columnSize: containerBounds && colnumber ? containerBounds.width / colnumber : 1,
        containerBounds: containerBounds ?? {
          x: 0,
          y: 0,
          width: 500,
          height: 500,
          top: 0,
          left: 0,
        },
      }}
    >
      <div className="flex-1 w-full h-full relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full min-h-full" ref={containerRef}>
            <canvas className="absolute inset-0" ref={canvasRef} />
            {windows.map((window) => (
              <Window key={window.id} {...window} zIndexPriorityFactor={zIndexPriorityFactor} />
            ))}
          </div>
        </div>
      </div>
    </WindowsManagerContext.Provider>
  );
}

export function useWindowMangagerContext() {
  const context = useContext(WindowsManagerContext);

  if (!context) throw new Error("useWindows must be called inside its provider !");

  return context;
}
```

## File: config/constants.ts
```typescript
export const MIN_WINDOW_SIZE = 5; //pixels
```

## File: config/frontendFormSchemas.ts
```typescript
import { z } from "zod";

export const imageSchema = z.object({
  id: z
    .number({
      error: "L'identifiant de l'image doit être un nombre.",
    })
    .int({ error: "L'identifiant doit être un entier." })
    .nonnegative({ error: "L'identifiant ne peut pas être négatif." }),

  source: z.string({
    error: "La source de l'image est requise.",
  }),

  label: z
    .string({
      error: "Le label doit être une chaîne de caractères.",
    })
    .nullable(),

  alt: z
    .string({
      error: "Le texte alternatif doit être une chaîne de caractères.",
    })
    .nullable(),
});

export const postSchema = z.object({
  title: z.string({
    error: "Le titre est requis.",
  }),

  content: z
    .string({
      error: "Le contenu doit être une chaîne de caractères.",
    })
    .optional(),

  images: z
    .array(imageSchema, {
      error: "Les images doivent être un tableau valide.",
    })
    .default([]),
});

export const imagePropsSchema = z.object({
  title: z.string({
    error: "Le titre est requis.",
  }),

  description: z.string({
    error: "La description doit être une chaîne de caractères.",
  }),

  date: z.date({
    error: "La date doit être valide.",
  }),
});

export const trombinoscopeItemSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),

  description: z.string({ error: "La description est requise." }),

  image: imageSchema.optional().refine((val) => val !== undefined, {
    message: "L'image est requise.",
  }),

  color: z.string({ error: "La couleur est requise." }),
});

export const albumSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),
  description: z.string({ error: "La description est requise." }),
  spotifyUrl: z.string().optional(),
  deezerUrl: z.string().optional(),
  appleMusicUrl: z.string().optional(),
  cover: imageSchema.optional().refine((val) => val !== undefined, {
    message: "La cover est requise.",
  }),
});

export const albumUrlSchema = z.object({
  url: z.string({ error: "L'url est requise." }),
});

export const connexionSchema = z.object({
  username: z.string({ error: "Le nom d'utilisateur est requis." }),
  password: z.string({ error: "Le mot de passe est requis" }),
  remember: z.boolean(),
});

export const dateEventSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),
  description: z.string().optional(),
  date: z.date(),
  city: z.string({ error: "L'adresse est requise." }),
  adress: z.string({ error: "L'adresse est requise." }),
  image: imageSchema.optional().refine((val) => val !== undefined, {
    message: "L'image est requise.",
  }),
});

export const videoSchema = z.object({
  description: z.string().optional(),
  url: z.url(),
});
```

## File: config/placeholders.ts
```typescript
import ImageWindow from "@/components/windows/imageWindow";
import { WindowProps } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";

type Placeholders = {
  paragraph: string;
  defaultWindow: WindowProps;
};

const PLAHECOLDERS: Placeholders = {
  paragraph: "Voici le contenu par défaut du paragraphe.",
  defaultWindow: {
    id: 0,
    imageId: 0,
    videoId: 0,
    video: null,
    zIndex: 1,
    zIndexPriorityFactor: 0,
    height: 10,
    width: 10,
    x: 0,
    y: 0,
    image: {
      alt: "Une image du groupe Desinvolts",
      id: getRandomId(),
      source: "assets/img-placeholder.webp",
    },
  },
};
export default PLAHECOLDERS;
```

## File: doc/data-constraints.md
```markdown
# Contraintes des formulaires

## 1.Post

| Donnée                        | Obligatoire | Minimum | Maximum         | Génération automatique |
| ----------------------------- | ----------- | ------- | --------------- | ---------------------- |
| Code post                     | V           |         |                 | V                      |
| Titre                         | X           |         | 200 caractères  | V                      |
| Contenu du post               | V           | 0       | 8000 caractères | X                      |
| Date de dernière modification | V           |         |                 | V                      |

## 2.Image du post

| Donnée                 | Obligatoire | Minimum      | Maximum        | Génération automatique |
| ---------------------- | ----------- | ------------ | -------------- | ---------------------- |
| Code post              | V           |              |                | V                      |
| Description de l'image | V           | 1 caractètre | 200 caractères | X                      |
| Chemin vers l'image    | V           |              |                | V                      |

## 3.Date de concert

| Donnée                                    | Obligatoire | Minimum | Maximum         | Génération automatique |
| ----------------------------------------- | ----------- | ------- | --------------- | ---------------------- |
| Code post                                 | V           |         |                 | V                      |
| Date du concert                           | V           |         |                 | X                      |
| Lieu du concert                           | X           | 0       | 100 caractères  | X                      |
| Description du concert au format markdown | X           | 0       | 8000 caractères | X                      |

## 4.Image du concert

| Rôle                   | Nom        | Type         |
| ---------------------- | ---------- | ------------ |
| Code concert           | concert_id | numérique    |
| Description de l'image | alt        | alphabétique |
| Chemin vers l'image    | path       | alphabétique |

## 5.Contact infos

| Rôle                | Nom         | Type         |
| ------------------- | ----------- | ------------ |
| email               | email       | alphabétique |
| numéro de téléphone | phone       | alphabétique |
| url deezer          | deezer      | alphabétique |
| url spotify         | spotify     | alphabétique |
| url bandlab         | bandlab     | alphabétique |
| url apple music     | apple music | alphabétique |
| url bandlab         | deezer      | alphabétique |

## 6.Compte administrateur

| Rôle           | Nom  | Type           |
| -------------- | ---- | -------------- |
| identifiant    | id   | alphanumérique |
| password hashé | hash | alphanumérique |

## 7.Objet de présentation

| Rôle                         | Nom     | Type         |
| ---------------------------- | ------- | ------------ |
| Code d'objet de présentation | id      | numérique    |
| Contenu                      | content | alphabétique |

## 8.Image de présentation

| Rôle                         | Nom        | Type         |
| ---------------------------- | ---------- | ------------ |
| Code d'objet de présentation | concert_id | numérique    |
| Description de l'image       | alt        | alphabétique |
| Chemin vers l'image          | path       | alphabétique |
```

## File: doc/data-dictionnary.md
```markdown
# Entités

## 1.Post

| Rôle                                       | Nom     | Type         |
| ------------------------------------------ | ------- | ------------ |
| Code post                                  | id      | numérique    |
| Titre                                      | title   | alphabétique |
| Contenu du post au format markdown         | content | alphabétique |
| Date de création/ de dernière modification | \_date  | Date         |

## 2.Image du post

| Rôle                   | Nom        | Type         |
| ---------------------- | ---------- | ------------ |
| Code post              | concert_id | numérique    |
| Description de l'image | alt        | alphabétique |
| Chemin vers l'image    | path       | alphabétique |

## 3.Date de concert

| Rôle                                      | Nom         | Type         |
| ----------------------------------------- | ----------- | ------------ |
| Code concert                              | id          | numérique    |
| Date du concert                           | date        | Date         |
| Lieu du concert                           | place       | alphabétique |
| Description du concert au format markdown | description | alphabétique |

## 4.Image du concert

| Rôle                   | Nom        | Type         |
| ---------------------- | ---------- | ------------ |
| Code concert           | concert_id | numérique    |
| Description de l'image | alt        | alphabétique |
| Chemin vers l'image    | path       | alphabétique |

## 5.Contact infos

| Rôle                | Nom         | Type         |
| ------------------- | ----------- | ------------ |
| email               | email       | alphabétique |
| numéro de téléphone | phone       | alphabétique |
| url deezer          | deezer      | alphabétique |
| url spotify         | spotify     | alphabétique |
| url bandlab         | bandlab     | alphabétique |
| url apple music     | apple music | alphabétique |
| url bandlab         | deezer      | alphabétique |

## 6.Compte administrateur

| Rôle           | Nom  | Type           |
| -------------- | ---- | -------------- |
| identifiant    | id   | alphanumérique |
| password hashé | hash | alphanumérique |

## 7.Objet de présentation

| Rôle                         | Nom     | Type         |
| ---------------------------- | ------- | ------------ |
| Code d'objet de présentation | id      | numérique    |
| Contenu                      | content | alphabétique |

## 8.Image de présentation

| Rôle                         | Nom        | Type         |
| ---------------------------- | ---------- | ------------ |
| Code d'objet de présentation | concert_id | numérique    |
| Description de l'image       | alt        | alphabétique |
| Chemin vers l'image          | path       | alphabétique |
```

## File: doc/use-case.wsd
```
@startuml 
title diagramme de cas d'utilisation

left to right direction

actor visiteur
actor administrateur

rectangle "Site web de Desinvolts" {
    usecase UC3 as "S'identifier en tant qu'administrateur"
    usecase UC10 as "sauvegarder la session sur une longue durée"
    usecase UC2 as "modifier l'actualité du groupe"
    usecase UC4 as "Voir les posts du groupe"
    usecase UC5 as "Voir les prochaines dates du groupe"
    usecase UC6 as "Voir les contacts du groupe"
    usecase UC7 as "Modifier les posts du groupe"
    usecase UC8 as "Modifier les prochaines dates du groupe"
    usecase UC9 as "Modifier les contacts du groupe"
    usecase UC11 as "Modifier les objets de présentation"
    usecase UC12 as "Se déconnecter"
    usecase UC13 as "Envoyer un message"
}

administrateur -|> visiteur 

administrateur -- UC2
UC2 .> UC3 : <<include>>
UC3 <. UC10 : <<extends>>
UC3 <-. UC12 : <<extends>>

visiteur -- UC4 
visiteur -- UC5 
visiteur -- UC6


UC2<-. UC7 :<<extends>>
UC2<-. UC8 :<<extends>>
UC2<-. UC9 :<<extends>>
UC2<-. UC11 : <<extends>>
UC6 <-. UC13 :<<extends>>

@enduml
```

## File: doc/user-stories.md
```markdown
| En tant que    | Je veux                                                                  | Pour pouvoir                                                            |
| -------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Visiteur       | Voir la présentation du groupe                                           |                                                                         |
| Visiteur       | Filtrer les prochains concerts par ville et par plage de date            | Savoir quand le groupe passe dans ma ville                              |
| Visiteur       | Voir les prochains concerts                                              | Réserver ma place a partir du lien du site de la billetterie(optionnel) |
| Visiteur       | Voir les posts du groupe                                                 | En savoir plus sur les programmations passées et futures                |
| Visiteur       | Voir le contact du groupe                                                | Contacter le groupe                                                     |
| Administrateur | Me connecter à la partie administrateur via une page de connexion cachée | Mettre à jour le site de manière sécurisée                              |
| Administrateur | Séléctionner l'option "se souvenir de moi"                               | Choisir si l'on veut rester connecté à l'appareil sur une longue durée  |
| Administrateur | Ajouter/Supprimer/Modifier tout le contenu                               |                                                                         |
| Administrateur | Editer le contenu du site en mode WYSIWYG                                | Faire des bons choix de direction artistique                            |
| Administrateur | Intégrer un lecteur youtube dans mes posts                               | Montrer mes posts youtube                                               |
| Administrateur | Intégrer un lecteur de fichier audio dans mes posts                      | Faire écouter mes enregistrements                                       |
| Administrateur | Modifier la présentation du groupe                                       |                                                                         |
| Administrateur | Se déconnecter                                                           |                                                                         |
```

## File: hooks/forms/useAlbumForm.ts
```typescript
import { AlbumFormProps } from "@/components/features/album/albumForm";
import { albumSchema } from "@/config/frontendFormSchemas";
import { convertStringToParagraphGroup, convertUrlToIframeurl } from "@/lib/utils";
import { usePageState } from "@/providers/stateProvider";
import { SonPageContext } from "@/types/contexts";
import { Album } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type AddAlbumFormValues = z.infer<typeof albumSchema>;

export function useAlbumForm({ setOpen }: AlbumFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pageContext, update } = usePageState(SonPageContext);

  const form = useForm<AddAlbumFormValues>({
    resolver: zodResolver(albumSchema) as Resolver<AddAlbumFormValues>,
  });

  const onSubmit = (values: AddAlbumFormValues) => {
    const { appleMusicUrl, deezerUrl, spotifyUrl, description, title, cover } = values;
    const appleMusicIframeUrl = appleMusicUrl
      ? (convertUrlToIframeurl(appleMusicUrl, "applemusic") ?? undefined)
      : undefined;
    const deezerIframeUrl = deezerUrl
      ? (convertUrlToIframeurl(deezerUrl, "deezer") ?? undefined)
      : undefined;
    const spotifyIframeUrl = spotifyUrl
      ? (convertUrlToIframeurl(spotifyUrl, "spotify") ?? undefined)
      : undefined;

    const album: Album = {
      id: getRandomId(),
      title: {
        content: title,
        id: getRandomId(),

        hyperlinks: [],
      },
      paragraphs: convertStringToParagraphGroup(description),
      cover: cover ?? {
        alt: "La cover d'un album du groupe",
        id: getRandomId(),
        label: "",
        source: "assets/placeholder",
      },
      appleMusicUrl: appleMusicIframeUrl
        ? {
            text: "applemusic",
            link: appleMusicIframeUrl,
            id: getRandomId(),
            position: 0,
          }
        : null,
      deezerUrl: deezerIframeUrl
        ? {
            text: "deezer",
            link: deezerIframeUrl,
            id: getRandomId(),
            position: 1,
          }
        : null,
      spotifyUrl: spotifyIframeUrl
        ? {
            text: "spotify",
            link: spotifyIframeUrl,
            id: getRandomId(),
            position: 2,
          }
        : null,
    };

    update("albums", [...pageContext.state.albums, album]);
    setOpen(false);
    form.reset();
  };

  return { formRef, form, onSubmit };
}
```

## File: hooks/forms/useAlbumUrlForm.ts
```typescript
import { albumUrlSchema } from "@/config/frontendFormSchemas";
import { convertUrlToIframeurl } from "@/lib/utils";
import { MusicUrlForm } from "@/pages/nous-écouter/+Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type UrlFormValue = z.infer<typeof albumUrlSchema>;

export function useAlbumUrlForm({ currentTag, album, updateAlbum, setDialogOpen }: MusicUrlForm) {
  const form = useForm({
    resolver: zodResolver(albumUrlSchema) as Resolver<UrlFormValue>,
  });

  const [formValue, setFormValue] = useState<string | null>(null);
  const onSubmit = async (value: { url: string }) => {
    if (!currentTag) return;

    const iframe = convertUrlToIframeurl(value.url, currentTag);

    let newUrl: string | null = iframe ?? value.url;

    if (newUrl) {
      const urlUpdates = {
        spotifyUrl:
          currentTag === album.spotifyUrl?.text
            ? { ...album.spotifyUrl, link: newUrl }
            : album.spotifyUrl,
        appleMusicUrl:
          currentTag === album.appleMusicUrl?.text
            ? { ...album.appleMusicUrl, link: newUrl }
            : album.appleMusicUrl,
        deezerUrl:
          currentTag === album.deezerUrl?.text
            ? { ...album.deezerUrl, link: newUrl }
            : album.deezerUrl,
      };

      updateAlbum(urlUpdates);
      setDialogOpen(false);
    }
  };

  const handleUrlChange = (e: string) => {
    if (!currentTag) return;
    const url = convertUrlToIframeurl(e, currentTag);
    if (url) {
      setFormValue(url);
    } else {
      setFormValue(e);
    }
  };

  return { form, formValue, onSubmit, handleUrlChange };
}
```

## File: hooks/forms/useConnexionForm.ts
```typescript
import { connexionSchema } from "@/config/frontendFormSchemas";

import { logger } from "@/lib/logger";
import { errorToast, successToast } from "@/lib/utils";
import onConnexion from "@/pages/connexion/Connexion.telefunc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type ConnexionFormValue = z.infer<typeof connexionSchema>;

export function useConnectionForm() {
  const form = useForm({
    resolver: zodResolver(connexionSchema) as Resolver<ConnexionFormValue>,
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit = async (value: ConnexionFormValue) => {
    const data = await onConnexion(value.username, value.password, value.remember);
    if (!data.success) {
      logger.error("Echec de la connexion");
      data.message && errorToast(data.message, data.description);
    } else {
      logger.success("Connecté");
      data.message && successToast(data.message, data.description);
    }
  };

  return { form, onSubmit };
}
```

## File: hooks/forms/useDateForm.ts
```typescript
import { dateEventSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import { DateEvent } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type DateFormValue = z.infer<typeof dateEventSchema>;
export default function useDateForm({ onDate }: { onDate: (date: DateEvent) => void }) {
  const form = useForm({
    resolver: zodResolver(dateEventSchema) as Resolver<DateFormValue>,
    defaultValues: {
      date: new Date(Date.now()),
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      logger.info("Form values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    logger.warn("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (value: DateFormValue) => {
    if (!value.image) return;
    const newDate: DateEvent = {
      id: getRandomId(),
      date: value.date,
      image: value.image,
      paragraphs: convert_text_area_input_to_paragraph_array(value.description),
      adress: {
        content: value.adress,
        id: getRandomId(),
        hyperlinks: [],
      },
      city: {
        content: value.city,
        id: getRandomId(),
        hyperlinks: [],
      },
      title: {
        content: value.title,
        id: getRandomId(),
        hyperlinks: [],
      },
    };
    onDate(newDate);
    form.reset();
  };

  return { form, onSubmit };
}
```

## File: hooks/forms/useImageForm.ts
```typescript
import { CANVAS_WIDTH } from "@/components/features/image-editor/addImageButton";
import { ImageFormProps } from "@/components/features/image-editor/imageForm";
import { imagePropsSchema } from "@/config/frontendFormSchemas";
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { successToast } from "@/lib/utils";
import { UploadImageReply } from "@/types/server";
import { Bounds } from "@/types/window";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type ImageFormValues = z.infer<typeof imagePropsSchema>;

export function useImageForm(props: ImageFormProps) {
  const { image, setImage, setDialogOpen, onImage, loadImage } = props;
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [squareArea, setSquare] = useState<Bounds>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setSquare((prev) => ({
        ...prev,
        width: CANVAS_WIDTH,
        height: img.naturalHeight * (CANVAS_WIDTH / img.naturalWidth),
      }));
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imagePropsSchema),
    defaultValues: {
      title: image.name,
      date: new Date(image.lastModified),
      description: "La photo du groupe Désinvolts",
    },
  });

  const cropImage = async (
    file: File,
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const scaleX = img.naturalWidth / CANVAS_WIDTH;
        const scaleY = img.naturalHeight / (img.naturalHeight * (CANVAS_WIDTH / img.naturalWidth));

        const realX = x * scaleX;
        const realY = y * scaleX;
        const realWidth = width * scaleX;
        const realHeight = height * scaleX;

        const canvas = document.createElement("canvas");

        canvas.width = realWidth;
        canvas.height = realHeight;

        const ctx = canvas.getContext("2d")!;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, realX, realY, realWidth, realHeight, 0, 0, realWidth, realHeight);

        canvas.toBlob((blob) => {
          if (!blob) {
            logger.error("Echec de la conversion du canvas");
            return;
          }
          resolve(blob);
        }, "image/png");
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const submitImage = async (image: Blob, imageName: string): Promise<string> => {
    const formData = new FormData();
    const file = new File([image], imageName + "-cropped", { type: image.type });
    formData.append("image", file);
    const res = await ApiHandler.post<FormData, UploadImageReply>("/image", formData);

    if (res.success) {
      successToast("L'image a bien été enregistrée !");
      logger.success("Image enregistrée comme :", res.body.fileName);
      return res.body.fileName;
    } else {
      logger.error("Echec de l'enregistrement de l'image. Erreur: ", res.message, res.description);
      return "assets/img-placeholder.webp";
    }
  };

  const handleSubmit = async (values: ImageFormValues, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    logger.info("IMAGE FORM SUBMITTED", values);
    setFormLoading(true);
    const cropped = await cropImage(
      image,
      squareArea.x,
      squareArea.y,
      squareArea.width,
      squareArea.height,
    );
    const imageUrl = await submitImage(cropped, values.title);
    onImage({
      alt: values.description,
      id: getRandomId(),
      source: imageUrl,
    });
    setDialogOpen(false);
    setFormLoading(false);
    return setImage(null);
  };

  const onError = (errors: any) => {
    logger.error("Erreurs de validation :", errors);
  };

  return { form, handleSubmit, onError, formLoading, squareArea, setSquare };
}
```

## File: hooks/forms/usePostForm.ts
```typescript
import { PostFormProps } from "@/components/features/posts/post-form";
import { postSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import { PostData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type PostFormValues = z.infer<typeof postSchema>;

export function usePostForm({ onPost, setDialogOpen }: PostFormProps) {
  const [post, setPost] = useState<null | PostData>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema) as Resolver<PostFormValues>,
    defaultValues: {
      images: [],
    },
  });

  const images = form.watch("images");

  const handleSubmit: SubmitHandler<PostFormValues> = (data: PostFormValues) => {
    setPost({
      date: new Date(),
      id: getRandomId(),
      images: data.images.map((img, index) => ({
        image: img,
        position: index,
      })),
      paragraphs: convert_text_area_input_to_paragraph_array(data.content),
      title: {
        content: data.title,
        id: getRandomId(),
      },
      videos: [],
    });

    setDialogOpen(false);
  };

  useEffect(() => {
    if (!post) return;
    onPost(post);
    form.reset();
    setPost(null);
  }, [post]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      logger.info("Form values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    logger.warn("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  return { post, setPost, handleSubmit, images, form };
}
```

## File: hooks/forms/useTrombinoscopeItemForm.ts
```typescript
import { AddTrombinoscopeItemProps } from "@/components/features/trombinoscope/addTrombinoscopeItem";
import { trombinoscopeItemSchema } from "@/config/frontendFormSchemas";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import { TrombinoscopeElement } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type AddTrombinoscopeItemFormValues = z.infer<typeof trombinoscopeItemSchema>;

export function useTrombinoscopeItemForm(props: AddTrombinoscopeItemProps) {
  const { setOpen, elements, onItem } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<AddTrombinoscopeItemFormValues>({
    resolver: zodResolver(trombinoscopeItemSchema) as Resolver<AddTrombinoscopeItemFormValues>,
  });

  const onSubmit = (values: AddTrombinoscopeItemFormValues) => {
    const { description, title, image, color } = values;

    const maxPosition =
      elements.length > 0 ? elements.sort((a, b) => b.position - a.position)[0].position : 0;

    const newPosition = maxPosition + 1;

    if (!image) return;

    const item: TrombinoscopeElement = {
      id: getRandomId(),
      color,
      image,
      paragraphs: convert_text_area_input_to_paragraph_array(description),
      position: newPosition,
      title: {
        content: title,
        id: getRandomId(),
      },
    };
    onItem(item);
    setOpen(false);
  };

  return { form, onSubmit, formRef };
}
```

## File: hooks/forms/useVideoGalleryForm.ts
```typescript
import { VideoGalleryProps } from "@/components/features/media/videoGalleryForm";
import { videoSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import getVideoData from "@/pages/médias/getVideo.elefunc";
import { VideoData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type VideoFormValues = z.infer<typeof videoSchema>;

export function useVideoGalleyProps({ onVideo }: VideoGalleryProps) {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema) as Resolver<VideoFormValues>,
    defaultValues: {},
  });

  const addAVideo = (url: string) => {
    if (!videoData) return;

    onVideo({
      description: "a video of " + videoData,
      id: getRandomId(),
      url: url,
    });

    setOpen(false);
    form.reset();
    setVideoData(null);
    setOpen(false);
  };

  const onSubmit = (value: { url: string }) => {
    addAVideo(value.url);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url.length === 0) return;
    const data = await getVideoData(url);
    logger.success("Video Data", data);
    setVideoData(data);
  };

  return { form, open, onSubmit, handleChange, setOpen, videoData };
}
```

## File: hooks/forms/useVideoWindowForm.ts
```typescript
import { VideoWindowFormProps } from "@/components/features/media/videoWindowForm";
import PLAHECOLDERS from "@/config/placeholders";
import { useWindows } from "@/providers/windowsProvider";
import { VideoData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useVideoWindowForm(props: VideoWindowFormProps) {
  const { isOpen, setOpen } = props;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { addWindow } = useWindows();
  const form = useForm({
    defaultValues: {},
  });
  const addAVideo = (url: string) => {
    addWindow({
      ...PLAHECOLDERS.defaultWindow,
      video: { description: "Une vidéo du groupe Desinvolts", id: getRandomId(), url },
    });

    setOpen(false);
  };

  const onSubmit = (value: any) => {
    addAVideo(value.url);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url.length === 0) return;
    const res = await fetch(`/youtube-data?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const json = await res.json();
      setVideoData(json);
    }
  };

  return { isOpen, setOpen, videoData, form, onSubmit, handleChange };
}
```

## File: hooks/useBannerScroll.ts
```typescript
import { useEffect, useRef, useState } from "react";

export default function useBannerScroll() {
  const [scroll, setScroll] = useState<number>(0);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const bannerImageRef = useRef<HTMLDivElement>(null);

  const updateScroll = () => {
    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;

    setScroll(pageContent.scrollTop);
  };

  useEffect(() => {
    const pageContent = document.getElementById("page-content");
    const header = document.getElementById("header");
    if (!pageContent || !header) return;
    pageContent.addEventListener("scroll", updateScroll);

    return () => {
      pageContent.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!bannerTextRef.current || !bannerImageRef.current) return;
    bannerTextRef.current.style.transform = `translateY(-${scroll * 2}px)`;
    bannerImageRef.current.style.transform = `translateY(-${scroll * 0.3}px)`;
  }, [scroll]);

  return { bannerTextRef, bannerImageRef };
}
```

## File: hooks/useCaroussel.ts
```typescript
import { CarouselProps } from "@/components/ui/caroussel";
import { useAdmin } from "@/providers/adminProvider";
import { Image } from "@/types/dist/types/db-public";
import { useCallback, useEffect, useRef, useState } from "react";

// useCaroussel.ts
export default function useCaroussel({ content, onChange }: CarouselProps) {
  const { isAdmin } = useAdmin();
  // ✅ Remplace useState<boolean> par useRef — pas besoin de re-render
  const hoverRef = useRef<boolean>(false);
  const carousselRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [chunks, setChunks] = useState<number>(1);
  const lastelementRef = useRef<HTMLDivElement>(null);
  const cancelAutoScrollRef = useRef(false); // ✅ Idem

  const stopScroll = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startScroll = useCallback(() => {
    if (cancelAutoScrollRef.current || isAdmin) return;
    if (rafIdRef.current !== null) return;

    const loop = () => {
      if (carousselRef.current) {
        carousselRef.current.scrollLeft += 1;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
  }, [isAdmin]);

  // ✅ Handlers stables qui lisent les refs sans setter de state
  const handleMouseEnter = useCallback(() => {
    hoverRef.current = true;
    stopScroll();
  }, [stopScroll]);

  const handleMouseLeave = useCallback(() => {
    hoverRef.current = false;
    startScroll();
  }, [startScroll]);

  const handleTouchStart = useCallback(() => {
    hoverRef.current = true;
    cancelAutoScrollRef.current = true;
    stopScroll();
  }, [stopScroll]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!carousselRef.current) return;
    e.preventDefault();
    carousselRef.current.scrollLeft += e.deltaY / 3;
  }, []);

  useEffect(() => {
    const el = carousselRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    if (!lastelementRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setChunks((prev) => prev + 1);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );
    observer.observe(lastelementRef.current);
    return () => observer.disconnect();
  }, [chunks]);

  useEffect(() => {
    if (isAdmin) stopScroll();
    else startScroll();
  }, [isAdmin, startScroll, stopScroll]);

  const handleImageChange = useCallback(
    (newImage: Image) => {
      const newImages = content.images.map((item) =>
        item.image.id === newImage.id ? { ...item, image: newImage } : item,
      );
      onChange({ ...content, images: newImages });
    },
    [content, onChange],
  );

  return {
    handleImageChange,
    handleMouseEnter, // ✅ Exposé à la place de setHover
    handleMouseLeave,
    handleTouchStart,
    carousselRef,
    chunks,
    lastelementRef,
  };
}
```

## File: hooks/useDateNav.ts
```typescript
import { getNextDate } from "@/lib/utils";
import { DatesPageContent } from "@/types/page-contents";
import { useEffect, useState } from "react";

export default function useDateNav(state: DatesPageContent) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const nextDate = getNextDate(state.dates);
    return state.dates.findIndex((d) => d.id === nextDate.id) ?? 0;
  });

  useEffect(() => {
    const nextDate = getNextDate(state.dates);
    const dateIndex = state.dates.findIndex((d) => d.id === nextDate.id) ?? 0;
    setCurrentIndex(dateIndex);
  }, [state.dates]);

  return { currentIndex, setCurrentIndex };
}
```

## File: hooks/useEditableText.ts
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { Hyperlink } from "@/types/dist/types/db-public";

import { EditableTextProps } from "@/types/general";
import { useMemo } from "react";

export default function UseEditableText(props: EditableTextProps) {
  const { content } = props;
  const { isAdmin } = useAdmin();
  const isHyperlink = (val: string | Hyperlink): val is Hyperlink => {
    return typeof val === "object" && val !== null && "text" in val && "link" in val;
  };

  const extractHyperLink = (text: string): Array<string | Hyperlink> => {
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
  };

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
    [content.content, content.hyperlinks],
  );

  return { parsed, convertToString, isAdmin, isHyperlink };
}
```

## File: hooks/useEditableTextArea.ts
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { Hyperlink } from "@/types/dist/types/db-public";
import { EditableTextAreaProps } from "@/types/general";
import { useMemo } from "react";

export default function useEditableTextArea(props: EditableTextAreaProps) {
  const { content } = props;
  const { isAdmin } = useAdmin();

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

  return { isAdmin, isHyperlink, convertToString, parsed };
}
```

## File: hooks/useImageCrop.ts
```typescript
import {
  CANVAS_WIDTH,
  ImageCanvasProps,
  RESIZE_HANDLE_SIZE,
} from "@/components/features/image-editor/addImageButton";
import { useMouse } from "@/providers/mouseProvider";
import { useEffect, useRef, useState } from "react";

export default function useImageCrop(props: ImageCanvasProps) {
  const { imageSrc, squareArea, setSquare } = props;
  const { isDown, position } = useMouse();
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mouseState, setMouseState] = useState<"resizing" | "moving" | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasInitialized = useRef(false);
  const [cursorRelativePosition, setCursorPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleImageLoad = () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (!imageRef.current || !overlayCanvasRef.current) return;
    overlayCanvasRef.current.height =
      imageRef.current.naturalHeight * (CANVAS_WIDTH / imageRef.current.naturalWidth);
    setSquare({ x: 0, y: 0, width: CANVAS_WIDTH, height: overlayCanvasRef.current.height });
  };

  const drawRect = () => {
    if (!overlayCanvasRef.current) return;
    const ctx = overlayCanvasRef.current.getContext("2d");
    if (!ctx) return;
    const { x, y, height, width } = squareArea;
    ctx.reset();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, overlayCanvasRef.current.width, y);
    ctx.fillRect(
      0,
      y + height,
      overlayCanvasRef.current.width,
      overlayCanvasRef.current.height - (y + height),
    );
    ctx.fillRect(0, y, x, height);
    ctx.fillRect(x + width, y, overlayCanvasRef.current.width - (x + width), height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
  };

  const cursorIsInResizeHandle = (x: number, y: number): boolean => {
    const cornerX = squareArea.x + squareArea.width;
    const cornerY = squareArea.y + squareArea.height;
    return (
      x > cornerX - RESIZE_HANDLE_SIZE &&
      x < cornerX + RESIZE_HANDLE_SIZE &&
      y > cornerY - RESIZE_HANDLE_SIZE &&
      y < cornerY + RESIZE_HANDLE_SIZE
    );
  };

  const cursorIsInMoveHandle = (x: number, y: number): boolean => {
    return (
      x > squareArea.x &&
      x < squareArea.x + squareArea.width &&
      y > squareArea.y &&
      y < squareArea.y + squareArea.height
    );
  };

  const updateMouseMove = (x: number, y: number) => {
    if (!overlayCanvasRef.current) return;

    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    x = x - rect.left;
    y = y - rect.top;

    setCursorPosition({ x, y });
  };

  const updateMouseState = (x: number, y: number) => {
    if (cursorIsInResizeHandle(x, y)) {
      if (isDown && !mouseState) {
        setMouseState("resizing");
        setMouseOffset({
          x: x - (squareArea.x + squareArea.width),
          y: y - (squareArea.y + squareArea.height),
        });
      }
      document.body.style.cursor = "nwse-resize";
      return;
    } else if (cursorIsInMoveHandle(x, y)) {
      if (isDown && !mouseState) {
        setMouseState("moving");
        setMouseOffset({ x: x - squareArea.x, y: y - squareArea.y });
      }
      document.body.style.cursor = "move";
      return;
    } else if (!isDown) {
      document.body.style.cursor = "default";
      setMouseState(null);
    }
  };

  const updateSquare = (x: number, y: number) => {
    if (!overlayCanvasRef.current) return;
    if (mouseState === "resizing") {
      let width: number = x - squareArea.x - mouseOffset.x;
      let height: number = y - squareArea.y - mouseOffset.y;

      if (squareArea.x + width > overlayCanvasRef.current.width)
        width = overlayCanvasRef.current.width - squareArea.x;

      if (squareArea.y + height > overlayCanvasRef.current.height)
        height = overlayCanvasRef.current.height - squareArea.y;

      setSquare((prev) => ({
        ...prev,
        width: width,
        height: height,
      }));
    } else if (mouseState === "moving") {
      let nextX = Math.max(x - mouseOffset.x, 0);
      let nextY = Math.max(y - mouseOffset.y, 0);

      if (nextX + squareArea.width > overlayCanvasRef.current.width)
        nextX = overlayCanvasRef.current.width - squareArea.width;

      if (nextY + squareArea.height > overlayCanvasRef.current.height)
        nextY = overlayCanvasRef.current.height - squareArea.height;

      setSquare((prev) => ({
        ...prev,
        x: nextX,
        y: nextY,
      }));
    }
  };

  useEffect(() => {
    drawRect();
  }, [squareArea]);

  useEffect(() => {
    if (!isDown && mouseState) {
      setMouseState(null);
    }
  }, [isDown]);

  useEffect(() => updateMouseMove(position.x, position.y), [position]);

  useEffect(() => {
    if (!cursorRelativePosition) return;
    updateMouseState(cursorRelativePosition.x, cursorRelativePosition.y);
    updateSquare(cursorRelativePosition.x, cursorRelativePosition.y);
    drawRect();
  }, [cursorRelativePosition, mouseState]);

  return { handleImageLoad, overlayCanvasRef, imageRef, imageSrc };
}
```

## File: hooks/useParagraphGroup.ts
```typescript
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
```

## File: hooks/useRaisedShadow.ts
```typescript
import { useEffect } from "react";

import { animate, type MotionValue, useMotionValue } from "motion/react";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

export function useRaisedShadow(value: MotionValue<number>) {
    const boxShadow = useMotionValue(inactiveShadow);

    useEffect(() => {
        let isActive = false;
        value.on("change", (latest) => {
            const wasActive = isActive;
            if (latest !== 0) {
                isActive = true;
                if (isActive !== wasActive) {
                    animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
                }
            } else {
                isActive = false;
                if (isActive !== wasActive) {
                    animate(boxShadow, inactiveShadow);
                }
            }
        });
    }, [value, boxShadow]);

    return boxShadow;
}
```

## File: hooks/useReorderLink.ts
```typescript
import { NavlinkProps } from "@/components/layout/navbar";

export default function useReorderLink(props: NavlinkProps) {
  const { link, links, setLinks } = props;

  const reorderItem = (delta: 1 | -1) => {
    const sorted = [...links].sort((a, b) => a.position - b.position);

    const currentIndex = sorted.findIndex((l) => l.id === link.id);
    const targetIndex = currentIndex + delta;

    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const neighbor = sorted[targetIndex];

    const newLinks = links.map((l) => {
      if (l.id === link.id) {
        return { ...l, position: neighbor.position };
      }
      if (l.id === neighbor.id) {
        return { ...l, position: link.position };
      }
      return l;
    });

    setLinks(newLinks);
  };

  const removeItem = () => {
    setLinks(links.filter((l) => l.id !== link.id));
  };

  return { reorderItem, removeItem };
}
```

## File: hooks/useStateProvider.ts
```typescript
import { logger } from "@/lib/logger";
import { handleStateChange } from "@/pages/handleStateChange.telefunc";
import { StateProviderProps } from "@/providers/stateProvider";
import { BasePageContent } from "@/types/page-contents";
import { useHistoryState } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";

export default function useStateProvider<S extends BasePageContent>(props: StateProviderProps<S>) {
  const { initialState, updatePath } = props;
  const { state, set, undo, redo, canUndo, canRedo } = useHistoryState<S>(initialState);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      if (!ctrl) return;

      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (key === "y" || (key === "z" && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
    },
    [undo, redo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    logger.info("Init state: ", props.initialState);
  }, []);

  return { state, set, undo, redo, canUndo, canRedo, updatePath };
}
```

## File: hooks/useTime.ts
```typescript
export default function useTime(date: Date, onChange: (newTime: Date) => void) {
  const updateHour = (hours: string) => {
    const hoursInNumber = parseInt(hours);
    if (hoursInNumber < 0) return;
    const newDate = new Date(date.getTime());
    newDate.setHours(hoursInNumber);
    onChange(newDate);
  };

  const updateMinutes = (minutes: string) => {
    const minutesInNumber = parseInt(minutes);
    if (minutesInNumber < 0) return;
    const newDate = new Date(date.getTime());
    newDate.setMinutes(minutesInNumber);
    onChange(newDate);
  };

  return { updateHour, updateMinutes };
}
```

## File: hooks/useTrombinoscopeItem.ts
```typescript
import { TrombinoscopeItemProps } from "@/components/features/trombinoscope/trombinoscopeItem";
import { useAdmin } from "@/providers/adminProvider";
import { useEffect, useState } from "react";

export default function useTrombinoscopeItem(props: TrombinoscopeItemProps) {
  const { isAdmin } = useAdmin();
  const { element, elements, setElement, setElements } = props;
  const [hovered, setHovered] = useState(false);

  const handleIsHovered = (isHovered: boolean) => {
    if (!isAdmin) setHovered(isHovered);
  };

  useEffect(() => {
    setHovered(isAdmin);
  }, [isAdmin]);

  const reorderItem = (delta: 1 | -1) => {
    const newIndex = Math.min(Math.max(element.position + delta, 0), elements.length - 1);
    const elementWithSameIndex = elements.find((e) => e.position === newIndex);
    if (!elementWithSameIndex) return;
    const updatedElement = { ...element, position: newIndex };
    const updatedElementWithSameIndex = { ...elementWithSameIndex, position: element.position };
    const newElements = elements
      .filter((l) => l !== element && l !== elementWithSameIndex)
      .concat([updatedElement, updatedElementWithSameIndex]);
    setElements(newElements);
  };

  return { handleIsHovered, reorderItem, isAdmin, hovered, element, setElement };
}
```

## File: hooks/useVideo.ts
```typescript
import { useAdmin } from "@/providers/adminProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import { VideoProps } from "@/components/common/video";

export default function useVideo(props: VideoProps) {
  const {
    url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
    onClose = () => {},
  } = props;
  const { isAdmin } = useAdmin();

  const getVideoID = (url: string): string | null => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const videoId = useMemo(() => getVideoID(url), [url]);

  useEffect(() => {
    setLoadingState(true);
    if (imgRef.current?.complete) {
      setLoadingState(false);
    }
  }, [videoId]);

  return { isAdmin, loadingState, getVideoThumbnail, videoId, setLoadingState, imgRef };
}
```

## File: hooks/useWindowControls.ts
```typescript
import { useWindowMangagerContext } from "@/components/windows/windowsManager";
import { MIN_WINDOW_SIZE } from "@/config/constants";
import { useAdmin } from "@/providers/adminProvider";
import { useMouse } from "@/providers/mouseProvider";
import { useWindows } from "@/providers/windowsProvider";
import { WindowProps } from "@/types/db";
import { Bounds } from "@/types/window";
import { useEffect, useMemo, useRef, useState } from "react";

export default function useWindowControls(props: WindowProps) {
  const { x, y, width, height, id } = props;

  const { isAdmin } = useAdmin();

  const { isDown, position } = useMouse();
  const { windows, setWindows, bringToFront } = useWindows();

  const windowRef = useRef<HTMLDivElement | null>(null);

  const { columnSize, rowSize, containerBounds, isReady } = useWindowMangagerContext();

  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const limits = useMemo(
    () => ({
      top: 0,
      bottom: containerBounds.height,
      left: 0,
      right: containerBounds.width,
    }),
    [containerBounds],
  );

  const limitsTranslation = (newBounds: Bounds): Bounds => {
    let { x, y, width, height } = newBounds;

    if (!columnSize || !rowSize) return { x, y, width, height };

    if (limits.left !== undefined) x = Math.max(x, limits.left / columnSize);
    if (limits.top !== undefined) y = Math.max(y, limits.top / rowSize);

    if (limits.right !== undefined) x = Math.min(x, limits.right / columnSize - width);

    if (limits.bottom !== undefined) y = Math.min(y, limits.bottom / rowSize - height);

    return { x, y, width, height };
  };

  const limitsResize = (newBounds: Bounds): Bounds => {
    let { x, y, width, height } = newBounds;

    if (!columnSize || !rowSize || !isReady) return { x, y, width, height };

    if (limits.right !== undefined) width = Math.min(width, limits.right / columnSize - x);

    if (limits.bottom !== undefined) height = Math.min(height, limits.bottom / rowSize - y);

    width = Math.max(width, MIN_WINDOW_SIZE);
    height = Math.max(height, MIN_WINDOW_SIZE);

    return { x, y, width, height };
  };

  const [localBounds, setLocalBounds] = useState<Bounds>({ x: 0, y: 0, height: 0, width: 0 });

  // const bringToFront = () => {
  //   setWindows(
  //     windows.map((w) => {
  //       if (w.id === props.id) {
  //         const maxZ = Math.max(...windows.map((w) => w.zIndex));
  //         return { ...w, zIndex: maxZ + 1 };
  //       }
  //       return w;
  //     }),
  //   );
  // };

  const handleMouseDownForDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdmin) return;
    const interactiveTags = ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"];
    const target = e.target as HTMLElement;
    if (interactiveTags.includes(target.tagName)) return;

    setIsDragging(true);
    windowRef.current?.classList.add("window-shadow");

    setMouseOffset({
      x: position.x - localBounds.x * columnSize,
      y: position.y - localBounds.y * rowSize,
    });

    bringToFront(id);
  };

  const handleMouseDownForResize = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    tryToResize();
    bringToFront(id);
    e.stopPropagation();
  };

  const roundToInterval = (value: number, interval: number): number =>
    Math.round(value / interval) * interval;

  const tryToTranslate = () => {
    if (!isDragging) return;

    const newXpx = roundToInterval(position.x - mouseOffset.x, columnSize);
    const newYpx = roundToInterval(position.y - mouseOffset.y, rowSize);

    const widthPx = localBounds.width * columnSize;
    const heightPx = localBounds.height * rowSize;

    const constrainedXpx = Math.max(limits.left, Math.min(newXpx, limits.right - widthPx));
    const constrainedYpx = Math.max(limits.top, Math.min(newYpx, limits.bottom - heightPx));

    const newX = constrainedXpx / columnSize;
    const newY = constrainedYpx / rowSize;

    setLocalBounds(
      (prev) =>
        ({
          ...prev,
          x: newX,
          y: newY,
        }) as Bounds,
    );
  };

  const tryToResize = () => {
    if (!isResizing) return;

    const posBaseX = position.x - containerBounds.left;
    const posBaseY = position.y - containerBounds.top;

    const originXpx = localBounds.x * columnSize;
    const originYpx = localBounds.y * rowSize;

    const rawWidthPx = Math.max(
      roundToInterval(posBaseX - originXpx + 20, columnSize),
      MIN_WINDOW_SIZE,
    );

    const rawHeightPx = Math.max(
      roundToInterval(posBaseY - originYpx + 20, rowSize),
      MIN_WINDOW_SIZE,
    );

    const maxWidthPx = limits.right - originXpx;
    const maxHeightPx = limits.bottom - originYpx;

    const newWidthPx = Math.min(rawWidthPx, maxWidthPx);
    const newHeightPx = Math.min(rawHeightPx, maxHeightPx);

    const newWidth = newWidthPx / columnSize;
    const newHeight = newHeightPx / rowSize;

    setLocalBounds(
      (prev) =>
        ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }) as Bounds,
    );
  };

  useEffect(() => {
    tryToTranslate();
    tryToResize();
  }, [position, isDragging, isResizing]);

  useEffect(() => {
    setLocalBounds(limitsTranslation(limitsResize({ x, y, width, height })));
  }, [limits, x, y, width, height]);

  useEffect(() => {
    if (!windowRef.current) return;

    windowRef.current.style.width = `${localBounds.width * columnSize}px`;
    windowRef.current.style.height = `${localBounds.height * rowSize}px`;
    windowRef.current.style.transform = `translate(${localBounds.x * columnSize}px, ${localBounds.y * rowSize}px)`;
  }, [localBounds]);

  useEffect(() => {
    if (!isDown && (isDragging || isResizing)) {
      setIsDragging(false);
      setIsResizing(false);
      windowRef.current?.classList.remove("window-shadow");
      setMouseOffset({ x: 0, y: 0 });
      setWindows(
        windows.map((w) => {
          if (w.id === props.id) {
            return { ...w, ...localBounds };
          }
          return w;
        }),
      );
    }
  }, [isDown]);

  useEffect(() => {
    setWindows(
      windows.map((w) => {
        if (w.id === props.id) {
          const bounds = limitsTranslation(
            limitsResize({
              x: x,
              y: y,
              width: width,
              height: height,
            }),
          );
          return { ...w, ...localBounds };
        }
        return w;
      }),
    );
  }, [columnSize, rowSize]);

  return {
    handleMouseDownForDrag,
    handleMouseDownForResize,
    windowRef,
    localBounds,
    columnSize,
    rowSize,
  };
}
```

## File: hooks/useWindowManager.ts
```typescript
import { WindowManagerProps } from "@/components/windows/windowsManager";
import { useWindows } from "@/providers/windowsProvider";

import { useEffect, useRef, useState } from "react";
import { Bounds } from "@/types/window";
import { useAdmin } from "@/providers/adminProvider";

type ContainerBounds = Bounds & { top: number; left: number };

export default function useWindowManager({
  colnumber,
  rowSize = 1,
  showDots = true,
  zIndexPriorityFactor = 0,
  setWindows,
}: WindowManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_, setColSize] = useState<number | undefined>(undefined);
  const [containerBounds, setContainerBounds] = useState<
    (Bounds & { top: number; left: number }) | undefined
  >(undefined);
  const { isAdmin } = useAdmin();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundsRef = useRef<typeof containerBounds>(undefined);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !rowSize || !colnumber) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!isAdmin || !showDots) return ctx.reset();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,0,0,0.8)";
    ctx.beginPath();

    const colStep = width / colnumber;
    const rowStep = rowSize;

    for (let x = 0; x <= width; x += colStep) {
      const px = Math.round(x) + 0.5;
      for (let y = 0; y <= height; y += rowStep) {
        const py = Math.round(y) + 0.5;
        ctx.moveTo(px + 1, py);
        ctx.arc(px, py, 1, 0, Math.PI * 2);
      }
    }

    ctx.fill();
  };

  useEffect(() => {
    boundsRef.current = containerBounds;
  }, [containerBounds]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const rect = containerRef.current!.getBoundingClientRect();

      if (colnumber) setColSize(width / colnumber);

      if (rect.width > 0 && rect.height > 0)
        setContainerBounds({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
        });
    });

    resize.observe(containerRef.current);

    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number;

    const track = () => {
      const el = containerRef.current;
      if (!el) {
        rafId = requestAnimationFrame(track);
        return;
      }

      const rect = el.getBoundingClientRect();
      const prev = boundsRef.current;
      if (!prev) {
        const initial = {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
        };

        boundsRef.current = initial;
        setContainerBounds(initial);
      } else if (rect.top !== prev.top || rect.left !== prev.left) {
        const next = { ...prev, top: rect.top, left: rect.left };
        boundsRef.current = next;
        setContainerBounds(next);
      }

      rafId = requestAnimationFrame(track);
    };

    track();

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    drawGrid();
  }, [isAdmin, showDots, containerBounds]);

  return { containerRef, containerBounds, canvasRef, boundsRef, drawGrid };
}
```

## File: lib/apiHandler.ts
```typescript
import { ApiResponse, ApiRoute } from "@/types/server";
import { errorToast, successToast } from "./utils";
import { logger } from "./logger";

type JsonObject = Record<string, unknown>;

type Query = Record<string, string | number | boolean>;

export default class ApiHandler {
  static async post<Body extends JsonObject | FormData, Response>(
    path: string,
    body: Body,
  ): Promise<ApiResponse<Response>> {
    try {
      const isFormData = body instanceof FormData;

      const res = await fetch(path, {
        body: isFormData ? body : JSON.stringify(body),
        method: "POST",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${res.status}`);
      }
      const text = await res.text();
      let data: ApiResponse<Response>;
      try {
        data = JSON.parse(text) as ApiResponse<Response>;
      } catch (err) {
        throw new Error("Invalid JSON response");
      }

      return data;
    } catch (err) {
      errorToast("Une erreur innatendue est survenue :/", String(err));
      logger.error("Echec de POST à ", path);
      return {
        success: false,
        message: String(err),
      };
    }
  }

  static async get<Response>(path: string, query?: Query): Promise<ApiResponse<Response>> {
    try {
      const params = query ? new URLSearchParams(query as Record<string, string>).toString() : "";
      const fetchurl = path + "?" + params;
      const res = await fetch(fetchurl, { method: "GET" });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${res.status}`);
      }

      const text = await res.text();
      let data: ApiResponse<Response>;
      try {
        data = JSON.parse(text) as ApiResponse<Response>;
      } catch (err) {
        throw new Error("Invalid JSON response");
      }

      if (!data.success) {
        data.message && errorToast(data.message, data.description);
      } else {
        data.message && successToast(data.message, data.description);
      }

      return data;
    } catch (err) {
      errorToast("Une erreur innatendue est survenue :/", String(err));
      logger.error("DEBUG API ERROR:", err);
      logger.error("Echec de GET à ", path);
      return {
        success: false,
        message: String(err),
      };
    }
  }
}
```

## File: lib/devTools.ts
```typescript
export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  html.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("colortheme", newTheme);
}

export function showBorders() {
  const html = document.documentElement;
  if (html.classList.contains("show-all-borders")) {
    html.classList.remove("show-all-borders");
  } else {
    html.classList.add("show-all-borders");
  }
}
```

## File: lib/logger.ts
```typescript
const IS_DEV = process.env.NODE_ENV === "development" || import.meta.env?.DEV;

type LogLevel = "info" | "success" | "warn" | "error";

const colors = {
  info: "#057cc9",
  success: "#419210",
  warn: "#fdaf13",
  error: "#c70d18",
};

const formatLog = (level: LogLevel, message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  return [
    `%c[${level.toUpperCase()}] %c${timestamp} %c${message}`,
    `color: ${colors[level]}; font-weight: bold`,
    `color: gray; font-size: 10px`,
    `color: inherit`,
  ];
};

export const logger = {
  info: (msg: string, ...args: any[]) => {
    if (IS_DEV) console.log(...formatLog("info", msg), ...args);
  },
  success: (msg: string, ...args: any[]) => {
    if (IS_DEV) console.log(...formatLog("success", msg), ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    console.warn(...formatLog("warn", msg), ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(...formatLog("error", msg), ...args);
  },
};
```

## File: lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import ApiHandler from "./apiHandler";
import getRandomId from "@giapspzoo/get-random-id";
import { DateEvent, EditableParagraphContent, ParagraphInGroup } from "@/types/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getNextDate(dates: DateEvent[]): DateEvent {
  const now = Date.now();
  let nearestDate: DateEvent | undefined = undefined;
  let smallestDiff = Infinity;

  dates.forEach((date) => {
    const diff = date.date.getTime() - now;

    if (diff > 0 && diff < smallestDiff) {
      smallestDiff = diff;
      nearestDate = date;
    }
  });

  if (!nearestDate) nearestDate = dates.sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  return nearestDate;
}
export function errorToast(message: string, description?: string) {
  toast.error(message, {
    position: "top-center",
    description: description,
  });
}

export function successToast(message: string, description?: string) {
  toast.success(message, {
    position: "top-center",
    description: description,
  });
}

export function convert_text_area_input_to_paragraph_array(
  text: string | null | undefined,
): ParagraphInGroup[] {
  if (!text) return [];

  return text.split("\n").map(
    (line, position): ParagraphInGroup => ({
      position,
      paragraph: {
        content: line,
        id: getRandomId(),
        hyperlinks: [],
      },
    }),
  );
}

function extractMusicId(url: string, tag: "spotify" | "deezer" | "applemusic"): string | null {
  let regex: RegExp;
  switch (tag) {
    case "deezer":
      regex = /album\/(\d+)/;
      break;
    case "spotify":
      regex = /album\/([A-Za-z0-9]+)/;
      break;
    case "applemusic":
      regex = /\/(\d+)(?:\?|$)/;
      break;
    default:
      return null;
  }

  const match = url.match(regex);
  return match ? match[1] : null;
}

function generateIframeUrlFromId(
  id: string,
  tag: "spotify" | "deezer" | "applemusic",
): string | null {
  switch (tag) {
    case "spotify":
      return "https://open.spotify.com/embed/album/" + id;
    case "deezer":
      return "https://widget.deezer.com/widget/dark/album/" + id;
    case "applemusic":
      return "https://embed.music.apple.com/album/" + id;
    default:
      return null;
  }
}

export function convertUrlToIframeurl(
  url: string,
  tag: "spotify" | "deezer" | "applemusic",
): string | null {
  const id = extractMusicId(url, tag);
  if (!id) return null;
  return generateIframeUrlFromId(id, tag);
}

export function convertStringToParagraphGroup(text: string): ParagraphInGroup[] {
  return text
    .split("\n")
    .filter((paragraph) => paragraph.length > 0)
    .map((paragraph, position) => ({
      position,
      paragraph: {
        content: paragraph,
        id: getRandomId(),
        hyperlinks: [],
      },
    }));
}
```

## File: pages/_error/+Page.tsx
```typescript
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  if (is404) {
    return (
      <ClassicPageLayout>
        <section className="md:py-[2.5rem] flex flex-col gap-[3rem] items-center min-h-screen">
          <EditableText
            as={"h1"}
            className="headline text-center"
            content={{ content: "...Oups", hyperlinks: [], id: 1 }}
            setContent={() => {}}
          />
          <EditableTextarea
            as={"p"}
            className="paragraph"
            content={{
              content: "La page que vous recherchez n'existe pas. Retour à la page d'accueil ?",
              hyperlinks: [
                {
                  text: "Retour à la page d'accueil",
                  link: "/",
                  id: 1,
                  paragraphId: 2,
                  textLineId: 3,
                },
              ],
              id: 2,
            }}
            setContent={() => {}}
          />
        </section>
      </ClassicPageLayout>
    );
  }
  return (
    <>
      <h1>Internal Error</h1>
      <p>Something went wrong.</p>
    </>
  );
}
```

## File: pages/assets/+Page.tsx
```typescript
export default function Page() {
  return (
    <div>
      <h1>Assets</h1>
      <div className="p-8 space-y-4">
        <h1 className="mobile-logo">Mobile Logo - Road Rage 2.4rem</h1>
        <h1 className="desktop-logo">Desktop Logo - Road Rage 3.2rem</h1>
        <h2 className="headline">Headline - Zing Rust Demo 3.6rem</h2>
        <h3 className="title">Title - 2.4rem</h3>
        <h3 className="title-sm">Title Small - 1.6rem</h3>
        <h4 className="subtitle-xl">Subtitle XL - Contrail One 2.4rem</h4>
        <h4 className="subtitle">Subtitle - 1.6rem</h4>
        <h5 className="subtitle-sm">Subtitle Small - 1.2rem</h5>
        <p className="paragraph-xl">Paragraph XL - Overpass 2.4rem</p>
        <p className="paragraph-lg">Paragraph Large - 1.8rem</p>
        <p className="paragraph">Paragraph - 1.6rem</p>
        <p className="paragraph-sm">Paragraph Small - 1.2rem</p>
        <p className="paragraph-xs">Paragraph XS - 1rem</p>
        <button className="button" type="button">
          Button - 1.6rem
        </button>
      </div>
    </div>
  );
}
```

## File: pages/connexion/+Page.tsx
```typescript
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditableText from "@/components/common/editableText";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { ConnexionPageContext } from "@/types/contexts";
import { EditableTextContent } from "@/types/db";
import { ConnexionPageContent } from "@/types/page-contents";
import { useConnectionForm } from "@/hooks/forms/useConnexionForm";

export default function Page() {
  const { isAdmin } = useAdmin();
  const { pageContext, update } = usePageState<ConnexionPageContent>(ConnexionPageContext);
  const { state } = pageContext;
  return (
    <ClassicPageLayout>
      <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center max-w-[40rem] w-full">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent: EditableTextContent) => update("title", newContent)}
          className="headline w-full text-center shrink-0"
        />
        <ConnexionForm />
      </section>
    </ClassicPageLayout>
  );
}

function ConnexionForm() {
  const { form, onSubmit } = useConnectionForm();
  return (
    <Form {...form}>
      <form
        id="connexionform"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-xl border p-5 justify-between w-full max-w-[30rem]"
      >
        {/* Nom d'utilisateur */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="subtitle">Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="user"
                  type="text"
                  autoComplete="username"
                  className="italic paragraph"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mot de passe */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="subtitle">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="italic paragraph"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Se souvenir de moi */}
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  defaultChecked={field.value}
                  onCheckedChange={(c) =>
                    form.setValue("remember", typeof c === "boolean" ? c : false)
                  }
                  id="memory"
                  className="mt-1"
                />
              </FormControl>
              <FormLabel htmlFor="memory" className="text-muted-foreground text-sm paragraph">
                Se souvenir de moi
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bouton Envoyer */}
        <div className="flex justify-end">
          <Button type="submit" form="connexionform">
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

## File: pages/connexion/Connexion.telefunc.ts
```typescript
import ApiHandler from "@/lib/apiHandler";
import { ConnexionReply } from "@/types/server";
import { FastifyReply } from "fastify";
import { getContext } from "telefunc";

export default async function onConnexion(username: string, password: string, remember: boolean) {
  const context = getContext();
  const res = await ApiHandler.post<
    { username: string; password: string; remember: boolean },
    ConnexionReply
  >(`http://backend:${process.env.BACKEND_PORT}/connexion`, {
    username,
    password,
    remember,
  });

  const { success, description, message } = res;

  if (success) {
    const reply = context.fastify.reply as FastifyReply;
    reply.setCookie("token", res.body.jwt, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: remember ? 365 * 24 * 3600 : 3600,
      sameSite: "lax",
    });
  }

  return { success, description, message };
}
```

## File: pages/contact/+Page.tsx
```typescript
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
```

## File: pages/dates/+Page.tsx
```typescript
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { DatesPageContext } from "@/types/contexts";
import DatePresentation from "@/components/features/dates/datePresentation";
import { NextDates, PrevDates } from "@/components/features/dates/datesAccordion";
import useDateNav from "@/hooks/useDateNav";
import AddDateDialog from "@/components/features/dates/addDateDialog";

export default function Page() {
  const { pageContext, update } = usePageState(DatesPageContext);
  const { state } = pageContext;
  const { currentIndex, setCurrentIndex } = useDateNav(state);
  return (
    <ClassicPageLayout>
      <Section>
        <EditableText
          as="h1"
          content={state.title}
          setContent={(newContent) => update("title", newContent)}
          className="headline w-full text-center"
        />
      </Section>
      <Section>
        {state.dates.length > 0 ? (
          <DatePresentation
            dates={state.dates}
            setDates={(dates) => update("dates", dates)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <AddDateDialog onDate={(date) => update("dates", [date])} />
        )}
      </Section>
      <Section>
        <NextDates
          dates={state.dates}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setDates={(dates) => update("dates", dates)}
        />
      </Section>
      <Section>
        <PrevDates
          dates={state.dates}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setDates={(dates) => update("dates", dates)}
        />
      </Section>
    </ClassicPageLayout>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:py-[2.5rem] flex flex-col gap-[3rem] items-center w-full">
      {children}
    </section>
  );
}
```

## File: pages/groupe/+Page.tsx
```typescript
import Trombinoscope from "@/components/features/trombinoscope/trombinoscope";
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import { usePageState } from "@/providers/stateProvider";
import { GroupePageContext } from "@/types/contexts";

export default function Page() {
  const { pageContext, update } = usePageState(GroupePageContext);
  const { state } = pageContext;

  return (
    <ClassicPageLayout>
      <section className="pt-[2.5rem] min-h-0 h-min items-center max-w-[40rem]">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newTitle) => update("title", newTitle)}
          className="headline w-full text-center shrink-0"
        />
      </section>
      <section className="pt-[2.5rem] flex flex-col gap-[3rem] min-h-0 items-center md:max-w-[40rem]">
        <div className="flex items-center gap-[2rem] flex-col md:flex-row">
          <div className="rounded-md overflow-hidden md:w-[20rem] aspect-square">
            <Image
              width={320}
              height={320}
              imageProps={{ ...state.presentation_image }}
              onChange={(newImage) => update("presentation_image", newImage)}
            />
          </div>
          <ParagraphGroup
            as={"p"}
            className=""
            classNameForEachParagraph="text-center md:text-left paragraph"
            content={state.first_section_paragraphs}
            onChange={(newParagraphs) => update("first_section_paragraphs", newParagraphs)}
          />
        </div>
      </section>
      <section className="md:py-[2.5rem] min-h-0 h-min items-center  w-full max-w-[56rem]">
        <ParagraphGroup
          as={"p"}
          classNameForEachParagraph="paragraph text-left"
          content={state.second_section_paragraphs}
          onChange={(newParaphs) => update("second_section_paragraphs", newParaphs)}
        />
      </section>
      <section className="md:py-[2.5rem] min-h-0 h-min items-center  w-full">
        <Trombinoscope
          elements={state.trombinoscope}
          setElements={(newTombinoscope) => update("trombinoscope", newTombinoscope)}
        />
      </section>
    </ClassicPageLayout>
  );
}
```

## File: pages/index/+Page.tsx
```typescript
import Footer from "@/components/layout/footer";
import ButtonMinus from "@/components/ui/buttonMinus";
import ButtonPlus from "@/components/ui/buttonPlus";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import Image from "@/components/common/image";
import SocialLinksGroup from "@/components/ui/socialLinksGroup";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import useBannerScroll from "@/hooks/useBannerScroll";
import { EditableTextContent } from "@/types/db";
import Caroussel from "@/components/ui/caroussel";
import { HomePageContext } from "@/types/contexts";
import PostsSection from "@/components/features/posts/post-section";

export default function Page() {
  return <PageContent />;
}

function PageContent() {
  return (
    <div className="flex flex-1 align-center text-center flex-col">
      <section className="h-screen snap-start snap-normal flex items-center w-full">
        <FirstSection />
      </section>
      <section className="background-noise h-screen w-screen left-0 z-[0] snap-start overflow-hidden pt-[4rem] px-3">
        <SecondSection />
      </section>
    </div>
  );
}

function FirstSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const { state } = pageContext;
  const { bannerTextRef, bannerImageRef } = useBannerScroll();
  const { isAdmin } = useAdmin();
  return (
    <>
      <div
        className={`fixed inset-0 z-0 ${isAdmin ? "pointer-events-auto" : "pointer-events-none"}`}
        ref={bannerImageRef}
      >
        <Image
          imageProps={state.banner}
          onChange={(newImage) => update("banner", newImage)}
          changeButtonSideY="bottom"
        />
      </div>
      <div
        ref={bannerTextRef}
        className="flex flex-col items-center justify-center w-full relative z-10"
      >
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent: EditableTextContent) => update("title", newContent)}
          className="desktop-logo text-5xl/[-10]! sm:text-7xl/[-10]! md:text-9xl/[-10]!"
        />
        <EditableText
          as={"p"}
          content={state.subtitle}
          setContent={(newContent: EditableTextContent) => update("subtitle", newContent)}
          className="subtitle-xl"
        />
        <SocialLinksGroup />
      </div>
    </>
  );
}

function SecondSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const { state } = pageContext;
  const { isAdmin } = useAdmin();

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative flex-col flex w-full min-h-full container mx-auto z-[10] max-w-[56rem] gap-15 mb-16 pt-8">
        <EditableTextarea
          as={"p"}
          content={state.presentationParagraph}
          setContent={(newContent) => update("presentationParagraph", newContent)}
          className="paragraph-lg italic opacity-90"
        />
        <div className="w-full aspect-video rounded-md overflow-hidden">
          <Image
            imageProps={state.presentationImage}
            onChange={(newImage) => update("presentationImage", newImage)}
          />
        </div>

        {state.config.showActualityPanel ? (
          <div className="relative">
            {isAdmin && (
              <div className="absolute left-[-2rem]">
                <ButtonMinus
                  onClick={() => update("config", { ...state.config, showActualityPanel: false })}
                />
              </div>
            )}
            <EditableText
              as={"h2"}
              content={state.actualityTitle}
              setContent={(newContent: EditableTextContent) => update("actualityTitle", newContent)}
              className="headline"
            />
            <PostsSection />
          </div>
        ) : (
          isAdmin && (
            <div className="flex mx-auto w-min">
              <ButtonPlus
                onClick={() => update("config", { ...state.config, showActualityPanel: true })}
              />
            </div>
          )
        )}
        <Caroussel
          content={state.carousel}
          onChange={(newComponents) => update("carousel", newComponents)}
        />
      </div>

      <Footer />
    </div>
  );
}
```

## File: pages/médias/+Page.tsx
```typescript
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import VideoGallery from "@/components/features/media/videoGallery";
import PicturesGallery from "@/components/features/media/picturesGallery";

export default function Page() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;

  return (
    <ClassicPageLayout>
      <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center w-full">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent) => update("title", newContent)}
          className="headline w-full text-center shrink-0"
        />
      </section>
      <section className="pt-[2.5rem] flex w-full flex-col min-h-0 items-center w-full">
        <VideoGallery />
      </section>
      <section className="pt-[2.5rem] flex w-full flex-col min-h-0 items-center w-full">
        <PicturesGallery />
      </section>
    </ClassicPageLayout>
  );
}
```

## File: pages/médias/getVideo.elefunc.ts
```typescript
import { logger } from "@/lib/logger";
import { VideoData } from "@/types/db";

export default async function getVideoData(url: string): Promise<VideoData | null> {
  try {
    const parsedRequest =
      "https://youtube.com/oembed?url=" + encodeURIComponent(url) + "&format=json";
    const res = await fetch(parsedRequest);

    if (!res.ok) throw new Error();
    const data = (await res.json()) as VideoData;
    return data;
  } catch (err) {
    logger.error("Get video data failed", err);
    return null;
  }
}
```

## File: pages/nous-écouter/+Page.tsx
```typescript
import ClassicPageLayout from "@/components/layout/classicPageLayout";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog } from "@/components/ui/dialog";
import EditableText from "@/components/common/editableText";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { SonPageContext } from "@/types/contexts";
import { useState } from "react";
import AlbumSection from "@/components/features/album/albumSection";
import AlbumForm from "@/components/features/album/albumForm";

export default function Page() {
  const { pageContext, update } = usePageState(SonPageContext);
  const { state } = pageContext;
  const [dialogOpen, setOpen] = useState<boolean>(false);
  const { isAdmin } = useAdmin();
  return (
    <>
      <ClassicPageLayout>
        <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center max-w-[40rem] w-full">
          <EditableText
            as={"h1"}
            content={state.title}
            setContent={(newContent) => update("title", newContent)}
            className="headline w-full text-center shrink-0"
          />
        </section>
        {state.albums.map((album) => (
          <AlbumSection
            album={album}
            albums={state.albums}
            setAlbums={(newAlbums) => update("albums", newAlbums)}
          />
        ))}

        {isAdmin && <ButtonPlus onClick={() => setOpen(true)} />}
      </ClassicPageLayout>
      {isAdmin && (
        <Dialog open={dialogOpen} onOpenChange={setOpen}>
          <AlbumForm setOpen={setOpen} />
        </Dialog>
      )}
    </>
  );
}
```

## File: pages/+config.ts
```typescript
import type { Config } from "vike/types";
import vikePhoton from "vike-photon/config";
import vikeReact from "vike-react/config";

export default {
  title: "Desinvolts",
  description: "The website of the french rock group Desinvolts",

  extends: [vikeReact, vikePhoton],

  photon: {
    server: "../server/entry.ts",
  },

  redirects: {
    "/accueil": "/",
  },

  headHtmlBegin: `
  <script>
    (function() {
      try {
        const savedTheme = localStorage.getItem('colortheme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');

        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } catch(e) {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
  `,

  bodyHtmlBegin: `<svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
        </filter>
      </svg>`,

  passToClient: ["isAdmin", "stateKey", "stateInitProps"],
} satisfies Config;
```

## File: pages/+data.ts
```typescript
import { PageContext } from "vike/types";
import { UAParser } from "ua-parser-js";
import { ScreenSizeType } from "@/providers/screenSizeProvider";
import {
  BasePageContent,
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "@/types/page-contents";
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { PageStateKey } from "@/types/contexts";

async function getScreen(pageContext: PageContext): Promise<ScreenSizeType> {
  const ua = pageContext.headers ? (pageContext.headers["user-agent"] ?? "") : "";
  logger.info("User agent: ", ua);
  const parser = new UAParser(ua);
  const device = parser.getDevice().type;
  logger.info("Device requested: ", device);
  if (device && ["mobile", "wearable", "embedded"].includes(device)) {
    return "sm";
  } else if (device === "tablet") {
    return "md";
  } else {
    return "lg";
  }
}

async function getPage<T>(path: string): Promise<T | null> {
  const page = await ApiHandler.get<T>(`http://backend:${process.env.BACKEND_PORT}/${path}`);
  if (page.success) {
    return page.body;
  }
  return null;
}

function convertToDates<T extends { date: Date }>(elements: T[]) {
  elements.forEach((e) => {
    e.date = new Date(e.date);
  });
}

export async function data(pageContext: PageContext): Promise<{
  screen: ScreenSizeType;
  stateKey: (typeof PageStateKey)[number];
  page: BasePageContent | null;
  updatePath: string;
}> {
  const screen = await getScreen(pageContext);
  let stateKey: (typeof PageStateKey)[number];
  let page: BasePageContent | null;
  let updatePath: string;

  switch (pageContext.urlPathname) {
    case "/":
      stateKey = "home";
      const homeContent = await getPage<HomePageContent>("home");
      if (homeContent) convertToDates(homeContent.posts);
      page = homeContent;
      updatePath = "home";
      break;
    case "/connexion":
      stateKey = "connexion";
      page = await getPage<ConnexionPageContent>("connexion");
      updatePath = "connexion-page";
      break;
    case "/contact":
      stateKey = "contact";
      const contactContent = await getPage<ContactPageContent>("contact");
      if (contactContent) convertToDates(contactContent.files);
      page = contactContent;
      updatePath = "contact";
      break;
    case "/dates":
      stateKey = "dates";
      const datesContent = await getPage<DatesPageContent>("dates");
      if (datesContent) convertToDates(datesContent.dates);
      page = datesContent;
      updatePath = "dates";
      break;
    case "/groupe":
      stateKey = "groupe";
      page = await getPage<GroupePageContent>("group");
      updatePath = "group";
      break;
    case "/médias":
    case "/medias":
      stateKey = "medias";
      page = await getPage<MediasPageContent>("medias");
      updatePath = "medias";
      break;
    case "/nous-écouter":
    case "/son":
      stateKey = "son";
      page = await getPage<NousEcouterPageContent>("son");
      updatePath = "son";
      break;
    default:
      stateKey = "default";
      page = await getPage<BasePageContent>("default");
      updatePath = "default";
  }
  return { screen, stateKey, page, updatePath };
}
export type Data = Awaited<ReturnType<typeof data>>;
```

## File: pages/+Head.tsx
```typescript
// https://vike.dev/Head

import logoUrl from "/assets/logo.svg";

export function Head() {
  return <link rel="icon" href={logoUrl} />;
}
```

## File: pages/+Layout.tsx
```typescript
import AdminProvider from "@/providers/adminProvider";
import "../styleSheets/Layout.css";
import "../styleSheets/tailwind.css";
import "../styleSheets/typography.css";

import Header from "@/components/layout/header";
import MouseProvider, { useMouse } from "@/providers/mouseProvider";
import WindowsProvider from "@/providers/windowsProvider";
import React, { Context, useMemo } from "react";
import ScreenSizeProvider, { useSize } from "@/providers/screenSizeProvider";
import StateProvider, { StateContent } from "@/providers/stateProvider";
import { Toaster } from "@/components/ui/sonner";
import PLAHECOLDERS from "@/config/placeholders";
import { BasePageContent } from "@/types/page-contents";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Spinner } from "@/components/ui/spinner";
import { contexts } from "@/types/contexts";
import { WindowProps } from "@/types/db";
import DevToolsWindow from "@/components/windows/devToolsWindow";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { stateKey, page, updatePath } = useData<Data>();
  const stateContext = contexts[stateKey];

  if (!page) return <Spinner />;

  return (
    <StateProvider<BasePageContent>
      context={stateContext}
      initialState={page}
      key={stateKey}
      updatePath={updatePath}
    >
      <ScreenSizeProvider>
        <AdminProvider>
          <MouseProvider>
            <Toaster />
            <Content context={stateContext}>{children}</Content>
          </MouseProvider>
        </AdminProvider>
      </ScreenSizeProvider>
    </StateProvider>
  );
}

function Content({
  children,
  context,
}: {
  children: React.ReactNode;
  context: Context<StateContent<any> | null>;
}) {
  const { setIsDown, setPosition } = useMouse();

  //   () => [
  //     {
  //       ...PLAHECOLDERS.defaultWindow,
  //       image: null,
  //       x: 20,
  //       y: 20,
  //       height: 250,
  //       width: 300,
  //     },
  //   ],
  //   [],
  // );

  return (
    <div
      id="page-container"
      className="min-h-screen w-screen relative"
      onMouseDownCapture={() => setIsDown(true)}
      onMouseUpCapture={() => setIsDown(false)}
      onMouseMoveCapture={(e) => setPosition(e.clientX, e.clientY)}
    >
      <DevToolsWindow context={context} />
      <Header context={context} />
      <div id="page-content" className="min-h-screen w-screen">
        {children}
      </div>
    </div>
  );
}
```

## File: pages/+onCreatePageContext.ts
```typescript
import { PageContext } from "vike/types";

export async function onCreatePageContext(pageContext: PageContext) {
  return {
    ...pageContext,
  };
}
```

## File: pages/getAllPageContent.telefunc.ts
```typescript
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { AbstractPageState, PageContentMap, PageStateKey } from "@/types/contexts";

export const getAllPageStates = async (): Promise<AbstractPageState[]> => {
  const data = await Promise.all(
    PageStateKey.map(async (page) => {
      try {
        const port = (process.env.BACKEND_PORT || "6000").trim();
        const fetchUrl = `http://backend:${port}/${page}`;
        console.log(`[DEBUG] Calling API: "${fetchUrl}"`);
        const res = await ApiHandler.get<PageContentMap>(fetchUrl);
        if (!res.success) throw new Error(`La récupération de la page ${page} a échoué`);

        return { page, content: res.body } as AbstractPageState;
      } catch (err) {
        logger.error(`Erreur lors de la récupération de la page ${page}:`, err);
        return null;
      }
    }),
  );
  logger.info("All pages requested");
  return data.filter((item): item is AbstractPageState => item !== null);
};
```

## File: pages/handleStateChange.telefunc.ts
```typescript
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";

export const handleStateChange = async (state: any, path: string) => {
  const fetchUrl = `http://backend:${process.env.BACKEND_PORT}/${path}`;
  logger.info("State change requested: ", fetchUrl);
  await ApiHandler.post(fetchUrl, state);
};
```

## File: pages/setAllPageContent.telefunc.ts
```typescript
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { AbstractPageState, PageStateKey } from "@/types/contexts";

export const setAllPages = async (data: AbstractPageState[]): Promise<{ success: boolean }> => {
  const errors: any[] = [];

  try {
    const defaultItem = data.find((e) => e.page === "default") as AbstractPageState;
    const res = await ApiHandler.post(
      `http://backend:${process.env.BACKEND_PORT}/default`,
      defaultItem.content,
    );
    if (!res.success) errors.push("Échec de default");
  } catch (err) {
    errors.push(err);
    logger.error("Erreur lors de l'upload de la page default");
  }

  const pagesOnly = PageStateKey.filter((page) => page !== "default");
  const req = await Promise.all(
    pagesOnly.map(async (page) => {
      try {
        const fetchUrl = `http://backend:${process.env.BACKEND_PORT}/${page}`;
        const item = data.find((e) => e.page === page) as AbstractPageState;
        const res = await ApiHandler.post(fetchUrl, item.content);
        return res.success;
      } catch (err) {
        errors.push(err);
        logger.error(`Erreur lors de l'upload de la page ${page}`);
        return false;
      }
    }),
  );

  logger.info("All pages requested");
  errors.forEach((err) => logger.error(err));
  return { success: errors.length === 0 && !req.includes(false) };
};
```

## File: providers/adminProvider.tsx
```typescript
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

interface AdminContextValue {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const pageContext = usePageContext();

  const [isAdmin, setIsAdmin] = useState(pageContext.isAdmin);

  const toggleAdmin = () => setIsAdmin((value) => !value);

  return <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) throw new Error("useAdmin must be called inside its provider !");

  return context;
}
```

## File: providers/mouseProvider.tsx
```typescript
import { createContext, ReactNode, useContext, useState } from "react";

interface MouseContextValue {
  isDown: boolean;
  setIsDown: (value: boolean) => void;
  position: { x: number; y: number };
  setPosition: (x: number, y: number) => void;
}

const MouseContext = createContext<MouseContextValue | undefined>(undefined);

export default function MouseProvider({ children }: { children: ReactNode }) {
  const [isDown, setIsDown] = useState<boolean>(false);
  const [position, setPositionState] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const setPosition = (x: number, y: number) => setPositionState({ x, y });

  return (
    <MouseContext.Provider value={{ isDown, position, setIsDown, setPosition }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);

  if (!context) throw new Error("useAdmin must be called inside its provider !");

  return context;
}
```

## File: providers/screenSizeProvider.tsx
```typescript
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useData } from "vike-react/useData";
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type ScreenSizeType = keyof typeof BREAKPOINTS;

const ScreenSizeContext = createContext<ScreenSizeType | undefined>(undefined);

export default function ScreenSizeProvider({ children }: { children: ReactNode }) {
  const data = useData<{ screen: ScreenSizeType }>();
  const { screen } = data;

  function getCurrentScreenSize(): ScreenSizeType {
    const width = window.innerWidth;

    if (width >= BREAKPOINTS.xl) return "xl";
    if (width >= BREAKPOINTS.lg) return "lg";
    if (width >= BREAKPOINTS.md) return "md";
    return "sm";
  }

  const [size, setSize] = useState<ScreenSizeType>(() => {
    if (typeof window === "undefined") return screen;
    return getCurrentScreenSize();
  });

  useEffect(() => {
    const handler = () => {
      setSize(getCurrentScreenSize());
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return <ScreenSizeContext.Provider value={size}>{children}</ScreenSizeContext.Provider>;
}

export function useSize() {
  const size = useContext(ScreenSizeContext);
  if (!size) throw new Error("useSize must be called insite it's provider !");
  return size;
}
```

## File: providers/stateProvider.tsx
```typescript
import { Context, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistoryState } from "@uidotdev/usehooks";
import { BasePageContent } from "@/types/page-contents";
import ApiHandler from "../lib/apiHandler";
import { handleStateChange } from "@/pages/handleStateChange.telefunc";
import useStateProvider from "@/hooks/useStateProvider";
import { logger } from "@/lib/logger";

export type StateContent<S> = {
  state: S;
  updatePath: string;
  set: (newPresent: S) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export interface StateProviderProps<S extends BasePageContent> {
  children: React.ReactNode;
  context: Context<StateContent<S> | null>;
  initialState: S;
  updatePath: string;
}

export default function StateProvider<S extends BasePageContent>(props: StateProviderProps<S>) {
  const { children, context } = props;
  const { state, set, undo, redo, canUndo, canRedo } = useStateProvider(props);

  return (
    <context.Provider
      value={{ state, set, undo, redo, canUndo, canRedo, updatePath: props.updatePath }}
    >
      {children}
    </context.Provider>
  );
}

export function usePageState<S extends BasePageContent>(context: Context<StateContent<S> | null>) {
  const pageContext = useContext(context);
  if (!pageContext) {
    throw new Error("usePageState must be used within its Provider");
  }
  const update = <K extends keyof S>(key: K, value: S[K]) => {
    pageContext.set({ ...pageContext.state, [key]: value });
  };
  return { pageContext, update };
}
```

## File: providers/windowsProvider.tsx
```typescript
import ImageWindow from "@/components/windows/imageWindow";
import VideoWindow from "@/components/windows/videoWindow";
import WindowsManager, { WindowManagerProps } from "@/components/windows/windowsManager";
import { WindowProps } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { createContext, ReactNode, useContext, useId, useMemo, useState } from "react";

interface WindowsContextValue {
  windows: WindowProps[];
  setWindows: (windows: WindowProps[]) => void;
  addWindow: (window: WindowProps) => void;
  removeWindow: (id: number) => void;
  bringToFront: (id: number) => void;
}
const WindowsContext = createContext<WindowsContextValue | undefined>(undefined);

export default function WindowsProvider({
  windows = [],
  managerProps,
  children,
}: {
  windows?: WindowProps[];
  managerProps: WindowManagerProps;
  children?: ReactNode;
}) {
  const createChildrenFromEnum = (props: WindowProps): ReactNode => {
    if (props.image) return <ImageWindow image={props.image} window={props} />;
    if (props.video) return <VideoWindow video={props.video} />;
  };

  const createSingleWindow = (window: WindowProps, newZIndex: number): WindowProps => {
    return {
      ...window,
      id: getRandomId(),
      zIndex: newZIndex,
      children: createChildrenFromEnum(window),
    };
  };

  const createMultipleWindows = (windows: WindowProps[]): WindowProps[] => {
    return windows.map((window, index) => createSingleWindow(window, index));
  };

  const addWindow = (window: WindowProps) => {
    const sorted = [...windows].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const newWindow = {
      ...window,
      id: getRandomId(),
      zIndex: sorted.length,
    };

    managerProps.setWindows([...windows, { ...newWindow }]);
  };

  const removeWindow = (id: number) => {
    managerProps.setWindows(windows.filter((window) => window.id !== id));
  };

  const bringToFront = (id: number) => {
    console.log("bring to front");
    const sorted = [...windows].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const targetIndex = sorted.findIndex((w) => w.id === id);
    if (targetIndex === -1) return;

    const [target] = sorted.splice(targetIndex, 1);

    sorted.push(target);

    const normalizedWindows = sorted.map((w, index) => ({
      ...w,
      zIndex: index,
    }));

    managerProps.setWindows(normalizedWindows);
  };

  const createdWindows = useMemo(
    () =>
      windows.map((window, index) => ({
        ...window,
        zIndex: window.zIndex ?? index,
        children: createChildrenFromEnum(window),
      })),
    [windows],
  );

  return (
    <WindowsContext.Provider
      value={{
        windows: createdWindows,
        setWindows: managerProps.setWindows,
        addWindow,
        removeWindow,
        bringToFront,
      }}
    >
      <WindowsManager {...managerProps} />
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);

  if (!context) throw new Error("useWindows must be called inside its provider !");

  return context;
}
```

## File: public/assets/logo.svg
```xml
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25 1.5C37.9787 1.5 48.5 12.0213 48.5 25C48.5 37.9787 37.9787 48.5 25 48.5C12.0213 48.5 1.5 37.9787 1.5 25C1.5 12.0213 12.0213 1.5 25 1.5Z" fill="#041527"/>
<path d="M25 1.5C37.9787 1.5 48.5 12.0213 48.5 25C48.5 37.9787 37.9787 48.5 25 48.5C12.0213 48.5 1.5 37.9787 1.5 25C1.5 12.0213 12.0213 1.5 25 1.5Z" stroke="#E8DBC1" strokeWidth="3"/>
<path d="M4.5 33.52H4.56C4.52 33.52 4.48 33.52 4.44 33.54L4.34 33.5L4.4 33.34H4.5C4.6 33.28 4.68 33.24 4.8 33.24L4.84 33.2H5L5.1 33.14C5.16 33.14 5.24 33.14 5.28 33.1L5.52 33.08L5.62 32.96C5.7 32.96 5.74 32.9 5.82 32.9H5.84C5.9 32.86 5.98 32.82 6.06 32.8L5.98 32.74L5.88 32.8C5.72 32.76 5.58 32.8 5.42 32.82V32.8C5.42 32.7 5.8 32.6 5.88 32.6L6.06 32.5L6.3 32.54L6.36 32.32L6.24 32.42L6 32.44L5.98 32.46C5.98 32.48 6 32.52 5.96 32.52C5.9 32.52 5.84 32.48 5.8 32.46L5.56 32.54C5.56 32.6 5.46 32.62 5.42 32.62C5.38 32.62 5.32 32.6 5.28 32.58L5.22 32.64C5 32.64 4.92 32.72 4.68 32.7C4.62 32.7 4.56 32.68 4.5 32.72L4.36 32.64C4.36 32.8 3.94 32.66 3.88 32.64C3.84 32.72 3.66 32.74 3.66 32.7C3.66 32.66 4.12 32.6 4.2 32.6H4.26L4.4 32.48C4.52 32.5 4.76 32.42 4.92 32.42H5C5.04 32.36 5.16 32.36 5.22 32.36C5.36 32.22 5.92 32.04 6.12 32.04L6.24 31.96C6.3 31.98 6.36 31.94 6.38 31.88L6.02 31.86L5.96 31.94L5.82 31.9L5.76 31.96H5.56L5.38 32.06C5.36 32.04 5.26 32 5.26 31.96C5.26 31.94 5.28 31.94 5.3 31.94H5.34L5.36 31.9H5.56C5.58 31.82 5.7 31.82 5.76 31.82L5.96 31.74C6.06 31.76 6.04 31.7 6.12 31.7H6.16L6.3 31.58C6.38 31.56 6.6 31.5 6.68 31.5C6.82 31.5 6.94 31.46 7.08 31.46C7.1 31.44 7.14 31.44 7.14 31.4C7.14 31.38 7.12 31.38 7.1 31.38C7.16 31.32 7.26 31.26 7.34 31.22L7.42 31.28L7.34 31.2C7.44 31.2 7.58 31.16 7.6 31.04L7.72 30.9C7.78 30.9 7.82 30.92 7.86 30.94L7.98 30.82C8.38 30.74 9.4 30.66 9.72 30.38L10.18 30.28C10.32 30.3 10.44 30.26 10.56 30.26H10.64C10.66 30.26 10.74 30.22 10.74 30.2C10.74 30.16 10.72 30.16 10.7 30.16L10.82 30.04C10.82 29.98 10.86 29.92 10.92 29.92L10.98 29.94L11.06 30.04L10.98 29.92C11 29.78 11.26 29.9 11.3 29.72C11.3 29.66 11.32 29.56 11.4 29.56C11.48 29.56 11.54 29.64 11.62 29.62L11.86 29.26C11.94 29.3 12 29.06 12.02 29C12.16 29 12.1 28.66 12.24 28.66C12.24 28.62 12.24 28.56 12.18 28.56C12.02 28.56 11.74 29.04 11.7 29.1C11.54 29.12 11.62 29.28 11.52 29.28C11.48 29.28 11.36 29.28 11.36 29.22C11.36 29.02 11.58 29.02 11.58 28.84L11.44 28.76C11.44 28.68 11.56 28.62 11.62 28.58L11.64 28.32C11.72 28.32 11.8 28.28 11.86 28.22C11.86 28.18 11.9 28.12 11.94 28.12H11.96C11.96 28.06 11.96 27.96 12.04 27.96H12.06L12.24 27.6C12.36 27.6 12.28 27.44 12.42 27.44C12.42 27.42 12.42 27.34 12.38 27.34C12.34 27.34 12.3 27.42 12.28 27.44L12.08 27.56C12.08 27.68 12 27.66 12 27.76C11.9 27.86 11.8 27.96 11.72 28.08C11.72 28.12 11.68 28.26 11.62 28.26C11.6 28.26 11.58 28.24 11.56 28.22C11.6 27.92 11.84 27.68 11.84 27.6L11.98 27.5C12.02 27.5 12.02 27.48 12.02 27.46C12.02 27.38 12 27.28 11.96 27.22C11.98 27.14 12.06 26.98 12.14 26.98C12.16 26.98 12.18 26.98 12.2 27C12.16 27.02 12.1 27.06 12.1 27.12C12.1 27.16 12.14 27.18 12.18 27.18C12.3 26.92 12.46 26.1 12.6 26C12.6 25.82 12.76 25.74 12.78 25.56C12.8 25.54 13.08 25.04 13.12 25.04C13.14 25.04 13.14 25.14 13.14 25.14C13.14 25.14 13.14 25.18 13.16 25.18C13.2 25.18 13.3 25.06 13.32 25.02L13.28 24.84C13.28 24.92 13.26 25.02 13.22 25.08C13.18 25.08 13.16 25.04 13.16 25C13.16 24.86 13.26 24.74 13.32 24.62C13.36 24.6 13.5 24.22 13.5 24.16L13.68 24.02C13.68 24.02 13.68 23.98 13.7 23.98C13.74 23.98 13.76 24.1 13.8 24.1C13.82 24.1 13.82 24.06 13.82 24.06C13.82 24 13.8 23.9 13.78 23.84L13.92 23.62C13.92 23.58 13.92 23.5 13.98 23.5L14.08 23.52L14.12 23.22C14.28 23.22 14.2 22.8 14.34 22.8C14.42 22.74 14.5 22.68 14.56 22.6C14.56 22.54 14.6 22.48 14.66 22.46C14.68 22.32 14.76 22.2 14.76 22.04L15.04 21.68V21.44L15.2 21.3C15.24 21.22 15.3 21.04 15.38 21C15.38 20.96 15.4 20.88 15.46 20.88C15.46 20.8 15.5 20.5 15.62 20.5H15.64C15.66 20.24 15.98 19.9 16.02 19.62L16.2 19.52L15.98 19.3C15.94 19.3 15.84 19.3 15.84 19.24V19.2C15.74 19.2 15.7 19.28 15.7 19.38V19.4L15.62 19.3C15.36 19.24 15.14 19.22 14.86 19.22C14.86 19.38 14.62 19.16 14.54 19.16C14.5 19.16 14.48 19.2 14.48 19.24L14.32 19.3C14.32 19.32 14.32 19.38 14.28 19.38C14.22 19.38 14.18 19.32 14.14 19.28C13.94 19.24 13.8 19.14 13.7 19.3H13.46L13.38 19.22L13.32 19.28L13 19.26C13 19.3 12.96 19.32 12.92 19.32C12.68 19.32 12.4 19.26 12.16 19.24L12.06 19.36L11.74 19.32C11.7 19.34 11.62 19.34 11.62 19.28C11.62 19.24 11.7 19.22 11.72 19.22C11.96 19.22 12 19.1 12.16 19.1H12.22L12.26 19L12.44 19.04L12.6 18.88C12.8 18.8 13.02 18.72 13.22 18.7L13.32 18.58L13.76 18.48C13.72 18.26 14.12 18.46 14.12 18.36V18.34C14.22 18.36 14.32 18.3 14.34 18.2L14.3 18.14H14.1L14.02 18.2C13.82 18.14 13.8 18.14 13.66 18.24L13.18 18.18L13 18.28C13.04 18.2 12.96 18.18 12.9 18.18H12.86L12.7 18.26L12.52 18.22C11.92 18.36 11.04 18.44 10.38 18.44H10.3C10.3 18.58 10.02 18.58 9.94 18.58C9.86 18.58 9.8 18.56 9.8 18.48L10.18 18.28C10.3 18.28 10.42 18.22 10.54 18.22C10.6 18.22 11.02 18.28 11.04 18.16C10.92 18.14 10.94 18.02 10.84 18.02H10.82L10.68 17.96C10.9 17.96 11.14 17.92 11.36 17.88C11.38 17.8 11.6 17.8 11.66 17.78L11.68 17.76C11.68 17.74 11.62 17.72 11.6 17.72C11.62 17.7 11.62 17.66 11.58 17.66C11.22 17.66 10.88 17.68 10.52 17.66C10.6 17.6 10.7 17.56 10.8 17.56C10.88 17.56 10.98 17.56 11.06 17.6C11.12 17.58 11.34 17.56 11.34 17.54C11.34 17.5 11.28 17.44 11.24 17.42H10.48C10.5 17.56 10.4 17.48 10.36 17.42C9.78 17.46 9.24 17.56 8.64 17.56L8.56 17.66L7.02 17.7L6.94 17.78C6.88 17.78 6.84 17.76 6.84 17.7C6.84 17.62 6.82 17.5 6.92 17.5C7.08 17.5 7.08 17.52 7.24 17.44H7.34L7.62 17.32C7.6 17.16 7.82 17.16 7.92 17.16C8.06 17.16 8.18 17.16 8.3 17.18C8.44 17.1 8.6 17.02 8.76 17L8.8 16.94C8.92 16.92 8.98 16.8 9.06 16.8H9.38C9.4 16.76 9.46 16.74 9.5 16.74L9.58 16.64L9.7 16.66L9.74 16.6L10.64 16.44C10.66 16.42 10.7 16.38 10.74 16.38L10.8 16.4C10.96 16.42 11.2 16.42 11.36 16.34C11.4 16.3 11.46 16.28 11.5 16.28L11.56 16.3L11.64 16.16C11.84 16.14 12.1 16.18 12.28 16.08H12.74C12.82 15.94 14.14 15.92 14.42 15.92C14.46 15.92 14.6 15.96 14.6 15.94C14.72 15.94 14.86 15.94 14.98 15.98L15.1 15.86C15.88 15.94 16.6 15.92 17.4 15.98C17.48 15.84 17.72 15.9 17.84 15.96C17.84 15.9 17.86 15.82 17.92 15.82C17.96 15.82 18 15.82 18.04 15.84C18.1 15.82 18.22 15.82 18.22 15.92C18.22 16.08 18.1 16 18.1 16.12C18.1 16.14 18.12 16.18 18.14 16.18C18.2 16.18 18.26 16.14 18.3 16.1C18.42 16.1 18.38 15.88 18.56 15.88C18.64 15.88 18.72 15.9 18.78 15.96L19.38 16L19.48 15.88C19.56 15.88 19.64 15.92 19.7 15.96L19.82 15.8L20 15.72C20 15.68 20.02 15.6 20.08 15.6C20.16 15.6 20.24 15.68 20.3 15.74L20.32 16.04C20.36 16.04 20.44 16.04 20.44 16.1C20.44 16.14 20.42 16.18 20.42 16.22C20.48 16.26 20.54 16.32 20.62 16.32C20.64 16.32 20.66 16.28 20.66 16.26C20.9 16.02 21.18 15.54 21.34 15.24C21.34 15.2 21.38 15.12 21.44 15.12L21.54 14.96C21.54 14.86 21.62 14.78 21.7 14.74C21.68 14.82 21.74 14.98 21.6 14.98C21.58 15.36 21.54 15.16 21.48 15.3C21.48 15.4 21.4 15.58 21.38 15.7L21.32 15.82C21.32 15.94 21.22 16.02 21.22 16.14C21.22 16.18 21.26 16.22 21.3 16.22L21.48 16.04L21.54 15.86C21.52 15.72 21.52 15.7 21.66 15.7C21.74 15.7 21.78 15.78 21.78 15.86C21.78 15.98 21.78 16.14 21.66 16.2V16.26C21.66 16.34 21.68 16.48 21.56 16.48L21.54 16.74C21.54 16.86 21.62 16.92 21.74 16.92L21.92 16.84C21.92 16.96 22.12 16.94 22.18 16.94C22.3 16.98 22.4 17.16 22.54 17.16C22.58 17.16 22.58 17.1 22.58 17.08L23.04 17.24C23.04 17.38 23.32 17.4 23.42 17.42C23.4 17.6 23.92 17.72 24.06 17.76C24.2 17.74 24.54 18.06 24.7 18.06L24.96 18.36L25.24 18.48L25.42 18.66C25.58 18.7 25.66 18.84 25.82 18.84H25.84C25.84 18.92 25.9 18.96 25.98 18.96H26L26.16 19.14C26.3 19.16 26.42 19.34 26.48 19.44C26.4 19.54 26.62 19.48 26.62 19.66L26.78 19.74C26.88 19.84 26.96 19.98 27.02 20.1C27.02 20.12 27.02 20.18 26.98 20.18C26.9 20.18 26.76 19.96 26.76 19.88V19.86L26.62 19.74H26.58C26.58 19.74 26.56 19.74 26.56 19.76C26.56 19.8 26.62 19.84 26.66 19.86L26.76 20.04L26.8 20.32L26.96 20.48L27 20.72C27.14 20.72 27.2 20.9 27.2 21C27.2 21.36 27.46 21.22 27.46 21.4V21.42C27.56 21.54 27.62 21.62 27.62 21.76C27.62 21.94 27.64 22.02 27.74 22.16L27.7 23.5C27.58 23.5 27.62 23.96 27.52 23.96H27.5C27.44 24.06 27.36 24.18 27.36 24.3C27.36 24.34 27.38 24.36 27.42 24.36H27.44C27.52 24.36 27.48 24.08 27.6 24.08H27.62C27.6 24.26 27.36 24.94 27.36 25.06C27.36 25.1 27.36 25.22 27.28 25.22H27.26L27.22 25.74C27.02 25.96 26.92 26.22 26.68 26.44C26.68 26.54 26.62 26.58 26.62 26.62V26.66C26.6 26.66 26.46 26.72 26.46 26.74C26.46 26.76 26.5 26.76 26.5 26.76L26.3 27.18C26.24 27.28 26.1 27.36 26.08 27.5C26.08 27.52 26.08 27.58 26.04 27.58C25.96 27.58 25.92 27.58 25.92 27.66C25.94 27.68 26.06 27.76 25.96 27.76H25.92L25.62 27.96C25.6 28.06 25.52 28.3 25.38 28.3H25.34C25.32 28.4 25.24 28.44 25.14 28.44H25.1L24.92 28.58C24.9 28.74 24.58 28.74 24.56 28.94L24.42 29C24.4 29.06 24.4 29.18 24.32 29.18L24.2 29.16L23.92 29.48C23.9 29.54 23.84 29.58 23.78 29.58C23.76 29.64 23.7 29.66 23.64 29.66H23.6L23.28 29.94C23.16 29.94 23.18 29.94 23.12 30.04L23.06 29.94L22.96 30.04C22.88 30.02 22.82 30.08 22.8 30.14C22.66 30.14 22.62 30.22 22.52 30.22C22.52 30.3 22.46 30.32 22.38 30.32C22.36 30.32 22.28 30.3 22.28 30.34C22.28 30.36 22.32 30.38 22.34 30.4C22.3 30.64 22.08 30.62 22.08 30.74C22.02 30.7 21.98 30.64 21.98 30.58L22 30.52C22.06 30.62 22.12 30.52 22.12 30.44C22.12 30.42 22.1 30.38 22.06 30.38C22.02 30.46 21.92 30.44 21.86 30.42L21.78 30.7C21.82 30.7 21.9 30.72 21.9 30.76C21.9 30.84 21.76 30.86 21.7 30.86H21.68C21.7 30.78 21.68 30.68 21.58 30.68V30.86C21.56 30.88 21.52 30.96 21.48 30.96C21.44 30.96 21.44 30.92 21.44 30.9C21.44 30.9 21.44 30.84 21.42 30.84C21.38 30.84 21.34 30.9 21.32 30.92L21.18 30.74H21.14C21.06 30.74 21 30.82 20.88 30.82L20.76 31C20.82 31 21.12 30.96 21.12 31.04C21.12 31.12 20.96 31.22 20.9 31.24L20.68 31.2L20.6 31.14L20.58 31.18C20.58 31.2 20.6 31.24 20.64 31.24C20.64 31.32 20.58 31.4 20.5 31.44C20.42 31.44 20.36 31.38 20.3 31.34C20.3 31.28 20.22 31.26 20.18 31.26L20 31.4L19.88 31.24C19.76 31.36 19.6 31.46 19.46 31.54C19.38 31.54 19.38 31.46 19.38 31.4C19.38 31.38 19.38 31.34 19.34 31.34C19.28 31.34 19.22 31.4 19.22 31.46C19.26 31.48 19.38 31.56 19.38 31.6C19.38 31.62 19.36 31.62 19.36 31.62L19.3 31.6C19.3 31.66 19.26 31.72 19.2 31.72C19.12 31.72 19 31.68 18.94 31.74C18.92 31.74 18.86 31.74 18.86 31.78V31.82C18.78 31.76 18.68 31.68 18.58 31.68C18.54 31.68 18.5 31.74 18.44 31.72L18.38 31.98C18.28 32.02 18.14 32.08 18.04 32.08C17.92 32.08 17.94 31.92 17.94 31.84L17.86 31.76C17.82 31.82 17.78 31.9 17.72 31.94C17.78 31.98 17.94 32.1 17.94 32.18C17.94 32.22 17.88 32.22 17.86 32.22L17.32 32.24C17.32 32.3 17.24 32.28 17.2 32.28C17.14 32.28 17.06 32.36 16.98 32.36L17.06 32.22C17.02 32.18 16.98 32.12 16.92 32.12C16.9 32.12 16.9 32.16 16.9 32.18C16.9 32.26 16.94 32.46 16.82 32.46C16.74 32.42 16.66 32.36 16.66 32.5C16.66 32.5 16.58 32.48 16.58 32.52C16.58 32.56 16.66 32.58 16.7 32.58C16.62 32.7 16.54 32.82 16.44 32.92C16.24 32.92 16.02 32.94 15.82 32.94C15.72 32.94 15.76 33.02 15.74 33.02H15.7C15.64 33.02 15.58 33.06 15.58 33.12C15.48 33.12 14.94 33.02 14.94 33.14C14.88 33.14 14.82 33.16 14.8 33.22C14.74 33.22 14.66 33.26 14.62 33.32C14.58 33.3 14.5 33.3 14.48 33.36C14.4 33.36 14.34 33.38 14.28 33.44L14.1 33.4L14.04 33.48C13.94 33.46 13.88 33.3 13.84 33.5C13.82 33.58 13.82 33.66 13.76 33.7C13.68 33.66 13.56 33.64 13.5 33.7V33.82C13.46 33.86 12.9 34.68 12.9 34.74L12.92 34.78L12.8 35.08C12.78 35.1 12.52 35.64 12.52 35.64C11.9 36.26 11.86 37.44 11.22 38.08C11.34 38.2 11.1 38.36 11.02 38.42L10.88 38.78C10.82 38.84 10.82 38.92 10.76 38.98C10.74 39.08 10.68 39.28 10.54 39.28C10.5 39.28 10.48 39.26 10.48 39.22C10.48 39.18 10.52 39.14 10.54 39.1C10.62 38.9 10.64 38.74 10.84 38.62C10.8 38.56 11 38.32 11 38.24C11 38.22 11 38.2 10.98 38.18L11.14 37.62C11.24 37.52 11.14 37.26 11.32 37.1C11.14 37.14 11.46 36.86 11.48 36.84C11.5 36.72 11.52 36.6 11.6 36.5L11.62 36.3C11.74 36.16 12.04 35.56 11.88 35.4C11.9 35.38 11.94 35.34 11.94 35.32C11.76 35.32 11.58 35.86 11.48 35.86C11.46 35.86 11.42 35.84 11.4 35.82L11.62 35.54C11.54 35.42 11.62 35.18 11.48 35.1C11.64 34.78 11.82 34.46 12 34.14L11.96 33.98C11.84 34.16 11.66 34.34 11.56 34.52C11.56 34.64 11.48 34.64 11.48 34.76L11.3 34.84C11.32 34.7 11.5 34.42 11.5 34.32C11.5 34.3 11.5 34.24 11.46 34.24C11.44 34.24 11.42 34.4 11.42 34.42L11.26 34.46C11.2 34.52 11.16 34.64 11.16 34.74H11.12L11.16 34.84C11.02 34.98 10.94 35.04 10.9 35.24C11 35.18 10.72 35.4 10.66 35.5C10.62 35.5 10.56 35.52 10.56 35.56C10.56 35.7 10.76 35.64 10.76 35.74C10.76 35.9 10.26 36.42 10.26 36.44L10.28 36.48C10.28 36.5 10.26 36.52 10.22 36.52C10.18 36.52 10.16 36.44 10.16 36.4L10.26 36.12C10.28 36.1 10.32 36.06 10.32 36.02C10.32 35.98 10.28 35.94 10.24 35.92C10.34 35.8 10.32 35.7 10.4 35.6C10.42 35.58 10.62 35.32 10.62 35.3C10.62 35.28 10.6 35.28 10.58 35.28H10.56C10.62 35.18 10.68 35.1 10.76 35.02L10.78 34.84C10.84 34.84 10.88 34.66 10.9 34.62L10.88 34.54H10.98C11.02 34.48 11.02 34.4 11.04 34.34C11.04 34.32 11.02 34.32 11.02 34.32C10.92 34.32 10.84 34.72 10.7 34.72C10.64 34.72 10.58 34.68 10.58 34.64C10.58 34.54 10.8 34.46 10.8 34.38C10.8 34.36 10.72 34.34 10.7 34.32C10.72 34.26 10.74 34.2 10.78 34.14C10.7 34.18 10.84 33.88 10.84 33.84L10.62 33.82C10.54 33.86 10.2 34.02 10.12 34.02L10.1 34L10.04 34.1L9.86 34.04L9.82 34.12C9.78 34.02 9.72 34.02 9.7 34.14L9.56 34.22C9.52 34.22 9.48 34.2 9.46 34.16L9.36 34.18C9.36 34.24 9.3 34.24 9.26 34.24C9.14 34.24 9.02 34.22 8.9 34.18C8.66 34.24 8.42 34.28 8.18 34.3C8.16 34.32 8.14 34.38 8.1 34.38C8.08 34.38 8.1 34.34 8.1 34.34V34.3H8.08C7.98 34.36 7.8 34.44 7.7 34.44C7.64 34.44 7.56 34.42 7.54 34.36L7.38 34.34L7.26 34.4C6.98 34.34 6.78 34.44 6.52 34.54L6.32 34.48L6.2 34.6C6.2 34.7 6.08 34.68 6.02 34.64C6.02 34.68 5.98 34.7 5.94 34.7C5.84 34.7 5.74 34.68 5.64 34.64C5.34 34.7 5.02 34.78 4.7 34.74C4.68 34.8 4.6 34.82 4.54 34.82C4.48 34.82 4.4 34.8 4.34 34.78C4.24 34.8 4.2 34.82 4.06 34.82L3.98 34.88L3.84 34.8C3.8 34.74 3.7 34.7 3.64 34.7C3.44 34.7 3.18 34.76 2.98 34.78C2.94 34.78 2.86 34.78 2.86 34.84C2.7 34.84 2.5 34.86 2.36 34.78C2.36 34.74 2.72 34.68 2.78 34.68C2.78 34.62 2.82 34.6 2.86 34.58C2.76 34.56 2.64 34.52 2.54 34.52C2.42 34.52 2.16 34.66 1.96 34.66L1.68 34.64L1.58 34.74L1.36 34.7C1.36 34.68 1.36 34.62 1.32 34.62C1.3 34.62 1.26 34.68 1.24 34.7C1.18 34.7 1.1 34.72 1.08 34.78C0.88 34.76 0.68 34.8 0.48 34.82C0.46 34.82 0.36 34.8 0.36 34.84L0.18 34.82L0.26 34.68L0.38 34.74L0.44 34.64C0.78 34.68 1.1 34.52 1.44 34.56L1.48 34.52C1.74 34.56 2.12 34.44 2.4 34.4L2.14 34.38L2.24 34.22L2.42 34.28L2.48 34.18C2.54 34.18 2.9 34.26 2.92 34.14C3.2 34.08 3.44 34.06 3.72 34.06L3.76 34.02C4.16 34.02 4.36 33.88 4.7 33.78C4.72 33.72 4.78 33.7 4.84 33.7H4.86L4.96 33.62C5.06 33.62 5.08 33.54 5.18 33.54C5.2 33.54 5.28 33.58 5.28 33.52H5.44L5.5 33.44H5.64L5.7 33.36C5.82 33.34 5.92 33.34 6.04 33.34L6.12 33.28C6.14 33.28 6.26 33.26 6.26 33.22C6.26 33.2 6.24 33.2 6.22 33.2C6.14 33.2 6.06 33.24 6 33.28C5.82 33.26 5.28 33.32 5.16 33.4H5L4.98 33.5C4.84 33.52 4.7 33.5 4.56 33.52L4.54 33.46H4.52C4.5 33.46 4.48 33.48 4.48 33.5C4.48 33.52 4.48 33.52 4.5 33.52ZM19.92 21.1C19.92 20.96 20 20.62 19.78 20.58L19.72 20.76C19.86 20.76 19.7 20.9 19.66 20.92L19.64 21.02C19.64 21.06 19.66 21.1 19.7 21.1C19.68 21.24 19.58 21.26 19.58 21.4C19.58 21.44 19.6 21.48 19.66 21.48C19.74 21.48 19.78 21.2 19.84 21.12L19.9 21.24C19.88 21.34 19.84 21.46 19.78 21.54C19.78 21.64 19.72 21.7 19.72 21.8C19.72 21.82 19.52 22.12 19.52 22.14C19.36 22.12 19.44 22.3 19.36 22.3H19.34C19.3 22.38 19.22 22.48 19.22 22.56C19.22 22.62 19.24 22.66 19.28 22.7L19.1 22.8V23.06L18.84 23.54C18.78 23.58 18.78 23.66 18.78 23.72C18.78 23.94 18.42 24.08 18.4 24.26C18.34 24.32 18.32 24.4 18.32 24.48L18.24 24.54V24.7L18.1 24.78L18.04 25.12L17.84 25.2C17.82 25.26 17.74 25.6 17.7 25.62L17.64 25.58L17.66 25.72L17.56 26C17.54 26 17.46 26.02 17.46 26.06H17.5C17.5 26.12 17.46 26.22 17.42 26.26C17.42 26.28 17.42 26.3 17.4 26.3C17.14 26.3 17.28 26.68 17.08 26.9L16.88 26.88C16.86 26.92 16.86 26.94 16.86 26.98C16.86 27.02 16.88 27.04 16.92 27.04C16.88 27.14 16.8 27.44 16.72 27.5C16.7 27.58 16.64 27.62 16.62 27.7L16.52 27.8C16.52 27.98 16.46 28.06 16.46 28.18C16.44 28.24 16.38 28.3 16.32 28.32C16.28 28.4 16.24 28.5 16.24 28.58C16.3 28.58 16.42 28.58 16.46 28.66C16.56 28.66 16.58 28.58 16.68 28.6C16.82 28.46 17.1 28.6 17.1 28.52C17.1 28.5 17.08 28.48 17.12 28.48C17.2 28.48 17.28 28.46 17.3 28.36C17.42 28.38 17.68 28.36 17.74 28.26C17.82 28.26 18.12 28.26 18.12 28.14L18.5 27.98C18.58 27.98 18.8 27.96 18.8 27.86C18.9 27.84 19.2 27.82 19.22 27.7C19.78 27.5 19.98 27.26 20.52 27C20.54 26.9 20.72 26.9 20.8 26.9H20.84C20.92 26.78 21.12 26.72 21.12 26.56C21.16 26.58 21.24 26.58 21.24 26.52V26.48L21.42 26.3C21.52 26.3 22.08 25.9 22.08 25.78L22.4 25.52C22.42 25.4 23.1 24.82 23.1 24.64C23.08 24.6 22.96 24.36 23.06 24.36H23.08C23.58 23.6 23.58 22.96 23.68 22.1C23.62 22.06 23.62 21.98 23.62 21.92L23.48 21.8C23.48 21.74 23.46 21.66 23.4 21.62C23.44 21.52 23.18 21.28 23.12 21.22C22.98 21.2 22.96 20.96 22.8 20.96C22.8 20.9 22.74 20.86 22.68 20.86C22.68 20.72 22.52 20.82 22.52 20.7L21.94 20.52C21.76 20.46 20.98 20.34 20.98 20.2V20.18C20.9 20.18 20.8 20.14 20.76 20.06C20.7 20.16 20.62 20.26 20.52 20.3L20.3 20.28C20.3 20.36 20.3 20.76 20.2 20.76C20.02 20.76 20.14 21.1 19.94 21.1H19.92ZM26.2 26.12L26.08 26.28C25.94 26.28 26.04 26.44 25.92 26.44L25.64 26.68C25.64 26.84 25.44 26.92 25.3 26.96V27C25.3 27.18 25.2 27.3 25.2 27.4V27.42L25 27.6L25.24 27.58C25.26 27.44 25.4 27.28 25.5 27.18L25.44 27.12L25.52 27.04C25.52 27.02 25.52 27 25.54 27C25.56 27 25.6 27.14 25.62 27.18C25.64 27.12 25.72 27.12 25.76 27.14L25.9 27.04C25.9 27.04 26.54 25.7 26.54 25.66C26.54 25.6 26.52 25.54 26.44 25.54L26.32 25.42C26.22 25.56 26.04 25.84 26.04 26C26.04 26.1 26.14 26.12 26.2 26.12ZM18.04 24.1C18.04 24.02 18 23.96 17.92 23.96C17.86 23.96 17.8 24 17.8 24.06C17.8 24.1 17.82 24.14 17.86 24.14C17.9 24.14 17.94 24.12 17.96 24.1L18.02 24.26C18.02 24.32 18.06 24.44 18.14 24.44C18.2 24.44 18.22 24.38 18.22 24.32L18.24 24.24C18.24 24.18 18.2 24.12 18.2 24.06C18.24 24.12 18.34 24.2 18.34 24.06L18.42 24.04L18.54 23.9C18.5 23.64 18.98 23.14 18.98 22.92C18.98 22.8 19.1 22.74 19.1 22.66C19.1 22.64 19.08 22.62 19.06 22.62L18.9 22.8C18.86 22.8 18.84 22.82 18.84 22.86C18.84 22.92 18.84 22.98 18.76 22.98L18.54 23.46C18.44 23.46 18.48 23.54 18.38 23.54C18.36 23.72 18.24 23.82 18.22 23.98C18.06 23.92 18.18 24.1 18.08 24.1H18.04ZM27.34 22.26C27.1 22.24 27.08 23.42 27.08 23.48L27.06 23.64C27.06 23.72 27.1 23.78 27.14 23.82C27.26 23.84 27.26 23.52 27.26 23.46C27.32 23.06 27.32 22.66 27.34 22.26ZM23.18 29.52L23.32 29.62H23.34C23.56 29.62 23.6 29.22 23.76 29.22H23.78C24 29.12 24.12 28.96 24.3 28.8V28.7C24.28 28.72 24.22 28.72 24.2 28.72C24.12 28.8 23.82 29.12 23.72 29.12C23.7 29.12 23.68 29.12 23.68 29.08V29.06C23.56 29.06 23.6 29.1 23.56 29.18C23.5 29.16 23.42 29.16 23.4 29.24C23.3 29.3 23.18 29.4 23.18 29.52ZM19.28 30.82C19.28 30.9 19.3 30.94 19.38 30.94C19.6 30.94 19.76 30.8 19.94 30.7C20.06 30.74 20.16 30.62 20.24 30.56C20.3 30.58 20.38 30.6 20.38 30.52L20.48 30.42L20.4 30.38C20.4 30.36 20.4 30.32 20.36 30.32C20.3 30.32 20.18 30.44 20.14 30.48L19.7 30.6C19.56 30.64 19.66 30.8 19.46 30.78C19.44 30.82 19.4 30.84 19.36 30.84L19.28 30.82ZM26.76 24.62C26.74 24.84 26.64 25.04 26.64 25.26C26.64 25.32 26.68 25.34 26.74 25.34H26.8C26.82 25.16 26.88 25.22 27.02 25.2L26.98 25.02C27.04 25 27.06 24.94 27.06 24.88L27 24.86V24.64L26.76 24.62ZM23.18 29.52C23.04 29.54 22.44 29.86 22.44 29.98L22.14 30.08C22.14 30.08 22.14 30.12 22.12 30.12C22.08 30.12 22.04 30 22 30C21.98 30 21.98 30.02 21.98 30.04C22.02 30.12 22.06 30.22 22.04 30.3L22.22 30.16C22.3 30.18 22.44 30.2 22.44 30.08C22.52 30.1 22.68 30.12 22.68 30C22.76 29.96 22.84 29.88 22.86 29.8L23.02 29.68C23.02 29.66 23.04 29.62 23.06 29.62C23.14 29.62 23.18 29.62 23.18 29.52ZM15.22 31.98C15.22 32.2 14.76 32.18 14.62 32.18C14.44 32.18 14.38 32.06 14.36 32.32C14.52 32.34 14.66 32.36 14.82 32.36C14.86 32.36 15.14 32.26 15.14 32.2C15.26 32.24 15.28 32.16 15.38 32.16C15.44 32.16 15.54 32.18 15.6 32.14C15.6 32.1 15.28 32 15.22 31.98ZM19.44 20.58C19.42 20.8 19.3 20.74 19.2 20.88L19.12 21.16C19.1 21.22 19.22 21.24 19.26 21.24C19.28 21.14 19.34 21.16 19.34 21.06L19.52 20.92C19.54 20.84 19.6 20.86 19.62 20.76L19.44 20.58ZM15.4 32.6C15.26 32.7 15.1 32.76 14.96 32.86C14.82 32.86 14.76 32.96 14.66 32.96C14.64 32.96 14.58 32.94 14.58 33C14.58 33.02 14.62 33.14 14.68 33.14V33.1L15.18 32.9C15.2 32.86 15.24 32.86 15.28 32.86H15.32L15.4 32.78C15.44 32.78 15.48 32.78 15.48 32.74C15.48 32.68 15.44 32.64 15.4 32.6ZM18.92 30.8C18.94 30.88 18.92 30.96 18.82 30.96V30.98C18.82 31.08 18.92 31.08 19 31.08C19.16 31.08 19.22 30.94 19.28 30.82C19.28 30.76 19.24 30.7 19.18 30.7C19.08 30.7 19 30.76 18.92 30.8ZM16.16 27.08L16 27.24C15.98 27.32 15.92 27.32 15.9 27.4C15.9 27.44 15.9 27.48 15.84 27.48H15.82L15.64 27.64V27.66C15.64 27.7 15.64 27.78 15.68 27.8C15.74 27.8 16.04 27.4 16.12 27.32L16.14 27.14L16.22 27.04V26.98C16.22 26.98 16.22 26.92 16.2 26.92C16.18 26.92 16.16 27.06 16.16 27.08ZM17.06 26.02C16.96 26.12 16.88 26.26 16.88 26.4C16.88 26.44 16.9 26.5 16.94 26.54C17.02 26.54 17.04 26.4 17.04 26.36C17.08 26.24 17.16 26.12 17.26 26.04C17.28 26.04 17.28 26.04 17.28 26.02C17.28 25.98 17.18 25.92 17.14 25.92C17.08 25.92 17.06 25.98 17.06 26.02ZM17.62 31.28C17.52 31.36 17.58 31.36 17.42 31.36L17.32 31.56L17.68 31.44L17.86 31.66C17.92 31.66 17.92 31.6 17.92 31.56V31.5L17.62 31.28ZM20.22 19.88C20.22 20.06 20.06 20.02 20.06 20.16C19.98 20.14 19.96 20.2 19.96 20.26C19.96 20.3 19.96 20.42 20.02 20.42C20.04 20.42 20.04 20.38 20.04 20.36C20.12 20.34 20.2 20.28 20.22 20.18C20.28 20.14 20.3 20.04 20.3 19.98L20.22 19.88ZM19.46 21.6C19.32 21.58 19.3 21.78 19.28 21.88C19.22 21.94 19.18 22.02 19.18 22.12C19.18 22.14 19.18 22.18 19.2 22.18C19.24 22.18 19.26 22.08 19.26 22.06C19.32 22.04 19.36 21.96 19.36 21.9C19.5 21.84 19.42 21.62 19.52 21.62C19.6 21.62 19.64 21.64 19.64 21.54L19.46 21.6ZM17.32 31.62C17.32 31.72 17.12 31.68 17.06 31.68C17.1 31.74 17 31.76 16.96 31.76L16.94 31.8C16.94 31.84 16.98 31.86 17 31.86H17.12C17.26 31.86 17.36 31.78 17.5 31.8L17.32 31.62ZM18.34 31.06L18.06 31.16V31.26H18.24C18.3 31.26 18.48 31.2 18.54 31.18C18.5 31.12 18.44 31.02 18.36 31.02C18.34 31.02 18.34 31.04 18.34 31.06ZM18.48 32.16C18.46 32.12 18.4 32.08 18.4 32.02C18.4 32.02 18.62 31.92 18.66 31.92C18.7 31.92 18.8 31.92 18.8 31.96C18.8 32.06 18.6 32.16 18.52 32.16H18.48ZM13.44 25.2C13.3 25.2 13.18 25.68 13.14 25.8C13.22 25.8 13.26 25.72 13.26 25.64V25.62C13.38 25.64 13.42 25.28 13.44 25.2ZM21.44 30.3C21.38 30.3 21.34 30.34 21.34 30.4C21.34 30.44 21.4 30.58 21.44 30.58C21.46 30.58 21.46 30.56 21.46 30.56C21.52 30.5 21.6 30.42 21.6 30.34C21.6 30.32 21.58 30.32 21.56 30.32C21.54 30.3 21.5 30.2 21.48 30.2C21.44 30.2 21.44 30.28 21.44 30.3ZM26.74 25.98C26.7 25.98 26.66 26 26.66 26.06C26.66 26.12 26.7 26.22 26.6 26.22L26.48 26.4L26.52 26.48C26.6 26.38 26.74 26.22 26.74 26.1L26.82 26C26.82 25.98 26.82 25.9 26.78 25.9C26.74 25.9 26.74 25.96 26.74 25.98ZM12.86 26.16C12.74 26.16 12.8 26.34 12.78 26.42L12.72 26.5L12.78 26.6L12.86 26.54C12.86 26.26 12.94 26.26 12.96 26.12L12.86 26.16ZM17.58 24.14L17.84 23.84C17.82 23.76 17.86 23.66 17.92 23.6H17.88C17.78 23.6 17.6 24.02 17.58 24.14ZM16.26 27.52C16.22 27.56 16.18 27.6 16.18 27.64C16.18 27.68 16.22 27.68 16.24 27.68C16.22 27.76 16.32 27.8 16.38 27.8L16.4 27.6L16.26 27.52ZM25.56 27.58C25.56 27.68 25.46 27.72 25.38 27.74L25.3 27.86L25.46 27.88C25.46 27.78 25.56 27.7 25.64 27.66L25.7 27.56L25.56 27.58ZM16.26 28.76L16.14 28.74C16.08 28.74 16.06 28.8 16.06 28.86C16.06 28.88 16.1 28.98 16.12 28.98C16.14 28.98 16.14 28.96 16.14 28.94C16.2 28.9 16.24 28.82 16.26 28.76ZM6.44 33.24L6.4 33.36L6.56 33.4L6.64 33.34L6.66 33.26L6.44 33.24ZM17.42 23.82C17.36 23.86 17.24 23.98 17.24 24.06C17.24 24.1 17.28 24.1 17.3 24.1L17.4 23.96C17.44 23.96 17.46 23.96 17.46 23.92C17.46 23.88 17.44 23.84 17.42 23.82ZM18.48 32.16C18.38 32.22 18.22 32.3 18.1 32.3C18.08 32.3 18.04 32.3 18.04 32.26C18.16 32.22 18.32 32.16 18.46 32.16H18.48ZM20.6 30.86C20.56 30.86 20.38 30.9 20.38 30.96C20.38 31.02 20.48 31.02 20.52 31.02L20.6 30.86ZM18.2 23C18.2 23 18.14 22.98 18.14 23C18.14 23.04 18.18 23.04 18.2 23.04C18.26 23.04 18.3 23 18.3 22.94C18.3 22.88 18.3 22.82 18.28 22.78C18.24 22.78 18.2 22.98 18.2 23ZM20.94 30.52C20.86 30.52 20.86 30.66 20.84 30.72L20.9 30.64C20.92 30.64 21.02 30.64 21.02 30.6C21.02 30.56 20.98 30.52 20.94 30.52ZM26.8 24.34V24.42C26.8 24.52 26.88 24.52 26.96 24.54C26.94 24.46 26.86 24.38 26.8 24.34ZM7.3 32.82L7.14 32.88L7.12 32.94C7.12 32.98 7.14 33 7.18 33.02L7.3 32.82ZM14.92 22.06C14.9 22.06 14.84 22.06 14.84 22.08C14.84 22.1 14.9 22.14 14.92 22.14L14.98 22.08C14.98 22.06 14.98 21.92 14.94 21.92C14.92 21.92 14.92 22.04 14.92 22.06ZM4.36 33.52L4.26 33.72C4.22 33.72 4.22 33.68 4.22 33.64C4.22 33.56 4.28 33.52 4.36 33.52ZM25.02 28.1L24.9 28.2C24.9 28.22 24.9 28.26 24.92 28.26C24.94 28.26 24.94 28.22 24.94 28.2L25.1 28.1C25.1 28.08 25.1 28.02 25.06 28.02C25.04 28.02 25.02 28.08 25.02 28.1ZM24.12 28.22C24.12 28.28 24.14 28.38 24.2 28.38C24.24 28.38 24.26 28.36 24.28 28.34L24.12 28.22ZM15.88 32.44V32.46C15.88 32.54 15.96 32.56 16.02 32.56V32.54C16.02 32.46 15.94 32.44 15.88 32.44ZM24.6 28.5L24.46 28.6C24.46 28.62 24.46 28.64 24.48 28.64C24.5 28.64 24.52 28.58 24.52 28.58C24.58 28.6 24.64 28.56 24.64 28.5C24.64 28.48 24.64 28.42 24.62 28.42C24.6 28.42 24.6 28.48 24.6 28.5ZM16.52 27.12V27.16C16.52 27.18 16.5 27.26 16.54 27.26C16.56 27.26 16.6 27.2 16.6 27.18H16.68C16.68 27.16 16.54 27.12 16.52 27.12ZM15.74 32.5L15.64 32.72L15.78 32.62C15.78 32.58 15.76 32.54 15.74 32.5ZM17.58 24.14C17.5 24.2 17.48 24.3 17.46 24.4C17.52 24.32 17.56 24.24 17.58 24.14ZM18.86 31.22V31.24C18.86 31.28 18.88 31.32 18.92 31.32C18.96 31.32 19 31.3 19 31.26L18.86 31.22ZM6.08 32.68V32.7C6.08 32.74 6.12 32.76 6.16 32.76C6.2 32.76 6.22 32.74 6.22 32.7L6.08 32.68ZM19 21.38C18.98 21.38 18.92 21.4 18.92 21.44C18.92 21.46 18.94 21.48 18.96 21.48C19 21.48 19 21.44 19 21.42L19.08 21.3L19 21.38ZM6.6 32.72C6.6 32.76 6.62 32.8 6.68 32.8C6.7 32.8 6.72 32.78 6.72 32.76C6.72 32.72 6.68 32.72 6.64 32.72H6.6ZM6.82 33.18V33.2C6.82 33.22 6.82 33.26 6.86 33.26H6.94C6.94 33.2 6.86 33.18 6.82 33.18ZM16.14 27.86L16.22 27.94C16.26 27.94 16.3 27.92 16.3 27.88L16.14 27.86ZM13.52 24.76C13.52 24.8 13.52 24.86 13.58 24.86C13.6 24.86 13.6 24.84 13.6 24.82C13.6 24.78 13.58 24.76 13.54 24.76H13.52ZM17.28 24.64L17.26 24.68C17.26 24.7 17.28 24.74 17.3 24.74C17.34 24.74 17.36 24.7 17.36 24.68L17.28 24.64ZM15.66 29.38C15.66 29.4 15.66 29.46 15.7 29.46C15.74 29.46 15.74 29.4 15.74 29.38C15.74 29.36 15.72 29.36 15.72 29.36L15.66 29.38ZM16.46 25.84C16.46 25.86 16.46 25.92 16.5 25.92C16.52 25.92 16.54 25.88 16.54 25.86C16.54 25.84 16.54 25.82 16.5 25.82C16.5 25.82 16.48 25.84 16.46 25.84ZM16.72 25.48V25.52C16.72 25.54 16.72 25.58 16.76 25.58C16.78 25.58 16.8 25.56 16.8 25.54C16.8 25.5 16.78 25.48 16.74 25.48H16.72ZM17.98 28.42C17.98 28.44 18 28.48 18.04 28.48C18.06 28.48 18.06 28.46 18.06 28.44C18.06 28.42 18.04 28.38 18.02 28.38C18 28.38 17.98 28.4 17.98 28.42ZM15.12 21.6C15.12 21.62 15.14 21.68 15.16 21.68C15.2 21.68 15.2 21.64 15.2 21.62C15.2 21.6 15.18 21.58 15.16 21.58L15.12 21.6ZM16.92 28.9V28.94C16.92 28.96 16.92 28.98 16.96 28.98C16.98 28.98 17 28.94 17 28.92C17 28.9 17 28.9 16.96 28.9H16.92ZM12.68 26V26.02C12.68 26.06 12.68 26.08 12.72 26.08C12.74 26.08 12.76 26.06 12.76 26.04C12.76 26.02 12.74 26 12.72 26H12.68ZM7.12 32.62V32.64C7.12 32.68 7.12 32.7 7.16 32.7C7.18 32.7 7.18 32.7 7.2 32.68C7.2 32.64 7.16 32.62 7.12 32.62ZM18.52 31.3C18.52 31.32 18.54 31.38 18.58 31.38C18.6 31.38 18.6 31.36 18.6 31.34C18.6 31.3 18.58 31.3 18.54 31.3H18.52ZM13.36 24.68C13.36 24.7 13.36 24.74 13.4 24.74H13.44C13.44 24.7 13.42 24.66 13.38 24.66L13.36 24.68ZM15.84 28.88V28.92C15.84 28.94 15.86 28.96 15.9 28.96H15.92C15.92 28.92 15.88 28.88 15.84 28.88ZM16.64 28.78L16.62 28.82C16.62 28.84 16.64 28.86 16.66 28.86C16.68 28.86 16.7 28.82 16.7 28.8C16.7 28.78 16.68 28.78 16.66 28.78H16.64ZM16.84 25.28V25.32C16.84 25.34 16.84 25.38 16.86 25.38C16.88 25.38 16.9 25.36 16.9 25.34C16.9 25.32 16.88 25.28 16.86 25.28H16.84ZM17.58 25.32C17.58 25.34 17.6 25.38 17.62 25.38C17.64 25.38 17.64 25.36 17.64 25.34C17.64 25.32 17.64 25.28 17.6 25.28C17.58 25.28 17.58 25.3 17.58 25.32ZM12.42 27.1C12.42 27.14 12.44 27.18 12.48 27.18C12.5 27.18 12.5 27.16 12.5 27.14V27.12L12.42 27.1ZM3.86 34.64C3.86 34.66 3.84 34.7 3.84 34.72C3.84 34.74 3.88 34.74 3.9 34.74V34.7C3.9 34.68 3.88 34.64 3.86 34.64ZM7.26 33.06L7.38 33.18V33.16C7.38 33.1 7.32 33.06 7.26 33.06ZM17.68 28.52C17.68 28.56 17.7 28.58 17.72 28.6C17.76 28.6 17.76 28.56 17.76 28.54L17.68 28.52ZM16.2 32.48C16.18 32.48 16.18 32.56 16.18 32.56L16.14 32.64L16.22 32.56C16.22 32.54 16.22 32.48 16.2 32.48ZM17.52 28.62C17.52 28.64 17.54 28.7 17.56 28.7C17.6 28.7 17.6 28.66 17.6 28.64L17.52 28.62ZM16.78 28.7C16.78 28.74 16.82 28.76 16.86 28.76H16.88C16.88 28.72 16.84 28.7 16.8 28.7H16.78ZM16.98 24.96C16.98 25.04 17 25.02 17.06 25.04C17.06 25 17.02 24.96 16.98 24.96ZM26.2 19.36V19.38C26.2 19.4 26.2 19.44 26.24 19.44C26.26 19.44 26.26 19.4 26.26 19.38C26.26 19.36 26.26 19.36 26.24 19.36H26.2ZM7.8 32.44H7.86C7.86 32.42 7.84 32.36 7.8 32.36V32.44ZM17.1 28.84L17.12 28.92C17.14 28.92 17.16 28.84 17.16 28.82C17.14 28.82 17.12 28.82 17.1 28.84ZM2.62 34.36C2.58 34.36 2.44 34.34 2.44 34.4C2.5 34.38 2.54 34.38 2.6 34.38L2.62 34.36ZM17.06 24.82C17.06 24.86 17.08 24.88 17.12 24.88H17.14C17.14 24.84 17.1 24.82 17.06 24.82ZM7.1 33.1C7.06 33.1 7.1 33.22 7.12 33.24C7.12 33.2 7.1 33.1 7.1 33.1ZM6.4 32.62C6.4 32.64 6.38 32.64 6.38 32.66C6.38 32.68 6.38 32.68 6.4 32.7C6.42 32.7 6.44 32.66 6.44 32.64L6.4 32.62ZM17.84 28.42C17.84 28.46 17.86 28.52 17.9 28.52C17.9 28.48 17.88 28.44 17.84 28.42ZM17.38 28.68C17.38 28.74 17.4 28.74 17.44 28.76C17.44 28.72 17.42 28.7 17.38 28.68ZM12.22 33.54L12.18 33.6C12.2 33.58 12.22 33.56 12.22 33.54ZM6.4 31.82L6.38 31.88C6.4 31.86 6.4 31.84 6.4 31.82ZM34.2347 30.98C34.1547 31.02 34.0747 31.04 33.9947 31.06C33.9947 31.18 34.0347 31.32 34.0747 31.44L33.9347 31.54L33.5147 31.64C33.5147 31.54 33.5147 31.44 33.4947 31.34C33.3747 31.4 33.2347 31.44 33.1147 31.46L33.0947 31.54L33.1347 31.66L32.9547 31.76L32.8747 31.6L32.8947 31.52L32.7547 31.68L32.5347 31.7L32.4947 31.74L32.2947 31.8L32.2547 31.88L31.9747 31.94L31.8547 32.06L31.5547 32.16C31.4747 32.26 31.2547 32.34 31.1147 32.34L31.0347 32.42C30.8347 32.48 30.6347 32.58 30.4147 32.58C30.2547 32.72 30.0747 32.78 29.8947 32.88H29.6347L29.4547 32.96H29.4147C29.4147 32.96 29.4547 33 29.4147 33C29.3347 33 29.1947 33.04 29.1747 33.14L28.8947 33.18L28.7747 33.26L28.4347 33.32L28.3547 33.42C28.2547 33.46 28.1347 33.5 28.0147 33.5L27.9347 33.58C27.8747 33.56 27.7147 33.52 27.7147 33.62C27.5747 33.68 27.4147 33.7 27.2747 33.7C27.1147 33.82 26.9347 33.88 26.7547 33.96L26.4947 33.94C26.3747 34.02 26.1147 34.04 25.9747 34.04C25.8947 34.1 25.7747 34.14 25.6747 34.14L25.5747 34.12C25.4947 34.16 25.4347 34.22 25.3547 34.22L25.2547 34.28C25.2547 34.38 25.0347 34.36 24.9747 34.36L24.9147 34.42C24.8347 34.42 24.7147 34.36 24.7147 34.48L24.3147 34.56L24.0547 34.72C24.0347 34.76 23.9547 34.76 23.9147 34.76L23.6347 34.78L23.4747 34.86H23.1947L22.9547 34.96L22.7747 34.94L22.5747 35.02C22.3347 35.02 22.1747 35.08 21.9347 35.1C21.9347 35.14 21.8747 35.14 21.8547 35.14C21.7347 35.14 21.6347 35.12 21.5147 35.14C21.4947 35.22 21.1147 35.28 21.0147 35.28C20.5147 35.28 19.9947 35.24 19.4947 35.2C19.4947 35.28 19.4147 35.32 19.3547 35.3C19.2747 35.34 19.1747 35.36 19.0947 35.36C19.0347 35.36 18.9947 35.34 18.9947 35.28C18.9947 35.24 19.0147 35.18 18.9347 35.18C18.8947 35.18 18.6947 35.28 18.6947 35.2C18.6947 35.14 18.7347 35.06 18.7547 35.02H19.0347L19.2347 34.94C19.4547 34.96 19.3147 34.78 19.4547 34.78C19.5747 34.78 19.7547 34.84 19.8747 34.86L20.2947 34.7L20.3147 34.62L20.4547 34.64C20.5347 34.56 21.1347 34.5 21.2747 34.48C21.3147 34.44 21.3947 34.44 21.4547 34.44C21.4547 34.28 21.5947 34.34 21.5947 34.28C21.2947 34.42 20.6147 34.36 20.4547 34.52C20.4147 34.52 20.3147 34.5 20.2747 34.54C20.1947 34.52 19.3547 34.56 19.3547 34.74C18.9747 34.72 18.6347 34.86 18.2547 34.86C18.2147 35.04 17.9147 34.98 17.7947 34.96C17.8147 35.02 17.6547 35.02 17.6347 35.02C17.5547 35.02 17.4747 35.02 17.4547 35.1L15.9747 35.18C15.9747 35.2 15.9547 35.24 15.9347 35.24C15.8747 35.24 15.8147 35.16 15.8147 35.1C15.8147 35.06 15.8547 35.04 15.8947 35.04H16.1747C16.1747 34.92 16.9747 34.86 17.1747 34.78C17.1947 34.78 17.3347 34.8 17.3347 34.76C17.3347 34.7 17.2347 34.64 17.2347 34.56C17.2347 34.54 17.2547 34.52 17.2747 34.5C17.6547 34.52 18.2347 34.46 18.5947 34.28L18.7747 34.3L19.1147 34.18L19.1747 34.08C19.2947 34.1 19.4347 34.06 19.5547 34.04C19.4947 34.12 19.6347 34.06 19.6347 34.04L19.6147 33.9C20.1547 33.98 19.9347 33.96 20.3747 33.76C20.5947 33.76 20.8547 33.54 21.0547 33.54L21.0747 33.5C21.0747 33.48 20.8147 33.46 20.7547 33.46C20.7547 33.64 20.2947 33.58 20.2947 33.68C20.1747 33.68 20.0747 33.64 19.9947 33.74C19.4747 33.76 19.5147 33.74 19.0947 33.92L18.8747 33.8C18.7147 33.82 18.7147 33.96 18.5747 33.96C18.5147 33.96 18.3747 33.9 18.3147 33.88C18.1147 33.82 18.3947 34.2 17.7947 34C17.7747 34.02 17.7547 34.06 17.7147 34.06V33.98C17.5347 33.98 17.3747 33.9 17.1947 33.9L17.3147 33.8C17.3747 33.8 17.6347 33.78 17.6347 33.72L17.8747 33.76C18.0947 33.72 18.3547 33.68 18.5547 33.6V33.52C18.5547 33.48 18.5347 33.42 18.4747 33.42C18.4547 33.28 18.3147 33.4 18.3147 33.26H17.9947L18.0747 33.12C18.2547 33.12 17.9747 32.98 18.3947 32.98L18.4947 32.9C18.5747 32.88 18.6547 32.88 18.7347 32.84C18.8947 32.86 18.8947 32.72 18.9947 32.72C19.2747 32.72 19.5747 32.48 19.9147 32.48V32.4C19.9547 32.4 20.2547 32.4 20.2547 32.32C20.2747 32.32 20.3947 32.34 20.3947 32.28H20.5747L20.6347 32.22H20.7947L20.8147 32.16C20.9547 32.14 20.8347 32 20.9747 32C21.0747 31.9 21.3347 31.88 21.4547 31.84C21.5347 31.86 21.5947 31.88 21.6547 31.94L21.8147 31.84C21.7947 31.78 21.8347 31.76 21.8947 31.76L21.9547 31.78C21.9547 31.76 21.9547 31.64 22.0147 31.64C22.0347 31.64 22.0547 31.7 22.0747 31.72C22.2547 31.74 22.3947 31.62 22.5747 31.62C22.6347 31.5 22.8347 31.54 22.9347 31.54V31.48C22.9747 31.48 23.0747 31.48 23.0747 31.42C23.1747 31.42 23.2347 31.36 23.2947 31.36H23.3347L23.5347 31.26L23.5947 31.18C23.6747 31.18 23.7347 31.12 23.8147 31.1C23.8747 31.04 23.9747 31.02 24.0547 31L24.1747 31.02L24.2347 31L24.2747 30.92L24.4147 30.94V30.88L24.5547 30.82C24.5547 30.78 24.5747 30.74 24.5947 30.74C24.6147 30.74 24.6347 30.76 24.6347 30.76C24.9547 30.62 25.4547 30.42 25.6347 30.42V30.36C26.1147 30.24 26.4947 29.94 26.9747 29.84L27.0947 29.88L27.1747 29.84L27.2147 29.76L27.3947 29.78L27.6147 29.6C27.7347 29.56 28.0547 29.56 28.0147 29.42L28.1347 29.44L28.2347 29.42L28.3347 29.26C28.4147 29.2 28.5547 29.32 28.6547 29.32L28.6747 29.26C28.8147 29.16 28.9747 29.1 29.1347 29.06C29.2547 28.96 29.4347 28.94 29.5747 28.88L29.6347 28.8H29.8147C29.9147 28.72 30.0147 28.66 30.1347 28.64V28.56L30.5747 28.5L30.7547 28.34H30.8547L30.8947 28.26L31.0747 28.24L31.1747 28.08C31.4347 28.02 31.7147 27.92 31.8947 27.7C32.0347 27.66 32.1747 27.6 32.2947 27.52V27.48C32.4147 27.44 32.5347 27.36 32.6147 27.26C32.6947 27.28 33.0147 27.16 33.0947 27.1L33.1947 26.96C33.3147 26.92 33.4547 26.8 33.5347 26.7L33.5747 26.5L33.7747 26.4L33.8947 26.42L34.0347 26.24H34.0747C34.1347 26.06 34.3947 25.72 34.5147 25.58H34.6947L34.8347 25.42C34.8347 25.36 34.8547 25.3 34.8547 25.26L34.8947 25.24C34.8347 25.04 34.6947 24.88 34.6147 24.7C34.4547 24.66 34.3147 24.58 34.1547 24.56C33.6347 24.26 33.0747 24.1 32.5947 23.74H32.3947C32.3347 23.7 32.2547 23.68 32.1747 23.66L32.0747 23.52H32.0547L31.9147 23.4L32.0147 23.28C32.0947 23.3 32.1947 23.34 32.2547 23.4H32.5547L32.6547 23.22L32.5147 23.16L32.1747 23.18C32.0347 23.04 31.8947 22.88 31.7747 22.72L31.5547 22.66C31.3147 22.42 31.0347 22.44 30.7347 22.36L30.6947 22.28L30.6547 22.36L30.8347 22.44L30.9747 22.6H31.0347L31.1947 22.66L31.3947 22.64L31.5747 22.82L31.7747 22.8L31.7947 23V23.02L31.5947 22.96L31.5547 23.16L31.4947 23.2C31.3947 23.18 31.0747 23.04 31.0147 23.06L30.9347 22.9H30.7947C30.6347 22.84 30.4947 22.72 30.3547 22.64C30.4147 22.58 30.5147 22.52 30.5547 22.44C30.3947 22.36 30.2147 22.36 30.0347 22.32C29.9947 22.32 29.9147 22.34 29.8747 22.36C29.7947 22.3 29.6747 22.18 29.5947 22.16L29.4747 22.02L29.3347 22.12L29.1747 21.94L29.1947 21.78C29.1347 21.64 29.0547 21.5 28.9547 21.38V21.34L28.8947 21.52L29.0547 21.66V21.84C28.9347 21.68 28.7547 21.58 28.6147 21.42C28.5547 21.32 28.5147 21.14 28.5347 21.02L28.3747 20.96C28.3547 20.82 28.2947 20.68 28.2147 20.56L28.1947 20.36C28.2147 20.32 28.1147 20.32 28.0947 20.32V20.16C28.1947 19.96 28.3547 19.74 28.3147 19.5L28.4147 19.32C28.3947 19.28 28.4747 19.12 28.4947 19.08L28.6947 19H28.7147L28.6747 18.9L28.7947 18.82L28.8547 18.68C28.9547 18.62 29.0747 18.54 29.1547 18.44L29.2347 18.2L29.5947 18.04C29.6947 17.88 29.8347 17.62 30.0747 17.62C30.2347 17.4 30.4547 17.3 30.6947 17.2L30.6747 17.18C30.9747 17 31.2947 16.8 31.5947 16.64L31.8147 16.62L31.9947 16.5C32.0347 16.52 32.2147 16.44 32.2547 16.42L32.3547 16.32C32.9947 16.2 33.3147 16.04 33.8947 15.76H34.1747L34.3547 15.62C34.4547 15.64 34.5747 15.6 34.6747 15.56L34.8947 15.6L35.0347 15.5L35.1347 15.6C35.2347 15.6 35.5147 15.44 35.6747 15.42C36.8347 15.22 38.0547 15.24 39.2347 15.12L39.2547 15.18C39.6547 15.12 40.0547 15.14 40.4547 15.08L41.5147 15.18C41.7947 15.18 42.0547 15.16 42.3147 15.18L42.2347 15.3C42.1347 15.3 42.0147 15.28 41.9347 15.36C41.4947 15.38 41.1347 15.34 40.7347 15.56L40.5147 15.52V15.64L40.4147 15.7L40.3147 15.6C40.2147 15.64 40.0947 15.7 40.0147 15.78H39.9147L39.7547 15.92L39.7747 16.12H39.9947V16.18L40.1347 16.26L39.9547 16.38H39.7347C39.5547 16.38 39.3947 16.42 39.2147 16.42L39.1947 16.54L39.2947 16.6C39.3947 16.58 39.5347 16.58 39.6347 16.58L39.5147 16.72C39.4147 16.76 39.2947 16.78 39.1747 16.76L38.9747 16.86L39.0347 16.92C39.3347 16.9 39.6547 16.8 39.9547 16.88C40.0347 16.94 40.1347 17 40.1947 17.08L40.3947 17.04L40.5147 17.16L40.3747 17.32L40.3947 17.4C40.4947 17.4 40.5947 17.38 40.6947 17.36L40.8947 17.42L40.7547 17.5C40.6747 17.52 40.5747 17.54 40.4947 17.54C40.1747 17.54 39.9347 17.66 39.6347 17.66C39.5947 17.72 39.4747 17.74 39.4347 17.8L39.5347 17.76L39.7147 17.84H39.7347L39.5947 17.92C39.3747 17.96 39.1147 17.98 38.8747 17.98C38.5547 17.98 38.1947 18.3 37.8747 18.3H37.8147L37.6347 18.42L37.3747 18.46L37.2947 18.54L37.0747 18.52L36.9147 18.58C36.7147 18.58 36.4947 18.66 36.2947 18.66C36.2147 18.66 36.1147 18.64 36.0347 18.62L35.6147 18.86L35.4747 18.78L35.3947 18.88L35.4547 18.98C35.3347 18.98 35.1947 18.98 35.0747 19L34.9547 18.88V18.98L35.0147 19.1C34.9147 19.14 34.8147 19.18 34.6947 19.18L34.4947 19.26C34.3747 19.24 34.2747 19.24 34.1547 19.24C34.0547 19.4 33.8747 19.42 33.6947 19.42L33.5947 19.62L33.6747 19.8C33.8747 19.88 34.0347 19.92 34.2347 19.92L34.2947 20C34.3947 20.06 34.5147 20.12 34.6347 20.16L34.7747 20.34L34.9147 20.18V20.16L35.0747 20.24L35.1147 20.44L35.4747 20.56L35.6747 20.5L35.8547 20.58L35.8347 20.72L36.0147 20.8H36.0347L36.1947 20.94V20.96L36.3347 20.8H36.3747L36.4947 20.94L36.5147 21.02C36.6947 21.2 36.7747 21.18 37.0147 21.2C37.0147 21.26 37.0147 21.32 37.0347 21.36L37.1547 21.44H37.3747L37.4547 21.64C37.5347 21.64 37.6147 21.66 37.6947 21.66L37.8147 21.86V21.88L38.0347 21.86C38.0747 21.96 38.1547 22.08 38.2347 22.16L38.4547 22.26C38.7747 22.58 39.4347 22.88 39.5147 23.32H39.5347L39.5947 23.44L39.6147 23.38L39.8347 23.48L39.8747 23.7L39.8147 23.9L39.6547 23.94L39.8347 24.14C39.8547 24.32 39.7947 24.58 39.9947 24.68L39.9547 24.84C40.0547 24.96 40.1547 25.1 40.2147 25.24L40.0747 25.38C40.0947 25.46 40.1147 25.64 39.9947 25.66L40.0947 25.78C39.8947 26.08 39.8947 26.38 39.6747 26.68L39.7347 26.86C39.5947 27.28 39.4947 27.5 39.2947 27.9L39.2147 27.96C39.1347 27.92 39.0547 27.88 38.9747 27.82L38.8747 28C38.8147 28.04 38.6547 28.2 38.5947 28.2C38.5547 28.2 38.5347 28.2 38.5147 28.16V28.32L38.5947 28.38C38.7147 28.3 38.8147 28.16 38.9747 28.16C39.0147 28.16 39.0547 28.18 39.0747 28.22L38.6147 28.6C38.0747 28.52 38.2347 28.6 37.7947 28.78L37.6747 28.74L37.7547 28.6L37.6947 28.52L37.3747 28.74L37.3347 29.02L37.5747 28.92V28.96C37.5747 29.02 37.5547 29.16 37.4547 29.16C37.3947 29.16 37.3147 29.12 37.2747 29.1V29.26H37.1347L36.9547 29.38L36.7547 29.42L36.4147 29.76L36.4947 29.9L36.8147 29.98L36.6147 30.06C36.5147 30.04 36.4147 30.04 36.3347 30L36.2147 30.08L36.0747 29.94C35.9747 30.02 35.8747 30.16 35.8347 30.28L35.7147 30.2C35.5747 30.26 35.3947 30.3 35.2347 30.3L35.1747 30.44L34.9347 30.62L35.0347 30.7L34.8547 30.88L34.5947 30.82C34.4747 30.88 34.3547 30.94 34.2347 30.98L34.2947 30.9L34.2147 30.7C34.2947 30.62 34.3947 30.56 34.5147 30.56L34.7347 30.38L35.0347 30.32C35.0947 30.22 35.2747 30.02 35.3947 29.98L35.3347 29.82L35.1147 29.9L34.9547 30.06L34.9747 30.08C34.8347 30.08 34.6747 30.08 34.5347 30.1L34.7147 30.14L34.5747 30.32C34.3947 30.38 34.2147 30.46 34.0347 30.5L33.8947 30.66C33.7547 30.66 33.6347 30.72 33.5747 30.86L33.7347 30.92C33.8147 30.86 33.8947 30.78 33.9947 30.74L34.2347 30.98ZM39.2347 26.56L38.9947 26.64L38.9347 26.56L38.9147 26.64C38.5947 26.86 38.5547 27.3 38.2347 27.52L38.4147 27.66C38.2547 27.7 38.0947 27.72 37.9347 27.8L37.8947 28L38.3147 27.92L38.3347 27.86L38.4147 27.82L38.4947 27.7C38.6147 27.62 38.6947 27.52 38.7147 27.38L39.1747 27.1L39.2547 26.96L39.1747 26.86L39.1347 26.7L39.3147 26.46L39.2747 26.18L39.1347 26.24C39.1747 26.34 39.2147 26.44 39.2347 26.56ZM36.1547 29.48L35.9947 29.56L35.9147 29.76C36.0547 29.76 36.1947 29.72 36.2947 29.6C36.3747 29.56 36.4947 29.48 36.5147 29.38L36.6947 29.12C36.8747 29.06 37.0147 28.94 37.1947 28.88L37.3147 28.72L37.1747 28.62L36.9947 28.68L36.9147 28.9H36.7547C36.5147 29 36.3747 29.18 36.0747 29.28L36.0547 29.36C36.0547 29.42 36.0947 29.46 36.1547 29.48ZM17.2747 33.26H17.9947L17.8547 33.34C17.8747 33.44 17.6547 33.44 17.5947 33.44H17.4947C17.2947 33.56 16.8747 33.56 16.6547 33.54L16.5347 33.62L15.6347 33.6H15.5547C15.5547 33.56 15.7547 33.48 15.7947 33.46C15.9547 33.46 16.6947 33.5 16.8547 33.34L17.1747 33.36L17.2747 33.26ZM30.3747 22.22C30.4347 22.22 30.4747 22.22 30.5147 22.2L30.4347 22.12L30.3747 21.96L30.2147 22C30.1347 21.92 30.0747 21.82 29.9547 21.82L29.8747 21.7C29.7947 21.68 29.7347 21.66 29.6547 21.66H29.5547L29.3947 21.8L29.5347 21.94L29.6547 21.84C29.7347 21.9 29.8547 21.96 29.9547 22C30.0747 22.12 30.2147 22.22 30.3747 22.22ZM22.2747 33.04L22.1347 33.16C22.1347 33.14 22.0947 33.08 22.0747 33.1L21.8947 33.2H21.9147C21.9947 33.2 21.8747 33.24 21.8547 33.24C21.3947 33.24 21.5947 33.38 21.3947 33.4L21.2347 33.5C21.5947 33.46 21.5947 33.34 22.0147 33.34C22.0347 33.3 22.0747 33.28 22.1147 33.28H22.1747L22.3147 33.26L22.3547 33.16L22.3347 33.04H22.2747ZM35.2347 25.08C35.1547 24.9 35.0347 24.84 34.8947 24.72C34.8547 24.58 34.7547 24.46 34.6347 24.36L34.5547 24.46C34.5947 24.56 35.0147 25.06 35.1547 25.12L35.2347 25.08ZM28.8747 30.74L28.7947 30.66L28.8547 30.96H28.8747L29.0947 31.12L29.1947 31.02L28.9947 30.96L29.0547 30.82C29.1547 30.74 29.2747 30.68 29.3547 30.58L29.0347 30.6L28.8747 30.74ZM22.7547 33.18L22.8147 33.16C22.8147 33.14 22.7747 32.96 22.8147 32.96C22.8547 32.96 22.8947 33 22.9147 33.02L22.9347 33.1C23.0347 32.98 23.1347 32.98 23.2347 32.88C23.3147 32.84 23.3947 32.78 23.4747 32.72L23.4547 32.7L23.1747 32.82C23.1347 32.82 23.0547 32.82 23.0347 32.88C22.9147 32.9 22.8347 32.88 22.7547 32.98C22.6747 33 22.5747 33.02 22.4947 33.02L22.5347 33.16L22.7547 33.18ZM28.2747 20.48L28.3347 20.5L28.3747 20.7L28.4747 20.58L28.3547 20.4V20.16C28.4147 20.1 28.4547 20.04 28.4547 19.96V19.92L28.2547 20C28.2747 20.08 28.2347 20.2 28.2147 20.28L28.2747 20.48ZM33.9947 23.64V23.84L34.1947 23.86V23.9L34.3947 23.96L34.6147 24.14L34.5547 23.92C34.3747 23.8 34.1747 23.76 33.9947 23.64ZM37.2547 17.12C36.9747 17.12 36.6747 17.16 36.3947 17.18L36.3547 17.28C36.6547 17.24 36.9947 17.32 37.2547 17.12ZM40.1547 25.94L40.2947 25.56C40.3147 25.7 40.3547 25.84 40.3547 26C40.3547 26.08 40.3347 26.18 40.2747 26.26C40.2147 26.16 40.1547 26.06 40.1547 25.94ZM32.4347 23.12L32.5747 23.02V22.94L32.4347 22.92C32.3347 22.86 32.2347 22.8 32.1547 22.7L32.1347 22.84C32.1347 23 32.3147 23.06 32.4347 23.12ZM34.5347 30.9L34.7747 30.88L34.7147 31.02C34.6147 31.1 34.4947 31.16 34.3747 31.2L34.2347 31.12C34.3547 31.06 34.4747 31.02 34.5347 30.9ZM29.2347 20.88V21.1L29.1747 21.26C29.2947 21.28 29.4347 21.34 29.5347 21.42L29.4747 21.26L29.3747 21.18V21.04L29.2347 20.88ZM38.7347 16.78H38.6547C38.4347 16.78 38.2347 16.86 38.0147 16.86L37.9747 16.94C37.9947 16.96 38.0547 16.94 38.0547 16.9L38.2747 16.88H38.2947L38.2747 16.92C38.4347 16.92 38.6147 16.92 38.7347 16.78ZM19.2147 33.08H19.1747V33.1C18.9547 33.08 18.8947 33.2 18.7347 33.2C18.7147 33.2 18.5347 33.2 18.5347 33.24C18.5347 33.26 18.6347 33.26 18.6347 33.26H18.9347L19.0747 33.2C19.1347 33.2 19.2147 33.16 19.2147 33.08ZM19.4547 35.02C19.4347 35.18 19.1547 35.02 19.1347 35.16C19.2147 35.16 19.7747 35.16 19.7947 35.02H19.4547ZM29.9147 21.32L29.6947 21.26C29.6947 21.42 29.8147 21.54 29.9747 21.54C29.9547 21.48 29.9547 21.38 29.9147 21.32ZM36.8147 29.74C36.9147 29.62 37.0347 29.52 37.1547 29.42L37.1347 29.64C37.0347 29.68 36.9347 29.72 36.8147 29.74ZM30.1747 30.2L30.0747 30.12L30.0147 30.32L30.0747 30.36L30.1947 30.28H30.3147L30.2747 30.12L30.1747 30.2ZM31.4747 31.78C31.1747 31.78 30.9947 31.96 30.7147 32.04L30.7947 32.1L30.8747 32.02C31.0147 31.98 31.1347 31.92 31.2547 31.86H31.2747L31.4747 31.78ZM40.0947 24.44L40.0747 24.18C40.1547 24.26 40.2547 24.38 40.2547 24.5L40.0947 24.44ZM33.4147 19.58L33.2347 19.54V19.56L33.4147 19.88V19.58ZM29.0947 20.72H28.9547L28.9947 20.94L28.9547 21.1L29.0947 20.86V20.72ZM22.9147 33.78L22.8347 33.72C22.7947 33.76 22.7147 33.78 22.6547 33.8L22.6347 33.84C22.6347 33.9 22.7147 33.9 22.7547 33.9L22.9147 33.78ZM28.9147 20.44L28.8147 20.36L28.7947 20.56L28.8747 20.66L28.9147 20.44ZM23.8347 32.5C23.9547 32.48 24.0747 32.44 24.1747 32.4C24.1747 32.36 24.1747 32.34 24.1947 32.3C24.0747 32.36 23.9547 32.42 23.8347 32.5ZM33.2147 31.02C33.0747 31.04 32.8547 31.04 32.7747 31.18L33.2147 31.02ZM18.0747 34.58L18.1947 34.66C18.2347 34.66 18.3147 34.64 18.3147 34.58H18.0747ZM27.1947 31.4C27.2547 31.38 27.3147 31.38 27.3747 31.38L27.4147 31.28C27.3347 31.32 27.2347 31.3 27.1947 31.4ZM28.8547 20.04H28.6947L28.8147 20.18L28.8547 20.04ZM37.4947 17.2L37.6147 17.24H37.6347L37.6747 17.1L37.4947 17.2ZM16.7947 33.94L16.9147 33.98C16.9147 34.02 16.8947 34.04 16.8547 34.04C16.8147 34.04 16.7547 34 16.7547 33.96C16.7547 33.94 16.7947 33.94 16.7947 33.94ZM18.7547 33.4C18.7547 33.46 18.8147 33.48 18.8747 33.48C18.9147 33.48 18.9547 33.48 18.9547 33.44L18.7547 33.4ZM35.8347 29.92L35.6947 29.82V29.96L35.8347 29.92ZM22.3947 33.88H22.2947V33.9C22.2947 33.92 22.3147 33.96 22.3347 33.96C22.3747 33.96 22.4147 33.94 22.4147 33.9L22.3947 33.88ZM19.6947 33.38C19.6747 33.38 19.5547 33.36 19.5547 33.4C19.5547 33.44 19.6947 33.48 19.6947 33.38ZM30.8547 21.94H30.8347L31.0347 22L31.0547 21.96L30.8547 21.94ZM19.8747 34.96V34.98C19.8747 35.02 20.0347 34.96 20.0747 34.96H19.8747ZM19.5147 32.98C19.5147 33 19.5347 33.04 19.5547 33.06C19.5947 33.06 19.5947 33.02 19.5947 33L19.5147 32.98ZM26.2947 31.66V31.68H26.3147V31.7H26.3347C26.3547 31.7 26.3747 31.68 26.3747 31.66V31.64L26.3347 31.66L26.3547 31.64L26.3147 31.62L26.2947 31.64L26.3147 31.66H26.2947ZM39.3547 17.06L39.3347 17.08C39.3947 17.08 39.4747 17.1 39.5547 17.1L39.3547 17.06ZM17.0947 33.9C17.0747 33.94 17.0347 33.98 16.9747 33.98L17.0947 33.9ZM23.6947 32.66H23.6147L23.6547 32.7C23.6747 32.7 23.6947 32.68 23.6947 32.66ZM19.8747 33.34L19.9747 33.28C19.9347 33.28 19.8947 33.3 19.8747 33.34ZM17.0947 33.9C17.1347 33.88 17.1747 33.88 17.1947 33.9H17.0947ZM26.3147 31.68C26.3147 31.66 26.3347 31.66 26.3347 31.66H26.3147V31.68ZM39.9547 25.18C39.9747 25.18 39.9747 25.2 39.9947 25.2C39.9747 25.2 39.9747 25.18 39.9547 25.18Z" fill="#E8DBC1"/>
</svg>
```

## File: server/cloud/file.ts
```typescript
import type { FastifyRequest } from "fastify";
import type { storage } from "pkgcloud";
import OpenStackSDK from "./OpenStackSdk";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import "@fastify/multipart";
import streamToBuffer from "./streamToBuffer";
import openStack from "../config/openStack";

interface FileOptions {
  width?: number;
  height?: number;
  quality?: number;
  keepAspectRatio?: boolean;
}

interface FileUploadOptions {
  url?: string;
  width?: number;
  height?: number;
  quality?: number;
}

class File {
  private readonly fileSizeLimit: number = 1024 * 1024 * 10;
  private static readonly maxWidth: number = 2560;
  private static readonly maxHeight: number = 1440;
  private static readonly maxQuality: number = 100;
  private static readonly quality: number = 90;
  private request: FastifyRequest;

  constructor(request: FastifyRequest) {
    this.request = request;
  }

  static async getOpenStackContainer(containerName: string): Promise<storage.Container> {
    return await new Promise((resolve, reject) => {
      return OpenStackSDK.getContainer(
        containerName,
        (err: unknown, container: storage.Container) => {
          if (err) reject(err);
          else resolve(container);
        },
      );
    });
  }

  static generateRandomFileName(length: number = 24) {
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  static async prepareImage(imageBuffer: Buffer, options: FileOptions): Promise<Buffer>;
  static async prepareImage(image: string | Buffer, options: FileOptions = {}): Promise<Buffer> {
    try {
      const sharpProcess = sharp(image);

      if (!options.height) options.height = File.maxHeight;
      if (!options.width) options.width = File.maxWidth;
      if (!options.quality) options.quality = File.quality;
      if (!options.keepAspectRatio) options.keepAspectRatio = true;

      if (options.width && (options.width > File.maxWidth || options.width <= 0)) {
        options.width = File.maxWidth;
      }

      if (options.height && (options.height > File.maxHeight || options.height <= 0)) {
        options.height = File.maxHeight;
      }

      if (options.quality && (options.quality > File.maxQuality || options.quality <= 0)) {
        options.quality = File.maxQuality;
      }

      const metadata = await sharpProcess.metadata();
      const originalWidth = metadata.width!;
      const originalHeight = metadata.height!;
      const aspectRatio = originalWidth / originalHeight;

      const heightTooBig = options.height > File.maxHeight;
      const widthTooBig = options.width > File.maxWidth;

      if (heightTooBig || widthTooBig) {
        if (heightTooBig && widthTooBig) {
          if (originalWidth > originalHeight) {
            options.width = File.maxWidth;
            options.height = Math.round(options.width / aspectRatio);
          } else {
            options.height = File.maxHeight;
            options.width = Math.round(options.height * aspectRatio);
          }
        } else if (options.width > File.maxWidth) {
          options.width = File.maxWidth;
          options.height = Math.round(options.width / aspectRatio);
        } else if (options.height > File.maxHeight) {
          options.height = File.maxHeight;
          options.width = Math.round(options.height * aspectRatio);
        }
      }

      sharpProcess.resize(options.width || null, options.height || null, {
        withoutEnlargement: true,
        fit: options.keepAspectRatio ? "outside" : "cover",
      });

      sharpProcess.webp({
        quality: options.quality || File.quality,
      });

      return await sharpProcess.toBuffer();
    } catch (error: unknown) {
      console.trace(error);

      if (image instanceof Buffer) return image;
      return Buffer.from(image);
    }
  }

  async uploadImage(
    containerName: string,
    options: FileUploadOptions = {},
    fieldName = "image",
  ): Promise<[string, string]> {
    const randomName = File.generateRandomFileName(20);
    const finalExtension = "webp";
    let originalName = "";
    let imageBuffer: Buffer | null = null;

    if (!(await File.getOpenStackContainer(containerName))) {
      throw new Error("No container found");
    }

    if (!options.url) {
      // Multiple files could be uploaded at once, get ONLY the file with the specified field name (fieldName)
      // in the multipart request

      let image = null;

      for await (const part of this.request.parts()) {
        if ("file" in part) {
          if (part.fieldname === fieldName) {
            originalName = part.filename;
            image = part.file;
            imageBuffer = await part.toBuffer();
            break;
          }

          part.file.resume();
        }
      }

      if (!image) throw new Error("No image provided");
    } else {
      const imageResponse = await fetch(options.url);
      if (!imageResponse.ok) throw new Error("Image not found");

      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      originalName = options.url.split("/").pop() || "";
    }

    if (!imageBuffer) throw new Error("No image provided");

    const convertedImage = await File.prepareImage(imageBuffer!, {
      width: options.width || File.maxWidth,
      height: options.height || File.maxHeight,
      quality: options.quality || File.maxQuality,
    });

    const imageFileName = `${randomName}.${finalExtension}`;
    const imageFilePath = path.join("temp", imageFileName);

    try {
      fs.writeFileSync(imageFilePath, convertedImage);

      await OpenStackSDK.uploadFile({
        container: containerName,
        filePath: path.join(imageFilePath),
        fileName: imageFileName,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    } finally {
      try {
        fs.unlinkSync(imageFilePath);
      } catch (error: unknown) {
        console.trace(error);
      }
    }

    return [imageFileName, originalName];
  }

  async uploadFile(containerName: string): Promise<string> {
    const file = await this.request.file({
      limits: { fileSize: this.fileSizeLimit },
    });

    if (!file) throw new Error("No file provided");

    const fileFileNameParts = [];
    fileFileNameParts.push("file");
    fileFileNameParts.push(File.generateRandomFileName(6));

    const extension = file.filename.split(".").pop();
    const fileFileName = `${fileFileNameParts.join("-")}.${extension}`;
    const tempFilePath = path.join("temp", fileFileName);

    fs.writeFileSync(tempFilePath, await file.toBuffer());

    try {
      await OpenStackSDK.uploadFile({
        container: containerName,
        filePath: tempFilePath,
        fileName: fileFileName,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    }

    return fileFileName;
  }

  async deleteFile(containerName: string): Promise<void> {
    const { imagePath } = this.request.params as { imagePath: string };

    if (!(await File.getOpenStackContainer(containerName))) {
      throw new Error("No container found");
    }

    try {
      await OpenStackSDK.deleteFile({
        container: containerName,
        fileName: imagePath,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    }
  }

  async getFile(containerName: string): Promise<Buffer> {
    const { filePath } = this.request.params as { filePath: string };

    const fileResponse = await fetch(`${openStack.CONTAINER_URL}/${containerName}/${filePath}`);

    if (!fileResponse.ok) throw new Error("File not found");

    const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
    return fileBuffer;
  }

  async getImage(containerName: string): Promise<Buffer> {
    const { filePath } = this.request.params as { filePath: string };
    const { width, height, quality } = this.request.query as {
      width?: string;
      height?: string;
      quality?: string;
    };

    try {
      const file = OpenStackSDK.download({
        container: containerName,
        remote: filePath,
      });

      const buffer = (await new Promise((resolve, reject) => {
        streamToBuffer(file)
          .then((buffer) => resolve(buffer))
          .catch((error) => {
            console.trace(error);
            reject(false);
          });
      })) as Buffer;

      return await File.prepareImage(buffer, {
        width: width ? Number(width) : File.maxWidth,
        height: height ? Number(height) : File.maxHeight,
        quality: quality ? Number(quality) : File.quality,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error getting image");
    } finally {
      // fs.unlinkSync(tempFilePath);
    }
  }
}

export default File;
```

## File: server/cloud/OpenStackSdk.ts
```typescript
// core/OpenStackSDK.ts

import type { storage } from "pkgcloud";
import pkgcloud from "pkgcloud";
import fs from "fs";
import openStack from "../config/openStack";

const SDK = pkgcloud.storage.createClient({
  domainId: openStack.DOMAIN_ID,
  tenantId: openStack.TENANT_ID,
  password: openStack.PASSWORD,
  username: openStack.USERNAME,
  authUrl: openStack.AUTH_URL,
  keystoneAuthVersion: "v3",
  region: openStack.REGION,
  provider: "openstack",
  version: "v3",
}) as pkgcloud.storage.Client & {
  uploadFile: (params: {
    container: string;
    filePath: string;
    fileName: string;
  }) => Promise<storage.File>;
  deleteFile: (params: { container: string; fileName: string }) => Promise<void>;
};

SDK.uploadFile = async function ({ container, filePath, fileName }) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = SDK.upload({
      container,
      remote: fileName,
    });

    writeStream.on("error", (err) => reject(err));
    writeStream.on("success", (file) => resolve(file));

    readStream.pipe(writeStream);
  });
};

SDK.deleteFile = async function ({ container, fileName }) {
  return new Promise((resolve, reject) => {
    SDK.removeFile(container, fileName, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export default SDK;
```

## File: server/cloud/streamToBuffer.ts
```typescript
// core/StreamToBuffer.ts
const streamToBuffer = async (readableStream: NodeJS.ReadStream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data) => {
      if (typeof data === "string") {
        // Convert string to Buffer assuming UTF-8 encoding
        chunks.push(Buffer.from(data, "utf-8"));
      } else if (data instanceof Buffer) {
        chunks.push(data);
      } else {
        // Convert other data types to JSON and then to a Buffer
        const jsonData = JSON.stringify(data);
        chunks.push(Buffer.from(jsonData, "utf-8"));
      }
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
};

export default streamToBuffer;
```

## File: server/config/openStack.ts
```typescript
export default {
  AUTH_URL: process.env.OS_AUTH_URL as string,
  CONTAINER_URL: process.env.OS_CONTAINER_URL as string,
  USERNAME: process.env.OS_USERNAME as string,
  PASSWORD: process.env.OS_PASSWORD as string,
  DOMAIN_NAME: process.env.OS_DOMAIN_NAME as string,
  DOMAIN_ID: process.env.OS_DOMAIN_ID as string,
  SCOPE_ID: process.env.OS_SCOPE_ID as string,
  TENANT_ID: process.env.OS_TENANT_ID as string,
  REGION: process.env.OS_REGION as string,
  SECRET: process.env.OS_SECRET as string,
  IMAGES_CONTAINER_NAME: process.env.OS_IMAGES_CONTAINER_NAME as string,
};
```

## File: server/controller/controller.ts
```typescript
import { logger } from "@/lib/logger";
import { ApiResponse, PostImageReply } from "@/types/server";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

interface DefaultResponseRoute extends RouteGenericInterface {
  Reply: ApiResponse<any>;
}

export abstract class Controller {
  static sendError = (
    rep: FastifyReply<DefaultResponseRoute>,
    options?: { message?: string; description?: string; status?: number },
  ) => {
    logger.error("An error occured", options);
    return rep.status(options?.status ?? 500).send({
      message: options?.message ?? "Unhandled error occured",
      success: false,
    });
  };
}
```

## File: server/controller/file-controller.ts
```typescript
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import File from "../cloud/file";
import { ApiResponse, ImageReply, UploadImageReply } from "@/types/server";
import { Controller } from "./controller";
import openStack from "../config/openStack";
import { logger } from "@/lib/logger";

interface UploadImageRoute extends RouteGenericInterface {
  Reply: ApiResponse<UploadImageReply>;
}

interface GetImageRoute extends RouteGenericInterface {
  Reply: ApiResponse<ImageReply>;
}

export default class FileController extends Controller {
  static async upload(req: FastifyRequest, rep: FastifyReply<UploadImageRoute>) {
    try {
      const fileManager = new File(req);
      const [fileName] = await fileManager.uploadImage(openStack.IMAGES_CONTAINER_NAME);
      return rep.send({ success: true, body: { fileName } });
    } catch (err) {
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Réessayez plus tard.",
        description: "Une erreur innatendue est survenue :/",
      });
    }
  }

  static async get(req: FastifyRequest<{ Params: { filePath: string } }>, rep: FastifyReply) {
    try {
      console.log("GET IMAGE REQUESTED");
      const imageRequested = req.params.filePath;

      if (!imageRequested) throw new Error("Pas de nom d'image dans les paramètres.");
      const fileManager = new File(req);
      const image = await fileManager.getImage(openStack.IMAGES_CONTAINER_NAME);
      rep.raw.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      logger.info("Cache-Control header:", rep.getHeader("Cache-Control"));
      return rep.type("image/webp").send(image);
    } catch (err) {
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Réessayez plus tard.",
        description: "Une erreur innatendue est survenue :/",
      });
    }
  }
}
```

## File: server/entry.ts
```typescript
import { telefuncHandler } from "./telefunc-handler";
import { apply, serve } from "@photonjs/fastify";
import fastify from "fastify";
import rawBody from "fastify-raw-body";
import fastifyCookie from "@fastify/cookie";
import { fileUploadHandler } from "./file-upload-handler";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default (await startApp()) as unknown;

async function startApp() {
  const app = fastify({
    forceCloseConnections: true,
  });

  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  app.register(fileUploadHandler);

  await app.register(rawBody);

  await apply(app, [telefuncHandler]);
  app.addHook("onSend", (req, rep, payload, done) => {
    if (req.url.startsWith("/image/")) {
      rep.header("Cache-Control", "public, max-age=31536000, immutable");
    }
    done();
  });
  return serve(app, {
    port,
  });
}
```

## File: server/file-upload-handler.ts
```typescript
import fastifyMultipart from "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import FileController from "./controller/file-controller";

export const fileUploadHandler = async (app: FastifyInstance) => {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
  });
  app.post("/image", FileController.upload);
  app.get("/image/:filePath", FileController.get);
};
```

## File: server/telefunc-handler.ts
```typescript
import { enhance, type UniversalHandler } from "@universal-middleware/core";
import { telefunc } from "telefunc";

export const telefuncHandler: UniversalHandler = enhance(
  async (request, context, runtime) => {
    const httpResponse = await telefunc({
      url: new URL(request.url.toString()).pathname,
      method: request.method,
      body: await request.text(),
      context: {
        ...context,
        ...runtime,
      },
    });
    const { body, statusCode, contentType } = httpResponse;
    return new Response(body, {
      status: statusCode,
      headers: {
        "content-type": contentType,
      },
    });
  },
  {
    name: "desinvolts:telefunc-handler",
    path: `/_telefunc`,
    method: ["GET", "POST"],
    immutable: false,
  },
);
```

## File: styleSheets/Layout.css
```css
#root {
  overflow: hidden;
  height: 100vh;
}

body {
  margin: 0;
  font-family: sans-serif;
  height: 100vh;
}
* {
  box-sizing: border-box;
}

#page-content {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  overflow-y: scroll;
  height: 100vh;
}

body.page-transition #page-content {
  opacity: 0;
}

* {
  transition-property: background-color, color, box-shadow, fill, stroke, opacity, scale, filter;
  transition-duration: var(--transition-duration);
  transition-timing-function: ease;
  user-select: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

*::-webkit-scrollbar {
  display: none;
}

.show-all-borders *:not(body):not(#root) {
  border: 0.1px solid white;
  box-sizing: border-box;
}

.window-shadow {
  box-shadow: 0px 0px 1rem 0.1rem var(--accent);
}

a {
  cursor: pointer;
  height: fit-content;
}

a {
  background-image: linear-gradient(
    to right,
    var(--primary),
    var(--primary) 50%,
    var(--color-foreground) 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 0.3rem 0;
  position: relative;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all var(--transition-duration) ease-in-out;
}

a:not(.unset):before {
  content: "";
  background: var(--primary);
  display: block;
  position: absolute;
  bottom: -0.01rem;
  left: 0;
  width: 0;
  height: 0.2rem;
  transition: all var(--transition-duration) ease-in-out;
}

a:hover,
a.selected {
  background-position: 0;
}

a:hover::before,
a.selected::before {
  width: 100%;
}

.background-noise {
  position: relative; /* nécessaire pour que ::after soit positionné par rapport à l'élément */
  background-color: var(--background);
  overflow: hidden;
}

.background-noise::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: url(#grainy);
  opacity: 0.2; /* contrôle l'intensité du bruit */
}

.social-icon {
  cursor: pointer;
}

.social-icon {
  fill: var(--color-foreground);
  stroke: var(--color-foreground);
  width: 2rem;
  height: 2rem;
}

.social-icon:hover {
  fill: var(--accent);
  stroke: var(--accent);
}

.rdp-nav {
  height: 2.1rem;
}

@media (max-width: 640px) {
  #page-content {
    scroll-snap-type: y mandatory;
  }
}
```

## File: styleSheets/tailwind.css
```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));
@import "./typography.css";

@font-face {
  font-family: "RoadRage";
  src:
    url("/fonts/RoadRage.woff2") format("woff2"),
    url("/fonts/RoadRage.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Zing Rust Demo */
@font-face {
  font-family: "ZingRustDemo";
  src:
    url("/fonts/ZingRustDemo-Base.woff2") format("woff2"),
    url("/fonts/ZingRustDemo-Base.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Contrail One */
@font-face {
  font-family: "ContrailOne";
  src:
    url("/fonts/ContrailOne-Regular.woff2") format("woff2"),
    url("/fonts/ContrailOne-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Overpass */
@font-face {
  font-family: "Overpass";
  src:
    url("/fonts/Overpass-Regular.woff2") format("woff2"),
    url("/fonts/Overpass-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  font-size: 16px;
  --radius: 0.625rem;
  --transition-duration: 0.2s;

  --color-background: oklch(0.95 0.01 0.01);
  --color-foreground: oklch(0.145 0 0);
  --color-surface: oklch(1 0 0);
  --color-border: oklch(92.191% 0.0001 271.152 / 0.288);
  --color-ring: oklch(0.708 0 0);

  --color-primary: #df6310;
  --color-primary-foreground: #ffffff;
  --color-secondary: #057cc9;
  --color-secondary-foreground: #ffffff;
  --color-accent: #df6310;
  --color-accent-foreground: #ffffff;
  --color-success: #419210;
  --color-error: #c70d18;
  --color-warn: #fdaf13;

  --color-muted: #e8ccaf;
  --color-muted-foreground: #041527;
  --color-muted-second: #e8ccaf2c;

  --color-chart-1: #df6310;
  --color-chart-2: #057cc9;
  --color-chart-3: #cc31b0;
  --color-chart-4: #d62f0d;
  --color-chart-5: #fdaf13;
}

:root {
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --card: var(--color-surface);
  --card-foreground: var(--color-foreground);
  --popover: var(--color-surface);
  --popover-foreground: var(--color-foreground);
  --primary: var(--color-primary);
  --primary-foreground: var(--color-primary-foreground);
  --secondary: var(--color-secondary);
  --secondary-foreground: var(--color-secondary-foreground);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-accent-foreground);
  --destructive: var(--color-error);
  --muted: var(--color-muted);
  --muted-foreground: var(--color-muted-foreground);
  --muted-second: var(--color-muted-second);
  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-ring);

  --chart-1: var(--color-chart-1);
  --chart-2: var(--color-chart-2);
  --chart-3: var(--color-chart-3);
  --chart-4: var(--color-chart-4);
  --chart-5: var(--color-chart-5);
}

.dark {
  --color-background: #041527;
  --color-foreground: #f7f4f0;
  --color-surface: #172c43;
  --color-muted: #69635d;
  --color-muted-foreground: #e8dbc19d;

  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --card: var(--color-surface);
  --card-foreground: var(--color-foreground);
  --popover: var(--color-surface);
  --popover-foreground: var(--color-foreground);
}

@theme inline {
  --radius-sm: calc(var(--radius) - 0.4rem);
  --radius-md: calc(var(--radius) - 0.2rem);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 0.4rem);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

[style*="--bg"] {
  background-color: var(--bg);
}

[style*="--before-bg"]::before {
  background-color: var(--before-bg);
}

[style*="--after-bg"]::after {
  background-color: var(--after-bg);
}

.unset-all {
  all: unset;
}
```

## File: styleSheets/typography.css
```css
@layer utilities {
  .mobile-logo {
    @apply text-[1.25rem] font-[RoadRage]; /* 20px / 16 = 1.25rem */
  }
  .desktop-logo {
    @apply text-[2rem] font-[RoadRage]; /* 32px / 16 = 2rem */
  }
  .headline {
    @apply text-[2.25rem] font-[ZingRustDemo]; /* 36px / 16 = 2.25rem */
  }
  .title {
    @apply text-[1.5rem] font-[ZingRustDemo]; /* 24px / 16 = 1.5rem */
  }
  .title-sm {
    @apply text-[1rem] font-[ZingRustDemo]; /* 16px / 16 = 1rem */
  }
  .subtitle-xl {
    @apply text-[1.5rem] font-[ContrailOne]; /* 24px / 16 = 1.5rem */
  }
  .subtitle-lg {
    @apply text-[1.2rem] font-[ContrailOne]; /* 24px / 16 = 1.5rem */
  }
  .subtitle {
    @apply text-[1rem] font-[ContrailOne]; /* 16px / 16 = 1rem */
  }
  .subtitle-sm {
    @apply text-[0.75rem] font-[ContrailOne]; /* 12px / 16 = 0.75rem */
  }
  .paragraph-xl {
    @apply text-[1.5rem] font-[Overpass]; /* 24px / 16 = 1.5rem */
  }
  .paragraph-lg {
    @apply text-[1.125rem] font-[Overpass]; /* 18px / 16 = 1.125rem */
  }
  .paragraph {
    @apply text-[1rem] font-[Overpass]; /* 16px / 16 = 1rem */
  }
  .paragraph-sm {
    @apply text-[0.75rem] font-[Overpass]; /* 12px / 16 = 0.75rem */
  }
  .paragraph-xs {
    @apply text-[0.625rem] font-[Overpass]; /* 10px / 16 = 0.625rem */
  }
  .button {
    @apply text-[1rem] font-[Overpass]; /* 16px / 16 = 1rem */
    font-weight: 100;
  }
}
```

## File: types/contexts.ts
```typescript
import { Context, createContext } from "react";
import {
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "./page-contents";
import { StateContent } from "@/providers/stateProvider";

export const DefaultStateContext = createContext<StateContent<any> | null>(null);
export const HomePageContext = createContext<StateContent<HomePageContent> | null>(null);
export const ConnexionPageContext = createContext<StateContent<ConnexionPageContent> | null>(null);
export const ContactPageContext = createContext<StateContent<ContactPageContent> | null>(null);
export const DatesPageContext = createContext<StateContent<DatesPageContent> | null>(null);
export const GroupePageContext = createContext<StateContent<GroupePageContent> | null>(null);
export const MediasPageContext = createContext<StateContent<MediasPageContent> | null>(null);
export const SonPageContext = createContext<StateContent<NousEcouterPageContent> | null>(null);

export const contexts: Record<string, Context<StateContent<any> | null>> = {
  home: HomePageContext,
  connexion: ConnexionPageContext,
  contact: ContactPageContext,
  dates: DatesPageContext,
  groupe: GroupePageContext,
  medias: MediasPageContext,
  son: SonPageContext,
  default: DefaultStateContext,
};

export const PageStateKey = [
  "home",
  "connexion",
  "contact",
  "dates",
  "group",
  "medias",
  "son",
  "default",
] as const;

type ExtractContent<C> = C extends Context<StateContent<infer T> | null> ? T : never;

export type PageContentMap = {
  [K in keyof typeof contexts]: ExtractContent<(typeof contexts)[K]>;
};

export type AbstractPageState = {
  [K in keyof PageContentMap]: {
    page: K;
    content: PageContentMap[K];
  };
}[keyof PageContentMap];
```

## File: types/db.ts
```typescript
import {
  AlbumLink,
  FloatingWindow,
  Hyperlink,
  Image,
  NavLink,
  Paragraph,
  TextLine,
  Video,
} from "@/prisma/generated/prisma/client";
import { ReactNode } from "react";

export type EditableTextContent = {
  id: number;
  content: string;
  hyperlinks: Hyperlink[];
};

export type EditableParagraphContent = {
  id: number;
  content: string;
  hyperlinks: Hyperlink[];
};

export type ParagraphInGroup = {
  position: number;
  paragraph: EditableParagraphContent;
};

export type PostData = {
  id: number;
  date: Date;
  title: TextLine;
  images: {
    position: number;
    image: Image;
  }[];
  videos: {
    video: Video;
  }[];
  paragraphs: ParagraphInGroup[];
};

export type DateEvent = {
  id: number;
  title: EditableTextContent;
  date: Date;
  city: EditableTextContent;
  adress: EditableTextContent;
  image: Image;
  paragraphs: ParagraphInGroup[];
};

export type DownloadableFile = {
  id: number;
  filename: string;
  downloadUrl: string;
  date: Date;
};

export type Album = {
  id: number;
  cover: Image;
  title: EditableTextContent;
  paragraphs: ParagraphInGroup[];
  spotifyUrl: AlbumLink | null;
  appleMusicUrl: AlbumLink | null;
  deezerUrl: AlbumLink | null;
};

export type Carousel = {
  images: {
    position: number;
    image: Image;
  }[];
  videos: {
    position: number;
    video: Video;
  }[];
};

export type TrombinoscopeElement = {
  id: number;
  color: string | null;
  position: number;
  image: Image;
  title: TextLine;
  paragraphs: ParagraphInGroup[];
};

export type VideoData = {
  provider_url: string;
  title: string;
  html: string;
  author_name: string;
  height: number;
  thumbnail_width: number;
  width: number;
  version: string;
  author_url: string;
  provider_name: string;
  thumbnail_url: string;
  type: string;
  thumbnail_height: number;
};

export type WindowProps = FloatingWindow & {
  image: Image | null;
  video: Video | null;
  children?: ReactNode;
};
```

## File: types/general.ts
```typescript
import { EditableParagraphContent, EditableTextContent } from "./db";

export type VideoData = {
  provider_url: string;
  title: string;
  html: string;
  author_name: string;
  height: number;
  thumbnail_width: number;
  width: number;
  version: string;
  author_url: string;
  provider_name: string;
  thumbnail_url: string;
  type: string;
  thumbnail_height: number;
};

export type EditableTextProps = {
  className?: string;
  content: EditableTextContent;
  setContent: (newContent: EditableTextContent) => void;
  as?: React.ElementType;
};

export type EditableTextAreaProps = {
  className?: string;
  content: EditableParagraphContent;
  setContent: (newContent: EditableParagraphContent) => void;
  as?: React.ElementType;
};
```

## File: types/page-contents.ts
```typescript
import {
  Configuration,
  Image,
  NavLink,
  TrombinoscopeItem,
  Video,
} from "@/prisma/generated/prisma/client";
import {
  Album,
  Carousel,
  DateEvent,
  DownloadableFile,
  EditableParagraphContent,
  EditableTextContent,
  ParagraphInGroup,
  PostData,
  TrombinoscopeElement,
  WindowProps,
} from "./db";
import { FloatingWindow } from "@/prisma/generated/prisma/browser";

type JsonObject = Record<string, unknown>;

export interface BasePageContent extends JsonObject {
  navlinks: NavLink[];
  config: Configuration;
}
export interface HomePageContent extends BasePageContent {
  title: EditableTextContent;
  subtitle: EditableTextContent;
  banner: Image;
  presentationParagraph: EditableParagraphContent;
  presentationImage: Image;
  actualityTitle: EditableTextContent;
  posts: PostData[];
  carousel: Carousel;
}
export interface ConnexionPageContent extends BasePageContent {
  title: EditableTextContent;
  config: Configuration;
  navlinks: NavLink[];
}
export interface ContactPageContent extends BasePageContent {
  title: EditableTextContent;
  paragraph: EditableParagraphContent;
  subtitle: EditableTextContent;
  files: DownloadableFile[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface GroupePageContent extends BasePageContent {
  title: EditableTextContent;
  presentation_image: Image;
  first_section_paragraphs: ParagraphInGroup[];
  second_section_paragraphs: ParagraphInGroup[];
  trombinoscope: TrombinoscopeElement[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface MediasPageContent extends BasePageContent {
  title: EditableTextContent;
  video_section_title: EditableTextContent;
  pictures_section_title: EditableTextContent;
  videos: Video[];
  windows: WindowProps[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface DatesPageContent extends BasePageContent {
  title: EditableTextContent;
  dates: DateEvent[];
  prevTitle: EditableTextContent;
  nextTitle: EditableTextContent;
  config: Configuration;
  navlinks: NavLink[];
}
export interface NousEcouterPageContent extends BasePageContent {
  title: EditableTextContent;
  albums: Album[];
  config: Configuration;
  navlinks: NavLink[];
}
```

## File: types/server.ts
```typescript
export type ApiResponse<Body> =
  | {
      success: true;
      message?: string;
      description?: string;
      body: Body;
    }
  | {
      success: false;
      message?: string;
      description?: string;
    };

export type ApiRequest<Body, Reply> = {
  Body: Body;
  Reply: ApiResponse<Reply>;
};

export type PostImageReply = {
  image: string;
};

export type GetEmbedReply = {
  url: string;
};

export type ConnexionReply = {
  connected: boolean;
  jwt: string;
};

export type UploadImageReply = {
  fileName: string;
};

export type ImageReply = {
  image: Buffer<ArrayBufferLike>;
};

export type ApiRoute = "connexion";
```

## File: types/window.ts
```typescript
export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseOffset?: { x: number; y: number };
};

export enum Window {
  DevTools,
  Image,
  Video,
}
```

## File: .gitignore
```
# MacOS
.DS_Store

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# VSCode
.vscode/
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# Cloudflare
.wrangler/
.dev.vars*
!.dev.vars.example
!.env.example

# Vercel
.vercel/

# Sentry Vite Plugin
.env.sentry-build-plugin

# aws-cdk
.cdk.staging
cdk.out

/lib/generated/prisma

.env.dev
.env.prod
```

## File: dockerfile.dev
```
FROM node:20-alpine

WORKDIR /app


RUN apk add --no-cache libc6-compat bash git


COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm


RUN pnpm install --frozen-lockfile

# RUN pnpm prisma generate

EXPOSE 3000
```

## File: dockerfile.prod
```
FROM node:20-alpine

WORKDIR /app


RUN apk add --no-cache libc6-compat bash git


COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm


RUN pnpm install --frozen-lockfile


COPY . .

# RUN pnpm prisma generate

EXPOSE 3000

ENV HOST=0.0.0.0
RUN pnpm build --host 0.0.0.0
```

## File: notes.txt
```
dates -> format "vendredi 14 juillet 2025"
dates -> premier affichage: prochaine date la plus proche
dates passées -> accordéon
dates mobile -> modale ouvre calendrier


TODO: 

- posiibilité supprimer caroussel
- zod sur les formulaires
- scroll normal sur caroussel admin
```

## File: tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./typography.css"],
  theme: {
    extend: {
      fontFamily: {
        roadRage: ["RoadRage", "sans-serif"],
        zingRust: ["ZingRustDemo", "sans-serif"],
        contrailOne: ["ContrailOne", "sans-serif"],
        overpass: ["Overpass", "sans-serif"],
      },
      fontSize: {
        "mobile-logo": "24px",
        "desktop-logo": "32px",
        headline: "36px",
        title: "24px",
        "title-sm": "16px",
        "subtitle-xl": "24px",
        "subtitle-lg": "20px",
        subtitle: "16px",
        "subtitle-sm": "12px",
        "paragraph-xl": "24px",
        "paragraph-lg": "18px",
        paragraph: "16px",
        "paragraph-sm": "12px",
        "paragraph-xs": "10px",
        button: "16px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        "muted-second": "var(--muted-second)",
        "chart-1": "var(--color-chart-1)",
        "chart-2": "var(--color-chart-2)",
        "chart-3": "var(--color-chart-3)",
        "chart-4": "var(--color-chart-4)",
      },
    },
  },
  plugins: [],
};
```

## File: vite.config.ts
```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import telefunc from "telefunc/vite";

export default defineConfig({
  plugins: [vike(), react(), tailwindcss(), telefunc()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
  },

  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
});
```
