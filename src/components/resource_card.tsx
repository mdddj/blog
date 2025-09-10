import React from "react";
import { Resource } from "@/models/base";
import { fromNow } from "@/tools/date";
import { motion } from "framer-motion";

type Prop = {
    item: Resource
}

const ResourceCard: React.FC<Prop> = ({ item }) => {
    const { content, category, publisher: { picture, nickName, enterprise }, createDate, images } = item

    let enterpriseName = enterprise?.name

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
        >
            <div className="card-body p-6">
                {/* 用户信息 */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                            <img src={picture} alt={nickName} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{nickName}</h3>
                        <div className="text-sm text-base-content/60">
                            {enterpriseName ? `@${enterpriseName}` : ''} · {fromNow(createDate)}
                        </div>
                    </div>
                </div>

                {/* 内容 */}
                <div className="mb-4">
                    <p className="text-base-content whitespace-pre-wrap">{content}</p>
                </div>

                {/* 图片 */}
                {images.length !== 0 && (
                    <div className="mb-4">
                        <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {images.map((value, index) => (
                                <div key={value.id} className="aspect-square">
                                    <img
                                        className="rounded-lg object-cover w-full h-full"
                                        src={value.url}
                                        alt={value.url}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dy=".3em">No Image</text></svg>';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 分类标签 */}
                <div className="card-actions justify-end">
                    <div className="badge badge-primary badge-outline">#{category?.name ?? "-"}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default ResourceCard;
