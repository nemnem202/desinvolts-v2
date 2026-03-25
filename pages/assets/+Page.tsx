export default function Page() {
  return (
    <div>
      <h1>Assets</h1>
      <div className="p-8 space-y-4">
        <h1 className="mobile-logo">Mobile Logo - Road Rage 2.4rem</h1>
        <h1 className="desktop-logo">Desktop Logo - Road Rage 3.2rem</h1>
        <h2 className="headline">Headline - Zing Rust Demo 3.6rem</h2>
        <h3 className="title">Title - 2.4rem</h3>
        <h3 className="title-sm">Title Small - 1.6rem</h3>
        <h4 className="subtitle-xl">Subtitle XL - Contrail One 2.4rem</h4>
        <h4 className="subtitle">Subtitle - 1.6rem</h4>
        <h5 className="subtitle-sm">Subtitle Small - 1.2rem</h5>
        <p className="paragraph-xl">Paragraph XL - Overpass 2.4rem</p>
        <p className="paragraph-lg">Paragraph Large - 1.8rem</p>
        <p className="paragraph">Paragraph - 1.6rem</p>
        <p className="paragraph-sm">Paragraph Small - 1.2rem</p>
        <p className="paragraph-xs">Paragraph XS - 1rem</p>
        <button className="button" type="button">
          Button - 1.6rem
        </button>
      </div>
    </div>
  );
}
