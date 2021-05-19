import React, {FC, useEffect, useState} from 'react';
import { IUser } from '../types/types';
import "./UserCard.scss"

const UserCard: FC<{user: IUser }> = ({user}) => {
    useEffect(() => {
        console.log(user)
    }, []);

    return(
        <div className="userCard">
            <img src={user.picture.thumbnail} alt="photo"/>
            <div className="userCard__info">
                <div className="userCard__name">
                    {`${user.name.first} ${user.name.last}, registered: ${user.registered.date}`}
                </div>
                <div className="userCard__email">
                    {`${user.email}`}
                </div>
            </div>
        </div>
    )
}

export default UserCard
