import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * GlassPanel - 液态玻璃面板基础组件
 * 
 * 实现可配置的 blur、opacity、border 属性
 * 支持 sm/md/lg/xl 四种模糊级别 (8px/12px/16px/24px)
 * 
 * Requirements: 1.1, 1.2, 1.3
 */

const glassPanelVariants = cva(
    // Using unified transition duration (200ms) within 150ms-300ms range (Requirements 7.1)
    "relative transition-all duration-[var(--transition-normal)]",
    {
        variants: {
            blur: {
                // Desktop: 8px/12px/16px/24px, Mobile (<768px): 4px/8px/12px/16px via CSS variables
                sm: "backdrop-blur-[var(--glass-blur-sm)]",
                md: "backdrop-blur-[var(--glass-blur-md)]",
                lg: "backdrop-blur-[var(--glass-blur-lg)]",
                xl: "backdrop-blur-[var(--glass-blur-xl)]",
            },
            border: {
                true: "border border-white/20 dark:border-white/10",
                false: "",
            },
        },
        defaultVariants: {
            blur: "md",
            border: true,
        },
    }
)

export interface GlassPanelProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanelVariants> {
    /**
     * Background opacity value between 0.1 and 0.8
     * @default 0.1
     */
    opacity?: number
    /**
     * Element to render as
     * @default "div"
     */
    as?: React.ElementType
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
    (
        {
            className,
            blur,
            border,
            opacity = 0.1,
            as: Component = "div",
            style,
            children,
            ...props
        },
        ref
    ) => {
        // Clamp opacity between 0.1 and 0.8 as per Requirements 1.2
        const clampedOpacity = Math.min(0.8, Math.max(0.1, opacity))

        return (
            <Component
                ref={ref}
                data-slot="glass-panel"
                data-blur={blur}
                data-opacity={clampedOpacity}
                className={cn(glassPanelVariants({ blur, border }), className)}
                style={{
                    backgroundColor: `oklch(100% 0 0 / ${clampedOpacity})`,
                    ...style,
                }}
                {...props}
            >
                {/* Dark mode background overlay */}
                <div
                    className="absolute inset-0 pointer-events-none dark:block hidden rounded-[inherit]"
                    style={{
                        backgroundColor: `oklch(0% 0 0 / ${clampedOpacity * 0.5})`,
                    }}
                />
                <div className="relative z-10">{children}</div>
            </Component>
        )
    }
)

GlassPanel.displayName = "GlassPanel"

export { GlassPanel, glassPanelVariants }
