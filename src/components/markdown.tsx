import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import dart from "highlight.js/lib/languages/dart";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import kotlin from "highlight.js/lib/languages/kotlin";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cmake from "highlight.js/lib/languages/cmake";
import gradle from "highlight.js/lib/languages/gradle";
import docker from "highlight.js/lib/languages/dockerfile";
import md from "highlight.js/lib/languages/markdown";
import "highlight.js/styles/github.css";
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("kt", kotlin);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("java", java);
hljs.registerLanguage("c", c);
hljs.registerLanguage("c++", c);
hljs.registerLanguage("cpp", c);
hljs.registerLanguage("cmake", cmake);
hljs.registerLanguage("gradle", gradle);
hljs.registerLanguage("Dockerfile", docker);
hljs.registerLanguage("md", md);
const mdParser = new MarkdownIt({
  highlight: (str, lang) => {
    let code: any = mdParser.utils.escapeHtml(str);
    if (lang && hljs.getLanguage(lang)) {
      code = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      }).value;
    }
    return `<pre>${code}</pre>`;
  },
  html: true,
});
const MarkdownComponent: React.FC<{ text: string,isShadow?: boolean }> = ({ text,isShadow = true }) => {
  return (
    <article
      className={
        `prose prose-pre:bg-base-200 prose-pre:text-base-content max-w-none p-5 ${isShadow ? 'shadow-2xl' : ''} rounded-lg border-t-2`
      }
      dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
    ></article>
  );
};

export default MarkdownComponent;
