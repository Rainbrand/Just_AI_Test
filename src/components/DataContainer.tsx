import React, {FC} from 'react';
import {IChildren} from "../types/types";
import "./DataContainer.scss";

const DataContainer: FC<IChildren> = (props) => {
    return (
        <div className="dataContainer">
            {props.children}
        </div>
    )
}

export default DataContainer
