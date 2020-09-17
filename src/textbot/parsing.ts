/** Return `true` if the given string represents a "yes" answer. */
export function isYes(text: string): boolean {
  return text.toLowerCase().startsWith("y");
}

/** Return `true` if the given string represents a "no" answer. */
export function isNo(text: string): boolean {
  return text.toLowerCase().startsWith("n");
}

/**
 * Return `true` if the given string represents a "yes" answer,
 * `false` if it represents a "no", and `undefined` if it doesn't
 * represent either.
 */
export function parseYesOrNo(text: string): boolean | undefined {
  if (isYes(text)) return true;
  if (isNo(text)) return false;
  return undefined;
}
