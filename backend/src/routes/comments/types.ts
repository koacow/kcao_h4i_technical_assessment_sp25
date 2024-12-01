export interface Comment {
    id: number;
    content: string;
    user_id: number;
    created_at: string;
}

export interface User {
    id: number;
    username: string;
}