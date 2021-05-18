import React, {FC, useContext, useEffect, useState} from 'react';
import {UsersContext} from "./UserDataProvider"
import {IUser} from "../types/types";
import "./Search.scss"

const Search: FC = () => {
    const groupedUsersMap: Map<number, IUser[]> = useContext(UsersContext)
    const [isHiddenState, setHiddenState] = useState<Array<boolean>>([] as Array<boolean>);

    useEffect(() => {
        setHiddenState(initIsHiddenState)
    }, [groupedUsersMap]);

    const initIsHiddenState = () => {
        const state = new Array<boolean>()
        for (let i = 1; i <=10; i++){
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

    const renderUsers = (users: IUser[]) => {
        return (users.map(user => (
            <li key={user.id.value} className='search__userElement' draggable>
                {`${user.name.first} ${user.name.last}`}
            </li>
        )))
    }

    const renderGroups = (groupedUsers: Map<number, IUser[]>) => {
        const mapToArray = Array.from(groupedUsers)
        return (
            mapToArray.map((entry: [number, IUser[]]) =>
                <li key={entry[0]} className={`search__group ${entry[1].length === 0 ? 'search__group--disabled' : 'search__group--active'}`}>
                    <ul className="search__userList">
                        <div className="search__groupName" onClick={() => updateHiddenState(entry[0])}>
                            {`${entry[0] + 9 * (entry[0] - 1)}-${entry[0] * 10}`}
                        </div>
                        {isHiddenState[entry[0]] ? renderUsers(entry[1]) : null}
                    </ul>
                </li>
            )
        )
    }

    return (
        <div className="search" >
            <span className="search__input" contentEditable="true"/>
            <ol className="search__groups">
                {renderGroups(groupedUsersMap)}
            </ol>
        </div>
    )
}

export default Search
