// IntelliJ IDEA Style React Components
// Main export file

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Menu, DropdownMenu } from "./Menu";
export type { MenuProps, DropdownMenuProps, MenuItem } from "./Menu";

export { FileTree } from "./FileTree";
export type { FileTreeProps, FileTreeNode } from "./FileTree";

export { List, VirtualList } from "./List";
export type { ListProps, VirtualListProps, ListItem } from "./List";

export { Input, TextArea } from "./Input";
export type { InputProps, TextAreaProps } from "./Input";

export { Panel, SplitPanel, TabPanel } from "./Panel";
export type { PanelProps, SplitPanelProps, TabPanelProps } from "./Panel";

export { Modal, ConfirmModal, Drawer } from "./Modal";
export type { ModalProps, ConfirmModalProps, DrawerProps } from "./Modal";

// Import styles
import "./styles.css";

// Theme utilities
export const IdeaTheme = {
  setTheme: (theme: "light" | "dark") => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("idea-theme-light");
    } else {
      root.classList.remove("idea-theme-light");
    }
  },

  getTheme: (): "light" | "dark" => {
    return document.documentElement.classList.contains("idea-theme-light")
      ? "light"
      : "dark";
  },

  toggleTheme: () => {
    const currentTheme = IdeaTheme.getTheme();
    IdeaTheme.setTheme(currentTheme === "light" ? "dark" : "light");
  },
};

// Component collection for easy access
// export const IdeaComponents = {
//   Button,
//   Menu,
//   DropdownMenu,
//   FileTree,
//   List,
//   VirtualList,
//   Input,
//   TextArea,
//   Panel,
//   SplitPanel,
//   TabPanel,
//   Modal,
//   ConfirmModal,
//   Drawer,
// };
