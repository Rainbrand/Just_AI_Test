import React, {FC, useContext} from 'react';
import {UsersContext} from "./UserDataProvider"
import {IUser} from "../types/types";
import "./Search.scss"

const Search: FC = () => {
    const context = useContext<IUser[]>(UsersContext)

    return (
        <div className="search" >
            <span className="search__input" contentEditable="true"/>
            <ul className="search__list">
                {context.length === 0 ? "Loading..." :
                      context.map(user => (
                      <li key={user.id.value} className="search__item">
                          {`${user.name.first} ${user.name.last}`}
                      </li>
                 ))}

            </ul>
        </div>
    )
}

export default Search
