import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DateEvent } from "@/types/db";
import { CalendarDays } from "lucide-react";
import CalendarComponent from "./calendarComponent";

export function CalendarDialogButton({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="cursor-pointer" onClick={() => setOpen(true)} type="button">
      <CalendarDays />
    </button>
  );
}

export function CalendarDialog({
  dates,
  currentDate,
  setCurrentIndex,
  open,
  setOpen,
}: {
  dates: DateEvent[];
  currentDate: DateEvent;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="p-0 m-0 border-none flex items-top justify-center w-min h-min bg-transparent">
        <DialogTitle className="hidden">Calendrier</DialogTitle>
        <CalendarComponent
          dates={dates}
          currentDate={currentDate}
          setCurrentIndex={setCurrentIndex}
        />
      </DialogContent>
    </Dialog>
  );
}
