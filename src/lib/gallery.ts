/**
 * Travel gallery — swap `src` to files under `public/gallery/` (e.g. `/gallery/tokyo.jpg`)
 * when you add your own photos. Alt text should describe each place for accessibility.
 */
export type GalleryPhoto = {
  key: string;
  /** Full URL or path under public */
  src: string;
  alt: string;
  /** Tailwind grid placement — keep `grid-flow-dense` on the wrapper for IG-style packing */
  layout: string;
};

export const galleryPhotos: readonly GalleryPhoto[] = [
  {
    key: "coast",
    src: "https://picsum.photos/id/1060/1200/1200",
    alt: "Coastal cliffs and sea — travel moment",
    layout: "col-span-2 row-span-2",
  },
  {
    key: "road",
    src: "https://picsum.photos/id/1071/800/600",
    alt: "Open road through hills",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "mist",
    src: "https://picsum.photos/id/1022/800/1000",
    alt: "Misty mountain ridge",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "lake",
    src: "https://picsum.photos/id/1015/800/1200",
    alt: "Calm lake and forest shoreline",
    layout: "col-span-1 row-span-2",
  },
  {
    key: "city",
    src: "https://picsum.photos/id/1073/1000/700",
    alt: "City skyline at dusk",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "dunes",
    src: "https://picsum.photos/id/1043/1200/700",
    alt: "Sand dunes in warm light",
    layout: "col-span-2 row-span-1",
  },
  {
    key: "forest",
    src: "https://picsum.photos/id/1025/800/800",
    alt: "Dense green forest path",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "snow",
    src: "https://picsum.photos/id/1036/800/1000",
    alt: "Snow-covered peaks",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "harbor",
    src: "https://picsum.photos/id/1050/900/700",
    alt: "Harbor boats and waterfront",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "valley",
    src: "https://picsum.photos/id/1038/800/1100",
    alt: "Wide valley from above",
    layout: "col-span-1 row-span-2",
  },
  {
    key: "field",
    src: "https://picsum.photos/id/1039/1100/700",
    alt: "Golden field at sunset",
    layout: "col-span-2 row-span-1",
  },
  {
    key: "island",
    src: "https://picsum.photos/id/1040/900/900",
    alt: "Small island and turquoise water",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "trail",
    src: "https://picsum.photos/id/1041/800/800",
    alt: "Rocky trail along a ridge",
    layout: "col-span-1 row-span-1",
  },
  {
    key: "aurora",
    src: "https://picsum.photos/id/1029/1000/800",
    alt: "Night sky over dark landscape",
    layout: "col-span-2 row-span-1",
  },
  {
    key: "canyon",
    src: "https://picsum.photos/id/1044/800/1000",
    alt: "Layered canyon walls",
    layout: "col-span-1 row-span-1",
  },
] as const;
