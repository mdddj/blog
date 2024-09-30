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


type Type = {
    doc: DocDirectory,
    onClick:(file: MarkdownFile) => void,
    selectedFile: MarkdownFile | undefined,
}
const Menu: React.FC<Type> = ({doc,onClick,selectedFile}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 滚动时关闭菜单的函数
    const closeMenuOnScroll = () => {
        setIsMenuOpen(false);
    };


    // useEffect 用于监听滚动事件
    useEffect(() => {
        // 当菜单打开时，添加滚动事件监听
        if (isMenuOpen) {
            window.addEventListener('scroll', closeMenuOnScroll);
        }

        // 清除监听器
        return () => {
            window.removeEventListener('scroll', closeMenuOnScroll);
        };
    }, [isMenuOpen]);

    const renderMenu = (children: DocDirectory[]) => {
        return (
            <li>
                {children.map((child) => (
                    <ul key={child.name}>
                        <li>
                            <details open>
                                <summary><FolderSvg/>{child.name}</summary>
                                {child.files && Array.isArray(child.files) && (
                                    <ul>
                                        {child.files.map((file) => (
                                            <li key={file.id}  onClick={() => {
                                                toggleMenu()
                                                onClick(file)
                                            }}>
                                                <a className={selectedFile?.id == file.id ? 'active' : ''}> <MdSvg/>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {child.children && renderMenu(child.children)}
                            </details>
                        </li>
                    </ul>
                ))}
            </li>
        );
    };
    return <>
        <button
            className="sm:hidden fixed top-2 left-2 p-2 mt-12 bg-base-200 rounded-md"
            onClick={toggleMenu}
        >
            {/* 使用tailwind中的图标类，或者你可以使用你喜欢的图标 */}
            {isMenuOpen ? '关闭菜单' : '显示菜单'}
        </button>
        <ul  className={`menu menu-xs rounded-lg bg-base-200 w-full max-w-xs fixed left-1 transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? 'block' : 'hidden'
        } sm:block`}>
            <li><a className={'text-lg font-bold'}>{doc.name}</a></li>
            <li><span>创建于{fromNow(doc.createDate)}</span></li>
            <div className={'divider'}></div>
            {renderMenu(doc.children)}
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

    useEffect(()=>{
        if(doc && doc.children.length >0 && !selectedFile){
            let first = doc.children[0]
            if(first.files.length > 0){
                setSelectedFile(first.files[0])
            }
        }
    },[
        doc
    ])



    return <div className={''}>
        {loading && <Loading/>}
        {!loading && !doc && <span>学习笔记不存在</span>}
        {doc && <div>
            <div className="">
                <Menu doc={doc}  onClick={handleFileClick} selectedFile={selectedFile}/>
                <div>
                    {selectedFile ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedFile.name}</h2>
                            <div className={'text-neutral-500'}>
                                发布时间:{fromNow(selectedFile.createDate)}
                            </div>
                            <MarkdownComponent text={selectedFile.content}/>
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