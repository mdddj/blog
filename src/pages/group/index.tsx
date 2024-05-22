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

    console.log(match)
    if (loading) {
        return <Loading/>
    }
    if (!data) {
        return <>error data!</>
    }
    const {data: list} = data

    const selectId = match?.params.id

    return (
        <div className={'flex flex-row gap-10 relative'}>
            <ul className={'menu flex-none bg-base-200 w-56 rounded-box '}>
                {
                    list.map(value => {
                        return <li key={value.id}><Link className={`${selectId === `${value.id}` ? 'active' : ''}`} to={`/g/${value.id}`}>{value.name}</Link></li>
                    })
                }
            </ul>
            <div className={'grow'}>
                <Outlet/>
            </div>
        </div>
    );
}
