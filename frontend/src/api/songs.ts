import axios from 'axios';
import { Song } from '../types/songs';

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const fetchDailySongs: () => Promise<Song[]> = async () => {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
};