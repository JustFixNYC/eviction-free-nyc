export function isYes(text: string): boolean {
  return text.toLowerCase().startsWith("y");
}

export function isNo(text: string): boolean {
  return text.toLowerCase().startsWith("n");
}

export function parseYesOrNo(text: string): boolean | undefined {
  if (isYes(text)) return true;
  if (isNo(text)) return false;
  return undefined;
}
