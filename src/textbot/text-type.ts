import React from "react";

export type TextType = string | string[] | JSX.Element;

export function convertToText(text: TextType): string {
  if (typeof text === "string") {
    return text;
  }
  if (Array.isArray(text)) {
    return text.join("\n");
  } else {
    const chunks: string[] = [];
    for (const child of React.Children.toArray(text.props.children)) {
      if (typeof child === "string") {
        chunks.push(child);
      } else if (typeof child === "object" && "key" in child) {
        if (child.type === "br") {
          chunks.push("\n");
        } else {
          console.log(`Not sure how to render <${child.type.toString()}>.`);
        }
      } else {
        console.log(`Not sure how to render "${child.toString()}".`);
      }
    }
    return chunks.join("");
  }
}
