# GoIT Homework. Contact Management REST API

A Node.js REST API application for managing contacts with PostgreSQL database and Sequelize ORM. Built with Express.js as an educational project for the GoIT Fullstack Backend Development course.

> **⚠️ Note:** This is a learning project and not suitable for production environments.

## Prerequisites

- **Node.js:** LTS version 22+ or 24+
- **Package Manager:** `pnpm` (or `npm`)
- **Docker/Podman:** For running PostgreSQL database and pgAdmin
- **PostgreSQL Client:** (optional) For direct database access

## Installation

1. Clone or download the repository

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory:
    ```env
    # Application
    APP_PORT=3000
    
    # PostgreSQL Database
    POSTGRES_USER=your_username
    POSTGRES_PASSWORD=your_password
    POSTGRES_DB=contacts_db
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    
    # pgAdmin (for development)
    PGADMIN_DEFAULT_EMAIL=admin@example.com
    PGADMIN_DEFAULT_PASSWORD=admin
    PGADMIN_DEFAULT_PORT=5050
    ```

4. Start the PostgreSQL database with Docker Compose:
    ```bash
    # Using Docker
    docker-compose -f docker-compose.dev.yaml up -d
    
    # Or using Podman
    podman-compose -f docker-compose.dev.yaml up -d
    ```

5. Run database migrations:
    ```bash
    pnpm db:migrate
    ```

6. (Optional) Seed the database with sample data:
    ```bash
    pnpm db:seed
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
        "id": 1,
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
    "id": 1,
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
    "id": 1,
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
    "id": 1,
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
}
```

## Project Structure

```
├── app.js                        # Application entry point
├── config/
│   └── config.js                 # Sequelize database configuration
├── controllers/
│   └── contactsControllers.js    # Request handlers
├── routes/
│   └── contactsRouter.js         # Route definitions
├── services/
│   └── contactsServices.js       # Business logic layer
├── models/
│   ├── index.js                  # Sequelize initialization
│   └── contact.js                # Contact model definition
├── migrations/
│   └── 20260210142425-create-contacts.cjs  # Database schema migrations
├── seeders/
│   └── 20260210161909-contacts.cjs         # Sample data seeders
├── schemas/
│   └── contactsSchemas.js        # Joi validation schemas
├── helpers/
│   ├── HttpError.js              # Error handling utility
│   └── validateBody.js           # Validation middleware
└── docker-compose.dev.yaml       # Docker setup for PostgreSQL & pgAdmin
```

## DEV

### Development Environment Setup

This project uses PostgreSQL database with Sequelize ORM. The development environment is containerized using Docker Compose for easy setup and reproducibility.

#### 1. Database Setup with Docker Compose

The `docker-compose.dev.yaml` file provides:
- **PostgreSQL 18**: Main database server
- **pgAdmin 4**: Web-based database administration tool

Start the containers:
```bash
# Using Docker
docker-compose -f docker-compose.dev.yaml up -d

# Using Podman
podman-compose -f docker-compose.dev.yaml up -d
```

Stop the containers:
```bash
docker-compose -f docker-compose.dev.yaml down
# or
podman-compose -f docker-compose.dev.yaml down
```

#### 2. Database Migrations

Sequelize migrations manage database schema changes. Migrations are versioned and allow you to evolve your database schema over time.

**Available migration commands:**

```bash
# Apply all pending migrations
pnpm db:migrate

# Undo the last migration
pnpm db:migrate:undo

# Reset database (undo all migrations and reapply)
pnpm db:reset
```

**Creating a new migration:**

1. Generate a migration file:
   ```bash
   pnpm sequelize-cli migration:generate --name create-your-table
   ```

2. After generation, change the file extension to `.cjs` (CommonJS format)

3. Edit the migration file to define your schema:
   ```javascript
   'use strict';

   module.exports = {
     async up(queryInterface, Sequelize) {
       await queryInterface.createTable('YourTable', {
         id: {
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
         },
         // ... other fields
         createdAt: {
           allowNull: false,
           type: Sequelize.DATE
         },
         updatedAt: {
           allowNull: false,
           type: Sequelize.DATE
         }
       });
     },

     async down(queryInterface, Sequelize) {
       await queryInterface.dropTable('YourTable');
     }
   };
   ```

4. Run the migration:
   ```bash
   pnpm db:migrate
   ```

#### 3. Database Seeders

Seeders populate the database with sample or initial data, useful for development and testing.

**Run all seeders:**
```bash
pnpm db:seed
```

**Creating a new seeder:**

1. Generate a seeder file:
   ```bash
   pnpm sequelize-cli seed:generate --name your-seed-name
   ```

2. Change the file extension to `.cjs`

3. Edit the seeder file to insert data:
   ```javascript
   'use strict';

   module.exports = {
     async up(queryInterface, Sequelize) {
       await queryInterface.bulkInsert('Contacts', [
         {
           name: 'John Doe',
           email: 'john@example.com',
           phone: '(123) 456-7890',
           createdAt: new Date(),
           updatedAt: new Date()
         },
         // ... more records
       ]);
     },

     async down(queryInterface, Sequelize) {
       await queryInterface.bulkDelete('Contacts', null, {});
     }
   };
   ```

