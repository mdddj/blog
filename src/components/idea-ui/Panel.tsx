import React, { useState, ReactNode } from 'react';
import './styles.css';

export interface PanelProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  headerActions?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'elevated';
  onToggle?: (collapsed: boolean) => void;
}

export interface SplitPanelProps {
  children: [ReactNode, ReactNode];
  direction?: 'horizontal' | 'vertical';
  defaultSizes?: [number, number];
  minSizes?: [number, number];
  maxSizes?: [number, number];
  resizerStyle?: React.CSSProperties;
  className?: string;
  onResize?: (sizes: [number, number]) => void;
}

export interface TabPanelProps {
  tabs: Array<{
    key: string;
    title: string;
    content: ReactNode;
    icon?: ReactNode;
    closable?: boolean;
    disabled?: boolean;
  }>;
  activeKey?: string;
  onTabChange?: (key: string) => void;
  onTabClose?: (key: string) => void;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  headerActions,
  className = '',
  size = 'md',
  variant = 'default',
  onToggle
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const variantClasses = {
    default: 'border-0',
    bordered: 'border',
    elevated: 'border shadow-md'
  };

  const handleToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--idea-bg-secondary)',
    borderColor: 'var(--idea-border-default)',
    borderRadius: 'var(--idea-radius-md)'
  };

  return (
    <div
      className={`idea-component ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={panelStyle}
    >
      {/* Header */}
      {(title || headerActions || collapsible) && (
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: 'var(--idea-border-separator)' }}
        >
          <div className="flex items-center gap-2">
            {collapsible && (
              <button
                onClick={handleToggle}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                style={{ color: 'var(--idea-text-secondary)' }}
              >
                <svg
                  className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-90'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            {title && (
              <h3
                className="font-medium"
                style={{ color: 'var(--idea-text-primary)' }}
              >
                {title}
              </h3>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {!collapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const SplitPanel: React.FC<SplitPanelProps> = ({
  children,
  direction = 'horizontal',
  defaultSizes = [50, 50],
  minSizes = [10, 10],
  maxSizes = [90, 90],
  resizerStyle,
  className = '',
  onResize
}) => {
  const [sizes, setSizes] = useState<[number, number]>(defaultSizes);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const container = (e.target as Element).closest('.split-panel-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let percentage: number;

    if (direction === 'horizontal') {
      percentage = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      percentage = ((e.clientY - rect.top) / rect.height) * 100;
    }

    const newSizes: [number, number] = [
      Math.max(minSizes[0], Math.min(maxSizes[0], percentage)),
      Math.max(minSizes[1], Math.min(maxSizes[1], 100 - percentage))
    ];

    setSizes(newSizes);
    onResize?.(newSizes);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const containerClasses = direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
  const resizerClasses = direction === 'horizontal' 
    ? 'w-1 cursor-col-resize hover:bg-blue-500' 
    : 'h-1 cursor-row-resize hover:bg-blue-500';

  const defaultResizerStyle: React.CSSProperties = {
    backgroundColor: 'var(--idea-border-separator)',
    transition: 'background-color 0.2s'
  };

  return (
    <div className={`idea-component split-panel-container h-full ${containerClasses} ${className}`}>
      <div style={{ [direction === 'horizontal' ? 'width' : 'height']: `${sizes[0]}%` }}>
        {children[0]}
      </div>
      
      <div
        className={resizerClasses}
        style={{ ...defaultResizerStyle, ...resizerStyle }}
        onMouseDown={handleMouseDown}
      />
      
      <div style={{ [direction === 'horizontal' ? 'width' : 'height']: `${sizes[1]}%` }}>
        {children[1]}
      </div>
    </div>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({
  tabs,
  activeKey,
  onTabChange,
  onTabClose,
  className = '',
  placement = 'top'
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    activeKey || tabs[0]?.key || ''
  );

  const currentActiveKey = activeKey || internalActiveKey;

  const handleTabClick = (key: string) => {
    if (!activeKey) {
      setInternalActiveKey(key);
    }
    onTabChange?.(key);
  };

  const handleTabClose = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClose?.(key);
  };

  const activeTab = tabs.find(tab => tab.key === currentActiveKey);

  const getTabBarClasses = () => {
    const baseClasses = 'flex border-b';
    const placementClasses = {
      top: 'border-b',
      bottom: 'border-t order-2',
      left: 'flex-col border-r',
      right: 'flex-col border-l order-2'
    };
    return `${baseClasses} ${placementClasses[placement]}`;
  };

  const getContentClasses = () => {
    const placementClasses = {
      top: 'order-2',
      bottom: 'order-1',
      left: 'order-2 flex-1',
      right: 'order-1 flex-1'
    };
    return `p-4 ${placementClasses[placement]}`;
  };

  return (
    <div
      className={`idea-component h-full flex ${placement === 'left' || placement === 'right' ? 'flex-row' : 'flex-col'} ${className}`}
      style={{
        backgroundColor: 'var(--idea-bg-secondary)',
        border: '1px solid var(--idea-border-default)',
        borderRadius: 'var(--idea-radius-md)'
      }}
    >
      {/* Tab Bar */}
      <div
        className={getTabBarClasses()}
        style={{ borderColor: 'var(--idea-border-separator)' }}
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${currentActiveKey === tab.key ? 'border-b-2 border-blue-500' : 'hover:bg-gray-50'}
            `}
            style={{
              color: currentActiveKey === tab.key ? 'var(--idea-text-accent)' : 'var(--idea-text-primary)',
              backgroundColor: currentActiveKey === tab.key ? 'var(--idea-bg-hover)' : 'transparent'
            }}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabClick(tab.key)}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.title}</span>
            {tab.closable && (
              <button
                className="ml-1 p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                onClick={(e) => handleTabClose(tab.key, e)}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={getContentClasses()}>
        {activeTab?.content}
      </div>
    </div>
  );
};

Panel.displayName = 'Panel';
SplitPanel.displayName = 'SplitPanel';
TabPanel.displayName = 'TabPanel';