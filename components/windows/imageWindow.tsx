import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { ArrowDownUp, X } from "lucide-react";
import Image from "../common/image";
import { useEffect } from "react";
import { Window } from "@/types/window";
import { WindowProps } from "@/types/db";
import { Image as ImageDb } from "@/prisma/generated/prisma/browser";

export default function ImageWindow({ image, window }: { image: ImageDb; window: WindowProps }) {
  const { isAdminDisplay } = useAdmin();
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
            }),
          )
        }
        onRemove={() => removeWindow(window.id)}
      />
    </div>
  );
}
