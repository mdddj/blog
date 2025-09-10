import { FriendLink } from "@/models/friend";
import React from "react";
import { motion } from "framer-motion";

const LinkItemLayout: React.FC<{ link: FriendLink }> = ({ link }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400 }}
        >
            <div className={'card shadow-xl bg-base-100 rounded-2xl overflow-hidden h-full'}>
                <figure className={'aspect-[1/1]'}>
                    <img
                        alt={link.name}
                        src={link.logo}
                        className={'aspect-[1/1] object-cover w-full h-full'}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dy=".3em">No Image</text></svg>';
                        }}
                    />
                </figure>
                <div className={'card-body p-4'}>
                    <h2 className={'card-title text-lg font-bold mb-2'}>
                        <a
                            href={link.url}
                            target={'_blank'}
                            rel={'noreferrer'}
                            className={'link link-hover hover:text-primary transition-colors duration-300'}
                        >
                            {link.name}
                        </a>
                    </h2>
                    <p className={'text-sm text-base-content/70 flex-grow'}>
                        {link.intro || '暂无介绍'}
                    </p>
                    <div className={'card-actions justify-end mt-4'}>
                        <div className="badge badge-outline badge-sm">
                            友链
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LinkItemLayout;
