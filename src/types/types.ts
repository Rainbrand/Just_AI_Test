import React from "react";

export interface IChildren {
    children?: React.ReactNode;
}

export interface IId{
    name: string,
    value: string
}

export interface IName {
    title: string,
    first: string,
    last: string
}

export interface IRegistered {
    date: string,
    age: number
}

export interface IPicture {
    large: string,
    medium: string,
    thumbnail: string
}

export interface IUser {
    id: IId;
    name: IName;
    email: string;
    registered: IRegistered;
    picture: IPicture;
}

export interface IFetch {
    results: IUser[];
    info: Array<string>
}
