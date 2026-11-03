import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import {
  Callout,
  Checklist,
  DataTable,
  KeyTakeaways,
  Steps,
} from "@/components/content/blocks";
import { slugify } from "@/lib/slug";

// Plain text of a heading, so `## Was gilt ab 2027?` gets a stable id for the table of contents.
function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return textOf(child.props.children);
      return "";
    })
    .join("");
}

// Typography comes from the surrounding <Prose>; these are the editorial building blocks MDX may use.
const components: MDXComponents = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  Callout,
  Checklist,
  DataTable,
  KeyTakeaways,
  Steps,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
