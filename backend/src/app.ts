const express = require('express');
import { Router } from 'express';
const app = express();
const PORT = 4000;
const songRouter: Router = require('./routes/song');

app.use('/api/song', songRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})