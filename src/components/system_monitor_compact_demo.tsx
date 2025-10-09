import React from 'react';
import CompactSystemMonitor from './system_monitor_compact';

const CompactSystemMonitorDemo: React.FC = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>紧凑模式系统监控组件演示</h1>

            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>紧凑模式组件</h2>
                <p>这个组件适合放在页面底部或任何需要紧凑显示的地方。</p>

                <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <CompactSystemMonitor />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h3>使用示例</h3>
                    <p>您可以将组件放在任何地方，例如页面底部：</p>
                    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                        <CompactSystemMonitor />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                <p>这是一个紧凑模式的系统监控组件，只显示文字和数字，适合放在页面底部显示。</p>
            </div>
        </div>
    );
};

export default CompactSystemMonitorDemo;
