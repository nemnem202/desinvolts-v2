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
