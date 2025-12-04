import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { SearchIcon } from "lucide-react"
import { SearchModal } from "@/components/search/search-modal"
import { cn } from "@/lib/utils"

/**
 * SearchButton - 液态玻璃搜索按钮
 * 
 * 触发 SearchModal 的按钮组件
 * 支持键盘快捷键 ⌘K / Ctrl+K
 * 
 * Requirements: 9.1
 */

const SearchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return (
    <span className="items-center hidden lg:flex">
      {/* 触发按钮 - 玻璃风格 */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group px-4 py-2 rounded-xl",
          "bg-white/10 dark:bg-white/5",
          "border border-white/20 dark:border-white/10",
          "backdrop-blur-md",
          "hover:bg-white/15 dark:hover:bg-white/10",
          "hover:border-white/30 dark:hover:border-white/20",
          // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
          "transition-all duration-[var(--transition-fast)]",
          "flex items-center gap-2",
          "shadow-sm hover:shadow-md"
        )}
        onClick={() => setIsOpen(true)}
      >
        <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.15 }}>
          <SearchIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-[var(--transition-fast)]" />
        </motion.div>
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-[var(--transition-fast)]">
          搜索
        </span>
        <kbd className={cn(
          "px-1.5 py-0.5 text-xs rounded",
          "bg-white/10 dark:bg-white/5",
          "border border-white/20 dark:border-white/10",
          "text-muted-foreground/70",
          "group-hover:bg-white/15 dark:group-hover:bg-white/10",
          // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
          "transition-colors duration-[var(--transition-fast)]"
        )}>
          ⌘K
        </kbd>

        {/* 悬浮光效 */}
        <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-fast)] pointer-events-none" />
      </motion.button>

      {/* 搜索模态框 */}
      <SearchModal open={isOpen} onOpenChange={handleOpenChange} />
    </span>
  )
}

export { SearchButton }
