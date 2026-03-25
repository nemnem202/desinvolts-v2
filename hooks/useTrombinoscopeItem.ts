import { TrombinoscopeItemProps } from "@/components/features/trombinoscope/trombinoscopeItem";
import { useAdmin } from "@/providers/adminProvider";
import { useEffect, useState } from "react";

export default function useTrombinoscopeItem(props: TrombinoscopeItemProps) {
  const { isAdminDisplay } = useAdmin();
  const { element, elements, setElement, setElements } = props;
  const [hovered, setHovered] = useState(false);

  const handleIsHovered = (isHovered: boolean) => {
    if (!isAdminDisplay) setHovered(isHovered);
  };

  useEffect(() => {
    setHovered(isAdminDisplay);
  }, [isAdminDisplay]);

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

  return { handleIsHovered, reorderItem, isAdminDisplay, hovered, element, setElement };
}
