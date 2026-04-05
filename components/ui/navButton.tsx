export default function NavButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  reverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 subtitle p-1 rounded-full ${
        disabled ? "opacity-70 cursor-not-allowed" : "hover:underline"
      }`}
    >
      {children}
    </button>
  );
}
