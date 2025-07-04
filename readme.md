# Library Management API

A clean and efficient **RESTful** API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** to manage a library system. It supports full CRUD operations for books and borrow records, with features like filtering, sorting, and data aggregation to track borrowing activities.

---

## Live Link

```
https://l2-b5-library-management-api.vercel.app/
```

## Features

- Full CRUD for managing books
- Validation with Mongoose Schema
- Filter and sort books by genre, availability, or creation date
- Aggregation pipeline to summarize borrowed books(total quantity borrowed per book)
- Create a static method to check book availability. If the book is not available, update its availability status to false.
- Borrow books with due dates and quantity tracking
- Use a post hook to decrease the number of available copies when a borrow is posted.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **ts-node-dev**
- **dotenv**

---

## Installation & Setup

```

git clone https://github.com/MukitHossen7/L2B5-Library-Management-API-With-Mongoose.git

```

```
cd L2B5-Library-Management-Server
```

```
npm install
```

```
npm run dev
```

```
Make sure you have a MongoDB connection string set in your `.env` file:

```

---

## Project Structure

```
src/
├── modules/
│   ├── book/
│   │   ├── book.controller.ts
        ├── book.interface.ts
│   │   ├── book.model.ts
│   │   └── book.route.ts
│   ├── borrow/
│   │   ├── borrow.controller.ts
        ├── book.interface.ts
│   │   ├── borrow.model.ts
│   │   └── borrow.route.ts
├── routes/
│   └── index.ts
├── app.ts
└── server.ts
```

---

## API Endpoints

### Book Endpoints

#### 1. **Create Book**

```
POST /api/books
```

```json
Request Body:
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 2. **Get All Books (with filter, sort, limit)**

```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

#### 3. **Get Book by ID**

```
GET /api/books/:bookId
```

#### 4. **Update Book**

```
PUT /api/books/:bookId
```

```json
{
  "copies": 50
}
```

#### 5. **Delete Book**

```
DELETE /api/books/:bookId
```

---

### Borrow Endpoints

#### 6. **Borrow a Book**

```
POST /api/borrow
```

```json
Request Body:
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic Enforced**:

- Checks if enough copies are available.
- Deducts copies from the book.
- If copies hit 0, sets `available` to false via static method.

#### 7. **Borrowed Books Summary**

```
GET /api/borrow
```

Returns total borrowed quantities per book using aggregation pipeline.

```json
Response Body:
{
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

## Success Response Format

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

## Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## Dependencies

- "cors": "^2.8.5",
- "dotenv": "^16.5.0",
- "express": "^5.1.0",
- "mongoose": "^8.16.0",
- "ts-node-dev": "^2.0.0"

---

## DevDependencies

- "@types/cors": "^2.8.19",
- "@types/express": "^5.0.3",
- "typescript": "^5.8.3"
