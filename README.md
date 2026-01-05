# Justify Text API

## Description

This is a small API that justifies plain text to a fixed line width (80 characters). It supports multiple paragraphs, word splitting for long words, and enforces a maximum text limit of 80,000 words. Authentication is required to access the justify endpoint.

## Requirements
+ Node.js ≥ 18
+ npm ≥ 9

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/d-valino/justify-text-api.git

cd justify-text-api/server/

npm install
```

## Running Locally

``npm run dev``

The server will start on http://localhost:3000 by default.
> Make sure to set environment variables if needed (e.g., JWT_SECRET for authentication).

## Endpoints
### POST /api/token

Generate a JWT token for authentication.

Request Body (JSON):

```
{
  "email": "foo@gmail.com"
}
```

Response:

```
{
  "token": "<JWT_TOKEN>"
}
```

### POST /api/justify

Justify a plain text input. Requires Authorization header with the JWT token.

**Headers**:
```
Content-Type: text/plain
Authorization: Bearer <JWT_TOKEN>
```

**Body**: Plain text (multiple paragraphs allowed)

**Response**: Justified text (max 80 characters per line, preserves paragraphs)

## Tests

Run unit and integration tests:

``npm run test``


Run tests with coverage:

``npm run coverage``


> Coverage reports are available after running the command.

## Examples

**Generate token**

```
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email":"foo@gmail.com"}'
```

**Justify text**
```
curl -X POST http://localhost:3000/api/justify \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: text/plain" \
  -d "Your text here..."
```
