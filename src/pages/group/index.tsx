import useAxios from "axios-hooks";
import { groupListApi } from "@/tools/api";
import { ApiResponse } from "@/models/base";
import { ResourcesCategory } from "@/models/resource";
import Loading from "@/components/loading";
import { Link, Outlet } from "umi";
import { useMatch } from "@@/exports";
import { motion } from "framer-motion";

export default function Page() {
    const match = useMatch('/g/:id')
    const [{ loading, data }] = useAxios<ApiResponse<ResourcesCategory[]>>({ url: groupListApi })

    if (loading) {
        return <Loading />
    }
    if (!data) {
        return <>error data!</>
    }
    const { data: list } = data

    const selectId = match?.params.id

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">心情动态</h1>
                    <p className="text-base-content/70">记录每天的心情和生活点滴</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* 移动端导航 */}
                    <div className="md:hidden overflow-x-auto pb-2">
                        <div className="flex space-x-2 min-w-max">
                            {list.map(value => (
                                <motion.div
                                    key={value.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        className={`btn btn-sm ${selectId === `${value.id}` ? 'btn-primary' : 'btn-ghost'}`}
                                        to={`/g/${value.id}`}
                                    >
                                        {value.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 桌面端导航 */}
                    <div className="hidden md:block flex-none w-64">
                        <div className="bg-base-100 rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-bold mb-4">分类</h2>
                            <ul className="menu rounded-box">
                                {list.map(value => (
                                    <motion.li
                                        key={value.id}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Link
                                            className={`${selectId === `${value.id}` ? 'active bg-primary text-primary-content' : ''}`}
                                            to={`/g/${value.id}`}
                                        >
                                            {value.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="flex-grow">
                        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
