import React, { useState } from "react";
import { useParams, history } from "@@/exports";
import useAxios from "axios-hooks";
import { ApiResponse, Resource } from "@/models/base";
import { fromNow } from "@/tools/date";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/loading";
import { dynamicDetailApi } from "@/tools/api";
import { toast } from "@/tools/toast";

const DynamicDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);

  const [{ data, loading, error }] = useAxios<ApiResponse<Resource>>({
    url: `${dynamicDetailApi}${id}`,
  });

  // 复制链接功能
  const handleShare = async () => {
    setShareLoading(true);
    try {
      const url = `${window.location.origin}/dynamic/${id}`;
      await navigator.clipboard.writeText(url);
      toast.success("链接已复制到剪贴板");
    } catch (err) {
      // 降级处理：手动选择文本
      const textArea = document.createElement("textarea");
      textArea.value = `${window.location.origin}/dynamic/${id}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("链接已复制到剪贴板");
    } finally {
      setShareLoading(false);
    }
  };

  if (!id) {
    return <div className="text-center py-8">动态ID不存在</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h3 className="text-xl font-semibold mb-2">加载失败</h3>
          <p className="text-base-content/70 mb-4">无法加载动态详情</p>
          <button onClick={() => history.back()} className="btn btn-primary">
            返回上页
          </button>
        </div>
      </div>
    );
  }

  const item = data.data;
  const {
    content,
    category,
    publisher: { picture, nickName, enterprise },
    createDate,
    images,
  } = item;

  const enterpriseName = enterprise?.name;

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => history.back()}
              className="btn btn-ghost btn-sm gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回
            </button>
          </motion.div>

          {/* 主内容卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* 用户信息头部 */}
            <div className="px-8 pt-8 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring-2 ring-primary/20">
                        <img
                          src={picture}
                          alt={nickName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <div>
                    <h2 className="text-xl font-bold text-base-content">
                      {nickName}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-base-content/60 mt-1">
                      {enterpriseName && (
                        <>
                          <span className="text-primary font-medium">
                            @{enterpriseName}
                          </span>
                          <span>·</span>
                        </>
                      )}
                      <span>{fromNow(createDate)}</span>
                    </div>
                  </div>
                </div>

                {/* 分类标签 */}
                {category?.name && (
                  <div className="badge badge-primary badge-lg font-medium px-3 py-2">
                    #{category.name}
                  </div>
                )}
              </div>
            </div>

            {/* 内容文本 */}
            <div className="px-8 pb-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-base-content/90 text-lg leading-relaxed whitespace-pre-wrap">
                  {content}
                </p>
              </div>
            </div>

            {/* 图片展示 */}
            {images.length > 0 && (
              <div className="px-8 pb-8">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="aspect-square cursor-pointer group overflow-hidden rounded-xl"
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <img
                        src={image.url}
                        alt={`图片 ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23f3f4f6"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="%239ca3af"/></svg>';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 交互区域 */}
            <div className="px-8 pb-8">
              <div className="flex items-center justify-between pt-6 border-t border-base-300/20">
                <div className="flex items-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-base-content/60 hover:text-red-500 transition-colors"
                    onClick={() => {
                      toast.warning("需要登录");
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="font-medium">喜欢</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-base-content/60 hover:text-blue-500 transition-colors"
                    onClick={() => {
                      toast.warning("需要登录");
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="font-medium">评论</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  disabled={shareLoading}
                  className="flex items-center gap-3 text-base-content/60 hover:text-green-500 transition-colors disabled:opacity-50"
                >
                  {shareLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  )}
                  <span className="font-medium">分享</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 相关推荐或其他内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 bg-base-100 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">相关动态</h3>
            <div className="text-center py-8 text-base-content/60">
              <div className="text-4xl mb-2">🔍</div>
              <p>暂无相关动态推荐</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="预览"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DynamicDetail;
