import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";

let highlighter: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

export const useSyntaxHighlight = () => {
  const initHighlighter = async () => {
    if (highlighter) {
      return highlighter;
    }

    if (initPromise) {
      return initPromise;
    }

    initPromise = createHighlighter({
      themes: ["github-light", "github-dark", "vitesse-dark", "vitesse-light"],
      langs: [
        "vue",
        "typescript",
        "javascript",
        "html",
        "css",
        "bash",
        "json",
        "markdown",
        "yaml",
        "shell",
      ],
    }).then((hl) => {
      highlighter = hl;
      return hl;
    });

    return initPromise;
  };

  const highlightCode = async (
    code: string,
    language: BundledLanguage = "typescript",
    theme: BundledTheme = "github-light"
  ): Promise<string> => {
    try {
      const hl = await initHighlighter();

      return hl.codeToHtml(code, {
        lang: language,
        theme: theme,
        transformers: [
          {
            pre(node) {
              // Remove default styles that conflict with our custom styles
              node.properties.style = "";
              // Remove any default classes that might interfere
              node.properties.class = "shiki";
            },
            code(node) {
              // Ensure code element has proper classes
              node.properties.class = `language-${language}`;
            },
            line(node) {
              // Remove line numbers from HTML - we'll handle with CSS
              delete node.properties.style;
              node.properties.class = "line";
            },
          },
        ],
      });
    } catch (error) {
      console.warn(
        `Failed to highlight code with language "${language}":`,
        error
      );
      // Fallback to plain text wrapped in proper HTML structure
      return `<pre class="shiki"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
    }
  };

  const highlightCodeSync = (
    code: string,
    language: BundledLanguage = "typescript"
  ): string => {
    // Immediate fallback for SSR or when highlighter isn't ready
    return `<pre class="shiki"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
  };

  const escapeHtml = (text: string): string => {
    if (process.server) {
      // Server-side HTML escaping
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  return {
    highlightCode,
    highlightCodeSync,
    initHighlighter,
  };
};
