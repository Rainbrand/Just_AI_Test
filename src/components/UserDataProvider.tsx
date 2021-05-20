import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {IChildren, IFetch, IUser} from "../types/types";
import { CircularProgress } from '@material-ui/core';

const UsersContext = React.createContext<Array<IUser[]>>([] as Array<IUser[]>)

/**
 * Component provides context for users, separated by registering age and flag for completion of fetching data
 * @param props
 * @constructor
 */
const UserDataProvider: FC<IChildren> = (props) => {
    const [markedUsers, setMarkedUsers] = useState<Array<IUser[]>>([] as Array<IUser[]>);
    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * Function fetches user list and groups them by register age
     */
    async function getUsers() {
        try {
            const users = await axios.get<IFetch>('https://randomuser.me/api/?results=500' +
                '&inc=name,email,registered,picture,id' +
                '&nat=us,gb')
            await tagUsers(users.data.results)
        } catch (e){
            console.error(e)
        }
    }

    /**
     * Function groups users by registering age
     * @param users
     */
    async function tagUsers(users: IUser[]){
        const groupedUsers = new Map<number, IUser[]>()
        for (let i = 0; i < 10; i++){
            groupedUsers.set(i, [])
        }
        for (const user of users) {
            const age = Math.floor((user.registered.age - 1) / 10)
            const alreadyGrouped = groupedUsers.get(age)
            if (alreadyGrouped === undefined) {
                groupedUsers.set(age, [user]);
            } else {
                groupedUsers.set(age, [...alreadyGrouped, user])
            }
        }
        setMarkedUsers(Array.from(groupedUsers.values()))
        setIsLoaded(() => true)
    }

    useEffect(() => {
        getUsers()
    }, []);


    return (
        <UsersContext.Provider value={markedUsers}>
            {isLoaded ? props.children : <CircularProgress className="loadSpinner"/>}
        </UsersContext.Provider>
    )
}

export {UserDataProvider, UsersContext}
