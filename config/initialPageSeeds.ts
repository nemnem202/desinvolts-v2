import type { Configuration, NavLink } from "@/prisma/generated/prisma/client";
import type {
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "@/types/page-contents";

export const INIT_NAVLINKS_STATE: NavLink[] = [
  { id: 182, text: "accueil", link: "", position: 1 },
  { id: 183, text: "contact", link: "contact", position: 3 },
  { id: 184, text: "dates", link: "dates", position: 4 },
  { id: 185, text: "groupe", link: "groupe", position: 5 },
  { id: 186, text: "médias", link: "médias", position: 6 },
  { id: 187, text: "nous-écouter", link: "nous-écouter", position: 7 },
];

export const INIT_CONFIG_STATE: Configuration = {
  id: 1,
  showActualityPanel: true,
  mediaImagesContainerHeight: 50,
};

export const INIT_HOMEPAGE_STATE: HomePageContent = {
  banner: {
    id: 26,
    source: "fIPeJqyKkwXUwLoxnz9B.webp",
    alt: "La photo du groupe Désinvolts",
  },
  posts: [
    {
      id: 34,
      date: new Date("2026-03-24T14:06:13.671Z"),
      title: { id: 158, content: "Sortie de l'album Volt Face" },
      images: [
        {
          position: 0,
          image: {
            id: 32,
            source: "Rq7YAULWJoSqiO1DXE00.webp",
            alt: "La photo du groupe Désinvolts",
          },
        },
      ],
      videos: [],
      paragraphs: [
        {
          position: 0,
          paragraph: { id: 123, content: "Yo ! ", hyperlinks: [] },
        },
        {
          position: 1,
          paragraph: {
            id: 122,
            content:
              "Avec l'équipe, on est super heureux de vous annoncer la sortie de notre nouvel album Volt Face, disponible sur toutes les plateformes. ",
            hyperlinks: [],
          },
        },
        {
          position: 2,
          paragraph: { id: 121, content: "", hyperlinks: [] },
        },
        {
          position: 3,
          paragraph: {
            id: 120,
            content: "On organise une release party samedi à 20h à l'Ampérage. ",
            hyperlinks: [],
          },
        },
        {
          position: 4,
          paragraph: { id: 119, content: "", hyperlinks: [] },
        },
        {
          position: 5,
          paragraph: {
            id: 118,
            content: "Soyez nombreux, chousssss !",
            hyperlinks: [],
          },
        },
      ],
    },
  ],
  title: { id: 157, content: "Desinvolts", hyperlinks: [] },
  subtitle: { id: 156, content: "Groupe de rock français", hyperlinks: [] },
  presentationParagraph: {
    id: 117,
    content:
      "Desinvolts est un cocktail de rock, de dynamisme et de joie. Plus qu'un groupe, c'est une bande d'amis qui se donnent sur scène et qui impliquent le public.",
    hyperlinks: [],
  },
  presentationImage: {
    id: 25,
    source: "XdIUwXDXugZWUvGHIFjd.webp",
    alt: "La photo du groupe Désinvolts",
  },
  carousel: {
    images: [
      {
        position: 0,
        image: {
          id: 31,
          source: "rJzHycHM9iuuPcjjdfEK.webp",
          alt: "La photo du groupe Désinvolts",
        },
      },
      {
        position: 1,
        image: {
          id: 30,
          source: "gJmHfXmJwTpi8UpDhCSy.webp",
          alt: "La photo du groupe Désinvolts",
        },
      },
      {
        position: 2,
        image: {
          id: 29,
          source: "1P7ibuRtTLasyFQf7e1Y.webp",
          alt: "La photo du groupe Désinvolts",
        },
      },
      {
        position: 3,
        image: {
          id: 28,
          source: "KcFpvVYfLoWtpvhSj9Tr.webp",
          alt: "La photo du groupe Désinvolts",
        },
      },
      {
        position: 4,
        image: {
          id: 27,
          source: "FRTsKANDRT99ysmwFxBV.webp",
          alt: "La photo du groupe Désinvolts",
        },
      },
    ],
    videos: [],
  },
  actualityTitle: { id: 155, content: "Actualité", hyperlinks: [] },
  navlinks: INIT_NAVLINKS_STATE,
  config: INIT_CONFIG_STATE,
};

export const INIT_CONNEXION_STATE: ConnexionPageContent = {
  title: { id: 111, content: "Connexion", hyperlinks: [] },
  navlinks: INIT_NAVLINKS_STATE,
  config: INIT_CONFIG_STATE,
};

export const INIT_CONTACT_STATE: ContactPageContent = {
  title: { id: 113, content: "Des questions ?", hyperlinks: [] },
  paragraph: {
    id: 76,
    content:
      "Vous pouvez directement nous joindre par mail à groupe.desinvolts@gmail.com ou alors remplir ce formulaire qui nous sera directement adressé.",
    hyperlinks: [
      {
        id: 2,
        link: "mailto:groupe.desinvolts@gmail.com",
        text: "groupe.desinvolts@gmail.com",
        paragraphId: 76,
        textLineId: null,
      },
    ],
  },
  subtitle: {
    id: 112,
    content: "Informations complémentaires",
    hyperlinks: [],
  },
  files: [
    {
      id: 3,
      filename: "convention-chart.pdf",
      downloadUrl: "/home",
      date: new Date("2024-01-02T00:00:00.000Z"),
    },
    {
      id: 4,
      filename: "convention-chart-2.pdf",
      downloadUrl: "/home",
      date: new Date("2024-01-03T00:00:00.000Z"),
    },
  ],
  config: INIT_CONFIG_STATE,
  navlinks: INIT_NAVLINKS_STATE,
};

export const INIT_DATES_STATE: DatesPageContent = {
  config: INIT_CONFIG_STATE,
  navlinks: INIT_NAVLINKS_STATE,
  title: { id: 173, content: "C'est quand déja ?", hyperlinks: [] },
  prevTitle: { id: 172, content: "Dates passées", hyperlinks: [] },
  nextTitle: { id: 171, content: "Prochaines dates", hyperlinks: [] },
  dates: [
    {
      id: 14,
      date: new Date("2026-03-28T19:00:00.000Z"),
      city: { id: 175, content: "Grenoble", hyperlinks: [] },
      adress: { id: 176, content: "153 cours berriat", hyperlinks: [] },
      image: {
        id: 33,
        alt: "La photo du groupe Désinvolts",
        source: "xHm4W1WpE5mNup1O8NdT.webp",
      },
      title: { id: 174, content: "Release party", hyperlinks: [] },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 127,
            content:
              "On organise la release party de note album Volte face samedi à 20h, on éspère que ça vous plaira. ",
            hyperlinks: [],
          },
        },
      ],
    },
  ],
};

