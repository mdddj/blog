import React, {useState} from "react";
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


const DocPage: React.FC = () => {
    const {title} = useParams()
    const [{loading, data}] = useAxios<ApiResponse<DocDirectory>>({url: docGet + `${title}`})
    let doc = data?.data
    const [selectedFile, setSelectedFile] = useState<MarkdownFile>();

    const handleFileClick = (file: MarkdownFile) => {
        setSelectedFile(file);
    };

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
                                            <li key={file.id}  onClick={() => handleFileClick(file)}>
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

    return <div className={''}>
        {loading && <Loading/>}
        {!loading && !doc && <span>学习笔记不存在</span>}
        {doc && <div>
            <div className="">
                <ul className="menu menu-xs rounded-lg bg-base-200 w-full max-w-xs fixed left-1">
                    <li><a className={'text-lg font-bold'}>{doc.name}</a></li>
                    <li><span>创建于{fromNow(doc.createDate)}</span></li>
                    <div className={'divider'}></div>
                    {renderMenu(doc.children)}
                </ul>
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