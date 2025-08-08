import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  zIndex?: number;
  destroyOnClose?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
}

export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'footer'> {
  content: ReactNode;
  icon?: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
}

export interface DrawerProps extends Omit<ModalProps, 'centered' | 'size'> {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: string | number;
  height?: string | number;
}

const defaultIcons = {
  info: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  confirm: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = true,
  closable = true,
  maskClosable = true,
  keyboard = true,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  zIndex = 1000,
  destroyOnClose = false,
  loading = false,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  okButtonProps = {},
  cancelButtonProps = {}
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboard && e.key === 'Escape') {
        onClose?.();
      }
    };

    if (keyboard) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Prevent body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    document.body.style.overflow = 'hidden';

    return () => {
      if (keyboard) {
        document.removeEventListener('keydown', handleKeyDown);
      }
      // Always restore to 'auto' or original value
      document.body.style.overflow = originalStyle === 'hidden' ? 'auto' : originalStyle;
      document.body.style.position = originalPosition;
    };
  }, [open, keyboard, onClose]);

  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleMaskClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleOk = () => {
    onOk?.();
  };

  const renderDefaultFooter = () => {
    if (footer === null) return null;
    if (footer) return footer;

    return (
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 text-sm font-medium border rounded-md transition-colors hover:bg-gray-50"
          style={{
            color: 'var(--idea-text-primary)',
            borderColor: 'var(--idea-border-default)',
            backgroundColor: 'var(--idea-bg-secondary)'
          }}
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText}
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
          onClick={handleOk}
          disabled={loading}
          {...okButtonProps}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading...
            </span>
          ) : (
            okText
          )}
        </button>
      </div>
    );
  };

  if (!open && destroyOnClose) {
    return null;
  }

  const modalContent = (
    <div
      className={`fixed inset-0 flex ${centered ? 'items-center justify-center' : 'items-start justify-center pt-16'} p-4`}
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black transition-opacity"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: open ? 1 : 0
        }}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          idea-component relative w-full ${sizeClasses[size]} transform transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          ${className}
        `}
        style={{
          backgroundColor: 'var(--idea-bg-secondary)',
          borderRadius: 'var(--idea-radius-lg)',
          boxShadow: 'var(--idea-shadow-lg)',
          border: '1px solid var(--idea-border-default)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || closable) && (
          <div
            className={`flex items-center justify-between px-6 py-4 border-b ${headerClassName}`}
            style={{ borderColor: 'var(--idea-border-separator)' }}
          >
            {title && (
              <h2
                className="text-lg font-semibold"
                style={{ color: 'var(--idea-text-primary)' }}
              >
                {title}
              </h2>
            )}
            {closable && (
              <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                style={{ color: 'var(--idea-text-secondary)' }}
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`px-6 py-4 ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {(footer !== null) && (
          <div
            className={`px-6 py-4 border-t ${footerClassName}`}
            style={{ borderColor: 'var(--idea-border-separator)' }}
          >
            {renderDefaultFooter()}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  content,
  icon,
  type = 'confirm',
  ...modalProps
}) => {
  const displayIcon = icon || defaultIcons[type];

  return (
    <Modal {...modalProps} size="sm">
      <div className="flex gap-4">
        {displayIcon && (
          <div className="flex-shrink-0">
            {displayIcon}
          </div>
        )}
        <div className="flex-1">
          {content}
        </div>
      </div>
    </Modal>
  );
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  placement = 'right',
  width = 400,
  height = 400,
  closable = true,
  maskClosable = true,
  keyboard = true,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  zIndex = 1000,
  destroyOnClose = false
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboard && e.key === 'Escape') {
        onClose?.();
      }
    };

    if (keyboard) {
      document.addEventListener('keydown', handleKeyDown);
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    document.body.style.overflow = 'hidden';

    return () => {
      if (keyboard) {
        document.removeEventListener('keydown', handleKeyDown);
      }
      // Always restore to 'auto' or original value
      document.body.style.overflow = originalStyle === 'hidden' ? 'auto' : originalStyle;
      document.body.style.position = originalPosition;
    };
  }, [open, keyboard, onClose]);

  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleMaskClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const getDrawerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: 'var(--idea-bg-secondary)',
      borderColor: 'var(--idea-border-default)',
      transform: open ? 'translateX(0)' : undefined,
    };

    switch (placement) {
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          borderBottom: '1px solid var(--idea-border-default)',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          borderTop: '1px solid var(--idea-border-default)',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
        };
      case 'left':
        return {
          ...baseStyle,
          top: 0,
          bottom: 0,
          left: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          borderRight: '1px solid var(--idea-border-default)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        };
      case 'right':
      default:
        return {
          ...baseStyle,
          top: 0,
          bottom: 0,
          right: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          borderLeft: '1px solid var(--idea-border-default)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        };
    }
  };

  if (!open && destroyOnClose) {
    return null;
  }

  const drawerContent = (
    <div
      className="fixed inset-0"
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black transition-opacity"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: open ? 1 : 0
        }}
      />

      {/* Drawer */}
      <div
        className={`idea-component absolute flex flex-col transition-transform duration-300 ${className}`}
        style={getDrawerStyle()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || closable) && (
          <div
            className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${headerClassName}`}
            style={{ borderColor: 'var(--idea-border-separator)' }}
          >
            {title && (
              <h2
                className="text-lg font-semibold"
                style={{ color: 'var(--idea-text-primary)' }}
              >
                {title}
              </h2>
            )}
            {closable && (
              <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                style={{ color: 'var(--idea-text-secondary)' }}
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`px-6 py-4 flex-1 overflow-auto idea-scrollbar ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={`px-6 py-4 border-t flex-shrink-0 ${footerClassName}`}
            style={{ borderColor: 'var(--idea-border-separator)' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

Modal.displayName = 'Modal';
ConfirmModal.displayName = 'ConfirmModal';
Drawer.displayName = 'Drawer';