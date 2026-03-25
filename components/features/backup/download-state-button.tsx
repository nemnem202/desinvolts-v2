import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import { getAllPageStates } from "@/pages/getAllPageContent.telefunc";

export default function DonwloadStateButton() {
  const handleDownload = async () => {
    const states = await getAllPageStates();
    const dataStr = JSON.stringify(states, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    logger.info("All pages: ", states);
    link.href = url;
    link.download = `backup-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Button onClick={handleDownload} type="button">
      Télécharger la sauvegarde
    </Button>
  );
}
