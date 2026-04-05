import { TabsTrigger } from "@/components/ui/tabs";
import type { NavLink } from "@/prisma/generated/prisma/browser";

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
