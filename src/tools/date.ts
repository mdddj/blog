import dayjs from "dayjs";
import 'dayjs/locale/zh'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export function fromNow(date: Date ) : string {
    return dayjs(date).locale("zh-cn").fromNow()
}