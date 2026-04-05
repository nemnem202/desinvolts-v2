import useCaroussel from "@/hooks/useCaroussel";

import { useAdmin } from "@/providers/adminProvider";
import type { Carousel } from "@/types/db";
import Image from "../common/image";
import AddImageButton from "../features/image-editor/addImageButton";

export interface CarouselProps {
  content: Carousel;
  onChange: (newContent: Carousel) => void;
}

export default function Caroussel({ content, onChange }: CarouselProps) {
  const { isAdminDisplay } = useAdmin();

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

  if (!isAdminDisplay) {
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
              ))
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
              ))
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