export const INIT_GROUPE_STATE: GroupePageContent = {
  config: INIT_CONFIG_STATE,
  navlinks: INIT_NAVLINKS_STATE,
  title: { id: 177, content: "Il était une fois...", hyperlinks: [] },
  presentation_image: {
    id: 34,
    source: "bIcOcEh7TClS5cB4k5vj.webp",
    alt: "La photo du groupe Désinvolts",
  },
  first_section_paragraphs: [
    {
      position: 0,
      paragraph: {
        id: 149,
        content:
          "Desinvolts est un groupe de rock dynamique, d'origine tourangelle, ayant vu le jour en 2020.",
        hyperlinks: [],
      },
    },
    {
      position: 1,
      paragraph: { id: 148, content: "Enfin... Presque...", hyperlinks: [] },
    },
  ],
  second_section_paragraphs: [
    {
      position: 0,
      paragraph: {
        id: 147,
        content:
          "L’histoire se passe à Tours (37). Le groupe se forme en février 2012 sous l’impulsion de Franck, batteur. Eric à la basse, Laurent et Rui aux guitares répondent à l’appel.",
        hyperlinks: [],
      },
    },
    {
      position: 1,
      paragraph: {
        id: 146,
        content:
          "En avril 2014, Brice rejoint le groupe au chant. Les 5 membres sillonnent la région tourangelle pour mettre l’ambiance dans les bars et sur les scènes de villages.",
        hyperlinks: [],
      },
    },
    {
      position: 2,
      paragraph: {
        id: 145,
        content: "En 2015, un EP de 5 titres, “Switch on” sert à la promotion du groupe.",
        hyperlinks: [],
      },
    },
    {
      position: 3,
      paragraph: {
        id: 144,
        content:
          "Brice et Franck veulent écrire exclusivement des textes en français. Au fil des années, le groupe étoffe son repertoire dans un style rock dynamique.",
        hyperlinks: [],
      },
    },
    {
      position: 4,
      paragraph: {
        id: 143,
        content:
          "En 2019, le groupe décide de faire un album de leurs compositions en français. L’enregistrement met plus de temps que prévu avec les événements de 2020.",
        hyperlinks: [],
      },
    },
    {
      position: 5,
      paragraph: {
        id: 142,
        content:
          "En 2020, les amis annoncent leur nouveau nom : Desinvolts. Ce nom reprend un code plus français, une attitude rock présente dans leurs chansons.",
        hyperlinks: [],
      },
    },
    {
      position: 6,
      paragraph: {
        id: 141,
        content:
          "En mars 2021, l’album “Volt-Face” sort sur toutes les plateformes musicales avec 11 de leurs titres originaux.",
        hyperlinks: [],
      },
    },
  ],
  trombinoscope: [
    {
      id: 15,
      position: 0,
      color: "#df6310",
      image: {
        id: 39,
        source: "8mGnlyEPgW8stC2WMjJ8.webp",
        alt: "La photo du groupe Désinvolts",
      },
      title: { id: 182, content: "Franck" },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 140,
            content: "Batteur / Compositeur / Auteur",
            hyperlinks: [],
          },
        },
        {
          position: 1,
          paragraph: {
            id: 139,
            content:
              "Franck est un passionné : jardinage, cuisine, sport, écriture... Il est joueur !",
            hyperlinks: [],
          },
        },
        {
          position: 2,
          paragraph: {
            id: 138,
            content: "Artistes préférés : Ankor, Calogero, Linkin Park, Noir désir, Iron Maiden",
            hyperlinks: [],
          },
        },
      ],
    },
    {
      id: 14,
      position: 1,
      color: "#057cc9",
      image: {
        id: 38,
        source: "HtU5hR8despK5HP2tXjp.webp",
        alt: "La photo du groupe Désinvolts",
      },
      title: { id: 181, content: "Eric" },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 137,
            content: "Bassiste / Compositeur",
            hyperlinks: [],
          },
        },
        {
          position: 1,
          paragraph: {
            id: 136,
            content:
              "Eric est le festivalier du groupe, il a assisté à pas moins de 12635 concerts !",
            hyperlinks: [],
          },
        },
        {
          position: 2,
          paragraph: {
            id: 135,
            content: "Artistes préférés : AC/DC, Téléphone, Rolling Stones",
            hyperlinks: [],
          },
        },
      ],
    },
    {
      id: 13,
      position: 2,
      color: "#cc31b0",
      image: {
        id: 37,
        source: "42qoHYcYdCRz4SGpgEXy.webp",
        alt: "La photo du groupe Désinvolts",
      },
      title: { id: 180, content: "Rui" },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 134,
            content: "Guitariste Soliste / Compositeur",
            hyperlinks: [],
          },
        },
        {
          position: 1,
          paragraph: {
            id: 133,
            content:
              "Son prénom se prononce 'Rouille'. Fan du FC Porto, il espère voir son équipe en finale.",
            hyperlinks: [],
          },
        },
        {
          position: 2,
          paragraph: {
            id: 132,
            content: "Artistes préférés : Slash, Guns N'Roses, Metallica, Nirvana",
            hyperlinks: [],
          },
        },
      ],
    },
    {
      id: 12,
      position: 3,
      color: "#d62f0d",
      image: {
        id: 36,
        source: "BdTGalOog38HRoPcgQWa.webp",
        alt: "La photo du groupe Désinvolts",
      },
      title: { id: 179, content: "Laurent" },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 131,
            content: "Guitariste Rythmique / Choriste",
            hyperlinks: [],
          },
        },
        {
          position: 1,
          paragraph: {
            id: 130,
            content: "Le couteau suisse du groupe. Fin technicien, il retape ses propres guitares.",
            hyperlinks: [],
          },
        },
      ],
    },
    {
      id: 11,
      position: 4,
      color: "#fdaf13",
      image: {
        id: 35,
        source: "DsHxfwOJoFwcepL7sd2u.webp",
        alt: "La photo du groupe Désinvolts",
      },
      title: { id: 178, content: "Brice" },
      paragraphs: [
        {
          position: 0,
          paragraph: { id: 129, content: "Chanteur / Auteur", hyperlinks: [] },
        },
        {
          position: 1,
          paragraph: {
            id: 128,
            content: "Brice est la pile électrique du groupe ! Homme kangourou monté sur ressort.",
            hyperlinks: [],
          },
        },
      ],
    },
  ],
};

