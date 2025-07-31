import { memo } from "react";

const Card = ({ children, className = "", ...props }) => {
    return (
        <div {...props} className={`${className} w-full rounded-[8px] bg-white p-3 shadow-sm`}>
            {children}
        </div>
    );
};

export default memo(Card);
