"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface CodeBlockProps {
  examples: CodeExample[];
  title?: string;
}

const highlightCode = (code: string, language: string): string => {
  // Simple syntax highlighting using regex replacements
  let highlighted = code
    .replace(/[&]/g, "&amp;")
    .replace(/[<]/g, "&lt;")
    .replace(/[>]/g, "&gt;");

  if (language === "javascript" || language === "typescript") {
    // Keywords
    highlighted = highlighted.replace(
      /\b(const|let|var|function|return|async|await|import|from|export|default|class|interface|type|if|else|for|while|try|catch|new|this)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    // Strings
    highlighted = highlighted.replace(
      /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span class="code-string">$1$2$3</span>'
    );
    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*$)/gm,
      '<span class="code-comment">$1</span>'
    );
    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      '<span class="code-function">$1</span>'
    );
  } else if (language === "python") {
    highlighted = highlighted.replace(
      /\b(import|from|def|class|return|if|else|elif|for|while|try|except|with|as|None|True|False)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    highlighted = highlighted.replace(
      /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span class="code-string">$1$2$3</span>'
    );
    highlighted = highlighted.replace(
      /(#.*$)/gm,
      '<span class="code-comment">$1</span>'
    );
  } else if (language === "bash" || language === "curl") {
    highlighted = highlighted.replace(
      /\b(curl|GET|POST|PUT|DELETE|PATCH|Authorization|Bearer|Content-Type)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    highlighted = highlighted.replace(
      /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span class="code-string">$1$2$3</span>'
    );
    highlighted = highlighted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<span class="code-function">$1</span>'
    );
  } else if (language === "csharp") {
    highlighted = highlighted.replace(
      /\b(using|namespace|class|public|private|static|async|await|var|return|if|else|for|foreach|in|new|try|catch)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    highlighted = highlighted.replace(
      /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span class="code-string">$1$2$3</span>'
    );
    highlighted = highlighted.replace(
      /(\/\/.*$)/gm,
      '<span class="code-comment">$1</span>'
    );
  }

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+)\b/g,
    '<span class="code-number">$1</span>'
  );

  return highlighted;
};

export function CodeBlock({ examples, title }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(examples[0]?.language || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b bg-muted/30 px-2">
          <TabsList className="bg-transparent">
            {examples.map((example) => (
              <TabsTrigger
                key={example.language}
                value={example.language}
                className="text-xs data-[state=active]:bg-background"
              >
                {example.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const activeExample = examples.find((e) => e.language === activeTab);
              if (activeExample) handleCopy(activeExample.code);
            }}
            className="h-8 gap-1.5 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>

        {examples.map((example) => (
          <TabsContent key={example.language} value={example.language} className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(example.code, example.language),
                  }}
                />
              </pre>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
