import React, {PropsWithChildren, useState} from "react";

type Props = {
    panel: React.ReactNode;
}

const HoverPanel : React.FC<PropsWithChildren<Props>> = ({children,panel}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {isHovered && (
                <div className="absolute top-full left-0 bg-neutral text-neutral-content mt-2 card shadow-lg">
                    <div className={'card-body'}>
                        {panel}
                    </div>

                </div>
            )}
        </div>
    );
};

export default HoverPanel;
