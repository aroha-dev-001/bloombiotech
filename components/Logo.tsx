import Image from "next/image";

type Props = {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "full", className = "", priority }: Props) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/mark.png"
        alt="Bloom Biotech"
        width={286}
        height={356}
        className={`w-auto max-w-full object-contain object-left ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src="/brand/logo.png"
      alt="Bloom Biotech, green biotechnology"
      width={907}
      height={415}
      className={`w-auto max-w-full object-contain object-left ${className}`}
      priority={priority}
    />
  );
}
