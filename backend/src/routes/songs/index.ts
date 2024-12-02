import { Request, Response } from 'express';
import { Song } from './types';
const { fetchRandomSongs } = require('./util');
const songRouter = require('express').Router();
require('dotenv').config();
const dbClient = require('../../db');


/**
 * GET /api/songs
 * @summary Fetches 3 daily songs from the database. If no songs are found, fetches 3 random songs from the Genius API and adds them to the database.
 * @tags song
 * @return {array<Song>} 200 - An array of 3 random songs
 * @return {Error} 500 - Internal server error
 */
songRouter.get('/', async (req: Request, res: Response) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const query = `SELECT * FROM songs WHERE featured_date = $1`;
        const response = await dbClient.query(query, [currentDate]);
        const dailySongs: Song[] = response.rows;
        if (dailySongs.length > 0) {
            return res.status(200).json(dailySongs);
        }
        const newSongs: Song[] = await fetchRandomSongs();
        for (const song of newSongs) {
            const insertQuery = `INSERT INTO songs (id, title, artist, thumbnail_url, genius_url, featured_date) VALUES ($1, $2, $3, $4, $5, $6)`;
            await dbClient.query(insertQuery, [song.id, song.title, song.artist, song.thumbnail_url, song.genius_url, currentDate]);
        }
        return res.status(200).json(newSongs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = songRouter;
