import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * GlassButton - 液态玻璃按钮组件
 * 
 * 扩展 shadcn Button 添加玻璃变体
 * 实现悬停和点击效果
 * 
 * Requirements: 10.2
 */

const glassButtonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2",
        "whitespace-nowrap rounded-md text-sm font-medium",
        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
        "transition-all duration-[var(--transition-fast)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    ].join(" "),
    {
        variants: {
            variant: {
                default: [
                    "bg-white/10 dark:bg-white/5",
                    "backdrop-blur-md",
                    "border border-white/20 dark:border-white/10",
                    "text-foreground",
                    "shadow-sm",
                    "hover:bg-white/20 dark:hover:bg-white/10",
                    "hover:border-white/30 dark:hover:border-white/20",
                    "active:scale-[0.98] active:bg-white/25 dark:active:bg-white/15",
                ].join(" "),
                solid: [
                    "bg-white/30 dark:bg-white/15",
                    "backdrop-blur-lg",
                    "border border-white/30 dark:border-white/20",
                    "text-foreground",
                    "shadow-md",
                    "hover:bg-white/40 dark:hover:bg-white/20",
                    "hover:border-white/40 dark:hover:border-white/30",
                    "active:scale-[0.98] active:bg-white/50 dark:active:bg-white/25",
                ].join(" "),
                ghost: [
                    "bg-transparent",
                    "text-foreground",
                    "hover:bg-white/10 dark:hover:bg-white/5",
                    "hover:backdrop-blur-sm",
                    "active:bg-white/15 dark:active:bg-white/10",
                ].join(" "),
                outline: [
                    "bg-transparent",
                    "backdrop-blur-sm",
                    "border border-white/30 dark:border-white/20",
                    "text-foreground",
                    "hover:bg-white/10 dark:hover:bg-white/5",
                    "hover:border-white/40 dark:hover:border-white/30",
                    "active:bg-white/15 dark:active:bg-white/10",
                ].join(" "),
            },
            size: {
                // Mobile: min-h-[44px] for touch targets (Requirements 6.2)
                default: "h-9 min-h-[44px] md:min-h-0 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 min-h-[44px] md:min-h-0 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
                lg: "h-10 min-h-[44px] md:min-h-0 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface GlassButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
    asChild?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-slot="glass-button"
                className={cn(glassButtonVariants({ variant, size, className }))}
                {...props}
            />
        )
    }
)

GlassButton.displayName = "GlassButton"

export { GlassButton, glassButtonVariants }
