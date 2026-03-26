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
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { errorToast, successToast } from "@/lib/utils";
import { onHandleStateChange } from "@/telefunc/handleStateChange.telefunc";
import { Bounds } from "@/types/window";
import { ClientOnly } from "vike-react/ClientOnly";

const STORAGE_KEY = "devtools-window";

const DEFAULT_BOUNDS = { x: 20, y: 20, width: 300, height: 300 };

function loadBounds(): Bounds {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_BOUNDS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_BOUNDS;
}

export default function DevToolsWindow({
  context,
}: {
  context: Context<StateContent<any> | null>;
}) {
  const nodeRef = useRef(null);
  const { isAdminDisplay, toggleAdmin } = useAdmin();
  const [currentTheme, setCurrentTheme] = useState<boolean>(true);
  const [borders, setBorders] = useState(false);
  const { pageContext } = usePageState(context);
  const { state, stateKey } = pageContext;
  const [loading, setLoading] = useState(false);

  const [bounds, setBounds] = useState(loadBounds);

  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains("dark"));
  }, []);

  const saveBounds = (updates: Partial<typeof DEFAULT_BOUNDS>) => {
    setBounds((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const syncState = async () => {
    setLoading(true);
    logger.info("State update request", state);
    const res = await onHandleStateChange(state, stateKey);
    if (!res) {
      errorToast("Echec de la synchronisation.", "Êtes vous connecté ?");
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
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
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
