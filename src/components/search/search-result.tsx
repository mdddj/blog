import * as React from "react"
import { Link } from "@@/exports"
import { motion } from "framer-motion"
import { Highlight } from "react-instantsearch"
import { FileTextIcon, ChevronRightIcon, ClockIcon } from "lucide-react"
import { GlassCard } from "@/components/glass"

/**
 * SearchResult - 搜索结果项组件
 * 
 * 玻璃卡片样式的结果项
 * 显示标题和摘要
 * 
 * Requirements: 9.2, 9.3
 */

export interface SearchResultHit {
    id: string | number
    title: string
    description?: string
    content?: string
    dateString?: string
    category?: {
        name: string
    }
    // InstantSearch hit properties
    __position?: number
    __queryID?: string
    _highlightResult?: Record<string, unknown>
}

export interface SearchResultProps {
    hit: SearchResultHit
    onClick?: () => void
}

// 从内容中提取摘要
const extractExcerpt = (content?: string, maxLength: number = 100): string => {
    if (!content) return ""
    // 移除 HTML 标签和多余空白
    const plainText = content
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength) + "..."
}

const SearchResult: React.FC<SearchResultProps> = ({ hit, onClick }) => {
    // 优先使用 description，否则从 content 提取摘要
    const excerpt = hit.description || extractExcerpt(hit.content)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
        >
            <Link
                to={`/detail/${hit.id}`}
                className="block"
                onClick={onClick}
                data-testid="search-result"
            >
                <GlassCard
                    interactive
                    size="sm"
                    blur="sm"
                    opacity={0.15}
                    className="group hover:border-white/30 dark:hover:border-white/20"
                >
                    <div className="flex items-start gap-3">
                        {/* 图标 */}
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 dark:bg-white/5 flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors duration-[var(--transition-fast)]">
                            <FileTextIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-[var(--transition-fast)]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* 标题 - Requirements 9.3 */}
                            <h4
                                className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-[var(--transition-fast)] line-clamp-2"
                                data-testid="result-title"
                            >
                                <Highlight hit={hit as any} attribute="title" />
                            </h4>

                            {/* 摘要/描述 - Requirements 9.3 */}
                            {excerpt && (
                                <p
                                    className="mt-1 text-xs text-muted-foreground line-clamp-1"
                                    data-testid="result-excerpt"
                                >
                                    {excerpt}
                                </p>
                            )}

                            {/* 元信息 */}
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground/70">
                                <ClockIcon className="w-3 h-3" />
                                <span>{hit.dateString || "最近更新"}</span>
                                {hit.category?.name && (
                                    <>
                                        <span className="text-muted-foreground/30">·</span>
                                        <span>{hit.category.name}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 箭头 */}
                        <div className="shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-[var(--transition-fast)]">
                            <ChevronRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </GlassCard>
            </Link>
        </motion.div>
    )
}

export { SearchResult }
