import * as React from "react"
import { NavLink } from "@@/exports"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks"
import { appMenuStore, type MenuModal } from "@/providers/menu"
import { categoryStore } from "@/providers/category"
import { SearchButton } from "@/components/search"
import { showDialogModal } from "@/tools/fun"
import MyDocMenuElement from "@/components/doc_menu"

/**
 * GlassNavbar - 液态玻璃导航栏组件
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 * - 实现透明到毛玻璃的过渡效果
 * - 限制高度为 56px
 * - 精简导航项布局
 * - 悬停时显示玻璃高亮效果 (150ms transition)
 */

interface NavItemProps {
    item: MenuModal
    onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ item, onClick }) => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? []

    if (item.isDoc && docs.length === 0) {
        return null
    }

    if (item.isDoc && docs.length > 0) {
        return (
            <li className="relative">
                <MyDocMenuElement onClick={onClick} />
            </li>
        )
    }

    if (!item.href) return null

    return (
        <li>
            <NavLink
                to={item.href}
                onClick={() => {
                    // @ts-ignore
                    document.activeElement?.blur()
                    onClick?.()
                }}
                className={({ isActive }) =>
                    cn(
                        "relative px-3 py-2 text-sm font-medium rounded-lg",
                        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1, 2.3)
                        "transition-all duration-[var(--transition-fast)] ease-out",
                        "hover:bg-white/10 dark:hover:bg-white/5",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        isActive
                            ? "text-primary"
                            : "text-foreground/80 hover:text-foreground"
                    )
                }
            >
                {/* Glass highlight effect on hover */}
                <span className="relative z-10">{item.title}</span>
            </NavLink>
        </li>
    )
}

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    menus: MenuModal[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menus }) => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? []

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -280 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -280 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={cn(
                            "fixed top-0 left-0 z-50 h-full w-[280px]",
                            "bg-white/80 dark:bg-black/80",
                            "backdrop-blur-xl",
                            "border-r border-white/20 dark:border-white/10",
                            "shadow-2xl",
                            "lg:hidden"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <span className="text-lg font-bold">导航</span>
                            <button
                                onClick={onClose}
                                className={cn(
                                    // Minimum 44px touch target (Requirements 6.2)
                                    "p-2 min-w-[44px] min-h-[44px] rounded-lg",
                                    "flex items-center justify-center",
                                    "hover:bg-white/10 dark:hover:bg-white/5",
                                    // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                                    "transition-colors duration-[var(--transition-fast)]"
                                )}
                                aria-label="关闭菜单"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-4">
                            <ul className="space-y-1">
                                {menus.map((item, index) => {
                                    if (item.isDoc && docs.length === 0) return null

                                    if (item.isDoc && docs.length > 0) {
                                        return (
                                            <li key={`mobile-${item.title}-${index}`} className="py-1">
                                                <MyDocMenuElement onClick={onClose} />
                                            </li>
                                        )
                                    }

                                    if (!item.href) return null

                                    return (
                                        <li key={`mobile-${item.title}-${index}`}>
                                            <NavLink
                                                to={item.href}
                                                onClick={onClose}
                                                className={({ isActive }) =>
                                                    cn(
                                                        // Minimum 44px touch target (Requirements 6.2)
                                                        "block px-4 py-3 min-h-[44px] rounded-lg text-base font-medium",
                                                        "flex items-center",
                                                        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                                                        "transition-all duration-[var(--transition-fast)]",
                                                        "hover:bg-white/10 dark:hover:bg-white/5",
                                                        isActive
                                                            ? "text-primary bg-primary/10"
                                                            : "text-foreground/80"
                                                    )
                                                }
                                            >
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

const HamburgerButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({
    isOpen,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                // Minimum 44px touch target on mobile (Requirements 6.2)
                "lg:hidden p-2 min-w-[44px] min-h-[44px] rounded-lg",
                "flex items-center justify-center",
                "hover:bg-white/10 dark:hover:bg-white/5",
                // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                "transition-colors duration-[var(--transition-fast)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isOpen}
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    initial={false}
                    animate={{ d: isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }}
                    transition={{ duration: 0.2 }}
                />
            </svg>
        </button>
    )
}

export interface GlassNavbarProps {
    title?: string
    className?: string
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
    title = "梁典典的博客",
    className,
}) => {
    const menus = appMenuStore((state) => state.menus)
    const { isScrolled } = useScroll({ threshold: 50 })
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    // Close mobile menu on route change or scroll
    React.useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [mobileMenuOpen])

    return (
        <>
            <header
                data-scrolled={isScrolled}
                className={cn(
                    // Base styles - fixed height of 56px (Requirements 2.4)
                    "fixed top-0 left-0 right-0 z-50",
                    "h-[56px] max-h-[56px]",
                    "flex items-center",
                    "px-4 lg:px-6",
                    // Transition for glass effect (300ms as per Requirements 2.2, 7.1)
                    "transition-all duration-[var(--transition-slow)] ease-out",
                    // Transparent state (Requirements 2.1)
                    !isScrolled && "bg-transparent",
                    // Frosted glass state (Requirements 2.2)
                    isScrolled && [
                        "bg-white/70 dark:bg-black/70",
                        "backdrop-blur-[16px]",
                        "border-b border-white/20 dark:border-white/10",
                        "shadow-sm",
                    ],
                    className
                )}
            >
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Left section: Hamburger + Title */}
                    <div className="flex items-center gap-3">
                        <HamburgerButton
                            isOpen={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />

                        <NavLink to="/" className="flex items-center">
                            <motion.span
                                className="text-xl font-bold"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {title}
                            </motion.span>
                        </NavLink>
                    </div>

                    {/* Center section: Navigation (desktop only) */}
                    <nav className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-1">
                            {menus.map((item, index) => (
                                <NavItem key={`nav-${item.title}-${index}`} item={item} />
                            ))}
                        </ul>
                    </nav>

                    {/* Right section: Actions */}
                    <div className="flex items-center gap-2">
                        <SearchButton />
                        <button
                            type="button"
                            onClick={() => showDialogModal("ds")}
                            className={cn(
                                "hidden sm:flex items-center gap-1.5",
                                "px-3 py-1.5 text-sm font-medium rounded-lg",
                                "bg-primary/10 text-primary",
                                "hover:bg-primary/20",
                                // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                                "transition-colors duration-[var(--transition-fast)]",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            )}
                        >
                            打赏
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                menus={menus}
            />
        </>
    )
}

export default GlassNavbar
