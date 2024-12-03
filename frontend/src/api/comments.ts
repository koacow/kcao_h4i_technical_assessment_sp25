import axios from 'axios';
import { Comment } from '../types/comments';

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * @summary Fetch comments by date. If no date is provided, fetches comments for today.
 * @param {Date} date the date to fetch comments for, defaults to today
 * @returns {Comment[]} array of comments. Empty array if no comments are found.
 * @throws {Error} if request fails
 */
export const fetchCommentsByDate: (date: Date) => Promise<Comment[]> = async (date = new Date()) => {
    const params = {
        date: date.toISOString().split('T')[0],
    }
    const response = await axios.get(`${API_URL}/comments`, { params });
    if (response.status !== 200) {
        throw new Error('Failed to fetch comments');
    }
    return response.data;
};

/**
 * @summary Adds a comment to the database
 * @param {string} content the content of the comment
 * @param {string} username the username of the commenter
 * @returns {Comment} the comment that was added
 * @throws {Error} if request fails
 */
export const addComment: ( content: string, username: string) => Promise<Comment> = async (content, username) => {
    const body = { content, username };
    const response = await axios.post(`${API_URL}/comments`, body);
    if (response.status !== 200) {
        throw new Error('Failed to add comment');
    }
    return response.data;
};