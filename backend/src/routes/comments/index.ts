import { Request, Response } from 'express';
const dbClient = require('../../db');
const commentsRouter = require('express').Router();

/**
 * GET /api/comments
 * @summary Fetches all of today's comments from the database
 * @tags comments
 * @return {array<Comment>} 200 - An array of comments
 * @return {Error} 500 - Internal server error
 */
commentsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const query = `SELECT * FROM comments WHERE created_at::date = '${currentDate}'`;
        const response = await dbClient.query(query);
        const comments = response.rows;
        return res.status(200).json(comments);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/comments
 * @summary Adds a comment to the database. Creates a new user if the username does not exist.
 * @tags comments
 * @param {string} body.content.required - The comment to add
 * @param {string} body.username.required - The username of the commenter
 * @return {Comment} 200 - The comment that was added
 * @return {Error} 400 - Bad request
 * @return {Error} 500 - Internal server error
 */

commentsRouter.post('/', async (req: Request, res: Response) => {
    const { content, username } = req.body;
    if (!content || !username) {
        return res.status(400).json({ error: 'Missing required parameter(s): content, username' });
    }
    try {
        const currentDate = new Date().toISOString();
        const query = `INSERT INTO comments (content, username, created_at) VALUES ('${content}', '${username}', '${currentDate}') RETURNING *`;
        const response = await dbClient.query(query);
        const data = response.rows[0];
        
        const upsertQuery = `INSERT INTO users (username) VALUES ('${username}') ON CONFLICT DO NOTHING`;
        await dbClient.query(upsertQuery);
        return res.status(200).json(data);
    } catch (e){
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});