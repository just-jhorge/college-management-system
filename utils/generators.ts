import slugify from "slugify";
import { customAlphabet } from "nanoid";

const customId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6);

export function generateSlug(title: string) {
  const base = slugify(title, { trim: true, lower: true });
  return `${base}_${customId()}`;
}
