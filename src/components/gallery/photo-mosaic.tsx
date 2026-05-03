import Image from "next/image";

import { galleryPhotos } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/** Tight gaps + varied spans + dense packing ≈ Instagram explore grid */
export function PhotoMosaic() {
  return (
    <div
      className={cn(
        "grid w-full grid-flow-dense grid-cols-3 gap-1.5",
        "auto-rows-[minmax(92px,26vw)] sm:auto-rows-[minmax(104px,20vw)]",
        "md:grid-cols-4 md:gap-2 md:auto-rows-[minmax(112px,14vw)]",
        "lg:auto-rows-[minmax(120px,11vw)] lg:max-w-5xl lg:mx-auto",
      )}
    >
      {galleryPhotos.map((photo) => (
        <figure
          key={photo.key}
          className={cn(
            "group relative min-h-0 min-w-0 overflow-hidden rounded-md bg-muted shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
            photo.layout,
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 34vw, (max-width: 1024px) 26vw, 320px"
            className="object-cover transition-[transform,filter] duration-500 ease-out motion-safe:group-hover:scale-[1.045] motion-safe:group-hover:brightness-[1.03] dark:motion-safe:group-hover:brightness-[1.06]"
          />
        </figure>
      ))}
    </div>
  );
}
