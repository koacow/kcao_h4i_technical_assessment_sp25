import { Router } from 'express';

const songRouter: Router = require('express').Router();
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
songRouter.get('/', async (req, res) => {
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
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = songRouter;
