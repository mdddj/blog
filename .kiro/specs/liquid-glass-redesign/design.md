# Design Document: Liquid Glass Blog Redesign

## Overview

本设计文档描述了博客系统的全面视觉重构方案，采用 macOS 26 "液态玻璃"（Liquid Glass）设计理念。重构将创造一个独特的、具有深度感和动态响应的现代化博客界面。

### 设计目标

1. **独特性**：创造与市面上任何博客都不同的视觉风格
2. **沉浸感**：通过液态玻璃效果让用户沉浸在内容中
3. **精简性**：去除冗余元素，每个组件都精简到极致
4. **性能**：确保玻璃效果不影响页面性能

### 技术栈变更

- **移除**: DaisyUI
- **新增**: shadcn/ui + Radix UI
- **保留**: TailwindCSS, Framer Motion, React

## Architecture

```
src/
├── components/
│   ├── ui/                    # shadcn/ui 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── glass/                 # 液态玻璃定制组件
│   │   ├── glass-panel.tsx    # 玻璃面板基础组件
│   │   ├── glass-card.tsx     # 玻璃卡片
│   │   ├── glass-navbar.tsx   # 玻璃导航栏
│   │   └── glass-button.tsx   # 玻璃按钮
│   ├── blog/                  # 博客业务组件
│   │   ├── blog-card.tsx      # 博客卡片
│   │   ├── blog-detail.tsx    # 博客详情
│   │   └── blog-list.tsx      # 博客列表
│   ├── layout/                # 布局组件
│   │   ├── navbar.tsx         # 导航栏
│   │   ├── footer.tsx         # 页脚
│   │   └── container.tsx      # 容器
│   └── search/                # 搜索组件
│       ├── search-modal.tsx   # 搜索模态框
│       └── search-result.tsx  # 搜索结果
├── styles/
│   ├── globals.css            # 全局样式
│   ├── glass.css              # 玻璃效果样式
│   └── theme.css              # 主题变量
├── lib/
│   └── utils.ts               # 工具函数
└── hooks/
    ├── use-scroll.ts          # 滚动状态 hook
    └── use-theme.ts           # 主题 hook
```

## Components and Interfaces

### 1. GlassPanel - 玻璃面板基础组件

```typescript
interface GlassPanelProps {
  children: React.ReactNode;
  blur?: 'sm' | 'md' | 'lg' | 'xl';  // 8px | 12px | 16px | 24px
  opacity?: number;                   // 0.1 - 0.8
  border?: boolean;                   // 是否显示玻璃边框
  className?: string;
}
```

### 2. BlogCard - 博客卡片组件

```typescript
interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'compact';
}

// 卡片结构：
// - 标题：最多2行，字体 text-base font-medium
// - 描述：最多1行，字体 text-sm text-muted
// - 元信息：日期 + 分类，单行
// - 标签：最多3个，溢出显示 +N
```

### 3. Navbar - 导航栏组件

```typescript
interface NavbarProps {
  title: string;
  links: NavLink[];
}

// 状态：
// - 初始：完全透明
// - 滚动后：毛玻璃效果 (backdrop-blur-md)
// - 高度：固定 56px
```

### 4. SearchModal - 搜索模态框

```typescript
interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 结构：
// - 全屏玻璃遮罩
// - 居中搜索框
// - 实时结果下拉
```

### 5. ArticleView - 文章视图组件

```typescript
interface ArticleViewProps {
  blog: Blog;
}

// 结构：
// - 文章头部：标题 + 元信息
// - 文章内容：max-w-[720px] leading-[1.75]
// - 浮动操作：左侧玻璃按钮组
// - 目录：右侧浮动面板 (>1280px)
// - 进度条：顶部细线
```

## Data Models

数据模型保持不变，复用现有的 `Blog`, `Category`, `Tag` 接口：

