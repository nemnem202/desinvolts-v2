import { useAdmin } from "@/providers/adminProvider";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useVideoGalleyProps } from "@/hooks/forms/useVideoGalleryForm";
import { Video as VideoDb } from "@/prisma/generated/prisma/browser";

export interface VideoGalleryProps {
  onVideo: (newVideo: VideoDb) => void;
}

export default function VideoGalleryForm(props: VideoGalleryProps) {
  const { isAdmin } = useAdmin();

  const { form, open, onSubmit, handleChange, setOpen, videoData } = useVideoGalleyProps(props);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isAdmin && (
          <div className="w-[15rem] aspect-video flex items-center justify-center">
            <ButtonPlus onClick={() => {}} />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="space-y-8 bg-background border rounded-lg p-5 w-3xl">
        <Form {...form}>
          <form
            id="videogalleryform"
            onClick={(e) => e.stopPropagation()}
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormLabel className="subtitle mb-5">Url de la vidéo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?=..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                  {videoData && (
                    <div className="flex gap-3">
                      <img
                        className="w-2xs"
                        src={videoData.thumbnail_url}
                        alt={`l'image d'une vidéo de ${videoData.author_name}`}
                      ></img>
                      <div className="flex flex-col gap-2 mt-3">
                        <p className="subtitle">{videoData.title}</p>
                        <p className="paragraph">{videoData.author_name}</p>
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="float-right mt-2" form="videogalleryform">
              Ajouter
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
