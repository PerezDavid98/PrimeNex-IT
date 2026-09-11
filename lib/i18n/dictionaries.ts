import en from "./en.json";
import es from "./es.json";
import de from "./de.json";
import fr from "./fr.json";
import pt from "./pt.json";
import zh from "./zh.json";
import type { Locale } from "./config";

/**
 * The English file is the schema. Typing every other locale as `Dictionary`
 * means a missing or renamed key is a compile error, not a blank space that
 * ships to production in a language nobody on the team reads.
 */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, es, de, fr, pt, zh };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
