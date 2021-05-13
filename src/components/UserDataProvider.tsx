import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {IChildren, IFetch, IUser} from "../types/types";

const UsersContext = React.createContext<IUser[]>({} as IUser[])

const UserDataProvider: FC<IChildren> = (props) => {
    const [userData, setUserData] = useState<IUser[]>([]);

    async function getUsers() {
        try {
            const users = await axios.get<IFetch>('https://randomuser.me/api/?results=2' +
                '&inc=name,email,registered,picture,id' +
                '&nat=us,gb')
            await setUserData(users.data.results)
        } catch (e){
            console.error(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    
    return (
        <UsersContext.Provider value={userData}>
            {props.children}
        </UsersContext.Provider>
    )
}

export {UserDataProvider, UsersContext}
