import { Context, useMemo } from "react";
import Logo from "../ui/logo";
import Navbar, { MobileNavbar } from "./navbar";
import { useSize } from "@/providers/screenSizeProvider";
import { StateContent, usePageState } from "@/providers/stateProvider";
import { BasePageContent } from "@/types/page-contents";
import { NavLink } from "@/prisma/generated/prisma/browser";

export default function Header<S extends BasePageContent>({
  context,
}: {
  context: Context<StateContent<any> | null>;
}) {
  const { pageContext, update } = usePageState<S>(context);
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
