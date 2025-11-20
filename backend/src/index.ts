/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Adrian Co-pilot API is running');
});

app.post('/chat/completions', (req, res) => {
	// Placeholder for chat completion logic
	res.status(501).json({ error: 'Not implemented yet' });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
