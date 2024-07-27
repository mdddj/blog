import TextComponent from "@/components/text"
import CardTitle from "@/components/title"
import { useParams, useSearchParams } from "umi"

///单页
const SinglePage: React.FC = () => {
    const {key} = useParams<{key: string}>()
    const [searchParams] =   useSearchParams()
    let title = searchParams.get("title")
    console.log(`key is ${key}`)

    return <>
        {title!=null && <CardTitle title={title} />}
        <TextComponent textKey={key??""} />
    </>
}

export default SinglePage