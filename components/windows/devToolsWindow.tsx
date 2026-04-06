import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { ClientOnly } from "vike-react/ClientOnly";
import { showBorders, toggleTheme } from "@/lib/devTools";
import { logger } from "@/lib/logger";
import { errorToast, successToast } from "@/lib/utils";
import { useAdmin } from "@/providers/adminProvider";
import { useSize } from "@/providers/screenSizeProvider";
import { usePageState } from "@/providers/stateProvider";
import { onHandleStateChange } from "@/telefunc/handleStateChange.telefunc";
import { contexts, type PageKey } from "@/types/contexts";
import type { Bounds } from "@/types/window";
import DownloadStateButton from "../features/backup/download-state-button";
import UploadStateButton from "../features/backup/upload-state-button";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import { Switch } from "../ui/switch";

const STORAGE_KEY = "devtools-window";

const DEFAULT_BOUNDS = { x: 20, y: 20, width: 300, height: 300 };

function loadBounds(): Bounds {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_BOUNDS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_BOUNDS;
}

export default function DevToolsWindow<K extends PageKey>({ pageKey }: { pageKey: K }) {
  const _nodeRef = useRef(null);
  const { isAdminDisplay, toggleAdmin } = useAdmin();
  const [currentTheme, setCurrentTheme] = useState<boolean>(true);
  const [_borders, setBorders] = useState(false);
  const { pageContext } = usePageState(contexts[pageKey]);
  const { state } = pageContext;
  const [loading, setLoading] = useState(false);
  const screen = useSize();
  const [bounds, setBounds] = useState(loadBounds);

  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains("dark"));
  }, []);

  if (screen === "sm") return null;

  const saveBounds = (updates: Partial<typeof DEFAULT_BOUNDS>) => {
    setBounds((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const syncState = async () => {
    setLoading(true);

    const stateString = JSON.stringify(state);
    const stateBlob = new Blob([stateString], { type: "application/json" });
    const stateFile = new File([stateBlob], "state.json");

    logger.info("Sending state as file...");

    const res = await onHandleStateChange(stateFile, pageKey);

    if (!res) {
      errorToast("Echec de la synchronisation.");
    } else {
      successToast("Page synchronisée !");
    }
    setLoading(false);
  };

  return (
    <ClientOnly>
      <Rnd
        position={{ x: bounds.x, y: bounds.y }}
        size={{ width: bounds.width, height: bounds.height }}
        onDragStop={(_, d) => saveBounds({ x: d.x, y: d.y })}
        onResizeStop={(_, __, ref, ___, position) =>
          saveBounds({
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
            x: position.x,
            y: position.y,
          })
        }
        className="z-50"
      >
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
              <Switch id="admin" checked={isAdminDisplay} onCheckedChange={toggleAdmin} />
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
    </ClientOnly>
  );
}
