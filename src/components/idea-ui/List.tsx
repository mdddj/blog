import React, { useState, ReactNode, useCallback } from 'react';
import './styles.css';

export interface ListItem {
  id: string;
  content: ReactNode;
  icon?: ReactNode;
  subtitle?: string;
  rightContent?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  indentLevel?: number;
  data?: any;
}

export interface ListProps {
  items: ListItem[];
  selectedId?: string;
  selectedIds?: string[];
  multiSelect?: boolean;
  onSelect?: (item: ListItem, selectedItems: ListItem[]) => void;
  onDoubleClick?: (item: ListItem) => void;
  onContextMenu?: (item: ListItem, event: React.MouseEvent) => void;
  className?: string;
  maxHeight?: number;
  virtualized?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyState?: ReactNode;
  density?: 'compact' | 'comfortable' | 'spacious';
}

export interface VirtualListProps extends Omit<ListProps, 'virtualized'> {
  itemHeight: number;
  containerHeight: number;
}

const defaultEmptyState = (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <svg className="w-12 h-12 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <p className="text-sm opacity-60">No items to display</p>
  </div>
);

export const List: React.FC<ListProps> = ({
  items,
  selectedId,
  selectedIds = [],
  multiSelect = false,
  onSelect,
  onDoubleClick,
  onContextMenu,
  className = '',
  maxHeight,
  searchable = false,
  searchPlaceholder = 'Search...',
  emptyState = defaultEmptyState,
  density = 'comfortable'
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(
    selectedId ? [selectedId] : selectedIds
  );
  const [searchQuery, setSearchQuery] = useState('');

  const currentSelectedIds = selectedId ? [selectedId] : selectedIds.length > 0 ? selectedIds : internalSelectedIds;

  const densityClasses = {
    compact: 'py-1',
    comfortable: 'py-2',
    spacious: 'py-3'
  };

  const filteredItems = searchable && searchQuery
    ? items.filter(item => {
        if (item.divider) return false;
        const searchText = typeof item.content === 'string' 
          ? item.content.toLowerCase() 
          : item.content?.toString()?.toLowerCase() || '';
        const subtitleText = item.subtitle?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        return searchText.includes(query) || subtitleText.includes(query);
      })
    : items;

  const handleItemClick = useCallback((item: ListItem, event: React.MouseEvent) => {
    if (item.disabled || item.divider) return;

    event.stopPropagation();

    let newSelectedIds: string[];

    if (multiSelect && (event.ctrlKey || event.metaKey)) {
      // Toggle selection with Ctrl/Cmd
      newSelectedIds = currentSelectedIds.includes(item.id)
        ? currentSelectedIds.filter(id => id !== item.id)
        : [...currentSelectedIds, item.id];
    } else if (multiSelect && event.shiftKey && currentSelectedIds.length > 0) {
      // Range selection with Shift
      const lastSelectedIndex = filteredItems.findIndex(i => i.id === currentSelectedIds[currentSelectedIds.length - 1]);
      const clickedIndex = filteredItems.findIndex(i => i.id === item.id);
      const start = Math.min(lastSelectedIndex, clickedIndex);
      const end = Math.max(lastSelectedIndex, clickedIndex);
      
      const rangeIds = filteredItems.slice(start, end + 1)
        .filter(i => !i.disabled && !i.divider)
        .map(i => i.id);
      
      newSelectedIds = [...new Set([...currentSelectedIds, ...rangeIds])];
    } else {
      // Single selection
      newSelectedIds = [item.id];
    }

    if (!selectedId && selectedIds.length === 0) {
      setInternalSelectedIds(newSelectedIds);
    }

    const selectedItems = filteredItems.filter(i => newSelectedIds.includes(i.id));
    onSelect?.(item, selectedItems);
  }, [currentSelectedIds, filteredItems, multiSelect, onSelect, selectedId, selectedIds]);

  const handleDoubleClick = useCallback((item: ListItem, event: React.MouseEvent) => {
    if (item.disabled || item.divider) return;
    event.stopPropagation();
    onDoubleClick?.(item);
  }, [onDoubleClick]);

  const handleContextMenu = useCallback((item: ListItem, event: React.MouseEvent) => {
    if (item.disabled || item.divider) return;
    event.preventDefault();
    onContextMenu?.(item, event);
  }, [onContextMenu]);

  const renderItem = (item: ListItem, index: number) => {
    if (item.divider) {
      return (
        <div
          key={`${item.id}-${index}`}
          className="h-px mx-4 my-2"
          style={{ backgroundColor: 'var(--idea-border-separator)' }}
        />
      );
    }

    const isSelected = currentSelectedIds.includes(item.id);
    const indentPadding = (item.indentLevel || 0) * 16 + 12;

    return (
      <div
        key={item.id}
        className={`
          idea-component flex items-center gap-3 px-3 cursor-pointer transition-colors
          ${densityClasses[density]}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isSelected ? 'idea-bg-selected' : ''}
        `}
        style={{
          paddingLeft: `${indentPadding}px`,
          backgroundColor: isSelected ? 'var(--idea-bg-selected)' : 'transparent',
          color: 'var(--idea-text-primary)'
        }}
        onMouseEnter={(e) => {
          if (!item.disabled && !isSelected) {
            e.currentTarget.style.backgroundColor = 'var(--idea-bg-hover)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        onClick={(e) => handleItemClick(item, e)}
        onDoubleClick={(e) => handleDoubleClick(item, e)}
        onContextMenu={(e) => handleContextMenu(item, e)}
      >
        {/* Icon */}
        {item.icon && (
          <span 
            className="flex-shrink-0"
            style={{ color: 'var(--idea-text-secondary)' }}
          >
            {item.icon}
          </span>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="truncate">
            {item.content}
          </div>
          {item.subtitle && (
            <div 
              className="text-xs truncate mt-0.5"
              style={{ color: 'var(--idea-text-secondary)' }}
            >
              {item.subtitle}
            </div>
          )}
        </div>

        {/* Right Content */}
        {item.rightContent && (
          <div className="flex-shrink-0">
            {item.rightContent}
          </div>
        )}
      </div>
    );
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--idea-bg-secondary)',
    border: '1px solid var(--idea-border-default)',
    borderRadius: 'var(--idea-radius-md)',
    ...(maxHeight && { maxHeight, overflowY: 'auto' })
  };

  return (
    <div className={`idea-component ${className}`} style={containerStyle}>
      {/* Search Input */}
      {searchable && (
        <div className="p-3 border-b" style={{ borderColor: 'var(--idea-border-separator)' }}>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: 'var(--idea-text-secondary)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--idea-bg-primary)',
                borderColor: 'var(--idea-border-default)',
                color: 'var(--idea-text-primary)'
              }}
            />
          </div>
        </div>
      )}

      {/* List Content */}
      <div className="idea-scrollbar" style={{ maxHeight: maxHeight ? maxHeight - (searchable ? 60 : 0) : undefined }}>
        {filteredItems.length === 0 ? (
          <div style={{ color: 'var(--idea-text-secondary)' }}>
            {emptyState}
          </div>
        ) : (
          filteredItems.map((item, index) => renderItem(item, index))
        )}
      </div>
    </div>
  );
};

// Virtual List for large datasets
export const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemHeight,
  containerHeight,
  ...listProps
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      className="idea-component idea-scrollbar overflow-auto"
      style={{
        height: containerHeight,
        backgroundColor: 'var(--idea-bg-secondary)',
        border: '1px solid var(--idea-border-default)',
        borderRadius: 'var(--idea-radius-md)'
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          <List
            {...listProps}
            items={visibleItems}
            className="border-0 rounded-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';
VirtualList.displayName = 'VirtualList';