import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {IChildren, IFetch, IUser} from "../types/types";

const UsersContext = React.createContext<Map<number, IUser[]>>({} as Map<number, IUser[]>)

const UserDataProvider: FC<IChildren> = (props) => {
    const [markedUsers, setMarkedUsers] = useState<Map<number, IUser[]>>({} as Map<number, IUser[]>);
    //const [markedUsers, setMarkedUsers] = useState([]);

    async function getUsers() {
        try {
            const users = await axios.get<IFetch>('https://randomuser.me/api/?results=10' +
                '&inc=name,email,registered,picture,id' +
                '&nat=us,gb')
            await tagUsers(users.data.results)
        } catch (e){
            console.error(e)
        }
    }

    async function tagUsers(users: IUser[]){
        const groupedUsers = new Map<number, IUser[]>()
        for (let i = 1; i <= 10; i++){
            groupedUsers.set(i, [])
        }
        for (const user of users) {
            const age = Math.floor((user.registered.age - 1) / 10) + 1
            const alreadyGrouped = groupedUsers.get(age)
            if (alreadyGrouped === undefined) {
                groupedUsers.set(age, [user]);
            } else {
                groupedUsers.set(age, [...alreadyGrouped, user])
            }
        }
        await setMarkedUsers(groupedUsers)
        console.log(groupedUsers)
    }

    useEffect(() => {
        getUsers()
    }, []);

    
    return (
        <UsersContext.Provider value={markedUsers}>
            {props.children}
        </UsersContext.Provider>
    )
}

export {UserDataProvider, UsersContext}