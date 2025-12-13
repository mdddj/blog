import { Terminal } from "lucide-react";
import { Link } from "umi";

export default function BlogName() {
    return <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-nexus-800 p-2 rounded-lg border border-white/10 group-hover:border-nexus-accent/50 transition-colors">
            <Terminal size={20} className="text-nexus-accent" />
        </div>
        <span className="font-bold text-xl tracking-tight text-black hover:text-green-950 transition-colors">
            梁典典<span className="text-gray-500">.BLOG</span>
        </span>
    </Link>
}