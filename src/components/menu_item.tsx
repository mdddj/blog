import React, { PropsWithChildren } from "react";

type Prop = {
  title: string;
};

const MyMenuItem: React.FC<PropsWithChildren<Prop>> = ({title,children}) => {
    return <div className="card bg-base-100 shadow-xl m-2">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {children}
        </div>
    </div>
};
export default MyMenuItem;
