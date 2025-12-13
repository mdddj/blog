import React, { useState, useEffect } from "react";

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
    disk_usage: 0,
  });

  const [showDetail, setShowDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDetail = () => {
    if (showDetail) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowDetail(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setShowDetail(true);
    }
  };

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      try {
        socket = new WebSocket("wss://status.itbug.shop/ws/");

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
            console.log("解析WebSocket消息时出错:", e);
          }
        };

        socket.onclose = () => {
          setIsConnected(false);
          // 3秒后尝试重新连接
          reconnectTimeout = setTimeout(connect, 3000);
        };

        socket.onerror = (error) => {
          console.log("WebSocket错误:", error);
          setIsConnected(false);
        };
      } catch (error) {
        console.log("连接WebSocket时出错:", error);
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
    <div
      className="relative"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div className="flex items-center gap-2 px-3 py-1 bg-base-100 rounded-md border border-base-200 text-sm cursor-pointer">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-1 ${isConnected ? "bg-success" : "bg-error"}`}
        ></span>
        <ColumnText
          title={"CPU"}
          value={`${Math.round(systemInfo.cpu_usage)}%`}
        />
        <ColumnText
          title={"内存"}
          value={`${Math.round(systemInfo.memory_usage)}%`}
        />
        <ColumnText
          title={"磁盘"}
          value={`${Math.round(systemInfo.disk_usage)}%`}
        />
      </div>

      {showDetail && (
        <div className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 p-4 bg-base-100 rounded-lg shadow-lg border border-base-200 transition-all duration-300 ease-in-out opacity-100 scale-100 origin-top w-48">
          <h3 className="font-bold text-base-content mb-2">系统状态</h3>
          <div className="text-sm space-y-1">
            <p>
              CPU:{" "}
              <span className="font-mono font-semibold">
                {systemInfo.cpu_usage.toFixed(1)}%
              </span>
            </p>
            <p>
              内存:{" "}
              <span className="font-mono font-semibold">
                {systemInfo.memory_usage.toFixed(1)}%
              </span>
            </p>
            <p>
              磁盘:{" "}
              <span className="font-mono font-semibold">
                {systemInfo.disk_usage.toFixed(1)}%
              </span>
            </p>
            <p
              className={`text-xs ${isConnected ? "text-success" : "text-error"}`}
            >
              状态: {isConnected ? "在线" : "离线"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactSystemMonitor;
