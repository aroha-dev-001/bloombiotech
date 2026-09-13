export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://hgfqadfrkfkzqdmrohfh.supabase.co";

const heroObjectPath =
  process.env.NEXT_PUBLIC_HERO_VIDEO_PATH ?? "bloom-media/hero/amc-loop.mp4";

/** Public Storage URL. Falls back to the still hero if the object is missing. */
export const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
  `${supabaseUrl}/storage/v1/object/public/${heroObjectPath}`;
