import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "umi";
import useAxios from "axios-hooks";
import { ApiResponse } from "@/models/base";
import { DocDirectory, findMarkdownFileById, MarkdownFile } from "@/models/doc";
import { docGet } from "@/tools/api";
import Loading from "@/components/loading";
import MarkdownComponent from "@/components/markdown";
import FolderSvg from "@/components/folder_svg";
import MdSvg from "@/components/md_svg";
import { fromNow } from "@/tools/date";
import Documents from "@/components/md_header";
import { motion } from "framer-motion";
import { useSearchParams } from "@@/exports";
import { Typography } from "antd";

const { Paragraph } = Typography;

type FilesProp = {
  files: MarkdownFile[];
  onSelectFile: (file: MarkdownFile) => void;
  currentFile: MarkdownFile | undefined;
};

const FilesWidget: React.FC<FilesProp> = ({
  files,
  onSelectFile,
  currentFile,
}) => {
  return (
    <ul className="space-y-1">
      {files.map((file, index) => (
        <motion.li
          key={file.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectFile(file)}
          className={`
            py-3 px-4 rounded-lg cursor-pointer transition-all duration-200
            hover:bg-base-200/70 hover:shadow-sm hover:translate-x-1
            ${
              currentFile?.id === file.id
                ? "bg-primary/10 border-l-4 border-primary text-primary font-semibold"
                : "hover:border-l-4 hover:border-primary/30"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`transition-colors ${currentFile?.id === file.id ? "text-primary" : ""}`}
            >
              <MdSvg />
            </div>
            <span className="truncate text-sm">{file.name}</span>
            {currentFile?.id === file.id && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

type Props = {
  children: DocDirectory[];
  onSelectFile: (file: MarkdownFile) => void;
  currentFile: MarkdownFile | undefined;
};

const RenderMenu: React.FC<Props> = ({
  children,
  onSelectFile,
  currentFile,
}) => {
  return (
    <div className="space-y-2">
      {children.map((child, index) => (
        <motion.div
          key={child.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border border-base-200 rounded-lg bg-base-50/50"
        >
          <details open>
            <summary className="py-3 px-4 rounded-lg cursor-pointer font-medium flex items-center gap-3 list-none hover:bg-base-200/50 transition-colors">
              <FolderSvg />
              <span className="text-base-content">{child.name}</span>
              <svg
                className="w-4 h-4 ml-auto text-base-content/50 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-2 pl-4 pb-2">
              {child.files && Array.isArray(child.files) && (
                <FilesWidget
                  currentFile={currentFile}
                  files={child.files}
                  onSelectFile={onSelectFile}
                />
              )}
              {child.children && (
                <div className="mt-3">
                  <RenderMenu
                    children={child.children}
                    onSelectFile={onSelectFile}
                    currentFile={currentFile}
                  />
                </div>
              )}
            </div>
          </details>
        </motion.div>
      ))}
    </div>
  );
};

type Type = {
  doc: DocDirectory;
  onClick: (file: MarkdownFile | undefined) => void;
  selectedFile: MarkdownFile | undefined;
};

const Menu: React.FC<Type> = ({ doc, onClick, selectedFile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnScroll = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener("scroll", closeMenuOnScroll);
    }
    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, [isMenuOpen]);

  const onSelectFile = (file: MarkdownFile | undefined) => {
    onClick(file);
    toggleMenu();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="sm:hidden fixed top-2 left-4 p-3 mt-12 z-50 bg-primary text-primary-content rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={toggleMenu}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Menu */}
      <motion.div
        initial={{ x: -320, opacity: 0 }}
        animate={{
          x: isMenuOpen || window.innerWidth >= 640 ? 0 : -320,
          opacity: isMenuOpen || window.innerWidth >= 640 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-4 top-20 w-80 z-40 h-[calc(100vh-6rem)]"
      >
        <div className="h-full bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
          <div className="p-4 border-b border-base-200 bg-base-50/30">
            <div
              onClick={() => onSelectFile(undefined)}
              className="cursor-pointer group"
            >
              <h2 className="text-lg font-bold text-primary group-hover:text-primary-focus transition-colors">
                {doc.name}
              </h2>
            </div>
          </div>

          <div className="h-[calc(100%-5rem)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="space-y-4">
              <FilesWidget
                files={doc.files}
                onSelectFile={onSelectFile}
                currentFile={selectedFile}
              />
              <RenderMenu
                children={doc.children}
                onSelectFile={onSelectFile}
                currentFile={selectedFile}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const DefaultView = ({
  doc,
  onFileClick,
}: {
  doc: DocDirectory;
  onFileClick: (file: MarkdownFile) => void;
}) => {
  const DirectoryView: React.FC<{ directory: DocDirectory }> = ({
    directory,
  }) => {
    return (
      <div className="text-left mt-4">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-base-200/50">
          <FolderSvg />
          <h3 className="text-md font-semibold">{directory.name}</h3>
        </div>
        <ul className="pl-6 mt-2 space-y-2">
          {directory.files.map((file) => (
            <li
              key={file.id}
              onClick={() => onFileClick(file)}
              className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2 text-sm"
            >
              <MdSvg />
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
        {directory.children && (
          <div className="pl-6 mt-2 space-y-2">
            {directory.children.map((childDir) => (
              <DirectoryView key={childDir.name} directory={childDir} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="bg-base-50 rounded-2xl p-8">
        <div className="text-center border-b border-base-200 pb-6">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-2xl font-bold">{doc.name}</h1>
          {doc.introduce && (
            <div className="text-md text-base-content/80 mt-2 max-w-2xl mx-auto">
              {doc.introduce}
            </div>
          )}
          <div className="text-sm text-base-content/60 mt-4">
            创建于 {fromNow(doc.createDate)}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center mb-6">文件总览</h2>
          <div className="text-left max-w-3xl mx-auto">
            <ul className="space-y-2">
              {doc.files.map((file) => (
                <li
                  key={file.id}
                  onClick={() => onFileClick(file)}
                  className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-base-200/50"
                >
                  <MdSvg />
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-4">
              {doc.children.map((child) => (
                <DirectoryView key={child.name} directory={child} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocPage: React.FC = () => {
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const [{ loading, data }] = useAxios<ApiResponse<DocDirectory>>({
    url: docGet + `${title}`,
  });
  let doc = data?.data;
  const [selectedFile, setSelectedFile] = useState<MarkdownFile>();

  const handleFileClick = (file: MarkdownFile | undefined) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedFile]);

  const fileId = useMemo(() => {
    const id = searchParams.get("id");
    return id ? parseInt(id, 10) : null;
  }, [searchParams]);

  useEffect(() => {
    if (fileId && doc) {
      const foundFile = findMarkdownFileById(doc.children, fileId);
      if (foundFile) {
        setSelectedFile(foundFile);
      } else {
        setSelectedFile(doc.files.find((value) => value.id === fileId));
      }
    }
    if (doc && !fileId) {
      if (doc.files.length > 0) {
        setSelectedFile(doc.files[0]);
      }
    }
  }, [fileId, doc]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200/30 to-base-100">
      {loading && <Loading />}

      {!loading && !doc && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center p-8 rounded-2xl bg-base-100 shadow-lg border border-base-200">
            <div className="text-4xl mb-4">📄</div>
            <span className="text-lg text-base-content/70">笔记不存在</span>
          </div>
        </motion.div>
      )}

      {doc && (
        <div className="relative">
          <Menu
            doc={doc}
            onClick={handleFileClick}
            selectedFile={selectedFile}
          />

          {/* Main Content */}
          <div className="ml-4 sm:ml-[2rem] mr-4 lg:mr-[2rem] p-6">
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200">
              {selectedFile ? (
                <motion.div
                  key={selectedFile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-8"
                >
                  <div className="mb-8 pb-6 border-b border-base-200">
                    <h1 className="text-3xl font-bold mb-4 text-primary">
                      {selectedFile.name}
                    </h1>

                    <div className="flex justify-between items-center text-sm text-base-content/70 bg-base-50 rounded-lg p-4">
                      <span>发布时间: {fromNow(selectedFile.createDate)}</span>
                      <Paragraph
                        copyable={{
                          text: `https://itbug.shop/idea/${title}?id=${selectedFile?.id}`,
                          tooltips: [`复制链接`],
                        }}
                        className="mb-0"
                      >
                        分享
                      </Paragraph>
                    </div>
                  </div>

                  <div className="mt-6">
                    <MarkdownComponent
                      id="md-body"
                      key={`${selectedFile.id}`}
                      text={selectedFile.content}
                    />
                  </div>
                </motion.div>
              ) : (
                <DefaultView doc={doc} onFileClick={handleFileClick} />
              )}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="hidden lg:block fixed right-4 bottom-4 w-80 z-30 bg-base-100 rounded-2xl shadow-lg border border-base-200">
            <div className="p-6">
              <div className="mb-4 pb-4 border-b border-base-200">
                <h3 className="text-lg font-semibold text-primary">目录导航</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <Documents md={selectedFile?.content ?? ""} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocPage;
