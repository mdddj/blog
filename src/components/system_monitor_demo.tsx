import React from 'react';
import SystemMonitor from './system_monitor';

const SystemMonitorDemo: React.FC = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>系统监控组件</h1>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <SystemMonitor />
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                <p>这是一个现代化的系统监控组件，适合放在页面底部显示实时系统信息。</p>
                <p>组件会自动连接到WebSocket服务器并显示实时数据。</p>
            </div>
        </div>
    );
};

export default SystemMonitorDemo;
