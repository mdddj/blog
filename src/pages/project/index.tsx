import {projectStore} from "@/providers/project";
import {useShallow} from "zustand/react/shallow";
import ProjectCard from "@/components/project_card";
import CardTitle from "@/components/title";

export default function Page() {


    const [projects] = projectStore(useShallow((state) => [state.data]))

    return (
        <>
            <CardTitle title={'项目'}/>
            <div className={'grid lg:grid-cols-3 gap-2 mt-5'}>

                {
                    projects.length === 0 && <span>暂无项目</span>
                }
                {
                    projects.map(value => {
                        return (<ProjectCard project={value} key={value.id}/>)
                    })
                }
            </div>
        </>
    );
}
