import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {UsersContext} from "./UserDataProvider"
import {IUser} from "../types/types";
import "./Search.scss"
import HighlightedText from './HighlightedText';
import { DragContext } from './DragContext';

/**
 * Component returns component of grouped user list with ability to filter
 * @constructor
 */
const Search: FC = () => {
    const groupedUsersList: Array<IUser[]> = useContext(UsersContext)
    const [filteredUsersList, setFilteredUsersList] = useState<Array<IUser[]>>([...groupedUsersList])
    const [isHiddenState, setHiddenState] = useState<Array<boolean>>([] as Array<boolean>);
    const [searchInput, setSearchInput] = useState("");
    const setDraggedCard: React.Dispatch<React.SetStateAction<IUser>> = useContext(DragContext).setDraggedCard;

    useEffect(() => {
        setHiddenState(initIsHiddenState)
        setFilteredUsersList([...groupedUsersList])
    }, [groupedUsersList]);

    /**
     * Function initializes array of hidden states for groups. All is false by default.
     */
    const initIsHiddenState = () => {
        const state = new Array<boolean>()
        for (let i = 0; i < 10; i++){
            state[i] = false
        }
        return state
    }

    /**
     * Function changes hidden status of passed index.
     * @param index
     */
    const updateHiddenState = (index: number) => {
        setHiddenState(prev => {
            const newState = [...prev]
            newState[index] = !newState[index]
            return newState
        })
    }

    /**
     * Function handles dragStart event. Sets context of dragged card.
     * @param e: React.DragEvent<HTMLLIElement>
     * @param user: IUser
     */
    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, user: IUser) => {
        setDraggedCard(() => user)
    }

    /**
     * Function filters user list by input value
     * @param input
     */
    const filterUsers = (input: string) => {
        if (input.length ===  0) setFilteredUsersList(JSON.parse(JSON.stringify(groupedUsersList)))
        const filteredUsers: Array<IUser[]> = []
        for (const filteredUser of groupedUsersList) {
            filteredUsers.push(filteredUser.filter((user: IUser) => user.name.first.includes(input)
                || user.name.last.includes(input)
            ))
        }
        setFilteredUsersList(filteredUsers)
    }

    /**
     * Function renders all users in group
     * @param users
     */
    const renderUsers = (users: IUser[]) => {
        return (
            users.map(user => (
                <li key={user.id.value} className='search__userElement' draggable
                    onDragStart={e => dragStartHandler(e, user)}>
                    <HighlightedText text={`${user.name.first} ${user.name.last}`} highlight={searchInput}/>
                </li>
            ))
        )
    }

    /**
     * Function renders all groups
     * @param groupedUsers
     */
    const renderGroups = (groupedUsers: Array<IUser[]>) => {
        return (
            groupedUsers.map((users, groupID) => (
                <li key={groupID} className={`search__group ${users.length === 0 ? 'search__group--disabled' : 'search__group--enabled'}`}>
                    <ul className="search__userList">
                        <div className="search__groupName" onClick={() => {
                            updateHiddenState(groupID)
                        }}>
                            {`${1 + 10 * groupID}-${(groupID + 1) * 10}`}
                        </div>
                        {isHiddenState[groupID] ? renderUsers(users) : null}
                    </ul>
                </li>
            )
        ))
    }

    const memoizedFilteredUsers = useMemo(
        () => {
            return (
                renderGroups(filteredUsersList)
            )},
        [isHiddenState, searchInput],
    );


    return (
        <div className="search" >
            <span className="search__input" contentEditable="true" onInput={(e : React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                setSearchInput(() => target.innerText)
                filterUsers(target.innerText)
            }}/>
            <ol className="search__groups">
                {memoizedFilteredUsers}
            </ol>
        </div>
    )
}

export default Search