#### 4. Database Administration

**Access pgAdmin:**
1. Open browser to `http://localhost:5050` (or the port specified in `.env`)
2. Login with credentials from `.env` file:
   - Email: `PGADMIN_DEFAULT_EMAIL`
   - Password: `PGADMIN_DEFAULT_PASSWORD`
3. Add a new server connection:
   - Host: `postgres` (container name) or `localhost` (from host machine)
   - Port: `5432`
   - Username/Password: From `.env` file

**Direct PostgreSQL access:**
```bash
# Using Docker
docker exec -it postgres psql -U your_username -d contacts_db

# Using Podman
podman exec -it postgres psql -U your_username -d contacts_db
```

#### 5. Development Workflow

**Typical development cycle:**

```bash
# 1. Start database containers
podman-compose -f docker-compose.dev.yaml up -d

# 2. Apply migrations (if any new migrations)
pnpm db:migrate

# 3. Seed database (first time or after reset)
pnpm db:seed

# 4. Start development server with auto-reload
pnpm dev

# 5. Make changes to code (nodemon will auto-restart)

# 6. When done, stop the server (Ctrl+C) and containers
podman-compose -f docker-compose.dev.yaml down
```

#### 6. Creating New Models

When adding a new model:

1. Create the model file in `models/` directory
2. Generate and create a migration file
3. (Optional) Create a seeder for sample data
4. Run migrations to update database schema

**Example model structure:**
```javascript
export default (sequelize, DataTypes) => {
  const YourModel = sequelize.define('YourModel', {
    // Define fields here
  });
  
  return YourModel;
};
```

#### 7. Troubleshooting

**Database connection issues:**
- Ensure Docker/Podman containers are running
- Check `.env` file for correct credentials
- Verify PostgreSQL port is not in use by another service

**Migration errors:**
- Check migration file syntax
- Ensure previous migrations executed successfully
- Try `pnpm db:migrate:undo` and reapply

**Reset database completely:**
```bash
# Stop containers and remove volumes
podman-compose -f docker-compose.dev.yaml down -v

# Start fresh
podman-compose -f docker-compose.dev.yaml up -d
pnpm db:migrate
pnpm db:seed
```

## Security

The application runs with Node.js permission model enabled to restrict file system and network access:

```bash
# Production mode - restricted file system access
node --permission --allow-fs-read=. ./app.js

# Development mode - same restrictions with auto-reload
nodemon --permission --allow-fs-read=. ./app.js
```

**Security features:**
- Limited file system read access to project directory
- Environment variables for sensitive credentials
- Database connection validation before server start
- Input validation with Joi schemas
- Error handling without exposing internal details

## Features

- ✅ RESTful API architecture
- ✅ Full CRUD operations for contacts
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Database migrations and seeders
- ✅ Docker Compose for development environment
- ✅ Request validation with Joi
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Request logging with Morgan
- ✅ Node.js permission model security
- ✅ pgAdmin for database administration

## Development Tools

### Backend Stack
- **Express.js**: Web framework
- **Sequelize**: PostgreSQL ORM
- **PostgreSQL**: Relational database
- **Joi**: Schema validation
- **Morgan**: HTTP request logger
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Environment
- **Nodemon**: Auto-reload during development
- **Docker/Podman**: Container runtime
- **pgAdmin**: Database administration interface
- **Sequelize CLI**: Database migration and seeder management

## Example Usage with cURL

```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Get contact by ID
curl http://localhost:3000/api/contacts/1

# Create a new contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authentication: Bearer ..." \
  -d '{"name":"Mango","email":"mango@gmail.com","phone":"(322) 222-2222"}'

# Update contact (full)
curl -X PUT http://localhost:3000/api/contacts/1 \
  -H "Content-Type: application/json" \
  -H "Authentication: Bearer ..." \
  -d '{"name":"Updated Name","email":"updated@email.com","phone":"(111) 222-3333"}'

# Update contact (partial)
curl -X PATCH http://localhost:3000/api/contacts/1 \
  -H "Content-Type: application/json" \
  -H "Authentication: Bearer ..." \
  -d '{"phone":"(999) 888-7777"}'

# Update contact favorite
curl -X PATCH http://localhost:3000/api/contacts/1/favorite \
  -H "Content-Type: application/json" \
  -H "Authentication: Bearer ..." \
  -d '{"favorite":true}'

# Delete contact
curl -X DELETE http://localhost:3000/api/contacts/1 \
  -H "Authentication: Bearer ..."
```

## Contributing

This repository is created for the GoIT course curriculum. If you're a student working on similar exercises, feel free to use this as a reference. However, make sure to:

- Understand the concepts thoroughly
- Implement your own solution
- Follow best practices and code standards

## License

This project is created for educational purposes as part of the GoIT course curriculum.
