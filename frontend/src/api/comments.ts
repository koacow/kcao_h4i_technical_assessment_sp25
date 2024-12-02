import axios from 'axios';
import { Comment } from '../types/comments';

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const getFetchDailyComments: () => Promise<Comment[]> = async () => {
    const response = await axios.get(`${API_URL}/comments`);
    return response.data;
};

export const addComment: ( content: string, username: string) => Promise<Comment> = async (content, username) => {
    const body = { content, username };
    const response = await axios.post(`${API_URL}`, body);
    return response.data;
};