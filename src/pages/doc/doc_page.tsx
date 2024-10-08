import React, {useEffect, useState} from "react";
import {useParams} from "umi";
import useAxios from "axios-hooks";
import {ApiResponse} from "@/models/base";
import {DocDirectory, MarkdownFile} from "@/models/doc";
import {docGet} from "@/tools/api";
import Loading from "@/components/loading";
import MarkdownComponent from "@/components/markdown";
import FolderSvg from "@/components/folder_svg";
import MdSvg from "@/components/md_svg";
import {fromNow} from "@/tools/date";
import Documents from "@/components/md_header";


type FilesProp = {
    files: MarkdownFile[],
    onSelectFile: (file: MarkdownFile) => void,
    currentFile: MarkdownFile | undefined
}
const FilesWidget: React.FC<FilesProp> = ({files, onSelectFile, currentFile}) => {
    return <>
        <ul>
            {files.map((file) => (
                <li key={file.id} onClick={() => {
                    onSelectFile(file)
                }}>
                    <a className={currentFile?.id == file.id ? 'active' : ''}>
                        <MdSvg/>{file.name}</a>
                </li>
            ))}
        </ul>
    </>
}

type Props = {
    children: DocDirectory[],
    onSelectFile: (file: MarkdownFile) => void,
    currentFile: MarkdownFile | undefined
}

const RenderMenu: React.FC<Props> = ({children, onSelectFile, currentFile}) => {
    return <>
        <li>
            {children.map((child) => (
                <ul key={child.name}>
                    <li>
                        <details open>
                            <summary><FolderSvg/>{child.name}</summary>
                            {child.files && Array.isArray(child.files) &&
                                <FilesWidget currentFile={currentFile} files={child.files}
                                             onSelectFile={onSelectFile}/>}
                            {child.children && <RenderMenu children={child.children} onSelectFile={onSelectFile}
                                                           currentFile={currentFile}/>}
                        </details>
                    </li>
                </ul>
            ))}
        </li>
    </>
}

type Type = {
    doc: DocDirectory,
    onClick: (file: MarkdownFile) => void,
    selectedFile: MarkdownFile | undefined,
}
const Menu: React.FC<Type> = ({doc, onClick, selectedFile}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenuOnScroll = () => {
        setIsMenuOpen(false);
    };
    useEffect(() => {
        if (isMenuOpen) {
            window.addEventListener('scroll', closeMenuOnScroll);
        }
        return () => {
            window.removeEventListener('scroll', closeMenuOnScroll);
        };
    }, [isMenuOpen]);


    const onSelectFile = (file: MarkdownFile) => {
        onClick(file)
        toggleMenu()
    }

    return <>
        <button
            className="sm:hidden fixed top-2 left-2 p-2 mt-12 bg-base-200 rounded-md"
            onClick={toggleMenu}
        >
            {isMenuOpen ? '关闭菜单' : '显示菜单'}
        </button>
        <ul className={`menu menu-xs rounded-lg bg-base-200 w-full max-w-xs fixed left-1 transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? 'block' : 'hidden'
        } sm:block`}>
            <li><a className={'text-lg font-bold'}>{doc.name}</a></li>
            <li><span>创建于{fromNow(doc.createDate)}</span></li>
            <div className={'divider'}></div>
            <FilesWidget files={doc.files} onSelectFile={onSelectFile} currentFile={selectedFile}/>
            <RenderMenu children={doc.children} onSelectFile={onSelectFile} currentFile={selectedFile}/>
        </ul>
    </>
}


const DocPage: React.FC = () => {
    const {title} = useParams()
    const [{loading, data}] = useAxios<ApiResponse<DocDirectory>>({url: docGet + `${title}`})
    let doc = data?.data
    const [selectedFile, setSelectedFile] = useState<MarkdownFile>();

    const handleFileClick = (file: MarkdownFile) => {
        setSelectedFile(file);
    };

    useEffect(() => {
        if(doc?.files && doc.files.length > 0){
            setSelectedFile(doc.files[0])
            return
        }
        if (doc && doc.children.length > 0 && !selectedFile) {
            let first = doc.children[0]
            if (first.files.length > 0) {
                setSelectedFile(first.files[0])
            } else {
                setSelectedFile(undefined)
            }
        } else {
            setSelectedFile(undefined)
        }
    }, [doc])


    return <div className={''}>
        {loading && <Loading/>}
        {!loading && !doc && <span>笔记不存在</span>}
        {doc && <div>
            <div className="relative">
                <Menu doc={doc} onClick={handleFileClick} selectedFile={selectedFile}/>
                <div className={'fixed right-0 bottom-0 mt-5 w-80'}>
                    <Documents md={selectedFile?.content ?? ''}/>
                </div>
                <div>
                    {selectedFile ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedFile.name}</h2>
                            <div className={'text-neutral-500'}>
                                发布时间:{fromNow(selectedFile.createDate)}
                            </div>

                            <MarkdownComponent id={'md-body'} text={selectedFile.content}/>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">请选择一个文档</div>
                    )}
                </div>
            </div>
        </div>}

    </div>
}

export default DocPage