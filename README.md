# Product Management CMS

A minimal Content Management System for managing products with MySQL database.

## Features

- Add, edit, delete products
- Soft delete with audit trail
- Status management (Draft, Published, Archived)
- Live products view
- Audit columns (created_by, updated_by, timestamps)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MySQL database:
- Import `database.sql` to create the database and table
- Update `.env.local` with your database credentials

3. Run development server:
```bash
npm run dev
```

## Environment Variables

Create `.env.local` file:
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=cms_db
```

## Deployment

This project is configured for Vercel deployment. Connect your GitHub repository to Vercel and add the environment variables in the Vercel dashboard.

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Soft delete product
- `GET /api/products/live` - Get published products

## Pages

- `/` - CMS interface for managing products
- `/live` - Public view of published products