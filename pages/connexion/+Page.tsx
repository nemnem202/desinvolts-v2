import ClassicPageLayout from "@/components/layout/classicPageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditableText from "@/components/common/editableText";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { ConnexionPageContext } from "@/types/contexts";
import { EditableTextContent } from "@/types/db";
import { ConnexionPageContent } from "@/types/page-contents";
import { useConnectionForm } from "@/hooks/forms/useConnexionForm";

export default function Page() {
  const { isAdminDisplay } = useAdmin();
  const { pageContext, update } = usePageState<ConnexionPageContent>(ConnexionPageContext);
  const { state } = pageContext;
  return (
    <ClassicPageLayout>
      <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center max-w-[40rem] w-full">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent: EditableTextContent) => update("title", newContent)}
          className="headline w-full text-center shrink-0"
        />
        <ConnexionForm />
      </section>
    </ClassicPageLayout>
  );
}

function ConnexionForm() {
  const { form, onSubmit } = useConnectionForm();
  return (
    <Form {...form}>
      <form
        id="connexionform"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-xl border p-5 justify-between w-full max-w-[30rem]"
      >
        {/* Nom d'utilisateur */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="subtitle">Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="user"
                  type="text"
                  autoComplete="username"
                  className="italic paragraph"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mot de passe */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="subtitle">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="italic paragraph"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Se souvenir de moi */}
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  defaultChecked={field.value}
                  onCheckedChange={(c) =>
                    form.setValue("remember", typeof c === "boolean" ? c : false)
                  }
                  id="memory"
                  className="mt-1"
                />
              </FormControl>
              <FormLabel htmlFor="memory" className="text-muted-foreground text-sm paragraph">
                Se souvenir de moi
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bouton Envoyer */}
        <div className="flex justify-end">
          <Button type="submit" form="connexionform">
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  );
}
