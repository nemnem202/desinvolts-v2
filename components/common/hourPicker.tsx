import type React from "react";
import { ClientOnly } from "vike-react/ClientOnly";
import useTime from "@/hooks/useTime";
import { useAdmin } from "@/providers/adminProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function HourPicker({
  date,
  className = "",
  as: Tag = "span",
  onValueChange,
}: {
  date: Date;
  className?: string;
  as?: React.ElementType;
  onValueChange: (date: Date) => void;
}) {
  const { isAdminDisplay } = useAdmin();

  const { updateHour, updateMinutes } = useTime(date, onValueChange);

  if (isAdminDisplay) {
    return (
      <ClientOnly>
        <Dialog>
          <DialogTrigger asChild>
            <Tag className={`hover:bg-muted rounded cursor-pointer ${className}`}>
              {String(date.getHours()).padStart(2, "0")}:
              {String(date.getMinutes()).padStart(2, "0")}
            </Tag>
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogTitle className="hidden">Un sélécteur d'heures</DialogTitle>
            <DialogDescription className="hidden">Un sélécteur d'heures</DialogDescription>
            <h3 className="title">Sélectionnez une heure</h3>
            <div className="flex w-fit justify-center items-center gap-5">
              <Select defaultValue={String(date.getHours())} onValueChange={updateHour}>
                <SelectTrigger className="w-[5rem] text-center subtitle-xl">
                  <SelectValue className="subtitle-xl" />
                </SelectTrigger>

                <SelectContent className="w-[5rem] min-w-[5rem] !min-w-[5rem] h-[20rem] min-h[20rem] overflow-y-auto ">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <SelectItem
                      value={String(index)}
                      key={index}
                      className="w-min flex justify-center items-center text-center align-center subtitle-xl"
                    >
                      {String(index).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="subtitle-xl">:</span>
              <Select defaultValue={String(date.getMinutes())} onValueChange={updateMinutes}>
                <SelectTrigger className="w-[5rem] text-center subtitle-xl">
                  <SelectValue className="subtitle-xl" />
                </SelectTrigger>
                <SelectContent className="w-[5rem] min-w-[5rem] !min-w-[5rem] h-[20rem] min-h[20rem] overflow-y-auto">
                  {Array.from({ length: 60 }).map((_, index) => (
                    <SelectItem
                      key={index}
                      value={String(index)}
                      className="w-min flex justify-center items-center text-center align-center subtitle-xl"
                    >
                      {String(index).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    );
  } else
    return (
      <ClientOnly>
        <Tag className={className}>
          {String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}
        </Tag>
      </ClientOnly>
    );
}
