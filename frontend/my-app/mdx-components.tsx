import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default components
    pre: ({ children }) => <>{children}</>,
    code: ({ children, className }) => {
      const language = className?.replace("language-", "") || "text";
      return (
        <CodeBlock
          examples={[
            {
              language,
              label: language.toUpperCase(),
              code: String(children).trim(),
            },
          ]}
        />
      );
    },
    // Spread custom components
    ...components,
  };
}
