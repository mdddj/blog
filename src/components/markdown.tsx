import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import 'github-markdown-css/github-markdown-light.css'
import "highlight.js/styles/github.css";

const mdParser = new MarkdownIt({
    highlight: (str, lang) => {
        let code: any = mdParser.utils.escapeHtml(str)
        if (lang && hljs.getLanguage(lang)) {
            code = hljs.highlight(lang, str, true).value
        }
        return `<pre class="hljs"><code>${code}</code></pre>`
    },
    html: true,

})
const MarkdownComponent:React.FC<{text:string}> = ({text}) => {

    return <div className={'markdown-body'} dangerouslySetInnerHTML={{__html: mdParser.render(text)}}></div>
}

export default MarkdownComponent