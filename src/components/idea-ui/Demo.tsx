import React, { useState } from "react";
import { FileTree, FileTreeNode } from "./FileTree";
import {
  Button,
  ConfirmModal,
  Drawer,
  DropdownMenu,
  IdeaTheme,
  Input,
  List,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  Panel,
  SplitPanel,
  TabPanel,
  TextArea,
} from ".";

const IdeaUIDemo: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    IdeaTheme.setTheme(newTheme);
  };

  // Sample data for FileTree
  const fileTreeData: FileTreeNode[] = [
    {
      id: "1",
      name: "src",
      type: "folder",
      path: "/src",
      children: [
        {
          id: "2",
          name: "components",
          type: "folder",
          path: "/src/components",
          children: [
            {
              id: "3",
              name: "Button.tsx",
              type: "file",
              path: "/src/components/Button.tsx",
              size: 2048,
            },
            {
              id: "4",
              name: "Input.tsx",
              type: "file",
              path: "/src/components/Input.tsx",
              size: 3072,
            },
          ],
        },
        {
          id: "5",
          name: "App.tsx",
          type: "file",
          path: "/src/App.tsx",
          size: 1024,
        },
        {
          id: "6",
          name: "index.ts",
          type: "file",
          path: "/src/index.ts",
          size: 512,
        },
      ],
    },
    {
      id: "7",
      name: "package.json",
      type: "file",
      path: "/package.json",
      size: 1536,
      isReadonly: true,
    },
    {
      id: "8",
      name: ".gitignore",
      type: "file",
      path: "/.gitignore",
      size: 256,
      isHidden: true,
    },
  ];

  // Sample data for Menu
  const menuItems: MenuItem[] = [
    {
      key: "file",
      label: "File",
      icon: <span>📁</span>,
      children: [
        {
          key: "new",
          label: "New File",
          shortcut: "Ctrl+N",
          onClick: () => console.log("New file"),
        },
        {
          key: "open",
          label: "Open File",
          shortcut: "Ctrl+O",
          onClick: () => console.log("Open file"),
        },
        { key: "divider1", label: "", divider: true },
        {
          key: "save",
          label: "Save",
          shortcut: "Ctrl+S",
          onClick: () => console.log("Save"),
        },
      ],
    },
    {
      key: "edit",
      label: "Edit",
      icon: <span>✏️</span>,
      children: [
        {
          key: "undo",
          label: "Undo",
          shortcut: "Ctrl+Z",
          onClick: () => console.log("Undo"),
        },
        {
          key: "redo",
          label: "Redo",
          shortcut: "Ctrl+Y",
          onClick: () => console.log("Redo"),
        },
      ],
    },
    {
      key: "view",
      label: "View",
      icon: <span>👁️</span>,
      onClick: () => console.log("View clicked"),
    },
  ];

  // Sample data for List
  const listItems: ListItem[] = [
    {
      id: "1",
      content: "TypeScript File",
      subtitle: "src/components/Button.tsx",
      icon: <span style={{ color: "#3178c6" }}>TS</span>,
      rightContent: <span className="text-xs opacity-60">2.1 KB</span>,
    },
    {
      id: "2",
      content: "JavaScript File",
      subtitle: "src/utils/helpers.js",
      icon: <span style={{ color: "#f7df1e" }}>JS</span>,
      rightContent: <span className="text-xs opacity-60">1.5 KB</span>,
    },
    {
      id: "3",
      content: "CSS File",
      subtitle: "src/styles/main.css",
      icon: <span style={{ color: "#1572b6" }}>CSS</span>,
      rightContent: <span className="text-xs opacity-60">3.2 KB</span>,
    },
    { id: "divider", content: "", divider: true },
    {
      id: "4",
      content: "HTML File",
      subtitle: "public/index.html",
      icon: <span style={{ color: "#e34f26" }}>HTML</span>,
      rightContent: <span className="text-xs opacity-60">0.8 KB</span>,
    },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "idea-theme-light" : ""}`}
      style={{ backgroundColor: "var(--idea-bg-primary)" }}
    >
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--idea-text-primary)" }}
          >
            IntelliJ IDEA Style Components Demo
          </h1>
          <Button onClick={toggleTheme} variant="secondary">
            {theme === "light" ? "🌙" : "☀️"} Switch to{" "}
            {theme === "light" ? "Dark" : "Light"} Theme
          </Button>
        </div>

        {/* Buttons Section */}
        <Panel title="Buttons" collapsible>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="success">Success Button</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button icon={<span>🚀</span>} iconPosition="left">
                With Icon
              </Button>
            </div>
          </div>
        </Panel>

        {/* Inputs Section */}
        <Panel title="Input Components" collapsible>
          <div className="space-y-4 max-w-md">
            <Input
              label="Default Input"
              placeholder="Enter some text..."
              helperText="This is a helper text"
            />
            <Input
              label="Input with Icon"
              placeholder="Search..."
              leftIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              clearable
            />
            <Input
              label="Error Input"
              placeholder="Enter email..."
              error="Please enter a valid email address"
              variant="default"
            />
            <TextArea
              label="Text Area"
              placeholder="Enter multiple lines of text..."
              rows={4}
              helperText="You can resize this textarea vertically"
            />
          </div>
        </Panel>

        {/* Menu Section */}
        <Panel title="Menu Components" collapsible>
          <div className="space-y-4">
            <div>
              <h4
                className="text-sm font-medium mb-2"
                style={{ color: "var(--idea-text-primary)" }}
              >
                Dropdown Menu
              </h4>
              <DropdownMenu
                trigger={<Button variant="secondary">Open Menu ▼</Button>}
                items={menuItems}
                onSelect={(key) => console.log("Selected:", key)}
              />
            </div>
            <div>
              <h4
                className="text-sm font-medium mb-2"
                style={{ color: "var(--idea-text-primary)" }}
              >
                Static Menu
              </h4>
              <div className="max-w-xs">
                <Menu
                  items={menuItems}
                  onSelect={(key) => console.log("Selected:", key)}
                />
              </div>
            </div>
          </div>
        </Panel>

        {/* File Tree Section */}
        <Panel title="File Tree" collapsible>
          <div className="max-w-sm">
            <FileTree
              data={fileTreeData}
              selectedId={selectedFile}
              onSelect={(node) => {
                setSelectedFile(node.id);
                console.log("Selected file:", node);
              }}
              showFileSize
              onContextMenu={(node, event) => {
                console.log("Context menu for:", node.name, event);
              }}
            />
          </div>
        </Panel>

        {/* List Section */}
        <Panel title="List Component" collapsible>
          <div className="max-w-md">
            <List
              items={listItems}
              selectedId={selectedListItem}
              onSelect={(item) => {
                setSelectedListItem(item.id);
                console.log("Selected list item:", item);
              }}
              searchable
              searchPlaceholder="Search files..."
              maxHeight={300}
            />
          </div>
        </Panel>

        {/* Tab Panel Section */}
        <Panel title="Tab Panel" collapsible>
          <TabPanel
            tabs={[
              {
                key: "editor",
                title: "Editor",
                icon: <span>📝</span>,
                content: (
                  <div className="space-y-4">
                    <h3 style={{ color: "var(--idea-text-primary)" }}>
                      Code Editor
                    </h3>
                    <div
                      className="p-4 bg-gray-100 rounded font-mono text-sm"
                      style={{ backgroundColor: "var(--idea-bg-tertiary)" }}
                    >
                      <div style={{ color: "var(--idea-text-accent)" }}>
                        function
                      </div>
                      <div style={{ color: "var(--idea-text-primary)" }}>
                        {" "}
                        hello() {`{`}
                      </div>
                      <div style={{ color: "var(--idea-text-primary)" }}>
                        {" "}
                        console.log('Hello, World!');
                      </div>
                      <div style={{ color: "var(--idea-text-primary)" }}>
                        {" "}
                        {`}`}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "terminal",
                title: "Terminal",
                icon: <span>💻</span>,
                content: (
                  <div className="space-y-4">
                    <h3 style={{ color: "var(--idea-text-primary)" }}>
                      Terminal Output
                    </h3>
                    <div className="p-4 bg-black text-green-400 rounded font-mono text-sm">
                      <div>$ npm start</div>
                      <div>Starting development server...</div>
                      <div>Server running on http://localhost:3000</div>
                      <div className="animate-pulse">$</div>
                    </div>
                  </div>
                ),
              },
              {
                key: "output",
                title: "Output",
                closable: true,
                content: (
                  <div className="space-y-4">
                    <h3 style={{ color: "var(--idea-text-primary)" }}>
                      Build Output
                    </h3>
                    <div
                      className="p-4 rounded text-sm"
                      style={{
                        backgroundColor: "var(--idea-bg-tertiary)",
                        color: "var(--idea-text-primary)",
                      }}
                    >
                      <div>✓ Build completed successfully</div>
                      <div>✓ 12 modules processed</div>
                      <div>✓ Assets generated</div>
                    </div>
                  </div>
                ),
              },
            ]}
            onTabClose={(key) => console.log("Close tab:", key)}
          />
        </Panel>

        {/* Split Panel Section */}
        <Panel title="Split Panel" collapsible>
          <div className="h-96">
            <SplitPanel
              direction="horizontal"
              defaultSizes={[70, 30]}
              onResize={(sizes) => console.log("Panel sizes:", sizes)}
            >
              <div
                className="p-4 h-full"
                style={{ backgroundColor: "var(--idea-bg-secondary)" }}
              >
                <h3 style={{ color: "var(--idea-text-primary)" }}>
                  Left Panel
                </h3>
                <p style={{ color: "var(--idea-text-secondary)" }}>
                  This is the main content area. You can drag the divider to
                  resize the panels.
                </p>
              </div>
              <div
                className="p-4 h-full"
                style={{ backgroundColor: "var(--idea-bg-tertiary)" }}
              >
                <h3 style={{ color: "var(--idea-text-primary)" }}>
                  Right Panel
                </h3>
                <p style={{ color: "var(--idea-text-secondary)" }}>
                  This is the sidebar content.
                </p>
              </div>
            </SplitPanel>
          </div>
        </Panel>

        {/* Modal Section */}
        <Panel title="Modal Components" collapsible>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button onClick={() => setConfirmModalOpen(true)} variant="danger">
              Open Confirm Modal
            </Button>
            <Button onClick={() => setDrawerOpen(true)} variant="secondary">
              Open Drawer
            </Button>
          </div>
        </Panel>

        {/* Modals */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          size="md"
          onOk={() => {
            console.log("OK clicked");
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        >
          <div className="space-y-4">
            <p style={{ color: "var(--idea-text-primary)" }}>
              This is a sample modal dialog. It can contain any content you
              want.
            </p>
            <Input placeholder="Enter some text..." fullWidth />
          </div>
        </Modal>

        <ConfirmModal
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="Confirm Action"
          type="warning"
          content="Are you sure you want to delete this item? This action cannot be undone."
          onOk={() => {
            console.log("Confirmed");
            setConfirmModalOpen(false);
          }}
          onCancel={() => setConfirmModalOpen(false)}
          okText="Delete"
          cancelText="Cancel"
        />

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Sample Drawer"
          placement="right"
          width={400}
        >
          <div className="space-y-4">
            <h3 style={{ color: "var(--idea-text-primary)" }}>
              Drawer Content
            </h3>
            <p style={{ color: "var(--idea-text-secondary)" }}>
              This is a drawer component that slides in from the side. It's
              perfect for forms, settings, or additional information.
            </p>
            <div className="space-y-3">
              <Input label="Name" placeholder="Enter your name" fullWidth />
              <Input label="Email" placeholder="Enter your email" fullWidth />
              <TextArea
                label="Message"
                placeholder="Enter your message"
                rows={4}
              />
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default IdeaUIDemo;
