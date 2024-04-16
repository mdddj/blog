import {projectStore} from "@/providers/project";
import {useShallow} from "zustand/react/shallow";
import ProjectCard from "@/components/project_card";

export default function Page() {


    const [projects] = projectStore(useShallow((state) => [state.data]))

    return (
        <div className={'grid grid-cols-3 gap-2'}>
            {
                projects.length === 0 && <span>暂无项目</span>
            }
            {
                projects.map(value => {
                    return (<ProjectCard project={value} key={value.id}/>)
                })
            }
        </div>
    );
}
