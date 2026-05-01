import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logger } from "@/lib/logger";
import { setAllPages } from "@/telefunc/setAllPageContent.telefunc";

export default function UploadStateButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      // Pas besoin de lire le texte et de refaire un Blob/File
      // Envoyez directement le fichier sélectionné par l'utilisateur
      await setAllPages(file);

      window.location.reload(); // Recharger pour voir les changements
    } catch (err) {
      logger.error("Erreur upload :", err);
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
