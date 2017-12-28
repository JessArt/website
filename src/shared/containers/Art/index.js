import createPaginablePage from "../createPaginablePage/createPaginablePage";

export default createPaginablePage({
  type: "art",
  createMeta: () => {
    const title = "Jess' Artworks";
    const description = "Artwork in different styles. Write to order!";
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords:
            "jess zaikova, art, drawing, paint, graphite, charcoal, copic markers, prismacolor, derwent, order prints"
        },
        itemProp: {
          name: title,
          description,
          image: "https://static.jess.gallery/art_og.jpg"
        },
        property: {
          "og:title": title,
          "og:url": "https://jess.gallery/art",
          "og:image": "https://static.jess.gallery/art_og.jpg",
          "og:image:type": "image/jpeg",
          "og:description": description,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery/art",
          "twitter:title": title,
          "twitter:description": description,
          "twitter:image": "https://static.jess.gallery/art_og.jpg"
        }
      },
      auto: {
        ograph: true
      }
    };

    return meta;
  }
});