```typescript
// 现有模型 - 无需修改
interface Blog {
  id: number;
  title: string;
  content: string;
  createTime: Date;
  category: Category;
  author: string;
  thumbnail: string;
  dateString: string;
  tags: Tag[];
  aliasString: string;
  html: string;
  description: string | undefined;
}

interface Category {
  id: number;
  name: string;
  logo: string;
  intro: string;
  createTime: Date;
}

interface Tag {
  id: number;
  name: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following correctness properties have been identified:

### Property 1: Glass elements have valid blur values
*For any* glass element rendered by the Blog System, the computed backdrop-filter blur value SHALL be between 8px and 24px inclusive.
**Validates: Requirements 1.1**

### Property 2: Glass backgrounds have valid transparency
*For any* glass component background color, the alpha channel value SHALL be between 0.1 and 0.8 inclusive.
**Validates: Requirements 1.2**

### Property 3: Glass borders are correctly styled
*For any* glass element with border enabled, the border SHALL be 1px solid with a semi-transparent white or black color.
**Validates: Requirements 1.3**

### Property 4: Navbar scroll state transition
*For any* scroll position, when scroll position exceeds 50px, the navbar SHALL have backdrop-blur applied; when scroll position is 0, the navbar SHALL have transparent background.
**Validates: Requirements 2.1, 2.2**

### Property 5: Navbar height constraint
*For any* rendered navbar, the computed height SHALL not exceed 56px.
**Validates: Requirements 2.4**

### Property 6: Navigation hover effects
*For any* navigation item, when hovered, the element SHALL have a visible highlight effect with transition-duration of 150ms.
**Validates: Requirements 2.3**

### Property 7: Blog card dimensions
*For any* rendered blog card, the content area height SHALL not exceed 120px.
**Validates: Requirements 3.1**

### Property 8: Blog card hover transform
*For any* blog card when hovered, the transform SHALL include translateY(-4px).
**Validates: Requirements 3.2**

### Property 9: Blog card content structure
*For any* blog card with a blog containing N tags where N > 3, the card SHALL display exactly 3 tag elements plus an overflow indicator showing the remaining count.
**Validates: Requirements 3.3, 3.4**

### Property 10: Article container width
*For any* article content container, the computed max-width SHALL be 720px.
**Validates: Requirements 4.1**

### Property 11: Article metadata completeness
*For any* article view, the metadata section SHALL contain author name, publication date, category name, and all tags.
**Validates: Requirements 4.2**

### Property 12: Reading progress indicator
*For any* scroll position in article view, the progress indicator width percentage SHALL equal (scrollTop / (scrollHeight - clientHeight)) * 100.
**Validates: Requirements 4.3**

### Property 13: Floating actions visibility
*For any* article view where scroll position exceeds the header height, the floating action buttons SHALL be visible.
**Validates: Requirements 4.5**

### Property 14: Footer structure and dimensions
*For any* rendered footer, the height SHALL not exceed 80px and SHALL contain copyright text, navigation links, and ICP information.
**Validates: Requirements 5.1, 5.2**

### Property 15: Footer link hover effects
*For any* footer link when hovered, the element SHALL have a glow effect with transition-duration of 150ms.
**Validates: Requirements 5.3**

### Property 16: Mobile blur optimization
*For any* glass element rendered on viewport width less than 768px, the backdrop-filter blur value SHALL be reduced compared to desktop values.
**Validates: Requirements 6.1**

### Property 17: Touch target minimum size
*For any* interactive element rendered on mobile viewport, the computed width and height SHALL both be at least 44px.
**Validates: Requirements 6.2**

### Property 18: Transition duration bounds
*For any* UI element with CSS transitions, the transition-duration SHALL be between 150ms and 300ms.
**Validates: Requirements 7.1**

### Property 19: List item staggered animation
*For any* list of items loaded dynamically, each item SHALL have an animation-delay that increases sequentially.
**Validates: Requirements 7.2**

### Property 20: Color space consistency
*For any* color value in the theme, the color SHALL be defined using oklch color space.
**Validates: Requirements 8.1**

### Property 21: Theme transition smoothness
*For any* theme switch operation, color-related CSS properties SHALL have transition-duration of 300ms.
**Validates: Requirements 8.4**

### Property 22: Search results rendering
*For any* search query with results, each result item SHALL contain a title element and an excerpt element.
**Validates: Requirements 9.2, 9.3**

### Property 23: shadcn component glass styling
*For any* shadcn Button, Input, or DropdownMenu component, the component SHALL have glass variant styles applied including semi-transparent background and backdrop-blur.
**Validates: Requirements 10.2, 10.3, 10.4**

## Error Handling

### 组件错误边界

```typescript
// 每个主要组件都应包裹在错误边界中
<ErrorBoundary fallback={<GlassErrorCard />}>
  <BlogCard blog={blog} />
</ErrorBoundary>
```

### 图片加载失败

- 分类 logo 加载失败时显示默认占位符
- 使用 CSS 渐变作为后备背景

### 数据缺失处理

- 博客描述为空时隐藏描述区域
- 标签为空时隐藏标签区域
- 分类信息缺失时显示"未分类"

## Testing Strategy

### 单元测试

使用 Vitest 进行单元测试：

- 测试 GlassPanel 组件的 blur 和 opacity 属性渲染
- 测试 BlogCard 的标签截断逻辑
- 测试 Navbar 的滚动状态切换
- 测试主题切换功能

### 属性测试

使用 fast-check 进行属性测试：

- 验证所有玻璃组件的样式属性在有效范围内
- 验证博客卡片对任意数量标签的正确处理
- 验证滚动位置与进度条的数学关系
- 验证响应式断点的正确行为

### 测试配置

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### 属性测试示例

```typescript
// 使用 fast-check 进行属性测试
import * as fc from 'fast-check';

// Property 9: Blog card tag overflow
test('blog card displays max 3 tags with overflow indicator', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({ id: fc.nat(), name: fc.string() }), { minLength: 0, maxLength: 20 }),
      (tags) => {
        const { container } = render(<BlogCard blog={{ ...mockBlog, tags }} />);
        const tagElements = container.querySelectorAll('[data-testid="tag"]');
        const overflowIndicator = container.querySelector('[data-testid="tag-overflow"]');
        
        if (tags.length <= 3) {
          expect(tagElements.length).toBe(tags.length);
          expect(overflowIndicator).toBeNull();
        } else {
          expect(tagElements.length).toBe(3);
          expect(overflowIndicator).toHaveTextContent(`+${tags.length - 3}`);
        }
      }
    ),
    { numRuns: 100 }
  );
});
```
