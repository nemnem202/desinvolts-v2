import { showBorders, toggleTheme } from "@/lib/devTools";
import { useAdmin } from "@/providers/adminProvider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Context, useEffect, useRef, useState } from "react";
import DownloadStateButton from "../features/backup/download-state-button";
import UploadStateButton from "../features/backup/upload-state-button";
import { Rnd } from "react-rnd";
import { StateContent, usePageState } from "@/providers/stateProvider";
import { logger } from "@/lib/logger";
import { handleStateChange } from "@/telefunc/handleStateChange.telefunc";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { successToast } from "@/lib/utils";

export default function DevToolsWindow({
  context,
}: {
  context: Context<StateContent<any> | null>;
}) {
  const nodeRef = useRef(null);
  const { isAdmin, toggleAdmin } = useAdmin();
  const [currentTheme, setCurrentTheme] = useState<boolean>(true);
  const [borders, setBorders] = useState(false);
  const { pageContext } = usePageState(context);
  const { state, stateKey } = pageContext;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains("dark"));
  }, []);

  const syncState = async () => {
    setLoading(true);
    logger.info("State update request", state);
    await handleStateChange(state, stateKey);
    successToast("Page synchronisée !");
    setLoading(false);
  };

  return (
    <Rnd default={{ x: 20, y: 20, width: 300, height: 300 }} className="z-50">
      <div className="flex flex-col h-full w-full p-5 gap-3 border rounded-md bg-background">
        <p className="title text-center">Dev tools</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Switch
              id="theme"
              defaultChecked={currentTheme}
              onClick={() => {
                toggleTheme();
                setCurrentTheme((prev) => !prev);
              }}
            />
            <Label htmlFor="theme" className="subtitle">
              Dark mode
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="admin" onClick={toggleAdmin} />
            <Label htmlFor="admin" className="subtitle">
              Admin Display
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="borders"
              onClick={() => {
                showBorders();
                setBorders((prev) => !prev);
              }}
            />
            <Label htmlFor="borders" className="subtitle">
              Borders
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <DownloadStateButton />
          </div>
          <div className="flex items-center space-x-2">
            <UploadStateButton />
          </div>
          <div>
            <Button onClick={() => syncState()} disabled={loading}>
              {loading ? <Spinner /> : "Synchroniser la page"}
            </Button>
          </div>
        </div>
      </div>
    </Rnd>
  );
}
