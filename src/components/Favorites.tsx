import React, {FC, useContext, useEffect, useState} from 'react';
import { IUser } from '../types/types';
import "./Favorites.scss"
import UserCard from './UserCard';
import { Zoom } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DragContext } from '../DragContext';

const Favorites: FC = () => {
    const [favoritedUserList, setFavoritedUserList] = useState<IUser[]>([] as IUser[]);
    const setDraggedCard: React.Dispatch<React.SetStateAction<IUser>> = useContext(DragContext).setDraggedCard;
    const draggedCard: IUser = useContext(DragContext).draggedCard;

    const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    }

    const dragEnterHandler = (e: React.DragEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        target.style.boxShadow = '0px 5px 0px 0px #000000'
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        target.style.boxShadow = 'none'
    }

    const isAdded = (user: IUser) : boolean => {
        return favoritedUserList.findIndex((favoritedUser: IUser) => favoritedUser.id.value === user.id.value) != -1 ?
            true : false;
    }

    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, user: IUser) => {
        setDraggedCard(() => user)
    }

    const dropHandler = (e: React.DragEvent<HTMLElement>, currentCard?: IUser) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target as HTMLElement
        target.style.boxShadow = 'none'
        try {
            if (!isAdded(draggedCard)) {
                if (currentCard !== undefined) {
                    const index = favoritedUserList.indexOf(currentCard) + 1
                    const newOrderedArray = [...favoritedUserList]
                    newOrderedArray.splice(index, 0, draggedCard)
                    setFavoritedUserList((prev: IUser[]) => newOrderedArray)
                } else
                    setFavoritedUserList((prev: IUser[]) => [...prev, draggedCard])
            } else {
                if (currentCard !== undefined) {
                    const currentCardIndex = favoritedUserList.indexOf(currentCard) + 1
                    const draggedCardIndex = favoritedUserList.indexOf(draggedCard)
                    const newOrderedArray = [...favoritedUserList]
                    newOrderedArray.splice(draggedCardIndex, 1)
                    newOrderedArray.splice(currentCardIndex, 0, draggedCard)
                    setFavoritedUserList(() => newOrderedArray)
                }
            }
        } catch (e) {
            console.error(e)
        }
        setDraggedCard(() => ({} as IUser))
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
                    <Zoom in={true} key={user.id.value}>
                        <li className="favorites__userCard" draggable onDragStart={(e: React.DragEvent<HTMLLIElement>) => dragStartHandler(e, user)} onDragOver={(e: React.DragEvent<HTMLLIElement>) => dragOverHandler(e)} onDragEnter={(e: React.DragEvent<HTMLLIElement>) =>
                            dragEnterHandler(e)} onDrop={(e: React.DragEvent<HTMLLIElement>) => dropHandler(e, user)} onDragLeave={(e: React.DragEvent<HTMLLIElement>) => dragLeaveHandler(e)}>
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
