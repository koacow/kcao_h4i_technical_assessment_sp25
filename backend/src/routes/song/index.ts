import { Request, Response } from 'express';
const songRouter = require('express').Router();
const axios = require('axios');
require('dotenv').config();
const GENIUS_ENDPOINT: string = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN: string = process.env.GENIUS_ACCESS_TOKEN;


/**
 * GET /api/song
 * @summary Fetches 3 random songs from the Genius API
 * @tags song
 * @return {array<Song>} 200 - An array of 3 random songs
 * @return {Error} 500 - Internal server error
 */
// TODO: make this endpoint return 3 random songs daily and save them to the database
songRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${GENIUS_ENDPOINT}/songs/`, {
            headers: {
                Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`
            },
            params: {
                per_page: 3,
                page: 1
            }
        });

        const songs = response.data;
        return res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = songRouter;
