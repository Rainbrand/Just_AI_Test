import React, {FC, useState} from 'react';
import { IUser } from '../types/types';
import "./Favorites.scss"
import UserCard from './UserCard';
import { Zoom } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Favorites: FC = () => {
    const [favoritedUserList, setFavoritedUserList] = useState<IUser[]>([] as IUser[]);

    const dragOverHandler = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("Dragover")
    }

    const isAdded = (user: IUser) : boolean => {
        return favoritedUserList.findIndex((favoritedUser: IUser) => favoritedUser.id.value === user.id.value) != -1 ?
            true : false;
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const parsedUser: IUser = JSON.parse(e.dataTransfer.getData("text/plain"))
        if (!isAdded(parsedUser)) setFavoritedUserList((prev: IUser[]) => [...prev, parsedUser])
        console.log("Drop")
    }

    const removeFromFavorites = (user: IUser) => {
        const filteredList = favoritedUserList.filter((filteredUser: IUser) => filteredUser.id.value !== user.id.value)
        setFavoritedUserList(filteredList)
    }

    return (
        <div className="favorites" >
            <span className="favorites__title">
                Favorites
            </span>
            <div className="favorites__userListContainer" onDragOver={e => dragOverHandler(e)} onDrop={e => dropHandler(e)}>
                <ul className="favorites__userList">{favoritedUserList.map((user: IUser) =>(
                    <Zoom in={true}>
                        <li key={user.id.value} className="favorites__userCard">
                            <UserCard user={user}/>
                            <DeleteIcon className="favorites__removeButton" onClick={(e: React.MouseEvent) => {removeFromFavorites(user)} }/>
                        </li>
                    </Zoom>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Favorites
