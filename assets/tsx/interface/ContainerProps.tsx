import React from "react";

export interface User {
    id: number,
    name: string,
}

export interface Record {
    id: number,
    updated: string,
    name: string,
    artist: string,
    released: string,
    type: string,
    medium: string,
    notes: string,
    miscellaneous: string,
    imageUrl: string,
    tracks: Track[],
}

export interface Track {
    position: number,
    title: string,
    length: number,
}

export interface AppProps {
    key: string,
    user: User,
    collection: Record[],
}

export interface ContainerProps {
    vm: AppProps,
    children: React.ReactElement,
}