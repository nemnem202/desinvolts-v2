import { ReactNode } from "react";
import Footer from "./footer";

export default function ClassicPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden background-noise relative px-3">
      <div className="absolute top-0 left-0 right-0 h-[4rem] z-10">
        <div className="h-full w-full background-noise"></div>
      </div>
      <div className="min-h-screen overflow-y-auto flex flex-col">
        <main className="flex-1 flex flex-col container max-w-[80rem] mx-auto items-center pb-16 gap-8 pt-[4rem] ">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
