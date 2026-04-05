import { useCallback, useEffect, useRef, useState } from "react";
import type { WindowManagerProps } from "@/components/windows/windowsManager";
import { useAdmin } from "@/providers/adminProvider";
import type { Bounds } from "@/types/window";

export default function useWindowManager({
  colnumber,
  rowSize = 1,
  showDots = true,
}: WindowManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_, setColSize] = useState<number | undefined>(undefined);
  const [containerBounds, setContainerBounds] = useState<
    (Bounds & { top: number; left: number }) | undefined
  >(undefined);
  const { isAdminDisplay } = useAdmin();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundsRef = useRef<typeof containerBounds>(undefined);

  const drawGrid = useCallback(() => {
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

    if (!isAdminDisplay || !showDots) return ctx.reset();

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
  }, [colnumber, isAdminDisplay, rowSize, showDots]);

  useEffect(() => {
    boundsRef.current = containerBounds;
  }, [containerBounds]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
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
  }, [colnumber]);

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
        const next = {
          x: rect.left,
          y: rect.top,
          width: prev.width,
          height: prev.height,
          top: rect.top,
          left: rect.left,
        };

        // Vérifier que quelque chose a vraiment changé
        if (
          next.top !== prev.top ||
          next.left !== prev.left ||
          next.width !== prev.width ||
          next.height !== prev.height
        ) {
          boundsRef.current = next;
          setContainerBounds(next);
        }
      }

      rafId = requestAnimationFrame(track);
    };

    track();

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  return { containerRef, containerBounds, canvasRef, boundsRef, drawGrid };
}
