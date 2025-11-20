# Adrian Co-pilot API Documentation

To integrate **Adrian Co-pilot** with the **Ridelink Adrian AI API**, your backend must implement the following contract. The extension is built to be compatible with the OpenAI Chat Completions API format, with some GitHub Copilot-specific headers and conventions.

## Base URL
The extension is currently configured to use:
`https://api.ridelink.ai`

## Authentication
The extension sends an Authorization header with every request.
`Authorization: Bearer <access_token>`

For local testing with the mock mode enabled, the token will be:
`mock_token_adrian_copilot_local_dev_<timestamp>`

## Endpoints

### 1. Chat Completions
**Endpoint**: `/chat/completions`
**Method**: `POST`
**Content-Type**: `application/json`

#### Request Body
```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are an AI programming assistant..."
    },
    {
      "role": "user",
      "content": "Write a function to calculate fibonacci"
    }
  ],
  "temperature": 0.1,
  "top_p": 1,
  "n": 1,
  "stream": true,
  "max_tokens": 4096
}
```

#### Response (Streaming)
The response **MUST** be a stream of Server-Sent Events (SSE).

**Format**:
```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-4","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-4","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-4","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

### 2. Embeddings (Optional)
If you want to support codebase indexing and semantic search.

**Endpoint**: `/embeddings`
**Method**: `POST`

#### Request Body
```json
{
  "input": "text to embed",
  "model": "text-embedding-ada-002"
}
```

#### Response
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [0.0023064255, -0.009327292, ...],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

## Headers
The extension sends these headers which you can use for analytics or routing:
- `X-Request-Id`: Unique UUID for the request
- `X-GitHub-Api-Version`: API version (e.g., `2023-07-07`)
- `X-VSCode-Session-Id`: VS Code session ID
- `X-VSCode-Machine-Id`: Machine ID

## Error Handling
Return standard HTTP error codes:
- `401 Unauthorized`: Invalid token
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Testing with Mock Server
You can run the provided `mock-server.js` to simulate this API locally:
`node mock-server.js`
