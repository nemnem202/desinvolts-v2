import { CirclePlus } from "lucide-react";

export default function ButtonPlus({
  onClick,
  size = "3rem",
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: string;
}) {
  return (
    <button
      type="button"
      className={`hover:bg-[var(--muted-second)] h-[${size}] aspect-square flex items-center justify-center rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <CirclePlus className={`w-[${size}] h-[${size}]`} />
    </button>
  );
}
