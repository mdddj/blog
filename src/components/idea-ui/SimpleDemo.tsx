import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Input, TextArea } from "./Input";
import { Panel } from "./Panel";
import { FileTree, type FileTreeNode } from "./FileTree";
import { List, type ListItem } from "./List";
import { Menu, DropdownMenu, type MenuItem } from "./Menu";
import { Modal } from "./Modal";
import "./styles.css";

const SimpleDemo: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");

  // Ensure body scroll is enabled when component mounts
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    const root = document.documentElement;
    if (newTheme === "light") {
      root.classList.add("idea-theme-light");
    } else {
      root.classList.remove("idea-theme-light");
    }
  };

  // Sample file tree data
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
          ],
        },
        {
          id: "4",
          name: "App.tsx",
          type: "file",
          path: "/src/App.tsx",
          size: 1024,
        },
      ],
    },
  ];

  // Sample menu items
  const menuItems: MenuItem[] = [
    {
      key: "file",
      label: "File",
      children: [
        { key: "new", label: "New File", shortcut: "Ctrl+N" },
        { key: "open", label: "Open File", shortcut: "Ctrl+O" },
      ],
    },
    {
      key: "edit",
      label: "Edit",
      children: [
        { key: "undo", label: "Undo", shortcut: "Ctrl+Z" },
        { key: "redo", label: "Redo", shortcut: "Ctrl+Y" },
      ],
    },
  ];

  // Sample list items
  const listItems: ListItem[] = [
    {
      id: "1",
      content: "TypeScript File",
      subtitle: "src/components/Button.tsx",
      icon: <span style={{ color: "#3178c6" }}>TS</span>,
    },
    {
      id: "2",
      content: "JavaScript File",
      subtitle: "src/utils/helpers.js",
      icon: <span style={{ color: "#f7df1e" }}>JS</span>,
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 ${theme === "light" ? "idea-theme-light" : ""}`}
      style={{ backgroundColor: "var(--idea-bg-primary)", overflow: "auto" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--idea-text-primary)" }}
          >
            IDEA UI Components Demo
          </h1>
          <Button onClick={toggleTheme} variant="secondary">
            {theme === "light" ? "🌙" : "☀️"}{" "}
            {theme === "light" ? "Dark" : "Light"} Theme
          </Button>
        </div>

        {/* Buttons Section */}
        <Panel title="Buttons" collapsible>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            </div>
          </div>
        </Panel>

        {/* Inputs Section */}
        <Panel title="Input Components" collapsible>
          <div className="space-y-4 max-w-md">
            <Input label="Username" placeholder="Enter username..." clearable />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              }
            />
            <TextArea
              label="Description"
              placeholder="Enter description..."
              rows={4}
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
                trigger={<Button variant="secondary">Menu ▼</Button>}
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

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Tree Section */}
          <Panel title="File Tree" collapsible>
            <FileTree
              data={fileTreeData}
              selectedId={selectedFile}
              onSelect={(node) => {
                setSelectedFile(node.id);
                console.log("Selected file:", node);
              }}
              showFileSize
            />
          </Panel>

          {/* List Section */}
          <Panel title="List Component" collapsible>
            <List
              items={listItems}
              onSelect={(item) => console.log("Selected:", item)}
              searchable
              searchPlaceholder="Search files..."
              maxHeight={300}
            />
          </Panel>
        </div>

        {/* Code Example */}
        <Panel title="Code Example" collapsible>
          <div
            className="p-4 rounded-md font-mono text-sm overflow-x-auto"
            style={{
              backgroundColor: "var(--idea-bg-tertiary)",
              color: "var(--idea-text-primary)",
            }}
          >
            <div className="whitespace-pre">{`import { Button, Input, Panel } from './components/idea-ui';

function MyApp() {
  return (
    <Panel title="My Panel" collapsible>
      <div className="space-y-4">
        <Input label="Name" placeholder="Enter name..." />
        <Button variant="primary">Submit</Button>
      </div>
    </Panel>
  );
}`}</div>
          </div>
        </Panel>

        {/* Modal */}
        {/* <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          onOk={() => {
            console.log("OK clicked");
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        >
          <div className="space-y-4">
            <p style={{ color: "var(--idea-text-primary)" }}>
              This is a sample modal dialog with IDEA styling.
            </p>
            <Input placeholder="Enter some text..." fullWidth />
          </div>
        </Modal> */}
      </div>
    </div>
  );
};

export default SimpleDemo;
