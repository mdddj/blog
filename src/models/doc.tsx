
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
}