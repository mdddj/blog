import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditorToolbar, InsertType, InsertPosition } from "./markdown-editor-toolbar";
// 复用原有的 mdParser
import { mdParser } from "./markdown";

export interface EditableMarkdownProps {
    text: string;
    id?: string;
    editable?: boolean;
    onSave?: (newText: string, lineIndex: number, position: InsertPosition, content: string) => Promise<void>;
}

// 检测当前行是否在表格中，返回列数
function detectTableColumns(lines: string[], lineIndex: number): number {
    const line = lines[lineIndex];
    if (!line) return 0;

    // 检查当前行是否是表格行
    const isTableRow = /^\|.*\|$/.test(line.trim());
    if (!isTableRow) {
        // 检查上下文是否在表格中
        for (let i = lineIndex - 1; i >= 0; i--) {
            const prevLine = lines[i].trim();
            if (!prevLine) continue;
            if (/^\|.*\|$/.test(prevLine)) {
                return (prevLine.match(/\|/g)?.length || 1) - 1;
            }
            break;
        }
        return 0;
    }

    return (line.match(/\|/g)?.length || 1) - 1;
}

const EditableMarkdownComponent: React.FC<EditableMarkdownProps> = ({
    text,
    id,
    editable = false,
    onSave,
}) => {
    const [content, setContent] = useState(text);
    const [toolbarState, setToolbarState] = useState<{
        visible: boolean;
        position: { x: number; y: number };
        lineIndex: number;
        tableColumns: number;
    }>({
        visible: false,
        position: { x: 0, y: 0 },
        lineIndex: 0,
        tableColumns: 0,
    });
    const [saving, setSaving] = useState(false);
    const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
    const [_hoveredLine, setHoveredLine] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lines = content.split("\n");

    useEffect(() => {
        setContent(text);
    }, [text]);

    // 处理鼠标移动，检测悬停的行
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!editable || !containerRef.current) return;

            const container = containerRef.current;
            const article = container.querySelector("article");
            if (!article) return;

            // 获取所有块级元素
            const elements = article.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, li, table, tr, pre, blockquote, hr, div.alert");
            let foundLine = -1;

            for (const el of elements) {
                const rect = el.getBoundingClientRect();
                if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    // 通过元素在文档中的位置估算行号
                    const textContent = el.textContent || "";
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes(textContent.slice(0, 20))) {
                            foundLine = i;
                            break;
                        }
                    }
                    if (foundLine === -1) {
                        // 简单估算：根据元素索引
                        foundLine = Array.from(elements).indexOf(el);
                    }

                    const tableColumns = detectTableColumns(lines, foundLine);
                    setHoveredLine(foundLine);
                    setToolbarState({
                        visible: true,
                        position: { x: rect.right + 10, y: rect.top + window.scrollY },
                        lineIndex: foundLine,
                        tableColumns,
                    });
                    break;
                }
            }
        },
        [editable, lines]
    );

    const handleMouseLeave = useCallback(() => {
        // 延迟隐藏，让用户有时间移动到工具栏
        setTimeout(() => {
            setHoveredLine(null);
        }, 300);
    }, []);

    // 处理插入内容
    const handleInsert = useCallback(
        async (type: InsertType, position: InsertPosition, insertContent: string) => {
            const currentLines = content.split("\n");
            const lineIndex = toolbarState.lineIndex;
            const insertIndex = position === "above" ? lineIndex : lineIndex + 1;

            currentLines.splice(insertIndex, 0, insertContent);
            const newContent = currentLines.join("\n");

            if (onSave) {
                setSaving(true);
                try {
                    await onSave(newContent, lineIndex, position, insertContent);
                    setContent(newContent);
                } catch (error) {
                    console.error("保存失败:", error);
                } finally {
                    setSaving(false);
                }
            } else {
                setContent(newContent);
            }
        },
        [content, toolbarState.lineIndex, onSave]
    );

    // 处理点击（图片预览等）
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

    // 使用原有的 mdParser 渲染
    const renderedHtml = mdParser.render(content);

    return (
        <>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative"
            >
                {saving && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="loading loading-spinner loading-sm text-primary"></span>
                    </div>
                )}
                <article
                    id={id ?? "-1"}
                    className={`max-w-none rounded-4xl prose prose-pre:bg-base-200 font-bold`}
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />

                {editable && (
                    <div className="text-xs opacity-50 mt-4 text-center">
                        悬停在任意行上可插入内容
                    </div>
                )}
            </motion.div>

            {/* 编辑工具栏 */}
            {editable && (
                <EditorToolbar
                    visible={toolbarState.visible}
                    position={toolbarState.position}
                    lineIndex={toolbarState.lineIndex}
                    tableColumns={toolbarState.tableColumns > 0 ? toolbarState.tableColumns : undefined}
                    onInsert={handleInsert}
                    onClose={() => setToolbarState((s) => ({ ...s, visible: false }))}
                />
            )}

            {/* 图片预览 */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewImage(null)}
                    >
                        <motion.div
                            className="relative max-w-[90vw] max-h-[90vh]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={previewImage.src}
                                alt={previewImage.alt}
                                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
                            />
                            <button
                                className="absolute -top-3 -right-3 btn btn-circle btn-sm btn-error"
                                onClick={() => setPreviewImage(null)}
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EditableMarkdownComponent;
