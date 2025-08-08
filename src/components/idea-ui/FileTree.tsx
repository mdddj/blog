import React, { useState, ReactNode } from 'react';
import './styles.css';

export interface FileTreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileTreeNode[];
  icon?: ReactNode;
  size?: number;
  modified?: Date;
  isReadonly?: boolean;
  isHidden?: boolean;
}

export interface FileTreeProps {
  data: FileTreeNode[];
  selectedId?: string;
  expandedIds?: string[];
  onSelect?: (node: FileTreeNode) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
  onContextMenu?: (node: FileTreeNode, event: React.MouseEvent) => void;
  className?: string;
  showIcons?: boolean;
  showFileSize?: boolean;
  allowMultiSelect?: boolean;
}

const defaultFileIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const defaultFolderIcon = (expanded: boolean) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {expanded ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    )}
  </svg>
);

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const FileTree: React.FC<FileTreeProps> = ({
  data,
  selectedId,
  expandedIds = [],
  onSelect,
  onExpand,
  onContextMenu,
  className = '',
  showIcons = true,
  showFileSize = false,
  allowMultiSelect = false
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(expandedIds);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedId ? [selectedId] : []);

  const currentExpandedIds = expandedIds.length > 0 ? expandedIds : internalExpandedIds;
  const currentSelectedIds = selectedId ? [selectedId] : internalSelectedIds;

  const handleToggleExpand = (nodeId: string) => {
    const isExpanded = currentExpandedIds.includes(nodeId);
    const newExpandedIds = isExpanded
      ? currentExpandedIds.filter(id => id !== nodeId)
      : [...currentExpandedIds, nodeId];
    
    if (expandedIds.length === 0) {
      setInternalExpandedIds(newExpandedIds);
    }
    onExpand?.(nodeId, !isExpanded);
  };

  const handleSelect = (node: FileTreeNode, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (allowMultiSelect && (event.ctrlKey || event.metaKey)) {
      const newSelectedIds = currentSelectedIds.includes(node.id)
        ? currentSelectedIds.filter(id => id !== node.id)
        : [...currentSelectedIds, node.id];
      
      if (!selectedId) {
        setInternalSelectedIds(newSelectedIds);
      }
    } else {
      if (!selectedId) {
        setInternalSelectedIds([node.id]);
      }
    }
    
    onSelect?.(node);
  };

  const handleContextMenu = (node: FileTreeNode, event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenu?.(node, event);
  };

  const renderNode = (node: FileTreeNode, level = 0): ReactNode => {
    const isExpanded = currentExpandedIds.includes(node.id);
    const isSelected = currentSelectedIds.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const paddingLeft = 8 + level * 16;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            idea-component flex items-center gap-1 px-2 py-1 cursor-pointer
            text-sm transition-colors relative group
            ${isSelected ? 'idea-bg-selected' : ''}
            ${node.isHidden ? 'opacity-60' : ''}
            ${node.isReadonly ? 'italic' : ''}
          `}
          style={{
            paddingLeft: `${paddingLeft}px`,
            backgroundColor: isSelected ? 'var(--idea-bg-selected)' : 'transparent',
            color: 'var(--idea-text-primary)'
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = 'var(--idea-bg-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          onClick={(e) => handleSelect(node, e)}
          onContextMenu={(e) => handleContextMenu(node, e)}
        >
          {/* Expand/Collapse Icon */}
          {node.type === 'folder' && hasChildren && (
            <button
              className="flex-shrink-0 p-0.5 hover:bg-gray-200 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleExpand(node.id);
              }}
              style={{
                color: 'var(--idea-text-secondary)'
              }}
            >
              <svg
                className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          
          {/* Spacer for files without expand button */}
          {(node.type === 'file' || !hasChildren) && (
            <div className="w-4 flex-shrink-0" />
          )}

          {/* File/Folder Icon */}
          {showIcons && (
            <span 
              className="flex-shrink-0"
              style={{ color: 'var(--idea-text-secondary)' }}
            >
              {node.icon || (node.type === 'folder' ? defaultFolderIcon(isExpanded) : defaultFileIcon)}
            </span>
          )}

          {/* Name */}
          <span className="flex-1 truncate" title={node.name}>
            {node.name}
          </span>

          {/* File Size */}
          {showFileSize && node.type === 'file' && node.size !== undefined && (
            <span 
              className="text-xs flex-shrink-0 ml-2"
              style={{ color: 'var(--idea-text-secondary)' }}
            >
              {formatFileSize(node.size)}
            </span>
          )}

          {/* Readonly Indicator */}
          {node.isReadonly && (
            <span 
              className="text-xs flex-shrink-0 ml-1"
              style={{ color: 'var(--idea-text-warning)' }}
              title="Read-only"
            >
              🔒
            </span>
          )}
        </div>

        {/* Children */}
        {node.type === 'folder' && hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`idea-component idea-scrollbar overflow-auto ${className}`}
      style={{
        backgroundColor: 'var(--idea-bg-secondary)',
        border: '1px solid var(--idea-border-default)',
        borderRadius: 'var(--idea-radius-md)'
      }}
    >
      {data.map(node => renderNode(node))}
    </div>
  );
};

FileTree.displayName = 'FileTree';