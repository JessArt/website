import createPaginablePage from "../createPaginablePage/createPaginablePage";

export default createPaginablePage({
  type: "photo",
  createMeta: () => {
    const title = "Jess' Photos";
    const description =
      "Photos taken during my various travels around the world (Czech Republic, USA, Russia, Serbia)";
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords:
            "jess zaikova, photos, travel, prague, usa, russia, czech republic, serbia, europe"
        },
        itemProp: {
          name: title,
          description,
          image: "https://static.jess.gallery/photo_og.jpg"
        },
        property: {
          "og:title": title,
          "og:url": "https://jess.gallery/photo",
          "og:image": "https://static.jess.gallery/photo_og.jpg",
          "og:image:type": "image/jpeg",
          "og:description": description,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery/photo",
          "twitter:title": title,
          "twitter:description": description,
          "twitter:image": "https://static.jess.gallery/photo_og.jpg"
        }
      },
      auto: {
        ograph: true
      }
    };

    return meta;
  }
});
