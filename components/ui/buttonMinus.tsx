import { CircleMinus } from "lucide-react";
import { MouseEvent } from "react";

export default function ButtonMinus({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return (
    <button
      type="button"
      className={`hover:bg-[var(--muted-second)] h-[1rem] aspect-square flex items-center justify-center rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <CircleMinus
        className={`w-full h-full stroke-[var(--color-error)] hover:fill-[var(--color-error)] hover:stroke-background cursor-pointer`}
        // className="w-[1.5rem] h-[1.5rem] stroke-[var(--color-error)] hover:fill-[var(--color-error)] hover:stroke-background cursor-pointer"
      />
    </button>
  );
}
