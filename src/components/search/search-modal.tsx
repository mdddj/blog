import * as React from "react"
import {
    InstantSearch,
    SearchBox,
    Hits,
    Stats,
} from "react-instantsearch"
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import { motion } from "framer-motion"
import { XIcon, SearchIcon } from "lucide-react"
import {
    Dialog,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import "instantsearch.css/themes/algolia-min.css"

/**
 * SearchModal - 液态玻璃搜索模态框
 * 
 * 使用 shadcn Dialog 组件
 * 全屏玻璃遮罩效果
 * 居中搜索输入框
 * 
 * Requirements: 9.1, 9.2, 9.3
 */

const { searchClient } = instantMeiliSearch(
    "https://search.itbug.shop",
    "7b8f1a8a2dd26a813b3ef7d3efad6aa89b348f295831b3c49087d5256d2fc5ca"
)

export interface SearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// 搜索结果项组件 - 使用独立的 SearchResult 组件
// @ts-ignore
const SearchResultItem = ({ hit }) => {
    // 动态导入 SearchResult 组件以避免循环依赖
    const { SearchResult } = require("./search-result")
    return <SearchResult hit={hit} />
}

// 玻璃风格搜索输入框
const GlassSearchInput = () => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <SearchBox
                classNames={{
                    root: "w-full",
                    form: "w-full",
                    input: cn(
                        "w-full pl-12 pr-4 py-4 text-base",
                        "bg-white/10 dark:bg-white/5",
                        "border border-white/20 dark:border-white/10 rounded-xl",
                        "backdrop-blur-md",
                        "focus:border-white/30 dark:focus:border-white/20",
                        "focus:bg-white/15 dark:focus:bg-white/10",
                        "focus:ring-2 focus:ring-white/20",
                        "focus:outline-none",
                        "placeholder:text-muted-foreground",
                        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                        "transition-all duration-[var(--transition-fast)]",
                        "text-foreground"
                    ),
                    submit: "hidden",
                    reset: "hidden",
                }}
                placeholder="搜索文章、标签或分类..."
            />
        </div>
    )
}

// 搜索统计信息
const SearchStatsBar = () => {
    return (
        <div className="flex items-center justify-between py-3 px-1">
            <Stats
                classNames={{
                    root: "text-sm text-muted-foreground",
                }}
            />
            <div className="text-xs text-muted-foreground/70 flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-xs rounded bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10">↵</kbd>
                    <span>选择</span>
                </span>
                <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-xs rounded bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10">ESC</kbd>
                    <span>关闭</span>
                </span>
            </div>
        </div>
    )
}

// 搜索内容组件
const SearchContent = ({ onClose }: { onClose: () => void }) => {
    return (
        <InstantSearch indexName="blogs" searchClient={searchClient}>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <GlassSearchInput />
            </motion.div>

            <SearchStatsBar />

            <motion.div
                className="mt-2 max-h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 pr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                onClick={onClose}
            >
                <Hits
                    hitComponent={SearchResultItem}
                    classNames={{
                        root: "w-full",
                        list: "flex flex-col gap-2",
                        item: "w-full",
                    }}
                />
            </motion.div>
        </InstantSearch>
    )
}

// 主搜索模态框组件
const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                {/* 全屏玻璃遮罩 - Requirements 9.1 */}
                <DialogPrimitive.Overlay
                    className={cn(
                        "fixed inset-0 z-50",
                        "bg-black/30 dark:bg-black/50",
                        "backdrop-blur-xl",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    )}
                    data-testid="search-overlay"
                />

                {/* 居中搜索内容 */}
                <DialogPrimitive.Content
                    className={cn(
                        "fixed top-[15%] left-[50%] z-50",
                        "w-full max-w-2xl",
                        "translate-x-[-50%]",
                        "p-6 rounded-2xl",
                        "bg-white/20 dark:bg-black/30",
                        "backdrop-blur-2xl",
                        "border border-white/20 dark:border-white/10",
                        "shadow-2xl",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        // Using unified transition duration (200ms) within 150ms-300ms range (Requirements 7.1)
                        "duration-[var(--transition-normal)]"
                    )}
                    data-testid="search-modal"
                >
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl opacity-40 pointer-events-none" />

                    {/* 关闭按钮 - min 44px touch target on mobile (Requirements 6.2) */}
                    <DialogPrimitive.Close
                        className={cn(
                            "absolute right-4 top-4 z-10",
                            "w-11 h-11 md:w-8 md:h-8 rounded-lg",
                            "flex items-center justify-center",
                            "bg-white/10 dark:bg-white/5",
                            "border border-white/20 dark:border-white/10",
                            "text-muted-foreground hover:text-foreground",
                            "hover:bg-white/20 dark:hover:bg-white/10",
                            // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                            "transition-all duration-[var(--transition-fast)]",
                            "focus:outline-none focus:ring-2 focus:ring-white/20"
                        )}
                    >
                        <XIcon className="w-4 h-4" />
                        <span className="sr-only">关闭</span>
                    </DialogPrimitive.Close>

                    {/* 标题 */}
                    <DialogTitle className="sr-only">搜索文章</DialogTitle>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-4"
                    >
                        <h3 className="text-xl font-semibold text-foreground">
                            搜索文章
                        </h3>
                        <div className="mt-2 w-12 h-0.5 bg-primary/50 rounded-full" />
                    </motion.div>

                    {/* 搜索内容 */}
                    <SearchContent onClose={() => onOpenChange(false)} />
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}

export { SearchModal }
