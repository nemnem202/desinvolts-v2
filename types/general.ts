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
