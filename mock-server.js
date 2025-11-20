/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-Id, X-GitHub-Api-Version, X-VSCode-Session-Id, X-VSCode-Machine-Id, OpenAI-Intent, X-Interaction-Type');

	if (req.method === 'OPTIONS') {
		res.writeHead(204);
		res.end();
		return;
	}

	if (req.method === 'POST' && req.url === '/chat/completions') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});

		req.on('end', () => {
			console.log('Received chat request:', body);

			// Send SSE headers
			res.writeHead(200, {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			});

			const mockResponse = "Hello! I am Adrian Co-pilot, running on your local mock server. I can help you with your code.";
			const words = mockResponse.split(' ');

			let i = 0;
			const interval = setInterval(() => {
				if (i < words.length) {
					const content = words[i] + (i < words.length - 1 ? ' ' : '');
					const chunk = {
						id: 'chatcmpl-mock-' + Date.now(),
						object: 'chat.completion.chunk',
						created: Math.floor(Date.now() / 1000),
						model: 'adrian-mock-model',
						choices: [{
							index: 0,
							delta: { content: content },
							finish_reason: null
						}]
					};
					res.write(`data: ${JSON.stringify(chunk)}\n\n`);
					i++;
				} else {
					// Send the final stop chunk
					const stopChunk = {
						id: 'chatcmpl-mock-' + Date.now(),
						object: 'chat.completion.chunk',
						created: Math.floor(Date.now() / 1000),
						model: 'adrian-mock-model',
						choices: [{
							index: 0,
							delta: {},
							finish_reason: 'stop'
						}]
					};
					res.write(`data: ${JSON.stringify(stopChunk)}\n\n`);
					res.write('data: [DONE]\n\n');
					clearInterval(interval);
					res.end();
				}
			}, 100); // Stream a word every 100ms
		});
	} else {
		res.writeHead(404);
		res.end('Not Found');
	}
});

server.listen(PORT, () => {
	console.log(`Mock Adrian AI API server running at http://localhost:${PORT}`);
	console.log('Ready to accept requests at http://localhost:3000/chat/completions');
});
