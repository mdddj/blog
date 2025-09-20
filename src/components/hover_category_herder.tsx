import { Blog, Category } from "@/models/blog";
import { motion } from "framer-motion";

export default function HoverCategoryHeader({
  blogs,
  closePopover,
  category,
}: {
  blogs: Blog[];
  closePopover: () => void;
  category: Category;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
        <img
          src={category.logo}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {category.name}
        </h3>
        <p className="text-sm text-base-content/60">{blogs.length} 篇文章</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={closePopover}
        className="w-6 h-6 rounded-lg bg-base-200/50 hover:bg-error/10 hover:text-error transition-colors flex items-center justify-center"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
    </div>
  );
}
