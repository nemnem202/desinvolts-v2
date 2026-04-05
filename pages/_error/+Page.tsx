import { usePageContext } from "vike-react/usePageContext";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import ClassicPageLayout from "@/components/layout/classicPageLayout";

export default function Page() {
  const { is404 } = usePageContext();
  if (is404) {
    return (
      <ClassicPageLayout>
        <section className="md:py-[2.5rem] flex flex-col gap-[3rem] items-center min-h-screen">
          <EditableText
            as={"h1"}
            className="headline text-center"
            content={{ content: "...Oups", hyperlinks: [], id: 1 }}
            setContent={() => {}}
          />
          <EditableTextarea
            as={"p"}
            className="paragraph"
            content={{
              content: "La page que vous recherchez n'existe pas. Retour à la page d'accueil ?",
              hyperlinks: [
                {
                  text: "Retour à la page d'accueil",
                  link: "/",
                  id: 1,
                  paragraphId: 2,
                  textLineId: 3,
                },
              ],
              id: 2,
            }}
            setContent={() => {}}
          />
        </section>
      </ClassicPageLayout>
    );
  }
  return (
    <>
      <h1>Internal Error</h1>
      <p>Something went wrong.</p>
    </>
  );
}
