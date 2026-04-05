import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVideoWindowForm } from "@/hooks/forms/useVideoWindowForm";

export interface VideoWindowFormProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
}

export default function VideoWindowForm(props: VideoWindowFormProps) {
  const { isOpen, setOpen } = props;
  const { videoData, form, onSubmit, handleChange } = useVideoWindowForm(props);

  if (isOpen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/60"
        onClick={() => setOpen(false)}
      >
        <Form {...form}>
          <form
            id="videowindowform"
            onClick={(e) => e.stopPropagation()}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-background border rounded-lg p-5 w-3xl"
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
            <Button type="submit" form="videowindowform" className="float-right mt-2">
              Ajouter
            </Button>
          </form>
        </Form>
      </div>
    );
  } else return null;
}
