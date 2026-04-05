import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logger } from "@/lib/logger";
import type { PageContentMap } from "@/types/contexts";

export default function UploadStateButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as PageContentMap;
      logger.info("Upload: ", json);

      window.location.reload();
    } catch (err) {
      logger.error("Erreur lecture JSON :", err);
    }
  };
  return (
    <div>
      <Input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button onClick={handleClick} variant={"outline"} type="button">
        Importer une sauvegare
      </Button>
    </div>
  );
}
