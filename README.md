# GoIT Homework. Contact Management REST API

A Node.js REST API application for managing contacts with persistent JSON file storage. Built with Express.js as an educational project for the GoIT Fullstack Backend Development course.

> **⚠️ Note:** This is a learning project and not suitable for production environments.

## Prerequisites

- **Node.js:** LTS version 22+ or 24+
- **Package Manager:** `pnpm` (or `npm`)

## Installation

1. Clone or download the repository
2. Install dependencies:
    ```bash
    pnpm install
    ```

## Quick Start

Start the server:

```bash
# Production mode
pnpm start

# Development mode with auto-reload
pnpm dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Get all contacts

**GET** `/api/contacts`

Returns an array of all contacts.

**Response:** `200 OK`
```json
[
  {
    "id": "qdggE76Jtbfd9eWJHrssH",
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
  }
]
```

### Get contact by ID

**GET** `/api/contacts/:id`

Returns a single contact by ID.

**Response:** `200 OK` or `404 Not Found`
```json
{
  "id": "qdggE76Jtbfd9eWJHrssH",
  "name": "Chaim Lewis",
  "email": "dui.in@egetlacus.ca",
  "phone": "(294) 840-6685"
}
```

### Create a new contact

**POST** `/api/contacts`

Creates a new contact.

**Request body:**
```json
{
  "name": "Mango",
  "email": "mango@gmail.com",
  "phone": "(322) 222-2222"
}
```

**Response:** `201 Created`
```json
{
  "id": "generated-id",
  "name": "Mango",
  "email": "mango@gmail.com",
  "phone": "(322) 222-2222"
}
```

**Validation rules:**
- `name` (required): string, max 100 characters
- `email` (required): valid email format
- `phone` (required): format `(XXX) XXX-XXXX`

### Update a contact (full update)

**PUT** `/api/contacts/:id`

Updates all fields of an existing contact.

**Request body:** (all fields required)
```json
{
  "name": "Updated Name",
  "email": "updated@email.com",
  "phone": "(111) 222-3333"
}
```

**Response:** `200 OK` or `404 Not Found`

### Update a contact (partial update)

**PATCH** `/api/contacts/:id`

Updates one or more fields of an existing contact.

**Request body:** (at least one field required)
```json
{
  "phone": "(999) 888-7777"
}
```

**Response:** `200 OK` or `404 Not Found`

### Delete a contact

**DELETE** `/api/contacts/:id`

Removes a contact by ID.

**Response:** `200 OK` or `404 Not Found`
```json
{
  "id": "qdggE76Jtbfd9eWJHrssH",
  "name": "Chaim Lewis",
  "email": "dui.in@egetlacus.ca",
  "phone": "(294) 840-6685"
}
```

## Project Structure

```
├── app.js                        # Application entry point
├── controllers/
│   └── contactsControllers.js    # Request handlers
├── routes/
│   └── contactsRouter.js         # Route definitions
├── services/
│   └── contactsServices.js       # Business logic
├── schemas/
│   └── contactsSchemas.js        # Joi validation schemas
├── helpers/
│   ├── HttpError.js              # Error handling utility
│   └── validateBody.js           # Validation middleware
└── db/
    └── contacts.json             # Persistent data storage
```

## Security

The application runs with Node.js permission model enabled to restrict file system and network access:

```bash
node --permission --allow-fs-read=. --allow-fs-write=./db ./app.js
```

## Features

- ✅ RESTful API architecture
- ✅ Full CRUD operations for contacts
- ✅ Request validation with Joi
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Request logging with Morgan
- ✅ Persistent JSON file storage
- ✅ Node.js permission model security

## Development Tools

- **Express.js**: Web framework
- **Joi**: Schema validation
- **Morgan**: HTTP request logger
- **CORS**: Cross-origin resource sharing
- **Nodemon**: Auto-reload during development

## Example Usage with cURL

```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Get contact by ID
curl http://localhost:3000/api/contacts/qdggE76Jtbfd9eWJHrssH

# Create a new contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Mango","email":"mango@gmail.com","phone":"(322) 222-2222"}'

# Update contact (full)
curl -X PUT http://localhost:3000/api/contacts/qdggE76Jtbfd9eWJHrssH \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@email.com","phone":"(111) 222-3333"}'

# Update contact (partial)
curl -X PATCH http://localhost:3000/api/contacts/qdggE76Jtbfd9eWJHrssH \
  -H "Content-Type: application/json" \
  -d '{"phone":"(999) 888-7777"}'

# Delete contact
curl -X DELETE http://localhost:3000/api/contacts/qdggE76Jtbfd9eWJHrssH
```

## Contributing

This repository is created for the GoIT course curriculum. If you're a student working on similar exercises, feel free to use this as a reference. However, make sure to:

- Understand the concepts thoroughly
- Implement your own solution
- Follow best practices and code standards

## License

This project is created for educational purposes as part of the GoIT course curriculum.
