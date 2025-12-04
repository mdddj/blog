import React from "react";
import gaw from '../assets/gaw.png'
import { GlassPanel } from "./glass";

/**
 * Footer - 液态玻璃风格页脚组件
 * 
 * 实现要求:
 * - 使用玻璃面板样式 (Requirements 5.1)
 * - 限制高度为 80px (Requirements 5.1)
 * - 单行紧凑布局 (Requirements 5.2)
 * - 链接悬停玻璃光晕效果，150ms 过渡 (Requirements 5.3)
 */

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    external?: boolean;
}

/**
 * FooterLink - 带玻璃光晕悬停效果的链接
 * 150ms 过渡动画 (Requirements 5.3)
 */
const FooterLink: React.FC<FooterLinkProps> = ({
    href,
    children,
    className = "",
    external = true
}) => {
    return (
        <a
            href={href}
            rel={external ? "noreferrer" : undefined}
            target={external ? "_blank" : undefined}
            className={`
                relative px-2 py-1 rounded-md
                text-(--color-muted-foreground)
                transition-all duration-[var(--transition-fast)] ease-out
                hover:text-(--color-foreground)
                hover:bg-(--glass-highlight)
                hover:shadow-[0_0_12px_var(--color-primary)]
                dark:hover:shadow-[0_0_16px_oklch(65%_0.15_260/0.4)]
                ${className}
            `}
            data-testid="footer-link"
        >
            {children}
        </a>
    );
};

const Foot: React.FC = () => {
    return (
        <GlassPanel
            as="footer"
            blur="md"
            opacity={0.2}
            border={true}
            className="
                w-full max-h-[80px] h-[80px]
                flex items-center justify-center
                border-t border-x-0 border-b-0
                rounded-none
            "
            data-testid="footer"
        >
            <div className="
                container mx-auto px-4
                flex flex-wrap items-center justify-center
                gap-x-4 gap-y-1
                text-sm
            ">
                {/* Copyright */}
                <span className="text-(--color-muted-foreground)">
                    © 2025 梁典典的博客
                </span>

                {/* Separator - hidden on mobile */}
                <span className="hidden md:inline text-(--color-border)">|</span>

                {/* Essential Links - hidden on mobile for compact layout */}
                <div className="hidden md:flex items-center gap-2">
                    <FooterLink href="https://github.com/mdddj">
                        Github
                    </FooterLink>
                    <FooterLink href="https://manager.itbug.shop">
                        管理后台
                    </FooterLink>
                    <FooterLink href="https://apifox.com/apidoc/shared-6f74775d-40ca-4a07-ad1e-dd9c8480f927">
                        开放API
                    </FooterLink>
                </div>

                {/* Separator - hidden on mobile */}
                <span className="hidden md:inline text-(--color-border)">|</span>

                {/* ICP Information */}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    <FooterLink
                        href="https://beian.mps.gov.cn/#/query/webSearch?code=44011302004470"
                        className="flex items-center gap-1"
                    >
                        <img
                            src={gaw}
                            className="w-4 h-4 object-cover"
                            alt="备案"
                        />
                        <span className="hidden sm:inline">粤公网安备44011302004470</span>
                        <span className="sm:hidden">粤公网安备</span>
                    </FooterLink>
                    <FooterLink href="https://beian.miit.gov.cn/#/Integrated/recordQuery">
                        <span className="hidden sm:inline">赣ICP备17011549号-1</span>
                        <span className="sm:hidden">赣ICP备</span>
                    </FooterLink>
                </div>
            </div>
        </GlassPanel>
    );
};

export default Foot;
