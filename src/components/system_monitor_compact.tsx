import React, { useState, useEffect } from 'react';
import './system_monitor.css';
import ColumnText from "@/components/ColumnText";

interface SystemInfo {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
}

interface WebSocketData {
    system_info: SystemInfo;
}

const CompactSystemMonitor: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [systemInfo, setSystemInfo] = useState<SystemInfo>({
        cpu_usage: 0,
        memory_usage: 0,
        disk_usage: 0
    });

    useEffect(() => {
        let socket: WebSocket | null = null;
        let reconnectTimeout: NodeJS.Timeout;

        const connect = () => {
            try {
                socket = new WebSocket('wss://status.itbug.shop/ws/');

                socket.onopen = () => {
                    setIsConnected(true);
                };

                socket.onmessage = (event) => {
                    try {
                        const data: WebSocketData = JSON.parse(event.data);
                        if (data.system_info) {
                            setSystemInfo(data.system_info);
                        }
                    } catch (e) {
                        console.log('解析WebSocket消息时出错:', e);
                    }
                };

                socket.onclose = () => {
                    setIsConnected(false);
                    // 3秒后尝试重新连接
                    reconnectTimeout = setTimeout(connect, 3000);
                };

                socket.onerror = (error) => {
                    console.log('WebSocket错误:', error);
                    setIsConnected(false);
                };
            } catch (error) {
                console.log('连接WebSocket时出错:', error);
                setIsConnected(false);
            }
        };

        connect();

        // 清理函数
        return () => {
            if (socket) {
                socket.close();
            }
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
        };
    }, []);

    return (
        <div className="system-monitor-compact shadow">
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
            <ColumnText title={'CPU'} value={`${Math.round(systemInfo.cpu_usage)}%`} />
            <ColumnText title={"内存"} value={`${Math.round(systemInfo.memory_usage)}%`} />
            <ColumnText title={"磁盘"} value={`${Math.round(systemInfo.disk_usage)}%`} />
        </div>
    );
};

export default CompactSystemMonitor;
