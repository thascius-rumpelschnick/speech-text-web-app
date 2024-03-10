export interface User {
    id: number;
    name: string;
}

export interface Transcription {
    id: number;
    content: string;
    contentAsHtml?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Setting {
        language: string;
        model: string;
}
