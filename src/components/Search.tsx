import React, {FC, useContext, useEffect, useState} from 'react';
import {UsersContext} from "./UserDataProvider"
import {IUser} from "../types/types";
import "./Search.scss"
import HighlightedText from './HighlightedText';

const Search: FC = () => {
    const groupedUsersList: Array<IUser[]> = useContext(UsersContext)
    const [filteredUsersList, setFilteredUsersList] = useState<Array<IUser[]>>(JSON.parse(JSON.stringify(groupedUsersList)))
    const [isHiddenState, setHiddenState] = useState<Array<boolean>>([] as Array<boolean>);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setHiddenState(initIsHiddenState)
        setFilteredUsersList([...groupedUsersList])
    }, [groupedUsersList]);

    const initIsHiddenState = () => {
        const state = new Array<boolean>()
        for (let i = 0; i < 10; i++){
            state[i] = false
        }
        return state
    }

    const updateHiddenState = (index: number) => {
        setHiddenState(prev => {
            const newState = [...prev]
            newState[index] = !newState[index]
            return newState
        })
    }

    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, user: IUser) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(user))
    }

    const filterUsers = (input: string) => {
        if (input.length ===  0) setFilteredUsersList(JSON.parse(JSON.stringify(groupedUsersList)))
        const filteredUsers: Array<IUser[]> = []
        for (const filteredUser of groupedUsersList) {
            filteredUsers.push(filteredUser.filter((user: IUser) => {
                return user.name.first.includes(input) || user.name.last.includes(input)
            }))
        }
        setFilteredUsersList(filteredUsers)
    }

    const renderUsers = (users: IUser[]) => {
        return (users.map(user => (
            <li key={user.id.value} className='search__userElement' draggable onDragStart={e => dragStartHandler(e, user)}>
                <HighlightedText text={`${user.name.first} ${user.name.last}`} highlight={searchInput}/>
            </li>
        )))
    }

    const renderGroups = (groupedUsers: Array<IUser[]>) => {
        return (
            groupedUsers.map((users, groupID) => (
                <li key={groupID} className={`search__group ${users.length === 0 ? 'search__group--disabled' : 'search__group--active'}`}>
                    <ul className="search__userList">
                        <div className="search__groupName" onClick={() => updateHiddenState(groupID)}>
                            {`${1 + 10 * groupID}-${(groupID + 1) * 10}`}
                        </div>
                        {isHiddenState[groupID] ? renderUsers(users) : null}
                    </ul>
                </li>
            )
        ))
    }

    return (
        <div className="search" >
            <span className="search__input" contentEditable="true" onInput={(e : React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                setSearchInput(() => target.innerText)
                filterUsers(target.innerText)
            }}/>
            <ol className="search__groups">
                {renderGroups(filteredUsersList)}
            </ol>
        </div>
    )
}

export default Search
