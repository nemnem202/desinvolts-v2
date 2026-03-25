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
