import React, { useEffect } from "react";
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
import cpp from "highlight.js/lib/languages/cpp";
import cmake from "highlight.js/lib/languages/cmake";
import gradle from "highlight.js/lib/languages/gradle";
import docker from "highlight.js/lib/languages/dockerfile";
import md from "highlight.js/lib/languages/markdown";
import csharp from "highlight.js/lib/languages/csharp";
import nginx from "highlight.js/lib/languages/nginx";
import toml from "highlight.js/lib/languages/ini";
import swift from "highlight.js/lib/languages/swift";
import makefile from "highlight.js/lib/languages/makefile";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github.min.css";
import { motion } from "framer-motion";

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
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("cmake", cmake);
hljs.registerLanguage("gradle", gradle);
hljs.registerLanguage("Dockerfile", docker);
hljs.registerLanguage("dockerfile", docker);
hljs.registerLanguage("md", md);
hljs.registerLanguage("markdown", md);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("c#", csharp);
hljs.registerLanguage("cs", csharp);
hljs.registerLanguage("toml", toml);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("makefile", makefile);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);

// 你需要一个复制图标的 SVG，可以放在这里方便使用
const copyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>`;
// 复制成功后的对勾图标
const checkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/></svg>`;

const mdParser = new MarkdownIt({
  highlight: (str, lang): string => {
    // 1. 获取高亮后的 HTML 代码
    let highlightedCode = mdParser.utils.escapeHtml(str);
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlightedCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;
      } catch (__) {}
    }

    // 2. 生成语言名称和复制按钮的工具条 HTML

    return `<div class="relative card">
                <pre lang='${lang}'>${highlightedCode}</pre>
                <div class="absolute top-0 left-0 right-0 card-title flex flex-row h-9 px-3">
                <span>${lang}</span>
</div>
            </div>`;
    // 3. 将工具条和代码包裹在一个容器中
    //    使用 <pre><code> 结构是更标准的做法
    // return `
    //       <div class="code-block-container flex flex-col">
    //         ${toolbarHtml}
    //         <pre class="hljs">${highlightedCode}</pre>
    //       </div>
    //     `;
  },
  html: true,
  linkify: true,
  typographer: true,
});

function customImagePlugin(md: MarkdownIt) {
  md.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    return `<img src="${src}" alt="${alt}" class="rounded object-cover"  />`;
  };
}

mdParser.use(customImagePlugin);

const MarkdownComponent: React.FC<{
  text: string;
  id?: string;
  key?: string;
}> = ({ text, id, key }) => {

  return (
    <motion.div
      key={key !== null ? key : id}
      initial={{ opacity: 0, y: 10 }} // 初始状态：透明且稍微向下
      animate={{ opacity: 1, y: 0 }} // 动画到：完全显示且位置恢复
      exit={{ opacity: 0, y: -5 }} // 离开时的动画：透明且向上
      transition={{ duration: 0.5 }} // 过渡时间
    >
      <article
        id={id ?? "-1"}
        className={`max-w-none rounded-4xl prose`}
        dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
      />
    </motion.div>
  );
};

export default MarkdownComponent;
