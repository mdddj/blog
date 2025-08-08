# IDEA UI 组件库快速上手指南

## 🚀 5分钟快速开始

### 1. 导入组件

```typescript
import { Button, FileTree, Input, Panel, IdeaTheme } from '../components/idea-ui';
```

### 2. 设置主题

```typescript
// 在应用启动时设置主题
IdeaTheme.setTheme('dark'); // 或 'light'
```

### 3. 使用组件

```typescript
function MyApp() {
  return (
    <div className="p-4">
      <Panel title="我的面板" collapsible>
        <div className="space-y-4">
          <Input 
            label="用户名" 
            placeholder="请输入用户名..." 
            clearable 
          />
          <Button variant="primary" onClick={() => alert('Hello!')}>
            点击我
          </Button>
        </div>
      </Panel>
    </div>
  );
}
```

## 📱 常用组件示例

### 按钮组合

```typescript
<div className="flex gap-2">
  <Button variant="primary">主要按钮</Button>
  <Button variant="secondary">次要按钮</Button>
  <Button variant="ghost">幽灵按钮</Button>
  <Button variant="danger">危险按钮</Button>
</div>
```

### 表单输入

```typescript
<div className="space-y-4 max-w-md">
  <Input 
    label="邮箱" 
    type="email" 
    placeholder="your@email.com"
    leftIcon={<MailIcon />}
  />
  <Input 
    label="密码" 
    type="password" 
    placeholder="请输入密码"
    error="密码长度至少8位"
  />
  <TextArea 
    label="备注" 
    placeholder="请输入备注信息..."
    rows={3}
  />
</div>
```

### 文件树

```typescript
const files = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      { id: '2', name: 'App.tsx', type: 'file', path: '/src/App.tsx' },
      { id: '3', name: 'index.css', type: 'file', path: '/src/index.css' }
    ]
  }
];

<FileTree 
  data={files}
  onSelect={(node) => console.log('选中:', node.name)}
  showFileSize
/>
```

### 菜单系统

```typescript
const menuItems = [
  {
    key: 'file',
    label: '文件',
    children: [
      { key: 'new', label: '新建', shortcut: 'Ctrl+N' },
      { key: 'open', label: '打开', shortcut: 'Ctrl+O' }
    ]
  }
];

<DropdownMenu
  trigger={<Button>菜单 ▼</Button>}
  items={menuItems}
  onSelect={(key) => console.log('选择:', key)}
/>
```

### 分割面板

```typescript
<div className="h-96">
  <SplitPanel direction="horizontal" defaultSizes={[70, 30]}>
    <div className="p-4">主内容区域</div>
    <div className="p-4">侧边栏</div>
  </SplitPanel>
</div>
```

### 标签页

```typescript
<TabPanel
  tabs={[
    {
      key: 'code',
      title: '代码',
      icon: <CodeIcon />,
      content: <div>代码编辑器</div>
    },
    {
      key: 'preview',
      title: '预览',
      content: <div>预览内容</div>,
      closable: true
    }
  ]}
/>
```

## 🎨 主题切换

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  
  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    IdeaTheme.setTheme(newTheme);
  };
  
  return (
    <Button onClick={toggle}>
      {theme === 'dark' ? '🌞' : '🌙'} 
      切换到{theme === 'dark' ? '浅色' : '深色'}主题
    </Button>
  );
}
```

## 🔄 状态管理

```typescript
function FileExplorer() {
  const [selectedFile, setSelectedFile] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(['1']);
  
  return (
    <FileTree
      data={fileData}
      selectedId={selectedFile}
      expandedIds={expandedFolders}
      onSelect={(node) => setSelectedFile(node.id)}
      onExpand={(nodeId, expanded) => {
        setExpandedFolders(prev => 
          expanded 
            ? [...prev, nodeId]
            : prev.filter(id => id !== nodeId)
        );
      }}
    />
  );
}
```

## 📦 完整示例 - IDE 布局

```typescript
function IDELayout() {
  const [activeTab, setActiveTab] = useState('editor');
  const [sidebarWidth, setSidebarWidth] = useState(300);
  
  return (
    <div className="h-screen flex flex-col">
      {/* 顶部工具栏 */}
      <div className="h-12 border-b flex items-center px-4">
        <DropdownMenu
          trigger={<Button variant="ghost">文件</Button>}
          items={fileMenuItems}
        />
        <DropdownMenu
          trigger={<Button variant="ghost">编辑</Button>}
          items={editMenuItems}
        />
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 flex">
        <SplitPanel 
          direction="horizontal"
          defaultSizes={[25, 75]}
          onResize={([left]) => setSidebarWidth(left)}
        >
          {/* 左侧文件树 */}
          <Panel title="项目" className="h-full">
            <FileTree
              data={projectFiles}
              onSelect={openFile}
              showFileSize
            />
          </Panel>
          
          {/* 右侧编辑区 */}
          <SplitPanel direction="vertical" defaultSizes={[70, 30]}>
            <TabPanel
              tabs={openTabs}
              activeKey={activeTab}
              onTabChange={setActiveTab}
              onTabClose={closeTab}
            />
            
            {/* 底部面板 */}
            <TabPanel
              placement="bottom"
              tabs={[
                {
                  key: 'terminal',
                  title: '终端',
                  content: <Terminal />
                },
                {
                  key: 'output',
                  title: '输出',
                  content: <Output />
                }
              ]}
            />
          </SplitPanel>
        </SplitPanel>
      </div>
    </div>
  );
}
```

## ⚡ 性能优化技巧

### 1. 大列表使用虚拟滚动

```typescript
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

### 2. 延迟加载文件树

```typescript
<FileTree
  data={fileTree}
  onExpand={(nodeId, expanded) => {
    if (expanded && !loadedNodes.has(nodeId)) {
      loadChildrenAsync(nodeId);
    }
  }}
/>
```

### 3. 模态框按需渲染

```typescript
{showModal && (
  <Modal
    open={showModal}
    destroyOnClose
    onClose={() => setShowModal(false)}
  >
    <ExpensiveComponent />
  </Modal>
)}
```

## 🎯 最佳实践

1. **保持主题一致性** - 在应用根部设置主题
2. **合理使用面板** - 用 Panel 组织相关功能
3. **响应式设计** - 根据屏幕大小调整布局
4. **键盘导航** - 支持快捷键操作
5. **状态管理** - 合理管理组件状态

## 🔍 调试技巧

```typescript
// 查看当前主题
console.log('当前主题:', IdeaTheme.getTheme());

// 监听组件事件
<FileTree
  onSelect={(node) => console.log('选中文件:', node)}
  onContextMenu={(node, event) => console.log('右键菜单:', node)}
/>
```

## 📚 更多资源

- 查看 `Demo.tsx` 获取完整示例
- 阅读 `README.md` 了解详细API
- 访问 `/idea-demo` 页面查看实时演示

Happy Coding! 🎉