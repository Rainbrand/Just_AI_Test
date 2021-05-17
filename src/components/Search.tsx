import React, {FC, useContext, useEffect, useState} from 'react';
import {UsersContext} from "./UserDataProvider"
import {IUser} from "../types/types";
import "./Search.scss"

const Search: FC = () => {
    const groupedUsersList: Map<number, IUser[]> = useContext(UsersContext)
    const [isHiddenState, setHiddenState] = useState<Array<boolean>>([] as Array<boolean>);

    useEffect(() => {
        setHiddenState(initIsHiddenState)
        console.log(isHiddenState)
    }, [groupedUsersList]);


    const temp = Array.from(groupedUsersList)

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


    // const updateHiddenState = (index: number) => {
    //     setHiddenState(prev => {
    //         prev[index] = !prev[index]
    //         return prev;
    //         }
    //     )
    // }
    //
    // const renderUsers = (value) => {
    //     return (value[1].map(user => (
    //         <li key={user.id.value} className='search__user'>
    //             {`${user.name.first} ${user.name.last}`}
    //         </li>
    //     )))
    // }

    return (
        <div className="search" >
            <span className="search__input" contentEditable="true"/>
            <ol className="search__groups">
                {temp.map(value => (
                    <li key={value[0]} className={`search__group ${value[1].length === 0 ? 'search__group--disabled' : 'search__group--active'}`}>
                        <ul>
                            <div className="search__group__name" onClick={() => updateHiddenState(value[0])}>
                                {`${value[0] + 9 * (value[0] - 1)}-${value[0] * 10}`}
                            </div>
                            {isHiddenState[value[0]] ? value[1].map(user => (
                                <li key={user.id.value} className='search__user'>
                                    {`${user.name.first} ${user.name.last}`}
                                </li>)) : null}
                            {/*{value[1].map(user => (*/}
                            {/*    <li key={user.id.value} className='search__user'>*/}
                            {/*        {`${user.name.first} ${user.name.last}`}*/}
                            {/*    </li>*/}
                            {/*))}*/}
                        </ul>
                    </li>
                ))}
                {/*{groupedUsersList.length === 0 ? "Loading..." :*/}
                {/*    groupedUsersList.map(group => (*/}
                {/*      <ul key={group.key()} className="search__group">*/}
                {/*          {`${user.name.first} ${user.name.last}`}*/}
                {/*      </ul>*/}
                {/* ))}*/}
            </ol>
        </div>
    )
}

export default Search
