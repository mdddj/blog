import useAxios from "axios-hooks";
import {groupListApi} from "@/tools/api";
import {ApiResponse} from "@/models/base";
import {ResourcesCategory} from "@/models/resource";
import Loading from "@/components/loading";
import {Link, Outlet} from "umi";
import {useMatch} from "@@/exports";

///
export default function Page() {
    const match = useMatch('/g/:id')
    const [{loading, data}] = useAxios<ApiResponse<ResourcesCategory[]>>({url: groupListApi})

    if (loading) {
        return <Loading/>
    }
    if (!data) {
        return <>error data!</>
    }
    const {data: list} = data

    const selectId = match?.params.id

    return (<div>

            <ul className={'md:hidden flex overflow-x-scroll space-x-2 p-2 whitespace-nowrap'}>
                {
                    list.map(value => {
                        return <li key={value.id}><Link
                            className={`${selectId === `${value.id}` ? 'text-primary-content flex-shrink-0' : 'flex-shrink-0'}`}
                            to={`/g/${value.id}`}>{value.name}</Link></li>
                    })
                }
            </ul>
            <div className={'flex flex-row gap-10'}>
                <ul className={'menu flex-none bg-base-200 w-56 rounded-box hidden md:block'}>
                    {
                        list.map(value => {
                            return <li key={value.id}><Link className={`${selectId === `${value.id}` ? 'active' : ''}`}
                                                            to={`/g/${value.id}`}>{value.name}</Link></li>
                        })
                    }
                </ul>

                <div className={'grow'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
