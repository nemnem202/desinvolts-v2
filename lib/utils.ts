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
