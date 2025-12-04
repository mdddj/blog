import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./glass";

/**
 * BlogCardSkeleton - 玻璃风格博客卡片骨架屏
 * 
 * 加载状态下显示的占位组件
 * - 玻璃面板背景
 * - 脉冲动画效果
 * - 模拟真实卡片布局
 * 
 * Requirements: 7.1
 */

// 骨架条组件
const SkeletonBar: React.FC<{
    className?: string;
    width?: string;
}> = ({ className, width = "100%" }) => {
    return (
        <div
            className={cn(
                "h-4 rounded-md",
                "bg-white/10 dark:bg-white/5",
                "animate-pulse",
                className
            )}
            style={{ width }}
        />
    );
};

// 骨架圆形组件
const SkeletonCircle: React.FC<{
    size?: number;
    className?: string;
}> = ({ size = 16, className }) => {
    return (
        <div
            className={cn(
                "rounded-full",
                "bg-white/10 dark:bg-white/5",
                "animate-pulse",
                className
            )}
            style={{ width: size, height: size }}
        />
    );
};

// 骨架药丸组件（用于标签）
const SkeletonPill: React.FC<{
    width?: number;
    className?: string;
}> = ({ width = 48, className }) => {
    return (
        <div
            className={cn(
                "h-5 rounded-full",
                "bg-white/10 dark:bg-white/5",
                "animate-pulse",
                className
            )}
            style={{ width }}
        />
    );
};

// 博客卡片骨架屏
export const BlogCardSkeleton: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <GlassCard
            blur="md"
            opacity={0.1}
            size="md"
            className={cn("overflow-hidden", className)}
        >
            <div className="space-y-3">
                {/* 标题骨架：2行 */}
                <div className="space-y-2">
                    <SkeletonBar width="85%" className="h-5" />
                    <SkeletonBar width="60%" className="h-5" />
                </div>

                {/* 描述骨架：1行 */}
                <SkeletonBar width="90%" className="h-4 opacity-70" />

                {/* 元信息骨架：日期 + 分类 */}
                <div className="flex items-center gap-2">
                    <SkeletonBar width="60px" className="h-3" />
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-1.5">
                        <SkeletonCircle size={16} />
                        <SkeletonBar width="50px" className="h-3" />
                    </div>
                </div>

                {/* 标签骨架 */}
                <div className="flex gap-1.5">
                    <SkeletonPill width={52} />
                    <SkeletonPill width={44} />
                    <SkeletonPill width={56} />
                </div>
            </div>
        </GlassCard>
    );
};

// 导出骨架条组件供其他地方使用
export { SkeletonBar, SkeletonCircle, SkeletonPill };
