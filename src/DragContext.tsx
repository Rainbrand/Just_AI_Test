import React, {FC, useEffect, useState} from 'react';
import {IChildren, IUser } from './types/types';

const DragContext = React.createContext<{draggedCard: IUser, setDraggedCard: React.Dispatch<React.SetStateAction<IUser>>}>({} as any)

const DragContextPovider: FC<IChildren> = (props) => {
    const [draggedCard, setDraggedCard] = useState<IUser>({} as IUser);

    return(
        <DragContext.Provider value={{draggedCard, setDraggedCard}}>
            {props.children}
        </DragContext.Provider>
    )
}

export {DragContextPovider, DragContext}
