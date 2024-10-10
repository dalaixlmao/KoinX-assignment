# Cryptocurrency Statistics API

A Node.js application that fetches and serves cryptocurrency statistics for Bitcoin, Ethereum, and Matic using the CoinGecko API.

## Features

- Background job that fetches cryptocurrency data every 2 hours
- RESTful API endpoints for retrieving latest cryptocurrency statistics
- Standard deviation calculation for cryptocurrency prices
- MongoDB integration for data persistence
- TypeScript implementation
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dalaixlmao/KoinX-assignment.git
cd KoinX-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Build the application:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

For development with hot reload:
```bash
npm run dev
```

## API Endpoints

### 1. Get Latest Cryptocurrency Statistics

Retrieves the latest price, market cap, and 24-hour change for a specified cryptocurrency.

```
GET /stats
```

Query Parameters:
- `coin` (required): Cryptocurrency identifier (bitcoin, matic-network, or ethereum)

Example Request:
```
GET /stats?coin=bitcoin
```

Example Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### 2. Get Price Standard Deviation

Calculates the standard deviation of the cryptocurrency price for the last 100 records.

```
GET /deviation
```

Query Parameters:
- `coin` (required): Cryptocurrency identifier (bitcoin, matic-network, or ethereum)

Example Request:
```
GET /deviation?coin=bitcoin
```

Example Response:
```json
{
    "deviation": 4082.48
}
```

## Architecture

The application follows a clean architecture pattern with the following components:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Handle data persistence
- **Models**: Define database schemas
- **Background Jobs**: Manage periodic data fetching
- **Types**: Define TypeScript interfaces
- **Utils**: Provide helper functions

## Error Handling

The application includes a global error handler that catches and processes all errors. Errors are logged to the console and returned to the client in a consistent format:

```json
{
    "error": {
        "message": "Error description"
    }
}
```
