import Footer from "@/components/layout/footer";
import ButtonMinus from "@/components/ui/buttonMinus";
import ButtonPlus from "@/components/ui/buttonPlus";
import EditableText from "@/components/common/editableText";
import EditableTextarea from "@/components/common/editableTextarea";
import Image from "@/components/common/image";
import SocialLinksGroup from "@/components/ui/socialLinksGroup";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import useBannerScroll from "@/hooks/useBannerScroll";
import { EditableTextContent } from "@/types/db";
import Caroussel from "@/components/ui/caroussel";
import { HomePageContext } from "@/types/contexts";
import PostsSection from "@/components/features/posts/post-section";

export default function Page() {
  return <PageContent />;
}

function PageContent() {
  return (
    <div className="flex flex-1 align-center text-center flex-col">
      <section className="h-screen snap-start snap-normal flex items-center w-full">
        <FirstSection />
      </section>
      <section className="background-noise h-screen w-screen left-0 z-[0] snap-start overflow-hidden pt-[4rem] px-3">
        <SecondSection />
      </section>
    </div>
  );
}

function FirstSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const { state } = pageContext;
  const { bannerTextRef, bannerImageRef } = useBannerScroll();
  const { isAdmin } = useAdmin();
  return (
    <>
      <div
        className={`fixed inset-0 z-0 ${isAdmin ? "pointer-events-auto" : "pointer-events-none"}`}
        ref={bannerImageRef}
      >
        <Image
          imageProps={state.banner}
          onChange={(newImage) => update("banner", newImage)}
          changeButtonSideY="bottom"
        />
      </div>
      <div
        ref={bannerTextRef}
        className="flex flex-col items-center justify-center w-full relative z-10"
      >
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent: EditableTextContent) => update("title", newContent)}
          className="desktop-logo text-5xl/[-10]! sm:text-7xl/[-10]! md:text-9xl/[-10]!"
        />
        <EditableText
          as={"p"}
          content={state.subtitle}
          setContent={(newContent: EditableTextContent) => update("subtitle", newContent)}
          className="subtitle-xl"
        />
        <SocialLinksGroup />
      </div>
    </>
  );
}

function SecondSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const { state } = pageContext;
  const { isAdmin } = useAdmin();

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative flex-col flex w-full min-h-full container mx-auto z-[10] max-w-[56rem] gap-15 mb-16 pt-8">
        <EditableTextarea
          as={"p"}
          content={state.presentationParagraph}
          setContent={(newContent) => update("presentationParagraph", newContent)}
          className="paragraph-lg italic opacity-90"
        />
        <div className="w-full aspect-video rounded-md overflow-hidden">
          <Image
            imageProps={state.presentationImage}
            onChange={(newImage) => update("presentationImage", newImage)}
          />
        </div>

        {state.config.showActualityPanel ? (
          <div className="relative">
            {isAdmin && (
              <div className="absolute left-[-2rem]">
                <ButtonMinus
                  onClick={() => update("config", { ...state.config, showActualityPanel: false })}
                />
              </div>
            )}
            <EditableText
              as={"h2"}
              content={state.actualityTitle}
              setContent={(newContent: EditableTextContent) => update("actualityTitle", newContent)}
              className="headline"
            />
            <PostsSection />
          </div>
        ) : (
          isAdmin && (
            <div className="flex mx-auto w-min">
              <ButtonPlus
                onClick={() => update("config", { ...state.config, showActualityPanel: true })}
              />
            </div>
          )
        )}
        <Caroussel
          content={state.carousel}
          onChange={(newComponents) => update("carousel", newComponents)}
        />
      </div>

      <Footer />
    </div>
  );
}
