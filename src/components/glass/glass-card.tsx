import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { GlassPanel, type GlassPanelProps } from "./glass-panel"

/**
 * GlassCard - 液态玻璃卡片组件
 * 
 * 基于 GlassPanel 封装卡片样式
 * 实现悬停动画效果 (translateY(-4px) + 光泽度增强)
 * 
 * Requirements: 3.1, 3.2
 */

const glassCardVariants = cva(
    [
        "rounded-xl shadow-sm",
        // Using unified transition duration (200ms) within 150ms-300ms range (Requirements 7.1)
        "transition-all duration-[var(--transition-normal)] ease-out",
        // Hover effects: lift + increased luminosity
        "hover:-translate-y-1 hover:shadow-md",
        "hover:border-white/30 dark:hover:border-white/20",
    ].join(" "),
    {
        variants: {
            variant: {
                default: "",
                interactive: "cursor-pointer active:scale-[0.98]",
            },
            size: {
                // Mobile: reduced padding (Requirements 6.3)
                sm: "p-2 md:p-3",
                md: "p-3 md:p-4",
                lg: "p-4 md:p-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface GlassCardProps
    extends Omit<GlassPanelProps, "as">,
    VariantProps<typeof glassCardVariants> {
    /**
     * Whether the card is clickable/interactive
     */
    interactive?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    (
        {
            className,
            variant,
            size,
            interactive,
            blur = "md",
            opacity = 0.15,
            border = true,
            children,
            ...props
        },
        ref
    ) => {
        const cardVariant = interactive ? "interactive" : variant

        return (
            <GlassPanel
                ref={ref}
                data-slot="glass-card"
                blur={blur}
                opacity={opacity}
                border={border}
                className={cn(
                    glassCardVariants({ variant: cardVariant, size }),
                    // Hover luminosity increase effect
                    "group",
                    className
                )}
                style={{
                    // Base glass effect
                    ...props.style,
                }}
                {...props}
            >
                {/* Hover glow overlay */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-[inherit] pointer-events-none",
                        "opacity-0 group-hover:opacity-100",
                        // Using unified transition duration (200ms) within 150ms-300ms range (Requirements 7.1)
                        "transition-opacity duration-[var(--transition-normal)]",
                        "bg-linear-to-br from-white/10 to-transparent"
                    )}
                />
                {children}
            </GlassPanel>
        )
    }
)

GlassCard.displayName = "GlassCard"

export { GlassCard, glassCardVariants }
