import { useAdmin } from "@/providers/adminProvider";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import ButtonPlus from "../ui/buttonPlus";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { NavLink as NavlinkDb } from "@/prisma/generated/prisma/browser";
import useReorderLink from "@/hooks/useReorderLink";
import getRandomId from "@giapspzoo/get-random-id";

export default function Navbar({
  links,
  setLinks,
}: {
  links: NavlinkDb[];
  setLinks: (newLinks: NavlinkDb[]) => void;
}) {
  const { isAdmin } = useAdmin();
  const [anotherLinkIsHover, setAnotherLinkIsHover] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const path = String(formData.get("link"));
    setLinks([
      ...links,
      {
        text: name,
        position: links.length,
        link: path,
        id: getRandomId(),
      },
    ]);
    e.currentTarget.reset();
  };
  return (
    <nav className="flex items-center">
      {isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <ButtonPlus onClick={() => {}} size="1rem" />
          </DialogTrigger>
          <DialogContent>
            <DialogDescription className="hidden">
              Un dialogue pour ajouter un lien
            </DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <Label className="subtitle" htmlFor="name">
                  Nom du lien
                </Label>
                <Input
                  className="subtitle"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="accueil"
                ></Input>
              </div>
              <div>
                <Label className="subtitle" htmlFor="link">
                  Url du lien
                </Label>
                <Input
                  className="subtitle"
                  type="text"
                  id="link"
                  name="link"
                  placeholder="/accueil"
                ></Input>
              </div>
              <div className="w-full flex justify-end">
                <Button type="submit">Ajouter</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {links
        .sort((a, b) => a.position - b.position)
        .map((link) => (
          <NavLink
            key={link.id}
            link={link}
            links={links}
            setLinks={setLinks}
            anotherLinkIsHover={anotherLinkIsHover}
            setHover={setAnotherLinkIsHover}
            className="subtitle text-xl!"
          />
        ))}
    </nav>
  );
}

export interface NavlinkProps {
  link: NavlinkDb;
  links: NavlinkDb[];
  setLinks: (newLinks: NavlinkDb[]) => void;
  anotherLinkIsHover: boolean;
  setHover: (value: boolean) => void;
  className?: string;
  onClick?: () => void;
}

function NavLink(props: NavlinkProps) {
  const { link, anotherLinkIsHover, setHover, className = "", onClick = () => {} } = props;
  const { isAdmin } = useAdmin();
  const pageContext = usePageContext();
  const isSelected = pageContext.urlPathname === "/" + link.link;
  const { reorderItem, removeItem } = useReorderLink(props);

  return (
    <div
      className="px-2 relative w-fit flex justify-center items-center gap-1"
      onMouseEnter={() => setHover(!isSelected)}
      onMouseLeave={() => setHover(false)}
    >
      {isAdmin && (
        <button
          type="button"
          className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
          onClick={() => reorderItem(-1)}
        >
          <ChevronLeft />
        </button>
      )}
      <a
        href={"/" + link.link}
        className={`${className} ${isSelected && !anotherLinkIsHover ? "selected" : ""} `}
        onClick={onClick}
      >
        {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
      </a>
      {isAdmin && (
        <button
          type="button"
          className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
          onClick={() => reorderItem(1)}
        >
          <ChevronRight />
        </button>
      )}
      {isAdmin && (
        <div className="absolute w-full bottom-[-2rem] h-[2rem] flex justify-center px-1">
          <button
            type="button"
            className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
            onClick={removeItem}
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}

export function MobileNavbar({ links }: { links: NavlinkDb[] }) {
  const [anotherLinkIsHover, setAnotherLinkIsHover] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className="cursor-pointer z-[12] relative h-6 w-6"
      >
        <div
          className={`relative
          flex items-center
          w-full 
          h-full
          transition-all! duration-300!
          before:content-[''] before:absolute
          before:left-0 before:top-0
          before:w-full before:h-[2px]
          before:transition-all! before:duration-300!
          before:bg-foreground
          before:rounded-full
          after:content-[''] after:absolute
          after:left-0 after:bottom-0
          after:w-full after:h-[2px]
          after:transition-all! after:duration-300!
          after:bg-foreground
          after:rounded-full
      ${showMenu && "before:top-1/2 before:-translate-y-1/2 before:rotate-45 after:bottom-1/2 after:translate-y-1/2 after:-rotate-45"}
    `}
        >
          <div
            className={`w-full bg-foreground h-[2px] transition-all! duration-300! ${showMenu && "translate-x-full opacity-0"}`}
          ></div>
        </div>
      </button>
      <div
        className={`fixed w-full top-0 left-0
        transition-[height]! duration-300! ease-in-out! overflow-hidden bg-black/90 ${showMenu ? "h-[100vh]" : "h-0"}`}
      >
        <div className="w-full h-screen flex items-center justify-center relative">
          <nav className="flex flex-col items-center justify-center gap-1">
            {links.map((link) => (
              <MobileNavLink
                link={link}
                key={link.text}
                anotherLinkIsHover={anotherLinkIsHover}
                setHover={setAnotherLinkIsHover}
                className="subtitle text-2xl!"
                onClick={() => setShowMenu(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

interface MobileNavlinkProps {
  link: NavlinkDb;
  anotherLinkIsHover: boolean;
  setHover: (value: boolean) => void;
  className?: string;
  onClick?: () => void;
}

function MobileNavLink(props: MobileNavlinkProps) {
  const { link, anotherLinkIsHover, setHover, className = "", onClick = () => {} } = props;
  const pageContext = usePageContext();
  const isSelected = pageContext.urlPathname === "/" + link.link;

  return (
    <div
      className="px-1"
      onMouseEnter={() => setHover(!isSelected)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={"/" + link.link}
        className={`${className} ${isSelected && !anotherLinkIsHover ? "selected" : ""} `}
        onClick={onClick}
      >
        {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
      </a>
    </div>
  );
}
