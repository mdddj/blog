import React, { useState } from "react";
import { Resource } from "@/models/base";
import { fromNow } from "@/tools/date";
import { motion, AnimatePresence } from "framer-motion";
import { history } from "@@/exports";
import { toast } from "@/tools/toast";

type Prop = {
  item: Resource;
};

const ResourceCard: React.FC<Prop> = ({ item }) => {
  const {
    content,
    category,
    publisher: { picture, nickName, enterprise },
    createDate,
    images,
  } = item;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const enterpriseName = enterprise?.name;

  // 跳转到详情页面
  const handleCardClick = (e: React.MouseEvent) => {
    // 防止在点击图片或按钮时触发
    if ((e.target as HTMLElement).closest(".prevent-card-click")) {
      return;
    }
    history.push(`/dynamic/${item.id}`);
  };

  // 复制分享链接
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareLoading(true);
    try {
      const url = `${window.location.origin}/dynamic/${item.id}`;
      await navigator.clipboard.writeText(url);

      // 显示成功提示
      toast.success("链接已复制到剪贴板");
    } catch (_err) {
      // 降级处理：手动选择文本
      const textArea = document.createElement("textarea");
      textArea.value = `${window.location.origin}/dynamic/${item.id}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      toast.success("链接已复制到剪贴板");
    } finally {
      setShareLoading(false);
    }
  };

  // 图片网格布局逻辑
  const getGridLayout = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-2";
    return "grid-cols-3";
  };

  const getImageAspect = (count: number, index: number) => {
    if (count === 1) return "aspect-[4/3]";
    if (count === 2) return "aspect-square";
    if (count === 4 && index < 2) return "aspect-square";
    return "aspect-square";
  };

  const shouldShowMoreIndicator = (count: number, index: number) => {
    return count > 6 && index === 5;
  };

  const visibleImages = images.slice(0, 6);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
        className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-[var(--transition-slow)] border border-base-300/20 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* 用户信息头部 */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="avatar">
                  <div className="w-11 h-11 rounded-full ring-2 ring-base-300/30">
                    <img
                      src={picture}
                      alt={nickName}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-base-100"></div>
              </motion.div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-base text-base-content/90 leading-tight">
                  {nickName}
                </h3>
                <div className="flex items-center gap-1 text-xs text-base-content/60">
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="badge badge-primary badge-sm font-medium px-2 py-1"
              >
                #{category.name}
              </motion.div>
            )}
          </div>
        </div>

        {/* 内容文本 */}
        <div className="px-6 pb-4">
          <p className="text-base-content/80 text-[15px] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {/* 图片网格 */}
        {images.length > 0 && (
          <div className="px-6 pb-6">
            <div className={`grid gap-2 ${getGridLayout(images.length)}`}>
              {visibleImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative ${getImageAspect(images.length, index)} cursor-pointer group overflow-hidden rounded-xl prevent-card-click`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(image.url);
                  }}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
                    src={image.url}
                    alt={`图片 ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23f3f4f6"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="%239ca3af"/></svg>';
                    }}
                  />

                  {/* 更多图片指示器 */}
                  {shouldShowMoreIndicator(images.length, index) && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-lg font-semibold">
                        +{images.length - 6}
                      </div>
                    </div>
                  )}

                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-[var(--transition-normal)]" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 交互区域 */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between pt-3 border-t border-base-300/20">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.warning("需要登录");
                }}
                className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="text-sm font-medium">喜欢</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.warning("需要登录");
                }}
                className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="text-sm font-medium">评论</span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              disabled={shareLoading}
              className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors prevent-card-click disabled:opacity-50"
            >
              {shareLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg
                  className="w-5 h-5"
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
              <span className="text-sm font-medium">分享</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
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

export default ResourceCard;
