import React from "react";
import { useParams } from "@@/exports";
import useAxios from "axios-hooks";
import { groupResourceList } from "@/tools/api";
import Loading from "@/components/loading";
import { ApiResponse, Resource } from "@/models/base";
import ResourceCard from "@/components/resource_card";
import { motion } from "framer-motion";

const ResourceListWidget: React.FC = () => {
    const params = useParams()
    const id = params.id
    const [{ data, loading }] = useAxios<ApiResponse<Resource[]>>({ url: groupResourceList, params: { id } })

    if (!id) {
        return <div>not found</div>
    }

    if (data) {
        console.log(data)
    }
    if (loading) return <Loading />

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col gap-6">
                    {data?.data?.map((value, index) => (
                        <motion.div
                            key={value.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <ResourceCard item={value} />
                        </motion.div>
                    ))}
                    {data && data.data.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4">💭</div>
                            <h3 className="text-xl font-semibold mb-2">暂无动态</h3>
                            <p className="text-base-content/70">还没有发布任何心情动态</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default ResourceListWidget;
