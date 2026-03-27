import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import ButtonPlus from "@/components/ui/buttonPlus";
import DayPicker from "@/components/common/dayPicker";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HourPicker from "@/components/common/hourPicker";
import Image from "@/components/common/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateEvent } from "@/types/db";
import { useEffect, useState } from "react";
import useDateForm from "@/hooks/forms/useDateForm";
import { logger } from "@/lib/logger";

export default function AddDateDialog({ onDate }: { onDate: (newDate: DateEvent) => void }) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useDateForm({
    onDate: (date) => {
      logger.info("Date ajoutée");
      setOpen(false);
      onDate(date);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonPlus onClick={() => setOpen(true)} />
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-center">
        <DialogTitle className="title text-center">Ajouter une date</DialogTitle>

        <Form {...form}>
          <form
            id="adddateform"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-5"
          >
            {/* Titre */}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormLabel className="subtitle">Image</FormLabel>

                  <FormControl>
                    {field.value ? (
                      <div className="h-50 w-50">
                        <Image
                          width={200}
                          height={200}
                          imageProps={field.value}
                          onChange={(img) => form.setValue("image", { ...img, label: null })}
                        />
                      </div>
                    ) : (
                      <AddImageButton
                        onImage={(img) => form.setValue("image", { ...img, label: null })}
                      >
                        <Button>Ajouter une image</Button>
                      </AddImageButton>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="subtitle">Titre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Titre de l'événement"
                      className="italic paragraph"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="subtitle">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" className="paragraph" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between gap-4">
              {/* Jour */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1 gap-2">
                    <FormLabel className="subtitle">Jour: </FormLabel>
                    <FormControl>
                      <DayPicker
                        date={field.value}
                        onValueChange={(newDate) => {
                          field.onChange(
                            new Date(
                              newDate.getFullYear(),
                              newDate.getMonth(),
                              newDate.getDate(),
                              field.value.getHours(),
                              field.value.getMinutes(),
                            ),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Heure */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1 gap-2">
                    <FormLabel className="subtitle">Heure: </FormLabel>
                    <FormControl>
                      <HourPicker
                        date={field.value}
                        onValueChange={(newDate) => {
                          field.onChange(
                            new Date(
                              field.value.getFullYear(),
                              field.value.getMonth(),
                              field.value.getDate(),
                              newDate.getHours(),
                              newDate.getMinutes(),
                            ),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-col flex">
              <Label className="subtitle">Lieu</Label>
              <div className="flex w-full gap-4">
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Rue" className="paragraph" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Ville" className="paragraph" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" form="adddateform">
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
