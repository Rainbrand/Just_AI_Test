import React, {FC, useState} from 'react';
import { IUser } from '../types/types';
import "./Favorites.scss"
import UserCard from './UserCard';

const Favorites: FC = () => {
    const [favoritedUserList, setFavoritedUserList] = useState<IUser[]>([] as IUser[]);

    const dragOverHandler = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("Dragover")
    }

    const isAdded = (user: IUser) : boolean => {
        if (favoritedUserList.findIndex((favoritedUser: IUser) => favoritedUser.id.value === user.id.value) != -1) return true;
        else return false;
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const parsedUser: IUser = JSON.parse(e.dataTransfer.getData("text/plain"))
        if (!isAdded(parsedUser)) setFavoritedUserList((prev: IUser[]) => [...prev, parsedUser])
        console.log("Drop")
    }

    return (
        <div className="favorites" >
            <span className="favorites__title">
                Favorites
            </span>
            <div className="favorites__userList" onDragOver={e => dragOverHandler(e)} onDrop={e => dropHandler(e)}>
                <ul>{console.log(favoritedUserList)}{favoritedUserList.map((user: IUser) =>(
                    <li>
                        <UserCard user={user}/>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Favorites
