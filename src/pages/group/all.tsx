import React from "react";
import ResourceCard from "@/components/resource_card";
import LoadingWidget from "@/loading";
import { ApiResponse, PageResult, Resource } from "@/models/base";
import { dynamicListApi } from "@/tools/api";
import useAxios from "axios-hooks";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

//动态页面
const DynamicListWidget: React.FC = () => {
  const [page, setPage] = useState(0);
  const [allData, setAllData] = useState<Resource[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const [{ data, loading }] = useAxios<ApiResponse<PageResult<Resource>>>({
    url: dynamicListApi,
    params: {
      page,
      pageSize: 20,
    },
  });

  // 处理数据更新
  useEffect(() => {
    if (data?.data) {
      if (page === 0) {
        // 第一页，直接设置数据
        setAllData(data.data.list);
      } else {
        // 后续页面，追加数据
        setAllData((prev) => [...prev, ...data.data.list]);
      }

      // 判断是否还有更多数据
      setHasMore(data.data.list.length === 20);
      setIsLoadingMore(false);
    }
  }, [data, page]);

  // 加载下一页
  const loadMore = useCallback(() => {
    if (!loading && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore, isLoadingMore]);

  // 无限滚动监听
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  if (loading && page === 0) {
    return <LoadingWidget />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          {allData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ResourceCard item={item} />
            </motion.div>
          ))}

          {allData.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💭</div>
              <h3 className="text-xl font-semibold mb-2">暂无动态</h3>
              <p className="text-base-content/70">还没有发布任何心情动态</p>
            </div>
          )}

          {/* 无限滚动触发器 */}
          {hasMore && allData.length > 0 && (
            <div ref={observerRef} className="text-center py-6">
              {isLoadingMore ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <span className="loading loading-spinner loading-md text-primary"></span>
                  <span className="text-base-content/70 font-medium">
                    加载更多动态...
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-base-content/40 text-sm"
                >
                  继续滚动加载更多
                </motion.div>
              )}
            </div>
          )}

          {/* 没有更多数据的提示 */}
          {!hasMore && allData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <div className="flex justify-center items-center space-x-2">
                <span className="text-2xl">📝</span>
                <div className="text-base-content/60 font-medium">
                  已显示全部动态
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicListWidget;
