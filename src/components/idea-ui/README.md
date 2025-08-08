# IntelliJ IDEA Style React Components

一套基于 IntelliJ IDEA 设计风格的 React 组件库，提供了现代化的 IDE 界面组件。

## 特性

- 🎨 **IDEA 风格设计** - 完全仿照 IntelliJ IDEA 的视觉设计
- 🌓 **深色/浅色主题** - 支持主题切换
- 📱 **响应式设计** - 适配不同屏幕尺寸
- ⚡ **TypeScript 支持** - 完整的类型定义
- 🎯 **易于使用** - 简洁的 API 设计
- 🎪 **丰富的组件** - 包含常用的 IDE 界面组件

## 安装

```bash
# 如果你在现有项目中使用
npm install # 或者直接复制组件文件到你的项目中
```

## 快速开始

```typescript
import React from 'react';
import { Button, FileTree, IdeaTheme } from './components/idea-ui';

// 设置主题
IdeaTheme.setTheme('dark'); // 或 'light'

function App() {
  return (
    <div className="p-4">
      <Button variant="primary" onClick={() => console.log('点击了!')}>
        Hello IDEA UI
      </Button>
    </div>
  );
}
```

## 组件列表

### 基础组件

#### Button 按钮
支持多种样式和状态的按钮组件。

```typescript
<Button variant="primary" size="md" loading={false}>
  主要按钮
</Button>
<Button variant="secondary" icon={<Icon />} iconPosition="left">
  带图标按钮
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost' | 'danger' | 'success'`
- `size`: `'sm' | 'md' | 'lg'`
- `loading`: `boolean`
- `icon`: `ReactNode`
- `iconPosition`: `'left' | 'right'`
- `fullWidth`: `boolean`

#### Input 输入框
功能丰富的输入框组件。

```typescript
<Input
  label="用户名"
  placeholder="请输入用户名"
  leftIcon={<SearchIcon />}
  clearable
  error="用户名不能为空"
/>

<TextArea
  label="描述"
  placeholder="请输入描述"
  rows={4}
/>
```

**Input Props:**
- `label`: `string` - 标签文本
- `error`: `string` - 错误信息
- `helperText`: `string` - 帮助文本
- `leftIcon` / `rightIcon`: `ReactNode` - 左右图标
- `variant`: `'default' | 'filled' | 'borderless'`
- `clearable`: `boolean` - 是否可清空

### 导航组件

#### Menu 菜单
支持多级嵌套的菜单组件。

```typescript
const menuItems = [
  {
    key: 'file',
    label: '文件',
    icon: <FileIcon />,
    children: [
      { key: 'new', label: '新建', shortcut: 'Ctrl+N' },
      { key: 'open', label: '打开', shortcut: 'Ctrl+O' }
    ]
  }
];

<Menu items={menuItems} onSelect={(key) => console.log(key)} />

<DropdownMenu
  trigger={<Button>菜单</Button>}
  items={menuItems}
  placement="bottom-start"
/>
```

#### FileTree 文件树
类似 IDE 的文件资源管理器。

```typescript
const fileData = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      { id: '2', name: 'App.tsx', type: 'file', path: '/src/App.tsx' }
    ]
  }
];

<FileTree
  data={fileData}
  onSelect={(node) => console.log('选中:', node.name)}
  showFileSize
  allowMultiSelect
/>
```

### 数据展示

#### List 列表
功能强大的列表组件，支持搜索、虚拟滚动等。

```typescript
const listItems = [
  {
    id: '1',
    content: 'TypeScript 文件',
    subtitle: 'src/App.tsx',
    icon: <TSIcon />,
    rightContent: <span>2.1 KB</span>
  }
];

<List
  items={listItems}
  searchable
  multiSelect
  onSelect={(item, selectedItems) => console.log(selectedItems)}
/>

// 虚拟列表适用于大数据量
<VirtualList
  items={largeDataSet}
  itemHeight={40}
  containerHeight={400}
/>
```

### 布局组件

#### Panel 面板
可折叠的面板容器。

```typescript
<Panel 
  title="代码编辑器" 
  collapsible 
  defaultCollapsed={false}
  headerActions={<Button size="sm">操作</Button>}
>
  <div>面板内容</div>
</Panel>
```

#### SplitPanel 分割面板
可调整大小的分割面板。

```typescript
<SplitPanel
  direction="horizontal"
  defaultSizes={[70, 30]}
  onResize={(sizes) => console.log('面板大小:', sizes)}
>
  <div>左侧内容</div>
  <div>右侧内容</div>
</SplitPanel>
```

