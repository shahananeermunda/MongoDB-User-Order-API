# User and Order API

A RESTful API built with Node.js, Express.js, and MongoDB to manage users and orders through CRUD operations.

## Features

- Create and retrieve users.
- Retrieve individual users by ID.
- Create and retrieve orders.
- Retrieve individual orders by ID.
- Update and delete orders.
- Store user and order data in MongoDB using Mongoose.
- Manage relationships between users and orders.
- Request logging middleware.
- Centralized error handling.
- JSON-based request and response handling.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- dotenv
- Postman

## Project Structure

```text
user-order-api/
├── models/
│   ├── User.js
│   └── Order.js
├── controllers/
│   ├── userController.js
│   └── orderController.js
├── routes/
│   ├── userRoutes.js
│   └── orderRoutes.js
├── middleware/
│   ├── logger.js
│   ├── notFound.js
│   └── errorHandler.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Configure your MongoDB connection string in the `.env` file.

## Run the Project

Start the development server:

```bash
npm run dev
```

## API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID |

### Order Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders` | Retrieve all orders |
| GET | `/api/orders/:id` | Retrieve an order by ID |
| PUT | `/api/orders/:id` | Update an order |
| DELETE | `/api/orders/:id` | Delete an order |

## Sample Request

POST `/api/users`

```json
{
  "name": "Sara",
  "email": "sara@example.com"
}
```

POST `/api/orders`

```json
{
  "userId": "USER_OBJECT_ID",
  "product": "Laptop",
  "quantity": 1,
  "totalPrice": 50000
}
```

## Error Handling

- `400` – Validation errors or invalid ID format.
- `404` – User or order not found.
- `500` – Unexpected server errors.

## Testing

API endpoints are tested using Postman, including user creation, order creation, retrieving records, updating orders, deleting orders, and error handling.

## Data Storage

User and order data are stored in MongoDB using Mongoose. Orders are associated with users through their MongoDB ObjectIds.
