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
import cpp from "highlight.js/lib/languages/cpp"
import cmake from "highlight.js/lib/languages/cmake";
import gradle from "highlight.js/lib/languages/gradle";
import docker from "highlight.js/lib/languages/dockerfile";
import md from "highlight.js/lib/languages/markdown";
import csharp from 'highlight.js/lib/languages/csharp';
import nginx from "highlight.js/lib/languages/nginx";
import toml from "highlight.js/lib/languages/ini";
import "highlight.js/styles/xcode.min.css";
import {motion} from "framer-motion";

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
const mdParser = new MarkdownIt({
    highlight: (str, lang) => {
        let code: any = mdParser.utils.escapeHtml(str);
        if (lang && hljs.getLanguage(lang)) {
            code = hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true,
            }).value;
        }
        return `<pre lang='${lang}'>${code}</pre>`;
    },
    html: true,
});

function customImagePlugin(md: MarkdownIt) {
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const src = token.attrGet("src");
        const alt = token.content;
        return `<img src="${src}" alt="${alt}" class="shadow-sm rounded-lg w-full object-cover"  />`;
    };
}


mdParser.use(customImagePlugin);

const MarkdownComponent: React.FC<{ text: string, id?: string, key?: string }> = ({text, id,key}) => {

    return (
        <motion.div key={key !== null ? key :  id}
                    initial={{opacity: 0, y: 10}}  // 初始状态：透明且稍微向下
                    animate={{opacity: 1, y: 0}}   // 动画到：完全显示且位置恢复
                    exit={{opacity: 0, y: -5}}    // 离开时的动画：透明且向上
                    transition={{duration: 0.5}}   // 过渡时间
        >
            <article
                id={id ?? '-1'}
                className={
                    `prose prose-pre:bg-base-200 prose-pre:text-base-content max-w-none rounded-lg`
                }
                dangerouslySetInnerHTML={{__html: mdParser.render(text)}}
            />
        </motion.div>
    );
};

export default MarkdownComponent;
