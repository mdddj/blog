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
  highlight: (str, lang) => {
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
    const toolbarHtml = `
          <div class="code-block-toolbar flex flex-row justify-between py-2 px-3 bg-base-200">
            <span class="language-name">${lang || "text"}</span>
            <button class="copy-button btn btn-xs" title="复制代码">
              ${copyIconSvg}
            </button>
          </div>
        `;

    // 3. 将工具条和代码包裹在一个容器中
    //    使用 <pre><code> 结构是更标准的做法
    return `
          <div class="code-block-container flex flex-col">
            ${toolbarHtml}
            <pre class="hljs">${highlightedCode}</pre>
          </div>
        `;
  },
  html: true,
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
  useEffect(() => {
    // 监听整个文档的点击事件（事件委托）
    document.addEventListener("click", function (event) {
      // event.target 是用户实际点击的元素
      // .closest('.copy-button') 会从 event.target 开始向上查找，直到找到 .copy-button 或 null
      let target = event.target;
      if (!target) return;
      const copyButton = target.closest(".copy-button");

      // 如果点击的不是复制按钮，则什么也不做
      if (!copyButton) {
        return;
      }

      // 找到按钮所在的容器
      const container = copyButton.closest(".code-block-container");
      if (!container) {
        return;
      }

      // 从容器中找到代码元素
      const codeElement = container.querySelector("pre.hljs > code");
      if (!codeElement) {
        return;
      }

      // 获取代码的纯文本内容
      const codeToCopy = codeElement.textContent;

      // 使用现代的 Clipboard API 复制文本
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          // 复制成功后的反馈
          copyButton.innerHTML = checkIconSvg; // 切换到对勾图标
          copyButton.title = "已复制!";

          // 2秒后恢复原样
          setTimeout(() => {
            copyButton.innerHTML = copyIconSvg; // 换回复制图标
            copyButton.title = "复制代码";
          }, 2000);
        })
        .catch((err) => {
          // 复制失败
          console.error("无法复制到剪贴板:", err);
          copyButton.title = "复制失败!";
        });
    });
  }, []);
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
        className={`prose max-w-none rounded-4xl`}
        dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
      />
    </motion.div>
  );
};

export default MarkdownComponent;
