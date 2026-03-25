import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogDescription } from "../ui/dialog";
import { ClientOnly } from "vike-react/ClientOnly";
import { useAdmin } from "@/providers/adminProvider";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/lib/utils";

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
  const { isAdmin } = useAdmin();

  const handleDayChange = (date: Date | undefined) => {
    if (!date) return;
    onValueChange(date);
  };

  if (isAdmin) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={"hover:bg-muted rounded cursor-pointer w-fit! " + className}>
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
