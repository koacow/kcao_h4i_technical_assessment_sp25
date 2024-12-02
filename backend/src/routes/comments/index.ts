import { Request, Response } from 'express';
import { Comment, User } from './types';
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
        const query = `
            SELECT comments.id, comments.content, comments.user_id, comments.created_at, users.username
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.created_at::date = $1
        `;
        const response = await dbClient.query(query, [currentDate]);
        const comments: Comment[] = response.rows;
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
    const { content, username } = req.body ?? {};
    if (!content || !username) {
        return res.status(400).json({ error: 'Missing required parameter(s): content, username' });
    }
    try {
        const upsertQuery = `INSERT INTO users (username) VALUES ('${username}') ON CONFLICT DO NOTHING`;
        await dbClient.query(upsertQuery);

        const userQuery = `SELECT id FROM users WHERE username = '${username}'`;
        const userResponse = await dbClient.query(userQuery);
        const user: User = userResponse.rows[0];

        const currentDate = new Date().toISOString();
        const query = `INSERT INTO comments (content, user_id, created_at) VALUES ($1, $2, $3) RETURNING *`;
        const response = await dbClient.query(query, [content, user.id, currentDate]);
        const data: Comment = {
            ...response.rows[0],
            username
        }
        
        return res.status(200).json(data);
    } catch (e){
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = commentsRouter;    