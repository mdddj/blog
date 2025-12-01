import React, { useState, useCallback } from "react";
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
import bnf from "highlight.js/lib/languages/bnf";
import "highlight.js/styles/github.min.css";
import { motion } from "framer-motion";
import "@fontsource-variable/jetbrains-mono";

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
hljs.registerLanguage("bnf", bnf)

const mdParser = new MarkdownIt("default", {
  highlight: (str, lang): string => {
    // 1. 获取高亮后的 HTML 代码
    let highlightedCode = mdParser.utils.escapeHtml(str);
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlightedCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;
      } catch (__) { }
    }

    // 2. 生成语言名称和复制按钮的工具条 HTML

    return `<div class="relative card">
                <motion.pre class='not-prose' lang='${lang}' style="border-radius: 0.5rem; padding: 1rem; overflow-x: auto;  line-height: 1.5; position: relative;" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>${highlightedCode}</motion.pre>
                <div class="absolute -top-2 right-0 card-title flex flex-row h-9 px-3">
                <span class='text-[10px]'>${lang}</span>
</div>
            </div>`;
  },
  html: true,
  linkify: true,
  typographer: true,
});

// 还原原有图片渲染
function customImagePlugin(md: MarkdownIt) {
  md.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    return `<img src="${src}" alt="${alt}" class="rounded object-cover hover:shadow-2xl"  />`;
  };
}

// 自定义行内规则：~~[文本]url~~ 渲染为可点击文本弹出图片
function popupImagePlugin(md: MarkdownIt) {
  // 添加行内规则，优先级要高于删除线
  md.inline.ruler.before("strikethrough", "popup_image", (state, silent) => {
    const start = state.pos;
    const marker = state.src.slice(start, start + 2);

    if (marker !== "~~") return false;

    // 匹配 ~~[文本]url~~
    const match = state.src.slice(start).match(/^~~\[([^\]]*)\](https?:\/\/[^\s~]+)~~/);
    if (!match) return false;

    if (!silent) {
      const token = state.push("popup_image", "", 0);
      token.content = match[1]; // 显示文本
      token.attrSet("src", match[2]); // 图片 url
    }

    state.pos += match[0].length;
    return true;
  });

  // 渲染规则
  md.renderer.rules.popup_image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrGet("src") || "";
    const text = token.content;
    // 如果文本为空，使用文件名
    const displayText = text || src.split("/").pop() || "image";
    return `<span class="popup-image-link cursor-pointer text-primary underline hover:text-primary-focus" data-src="${src}" data-alt="${displayText}">${displayText}</span>`;
  };
}

// Alert 块级规则：::: type 内容 :::
// 支持类型：info, warning, error, success, tip, note, danger
function alertPlugin(md: MarkdownIt) {
  // daisyUI 5 alert 配置：使用 alert-soft 样式 + SVG 图标
  const alertTypes: Record<string, { icon: string; className: string }> = {
    info: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      className: "alert-info alert-soft",
    },
    warning: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
      className: "alert-warning alert-soft",
    },
    error: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      className: "alert-error alert-soft",
    },
    success: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      className: "alert-success alert-soft",
    },
    tip: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
      className: "alert-info alert-soft",
    },
    note: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
      className: "alert-info alert-soft",
    },
    danger: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current w-6 h-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>`,
      className: "alert-error alert-soft",
    },
  };

  md.block.ruler.before("fence", "alert", (state, startLine, endLine, silent) => {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const maxPos = state.eMarks[startLine];
    const lineText = state.src.slice(startPos, maxPos);

    // 匹配开始标记 ::: type
    const startMatch = lineText.match(/^:::\s*(\w+)\s*$/);
    if (!startMatch) return false;

    const alertType = startMatch[1].toLowerCase();
    if (!alertTypes[alertType]) return false;

    if (silent) return true;

    // 查找结束标记 :::
    let nextLine = startLine + 1;
    const contentLines: string[] = [];

    while (nextLine < endLine) {
      const pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];
      const line = state.src.slice(pos, max);

      if (line.trim() === ":::") {
        break;
      }
      contentLines.push(line);
      nextLine++;
    }

    const token = state.push("alert", "div", 0);
    token.content = contentLines.join("\n");
    token.meta = { type: alertType };
    token.map = [startLine, nextLine + 1];

    state.line = nextLine + 1;
    return true;
  });

  md.renderer.rules.alert = (tokens, idx) => {
    const token = tokens[idx];
    const type = token.meta?.type || "info";
    const config = alertTypes[type] || alertTypes.info;
    const content = md.render(token.content);
    return `<div role="alert" class="alert ${config.className} my-3">
      ${config.icon}
      <div>${content}</div>
    </div>`;
  };
}

mdParser.use(customImagePlugin);
mdParser.use(popupImagePlugin);
mdParser.use(alertPlugin);

// 导出 mdParser 供其他组件复用
export { mdParser };

// 图片预览浮层组件
const ImagePreviewModal: React.FC<{
  src: string;
  alt: string;
  onClose: () => void;
}> = ({ src, alt, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-[90vw] max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
        />
        <button
          className="absolute -top-3 -right-3 btn btn-circle btn-sm btn-error"
          onClick={onClose}
        >
          ✕
        </button>
        {alt && (
          <p className="text-center text-white mt-2 text-sm opacity-80">{alt}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

const MarkdownComponent: React.FC<{
  text: string;
  id?: string;
  key?: string;
}> = ({ text, id, key }) => {
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  // 处理弹出式图片链接点击
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("popup-image-link")) {
      const src = target.dataset.src;
      const alt = target.dataset.alt;
      if (src) {
        setPreviewImage({ src, alt: alt || "" });
      }
    }
  }, []);

  return (
    <>
      <motion.div
        key={key !== null ? key : id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
      >
        <article
          id={id ?? "-1"}
          className={`max-w-none rounded-4xl prose prose-pre:bg-base-200 font-bold`}
          dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
        />
      </motion.div>
      {previewImage && (
        <ImagePreviewModal
          src={previewImage.src}
          alt={previewImage.alt}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
};

export default MarkdownComponent;