export const INIT_MEDIA_STATE: MediasPageContent = {
  config: INIT_CONFIG_STATE,
  navlinks: INIT_NAVLINKS_STATE,
  title: { id: 194, content: "Ça tourne !", hyperlinks: [] },
  video_section_title: { id: 192, content: "Vidéos", hyperlinks: [] },
  pictures_section_title: { id: 193, content: "Photos", hyperlinks: [] },
  videos: [
    {
      id: 27,
      url: "https://www.youtube.com/watch?v=AUIYbPbNVcA",
      description: "Clip 1",
    },
    {
      id: 28,
      url: "https://www.youtube.com/watch?v=pbWrM1iblLI",
      description: "Clip 2",
    },
    {
      id: 29,
      url: "https://www.youtube.com/watch?v=wu4S5Mjpt-U",
      description: "a video of [object Object]",
    },
    {
      id: 30,
      url: "https://www.youtube.com/watch?v=EJR9bF-3MfY",
      description: "a video of [object Object]",
    },
    {
      id: 31,
      url: "https://www.youtube.com/watch?v=PWpOPXyrX5U",
      description: "a video of [object Object]",
    },
    {
      id: 32,
      url: "https://www.youtube.com/watch?v=a7lflJVdFI4",
      description: "a video of [object Object]",
    },
    {
      id: 33,
      url: "https://www.youtube.com/watch?v=fcIxDPNk5js",
      description: "a video of [object Object]",
    },
  ],
  windows: [
    {
      id: 45,
      x: 74,
      y: 22,
      width: 26,
      height: 16,
      zIndex: 15,
      zIndexPriorityFactor: 0,
      image: {
        id: 40,
        source: "j73349VhjJ919vzRkC87.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 40,
      videoId: null,
    },
    {
      id: 44,
      x: 77,
      y: 0,
      width: 18,
      height: 27,
      zIndex: 26,
      zIndexPriorityFactor: 0,
      image: {
        id: 48,
        source: "Bym4ksqusKz3KEdd03H4.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 48,
      videoId: null,
    },
    {
      id: 41,
      x: 66,
      y: 4,
      width: 14,
      height: 9,
      zIndex: 42,
      zIndexPriorityFactor: 0,
      image: {
        id: 45,
        source: "ov1GBAVIdKf8kl2tKCed.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 45,
      videoId: null,
    },
    {
      id: 38,
      x: 34,
      y: 0,
      width: 35,
      height: 15,
      zIndex: 47,
      zIndexPriorityFactor: 0,
      image: {
        id: 42,
        source: "mtgwmeNo79F6mE8pIRde.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 42,
      videoId: null,
    },
    {
      id: 39,
      x: 39,
      y: 8,
      width: 34,
      height: 19,
      zIndex: 48,
      zIndexPriorityFactor: 0,
      image: {
        id: 43,
        source: "qQLogBKA3pNfmzKemp1v.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 43,
      videoId: null,
    },
    {
      id: 46,
      x: 0,
      y: 16,
      width: 42,
      height: 22,
      zIndex: 49,
      zIndexPriorityFactor: 0,
      image: {
        id: 41,
        source: "rHDVBgdTJO4LcoW6rENp.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 41,
      videoId: null,
    },
    {
      id: 42,
      x: 36,
      y: 20,
      width: 32,
      height: 14,
      zIndex: 50,
      zIndexPriorityFactor: 0,
      image: {
        id: 46,
        source: "F465ZCZRIap7TYbDgcmw.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 46,
      videoId: null,
    },
    {
      id: 40,
      x: 2,
      y: 0,
      width: 15,
      height: 22,
      zIndex: 52,
      zIndexPriorityFactor: 0,
      image: {
        id: 44,
        source: "Lq8K0kKUT4wLCtJybPOZ.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 44,
      videoId: null,
    },
    {
      id: 43,
      x: 10,
      y: 3,
      width: 33,
      height: 12,
      zIndex: 53,
      zIndexPriorityFactor: 0,
      image: {
        id: 47,
        source: "hUxt70hDSahNf17LPvZr.webp",
        alt: "La photo du groupe Désinvolts",
      },
      video: null,
      imageId: 47,
      videoId: null,
    },
  ],
};

export const INIT_SON_STATE: NousEcouterPageContent = {
  config: INIT_CONFIG_STATE,
  navlinks: INIT_NAVLINKS_STATE,
  title: { id: 195, content: "Et ça donne quoi niveau son ?", hyperlinks: [] },
  albums: [
    {
      position: 0,
      id: 3,
      title: { id: 196, content: "Volt face", hyperlinks: [] },
      cover: {
        id: 49,
        source: "HEQOgf7kg6IWTLyymzYo.webp",
        alt: "La photo du groupe Désinvolts",
      },
      paragraphs: [
        {
          position: 0,
          paragraph: {
            id: 151,
            content:
              "L’album Volt-Face est disponible dès le 12 mars 2021 sur toutes les plateformes de téléchargement et de streaming.",
            hyperlinks: [],
          },
        },
        {
          position: 1,
          paragraph: {
            id: 150,
            content:
              "Ce 1er album est composé de 11 créations originales en français. De Avoir mal aux Vendeurs de rêves, l’album montre le dynamisme du groupe.",
            hyperlinks: [],
          },
        },
      ],
      appleMusicUrl: {
        id: 7,
        text: "applemusic",
        link: "https://embed.music.apple.com/fr/album/volt-face/1555591254",
        position: 0,
      },
      deezerUrl: {
        id: 8,
        text: "deezer",
        link: "https://widget.deezer.com/widget/auto/album/210456352",
        position: 1,
      },
      spotifyUrl: {
        id: 9,
        text: "spotify",
        link: "https://open.spotify.com/embed/album/77vvnt1Ocjndfs647cdJgT",
        position: 2,
      },
    },
  ],
};
