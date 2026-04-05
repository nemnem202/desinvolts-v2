import { useMemo } from "react";
import type { NavLink } from "@/prisma/generated/prisma/browser";
import { useSize } from "@/providers/screenSizeProvider";
import { usePageState } from "@/providers/stateProvider";
import { contexts, type PageKey } from "@/types/contexts";
import Logo from "../ui/logo";
import Navbar, { MobileNavbar } from "./navbar";

export default function Header<K extends PageKey>({ pageKey }: { pageKey: K }) {
  const { pageContext, update } = usePageState<K>(contexts[pageKey]);
  const { state } = useMemo(() => pageContext, [pageContext]);
  const size = useSize();
  return (
    <header
      className="flex w-full px-[2rem] h-[4rem] items-center justify-between fixed z-11"
      id="header"
    >
      <Logo />
      {size === "sm" ? (
        <MobileNavbar links={state.navlinks} />
      ) : (
        <Navbar
          links={state.navlinks}
          setLinks={(newLinks: NavLink[]) => {
            update("navlinks", newLinks);
          }}
        />
      )}
    </header>
  );
}
