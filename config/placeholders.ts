import ImageWindow from "@/components/windows/imageWindow";
import { WindowProps } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";

type Placeholders = {
  paragraph: string;
  defaultWindow: WindowProps;
};

const PLAHECOLDERS: Placeholders = {
  paragraph: "Voici le contenu par défaut du paragraphe.",
  defaultWindow: {
    id: 0,
    imageId: 0,
    videoId: 0,
    video: null,
    zIndex: 1,
    zIndexPriorityFactor: 0,
    height: 10,
    width: 10,
    x: 0,
    y: 0,
    image: {
      alt: "Une image du groupe Desinvolts",
      id: getRandomId(),
      source: "assets/img-placeholder.webp",
    },
  },
};
export default PLAHECOLDERS;
