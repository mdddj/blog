/**
 * MarkdownFile
 */
export interface MarkdownFile {
  content: string;
  directory?: DocDirectory;
  id: number;
  name: string;
  [property: string]: any;
  createDate: Date;
}

/**
 * DocDirectory，携带数据
 */
export interface DocDirectory {
  children: DocDirectory[];
  files: MarkdownFile[];
  id: number;
  name: string;
  parent?: DocDirectory;
  [property: string]: any;
  createDate: Date;
  introduce?: string;
}

// 工具函数：递归查找文件
export const findMarkdownFileById = (
  directories: DocDirectory[],
  fileId: number,
): MarkdownFile | null => {
  for (const directory of directories) {
    // 在当前目录的文件中查找
    const foundFile = directory.files.find((file) => file.id === fileId);
    if (foundFile) {
      return foundFile;
    }

    // 递归查找子目录
    if (directory.children.length > 0) {
      const foundInChildren = findMarkdownFileById(directory.children, fileId);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
};
