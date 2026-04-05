import type React from "react";
import { ClientOnly } from "vike-react/ClientOnly";
import { formatDate } from "@/lib/utils";
import { useAdmin } from "@/providers/adminProvider";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function DatePicker({
  dayValue,
  className = "",
  as: Tag = "span",
  onValueChange,
}: {
  dayValue: Date;
  className?: string;
  as?: React.ElementType;
  onValueChange: (date: Date) => void;
}) {
  const { isAdminDisplay } = useAdmin();

  const handleDayChange = (date: Date | undefined) => {
    if (!date) return;
    onValueChange(date);
  };

  if (isAdminDisplay) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={`hover:bg-muted rounded cursor-pointer w-fit! ${className}`}>
              {formatDate(dayValue)}
            </Tag>
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogTitle className="hidden">Un sélécteur d'heures</DialogTitle>
            <DialogDescription className="hidden">Un sélécteur d'heures</DialogDescription>
            <div>
              <Calendar
                captionLayout="dropdown"
                mode="single"
                className="rounded-lg shadow-sm w-[25rem] [--cell-size:4rem]"
                selected={dayValue}
                datesWithEvents={[]}
                defaultMonth={dayValue}
                onSelect={handleDayChange}
              />
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    );
  } else return <Tag className={className}>{formatDate(dayValue)}</Tag>;
}
