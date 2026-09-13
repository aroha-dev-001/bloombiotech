import Image from "next/image";

export function Photo({
  src,
  alt,
  caption,
  priority,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
  ratio = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={`photo-frame ${ratio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover photo-zoom"
      />
      {caption ? (
        <figcaption className="photo-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
