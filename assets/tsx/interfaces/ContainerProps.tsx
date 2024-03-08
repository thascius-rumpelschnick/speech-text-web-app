import React from "react";

export interface User {
    id: number;
    name: string;
}

export interface Transcription {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}
