import type { Image as ImageDb } from "@/prisma/generated/prisma/browser";
import { useWindows } from "@/providers/windowsProvider";
import type { WindowProps } from "@/types/db";
import Image from "../common/image";

export default function ImageWindow({ image, window }: { image: ImageDb; window: WindowProps }) {
  const { removeWindow, setWindows, windows } = useWindows();

  return (
    <div className="w-full h-full">
      <Image
        imageProps={image}
        onChange={(newImage) =>
          setWindows(
            windows.map((w) => {
              if (w.id === window.id && window.image) {
                window.image = newImage;
              }
              return w;
            })
          )
        }
        onRemove={() => removeWindow(window.id)}
      />
    </div>
  );
}
