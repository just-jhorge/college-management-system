import slugify from "slugify";
import { randomInt } from "node:crypto";
import { customAlphabet } from "nanoid";

const customId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6);
const UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWERCASE = "abcdefghjklmnpqrstuvwxyz";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%^&*";

const ALL_CHARS = UPPERCASE + LOWERCASE + DIGITS + SYMBOLS;

export function generateSlug(title: string) {
  const base = slugify(title, { trim: true, lower: true });
  return `${base}_${customId()}`;
}

export function generateTempPassword(length = 12): string {
  if (length < 8) {
    throw new Error("Temp password length must be at least 8 characters");
  }

  const required = [
    pickRandom(UPPERCASE),
    pickRandom(LOWERCASE),
    pickRandom(DIGITS),
    pickRandom(SYMBOLS),
  ];

  const remainingLength = length - required.length;
  const rest = Array.from({ length: remainingLength }, () =>
    pickRandom(ALL_CHARS),
  );

  return shuffle([...required, ...rest]).join("");
}

function pickRandom(chars: string): string {
  return chars[randomInt(0, chars.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
