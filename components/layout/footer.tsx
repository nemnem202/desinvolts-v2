import SocialLinksGroup from "../ui/socialLinksGroup";

export default function Footer() {
  return (
    <footer className="flex flex-col w-[99%] mx-auto items-center gap-3 py-3 relative  border-border border-t">
      <SocialLinksGroup />
      {/* <nav className="flex gap-3 w-fit">
        <a className="decoration-solid paragraph text-center">mentions légales</a>
        <a className="decoration-solid paragraph text-center">politique de confidentialité</a>
      </nav> */}
    </footer>
  );
}
