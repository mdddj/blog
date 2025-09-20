import React, { useState, useEffect, useCallback } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { closeDialogModal, showDialogModal } from "@/tools/fun";
import { Link } from "@@/exports";
import { motion, AnimatePresence } from "framer-motion";
import "instantsearch.css/themes/algolia-min.css";

const { searchClient } = instantMeiliSearch(
  "https://search.itbug.shop",
  "7b8f1a8a2dd26a813b3ef7d3efad6aa89b348f295831b3c49087d5256d2fc5ca",
);

// 优化的搜索结果项组件
// @ts-ignore
const Hit = ({ hit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ x: 4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group w-full max-w-full min-w-0"
    >
      <Link
        to={`/detail/${hit.id}`}
        onClick={() => closeDialogModal("my_search_box")}
        className="
                    block p-4 rounded-2xl border border-base-200/50
                    hover:border-primary/30 hover:shadow-md hover:bg-base-50/50
                    transition-all duration-300 cursor-pointer
                    bg-gradient-to-r from-base-100 to-base-50/50
                    w-full max-w-full overflow-hidden
                "
      >
        <div className="flex items-start gap-3 w-full min-w-0">
          {/* 图标指示器 */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-relaxed">
              <Highlight hit={hit} attribute={"title"} />
            </h3>

            {/* 元数据 */}
            <div className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>最近更新</span>
              </div>
            </div>
          </div>

          {/* 箭头指示器 */}
          <div className="flex-shrink-0 text-base-content/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// 自定义搜索框组件
const CustomSearchBox = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-base-content/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <SearchBox
        classNames={{
          root: "w-full",
          form: "w-full",
          input: `
                        w-full pl-12 pr-4 py-4 text-base
                        bg-gradient-to-r from-base-100 to-base-50
                        border-2 border-base-200/50 rounded-2xl
                        focus:border-primary focus:ring-4 focus:ring-primary/20
                        focus:bg-base-100 focus:outline-none
                        placeholder-base-content/50
                        transition-all duration-300
                        shadow-sm focus:shadow-md
                    `,
          submit: "hidden",
          reset: "hidden",
        }}
        placeholder="搜索文章、标签或分类..."
      />
    </div>
  );
};

// 搜索状态组件
const SearchStats = () => {
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <Stats
        classNames={{
          root: "text-sm text-base-content/70",
          text: "font-medium",
        }}
      />
      <div className="text-xs text-base-content/50 flex items-center gap-1">
        <kbd className="kbd kbd-xs">↵</kbd>
        <span>选择</span>
        <kbd className="kbd kbd-xs">ESC</kbd>
        <span>关闭</span>
      </div>
    </div>
  );
};

// 主搜索组件
const SearchComponent = () => {
  return (
    <InstantSearch indexName={"blogs"} searchClient={searchClient}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CustomSearchBox />
      </motion.div>

      <SearchStats />

      <motion.div
        className="mt-4 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Hits
          hitComponent={Hit}
          classNames={{
            root: "!block !w-full !max-w-full space-y-3",
            list: "!flex !flex-col !w-full !max-w-full space-y-3 !grid-cols-none !gap-3 !overflow-hidden",
            item: "!w-full !max-w-full !min-w-0",
          }}
        />
      </motion.div>
    </InstantSearch>
  );
};

// 现代化搜索按钮
const SearchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        showDialogModal("my_search_box");
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        closeDialogModal("my_search_box");
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpenSearch = useCallback(() => {
    showDialogModal("my_search_box");
    setIsOpen(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    closeDialogModal("my_search_box");
    setIsOpen(false);
  }, []);

  return (
    <span className="items-center hidden lg:flex">
      {/* 触发按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
                    relative group px-4 py-2 rounded-xl
                    bg-gradient-to-r from-base-100 to-base-50
                    border-2 border-base-200/50 shadow-sm
                    hover:border-primary/30 hover:shadow-md hover:from-primary/5 hover:to-secondary/5
                    transition-all duration-300
                    flex items-center gap-2
                "
        onClick={handleOpenSearch}
      >
        <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>
        <span className="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">
          搜索
        </span>
        <kbd className="kbd kbd-xs bg-base-200/50 border-base-300/50 text-base-content/60 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
          ⌘K
        </kbd>

        {/* 悬浮光效 */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.button>

      {/* 模态弹窗 */}
      <dialog id="my_search_box" className="modal backdrop-blur-sm">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="modal-box w-11/12 max-w-4xl relative overflow-hidden bg-gradient-to-br from-base-100 to-base-50 border-2 border-base-200/50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-2xl opacity-40 pointer-events-none" />

              {/* 关闭按钮 */}
              <form method="dialog">
                <motion.button
                  className="
                                        btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10
                                        hover:bg-error/10 hover:text-error border border-base-200/50
                                        transition-all duration-200
                                    "
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseSearch}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </form>

              {/* 标题区域 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 relative"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  搜索文章
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </motion.div>

              {/* 搜索内容 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <SearchComponent />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseSearch}>close</button>
        </form>
      </dialog>
    </span>
  );
};

export { SearchButton };
