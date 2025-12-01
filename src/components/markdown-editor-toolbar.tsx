import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 插入内容类型
export type InsertType = "text" | "image" | "table-row" | "heading" | "list" | "code" | "divider";

// 插入位置
export type InsertPosition = "above" | "below";

// 工具栏 Props
export interface EditorToolbarProps {
    visible: boolean;
    position: { x: number; y: number };
    lineIndex: number;
    tableColumns?: number; // 如果当前行在表格中，传入列数
    onInsert: (type: InsertType, position: InsertPosition, content: string) => void;
    onClose: () => void;
}

// 图片上传 Modal
const ImageUploadModal: React.FC<{
    onConfirm: (url: string, alt: string) => void;
    onClose: () => void;
}> = ({ onConfirm, onClose }) => {
    const [url, setUrl] = useState("");
    const [alt, setAlt] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (file) {
                    handleFile(file);
                }
            }
        }
    };

    const handleFile = (file: File) => {
        // 这里可以上传到服务器，暂时用 base64 或 URL.createObjectURL
        const reader = new FileReader();
        reader.onload = (e) => {
            setUrl(e.target?.result as string);
            setAlt(file.name.replace(/\.[^/.]+$/, ""));
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith("image/")) {
            handleFile(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <motion.div
                className="bg-base-100 rounded-lg p-6 w-96 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                onPaste={handlePaste}
            >
                <h3 className="text-lg font-bold mb-4">插入图片</h3>

                {/* 拖拽区域 */}
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${isDragging ? "border-primary bg-primary/10" : "border-base-300"
                        }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <p className="text-sm opacity-70">拖拽图片到这里，或粘贴图片</p>
                    <button
                        className="btn btn-sm btn-outline mt-2"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        选择文件
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                </div>

                {/* URL 输入 */}
                <div className="form-control mb-3">
                    <label className="label"><span className="label-text">图片 URL</span></label>
                    <input
                        type="text"
                        className="input input-bordered input-sm"
                        placeholder="https://..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                {/* Alt 文本 */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">描述文字</span></label>
                    <input
                        type="text"
                        className="input input-bordered input-sm"
                        placeholder="图片描述"
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                    />
                </div>

                {/* 预览 */}
                {url && (
                    <div className="mb-4">
                        <img src={url} alt={alt} className="max-h-32 rounded mx-auto" />
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-ghost" onClick={onClose}>取消</button>
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={!url}
                        onClick={() => onConfirm(url, alt)}
                    >
                        插入
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


// 文本输入 Modal
const TextInputModal: React.FC<{
    title: string;
    placeholder?: string;
    multiline?: boolean;
    onConfirm: (text: string) => void;
    onClose: () => void;
}> = ({ title, placeholder, multiline, onConfirm, onClose }) => {
    const [text, setText] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <motion.div
                className="bg-base-100 rounded-lg p-6 w-96 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                {multiline ? (
                    <textarea
                        className="textarea textarea-bordered w-full h-32"
                        placeholder={placeholder}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder={placeholder}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && text && onConfirm(text)}
                    />
                )}
                <div className="flex justify-end gap-2 mt-4">
                    <button className="btn btn-sm btn-ghost" onClick={onClose}>取消</button>
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={!text.trim()}
                        onClick={() => onConfirm(text)}
                    >
                        插入
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// 表格行输入 Modal
const TableRowModal: React.FC<{
    columns: number;
    onConfirm: (cells: string[]) => void;
    onClose: () => void;
}> = ({ columns, onConfirm, onClose }) => {
    const [cells, setCells] = useState<string[]>(Array(columns).fill(""));

    const updateCell = (index: number, value: string) => {
        const newCells = [...cells];
        newCells[index] = value;
        setCells(newCells);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <motion.div
                className="bg-base-100 rounded-lg p-6 w-auto min-w-96 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4">插入表格行 ({columns} 列)</h3>
                <div className="flex gap-2 flex-wrap">
                    {cells.map((cell, i) => (
                        <input
                            key={i}
                            type="text"
                            className="input input-bordered input-sm w-28"
                            placeholder={`列 ${i + 1}`}
                            value={cell}
                            onChange={(e) => updateCell(i, e.target.value)}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button className="btn btn-sm btn-ghost" onClick={onClose}>取消</button>
                    <button className="btn btn-sm btn-primary" onClick={() => onConfirm(cells)}>
                        插入
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// 主工具栏组件
export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    visible,
    position,
    lineIndex,
    tableColumns,
    onInsert,
    onClose,
}) => {
    const [insertPosition, setInsertPosition] = useState<InsertPosition>("below");
    const [showImageModal, setShowImageModal] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false);
    const [showTableRowModal, setShowTableRowModal] = useState(false);
    const [showHeadingModal, setShowHeadingModal] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);

    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [visible, onClose]);

    const handleInsertText = (text: string) => {
        onInsert("text", insertPosition, text);
        setShowTextModal(false);
        onClose();
    };

    const handleInsertImage = (url: string, alt: string) => {
        const markdown = `![${alt}](${url})`;
        onInsert("image", insertPosition, markdown);
        setShowImageModal(false);
        onClose();
    };

    const handleInsertTableRow = (cells: string[]) => {
        const markdown = `| ${cells.join(" | ")} |`;
        onInsert("table-row", insertPosition, markdown);
        setShowTableRowModal(false);
        onClose();
    };

    const handleInsertHeading = (text: string) => {
        onInsert("heading", insertPosition, `## ${text}`);
        setShowHeadingModal(false);
        onClose();
    };

    const handleInsertDivider = () => {
        onInsert("divider", insertPosition, "---");
        onClose();
    };

    const handleInsertList = () => {
        onInsert("list", insertPosition, "- ");
        onClose();
    };

    if (!visible) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    ref={toolbarRef}
                    className="fixed z-40 bg-base-100 shadow-xl rounded-lg border border-base-300 p-2"
                    style={{ left: position.x, top: position.y }}
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    {/* 插入位置选择 */}
                    <div className="flex items-center gap-1 mb-2 pb-2 border-b border-base-300">
                        <span className="text-xs opacity-60 mr-2">插入到:</span>
                        <button
                            className={`btn btn-xs ${insertPosition === "above" ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => setInsertPosition("above")}
                        >
                            ↑ 上方
                        </button>
                        <button
                            className={`btn btn-xs ${insertPosition === "below" ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => setInsertPosition("below")}
                        >
                            ↓ 下方
                        </button>
                    </div>

                    {/* 工具按钮 */}
                    <div className="flex gap-1 flex-wrap max-w-xs">
                        <button
                            className="btn btn-sm btn-ghost tooltip"
                            data-tip="文本"
                            onClick={() => setShowTextModal(true)}
                        >
                            📝
                        </button>
                        <button
                            className="btn btn-sm btn-ghost tooltip"
                            data-tip="标题"
                            onClick={() => setShowHeadingModal(true)}
                        >
                            H
                        </button>
                        <button
                            className="btn btn-sm btn-ghost tooltip"
                            data-tip="图片"
                            onClick={() => setShowImageModal(true)}
                        >
                            🖼️
                        </button>
                        {tableColumns && tableColumns > 0 && (
                            <button
                                className="btn btn-sm btn-ghost tooltip"
                                data-tip={`表格行 (${tableColumns}列)`}
                                onClick={() => setShowTableRowModal(true)}
                            >
                                📊
                            </button>
                        )}
                        <button
                            className="btn btn-sm btn-ghost tooltip"
                            data-tip="列表"
                            onClick={handleInsertList}
                        >
                            •
                        </button>
                        <button
                            className="btn btn-sm btn-ghost tooltip"
                            data-tip="分割线"
                            onClick={handleInsertDivider}
                        >
                            ―
                        </button>
                    </div>

                    <div className="text-xs opacity-50 mt-2 pt-2 border-t border-base-300">
                        第 {lineIndex + 1} 行
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Modals */}
            {showTextModal && (
                <TextInputModal
                    title="插入文本"
                    placeholder="输入文本内容..."
                    multiline
                    onConfirm={handleInsertText}
                    onClose={() => setShowTextModal(false)}
                />
            )}
            {showImageModal && (
                <ImageUploadModal
                    onConfirm={handleInsertImage}
                    onClose={() => setShowImageModal(false)}
                />
            )}
            {showTableRowModal && tableColumns && (
                <TableRowModal
                    columns={tableColumns}
                    onConfirm={handleInsertTableRow}
                    onClose={() => setShowTableRowModal(false)}
                />
            )}
            {showHeadingModal && (
                <TextInputModal
                    title="插入标题"
                    placeholder="标题文字..."
                    onConfirm={handleInsertHeading}
                    onClose={() => setShowHeadingModal(false)}
                />
            )}
        </>
    );
};

export default EditorToolbar;