#### TabPanel 标签页
标签页容器组件。

```typescript
<TabPanel
  tabs={[
    {
      key: 'editor',
      title: '编辑器',
      icon: <EditorIcon />,
      content: <div>编辑器内容</div>,
      closable: true
    }
  ]}
  onTabChange={(key) => console.log('切换到:', key)}
  onTabClose={(key) => console.log('关闭:', key)}
/>
```

### 反馈组件

#### Modal 模态框
多种类型的模态框。

```typescript
// 基础模态框
<Modal
  open={visible}
  title="设置"
  size="md"
  onOk={() => console.log('确定')}
  onCancel={() => setVisible(false)}
>
  <div>模态框内容</div>
</Modal>

// 确认对话框
<ConfirmModal
  open={confirmVisible}
  type="warning"
  title="确认删除"
  content="确定要删除这个文件吗？"
  onOk={() => handleDelete()}
/>
```

#### Drawer 抽屉
从侧边滑出的面板。

```typescript
<Drawer
  open={drawerVisible}
  title="设置面板"
  placement="right"
  width={400}
  onClose={() => setDrawerVisible(false)}
>
  <div>抽屉内容</div>
</Drawer>
```

## 主题系统

组件库提供了完整的主题系统，支持浅色和深色主题。

```typescript
import { IdeaTheme } from './components/idea-ui';

// 设置主题
IdeaTheme.setTheme('dark');   // 深色主题
IdeaTheme.setTheme('light');  // 浅色主题

// 获取当前主题
const currentTheme = IdeaTheme.getTheme();

// 切换主题
IdeaTheme.toggleTheme();
```

### 自定义主题

你可以通过 CSS 变量来自定义主题：

```css
:root {
  --idea-bg-primary: #2B2B2B;
  --idea-bg-secondary: #3C3F41;
  --idea-text-primary: #BBBBBB;
  --idea-text-secondary: #919191;
  --idea-border-default: #323232;
  /* 更多变量... */
}

.idea-theme-light {
  --idea-bg-primary: #F7F8FA;
  --idea-bg-secondary: #FFFFFF;
  --idea-text-primary: #000000;
  /* 浅色主题变量... */
}
```

## 样式系统

组件使用了 CSS 变量和实用类：

```css
/* 背景色 */
.idea-bg-primary { background-color: var(--idea-bg-primary); }
.idea-bg-secondary { background-color: var(--idea-bg-secondary); }

/* 文字颜色 */
.idea-text-primary { color: var(--idea-text-primary); }
.idea-text-secondary { color: var(--idea-text-secondary); }

/* 边框 */
.idea-border { border: 1px solid var(--idea-border-default); }

/* 圆角 */
.idea-rounded-sm { border-radius: var(--idea-radius-sm); }
```

## 最佳实践

### 1. 主题一致性
确保在应用根部设置主题，并保持一致：

```typescript
// App.tsx
import { IdeaTheme } from './components/idea-ui';

function App() {
  useEffect(() => {
    IdeaTheme.setTheme('dark'); // 设置默认主题
  }, []);

  return (
    <div className="idea-theme-dark"> {/* 或 idea-theme-light */}
      {/* 你的应用内容 */}
    </div>
  );
}
```

### 2. 响应式设计
组件已经内置了响应式支持，但你可以进一步优化：

```typescript
<SplitPanel
  direction={isMobile ? 'vertical' : 'horizontal'}
  defaultSizes={isMobile ? [60, 40] : [70, 30]}
>
  {/* 面板内容 */}
</SplitPanel>
```

### 3. 性能优化
对于大数据量，使用虚拟化组件：

```typescript
// 超过 100 项时使用虚拟列表
{items.length > 100 ? (
  <VirtualList
    items={items}
    itemHeight={32}
    containerHeight={400}
  />
) : (
  <List items={items} />
)}
```

### 4. 键盘导航
组件已经内置了键盘支持，确保你的应用也支持：

```typescript
<FileTree
  data={fileData}
  onSelect={(node) => {
    // 使用 Enter 键选择
    if (node.type === 'file') {
      openFile(node.path);
    }
  }}
  // 支持方向键导航
/>
```

## 示例

查看 `Demo.tsx` 文件以获取完整的使用示例。

## 浏览器支持

- Chrome >= 60
- Firefox >= 60  
- Safari >= 12
- Edge >= 79

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 包含所有基础组件
- 支持深色/浅色主题
- 完整的 TypeScript 支持