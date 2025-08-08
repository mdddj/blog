import React, { useState, useRef, useEffect, ReactNode } from 'react';
import './styles.css';

export interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  className?: string;
  onSelect?: (key: string) => void;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
  onSelect?: (key: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ items, className = '', onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (item.children?.length) {
      const newExpandedKeys = new Set(expandedKeys);
      if (expandedKeys.has(item.key)) {
        newExpandedKeys.delete(item.key);
      } else {
        newExpandedKeys.add(item.key);
      }
      setExpandedKeys(newExpandedKeys);
    } else {
      item.onClick?.();
      onSelect?.(item.key);
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (item.divider) {
      return (
        <div
          key={item.key}
          className="h-px bg-gray-200 my-1 mx-2"
          style={{ backgroundColor: 'var(--idea-border-separator)' }}
        />
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedKeys.has(item.key);
    const paddingLeft = 12 + level * 16;

    return (
      <div key={item.key}>
        <div
          className={`
            idea-component flex items-center justify-between px-3 py-2 cursor-pointer
            text-sm hover:bg-gray-100 transition-colors
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            paddingLeft: `${paddingLeft}px`,
            backgroundColor: 'transparent',
            color: 'var(--idea-text-primary)'
          }}
          onMouseEnter={(e) => {
            if (!item.disabled) {
              e.currentTarget.style.backgroundColor = 'var(--idea-bg-hover)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-2 flex-1">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.shortcut && (
              <span className="text-xs opacity-70">{item.shortcut}</span>
            )}
            {hasChildren && (
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`idea-component idea-scrollbar overflow-y-auto ${className}`}
      style={{
        backgroundColor: 'var(--idea-bg-secondary)',
        border: '1px solid var(--idea-border-default)',
        borderRadius: 'var(--idea-radius-md)'
      }}
    >
      {items.map(item => renderMenuItem(item))}
    </div>
  );
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  className = '',
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (key: string) => {
    setIsOpen(false);
    onSelect?.(key);
  };

  const getMenuPosition = () => {
    const positions = {
      'bottom-start': 'top-full left-0',
      'bottom-end': 'top-full right-0',
      'top-start': 'bottom-full left-0',
      'top-end': 'bottom-full right-0'
    };
    return positions[placement];
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 mt-1 min-w-48 ${getMenuPosition()} ${className}`}
          style={{
            boxShadow: 'var(--idea-shadow-md)'
          }}
        >
          <Menu items={items} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

Menu.displayName = 'Menu';
DropdownMenu.displayName = 'DropdownMenu';