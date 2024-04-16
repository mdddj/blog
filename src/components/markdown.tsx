import React from "react";
import MarkdownIt from "markdown-it";
import "github-markdown-css/github-markdown-light.css";
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
const mdParser = new MarkdownIt({
  highlight: (str, lang) => {
    let code: any = mdParser.utils.escapeHtml(str);
    if (lang && hljs.getLanguage(lang)) {
      code = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      }).value;
    }
    return `<pre class="hljs font-bold"><code>${code}</code></pre>`;
  },
  html: true,
});
const MarkdownComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className={"markdown-body"}
      dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
    ></div>
  );
};

export default MarkdownComponent;
