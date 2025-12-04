import { useState, useEffect, useCallback } from "react"

/**
 * useScroll - 滚动位置监听 hook
 * 
 * 实现滚动位置监听，提供滚动状态（是否超过阈值）
 * 
 * Requirements: 2.1, 2.2
 * - WHEN the page loads THEN the Blog System SHALL render a navigation bar with fully transparent background
 * - WHEN the user scrolls past 50 pixels THEN the Blog System SHALL transition the navigation bar to a frosted glass state
 */

export interface UseScrollOptions {
    /**
     * Scroll threshold in pixels
     * @default 50
     */
    threshold?: number
    /**
     * Throttle delay in milliseconds for scroll event
     * @default 10
     */
    throttleMs?: number
}

export interface UseScrollReturn {
    /**
     * Current scroll position in pixels
     */
    scrollY: number
    /**
     * Whether scroll position has exceeded the threshold
     */
    isScrolled: boolean
    /**
     * Scroll direction: 'up' | 'down' | null
     */
    direction: "up" | "down" | null
}

/**
 * Hook to monitor scroll position and provide scroll state
 * 
 * @param options - Configuration options
 * @returns Scroll state object
 * 
 * @example
 * ```tsx
 * const { isScrolled, scrollY, direction } = useScroll({ threshold: 50 })
 * 
 * return (
 *   <nav className={isScrolled ? 'glass-navbar' : 'transparent-navbar'}>
 *     ...
 *   </nav>
 * )
 * ```
 */
export function useScroll(options: UseScrollOptions = {}): UseScrollReturn {
    const { threshold = 50, throttleMs = 10 } = options

    const [scrollY, setScrollY] = useState(0)
    const [direction, setDirection] = useState<"up" | "down" | null>(null)
    const [lastScrollY, setLastScrollY] = useState(0)

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY

        // Update direction
        if (currentScrollY > lastScrollY) {
            setDirection("down")
        } else if (currentScrollY < lastScrollY) {
            setDirection("up")
        }

        setLastScrollY(currentScrollY)
        setScrollY(currentScrollY)
    }, [lastScrollY])

    useEffect(() => {
        // Set initial scroll position
        setScrollY(window.scrollY)
        setLastScrollY(window.scrollY)

        let ticking = false
        let lastTime = 0

        const throttledScroll = () => {
            const now = Date.now()

            if (now - lastTime >= throttleMs) {
                handleScroll()
                lastTime = now
                ticking = false
            } else if (!ticking) {
                ticking = true
                requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                    lastTime = Date.now()
                })
            }
        }

        window.addEventListener("scroll", throttledScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", throttledScroll)
        }
    }, [handleScroll, throttleMs])

    const isScrolled = scrollY > threshold

    return {
        scrollY,
        isScrolled,
        direction,
    }
}

export default useScroll
