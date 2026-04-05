import {
	AlbumLink,
	FloatingWindow,
	Hyperlink,
	Image,
	NavLink,
	Paragraph,
	TextLine,
	Video,
	Album as AlbumDb,
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
	position: number;
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
