import { CarouselProps } from "@/components/ui/caroussel";
import { Image } from "@/prisma/generated/prisma/browser";
import { useAdmin } from "@/providers/adminProvider";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useCaroussel({ content, onChange }: CarouselProps) {
  const { isAdmin } = useAdmin();
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
