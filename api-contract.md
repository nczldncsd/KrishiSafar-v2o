# KrishiSafar API Contract

This document outlines the API endpoints and data structures expected by the KrishiSafar frontend application.

## Base URL
```
http://localhost:8000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Authentication

#### POST /auth/login
User login endpoint.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### POST /auth/register
User registration endpoint.

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/logout
User logout endpoint.

**Request:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 2. Experiences

#### GET /experiences
Get all experiences with optional filtering.

**Query Parameters:**
- `search` (string): Search query for title, location, or category
- `category` (string): Filter by category
- `price_min` (number): Minimum price filter
- `price_max` (number): Maximum price filter
- `location` (string): Filter by location
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Organic Farm Experience",
      "description": "Experience the joy of organic farming...",
      "location": "Pune, Maharashtra",
      "price": 1500,
      "duration": "4 hours",
      "maxGuests": 15,
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "host": {
        "id": 1,
        "name": "Rajesh Kumar",
        "rating": 4.8,
        "experience": "5+ years"
      },
      "activities": ["Planting", "Harvesting", "Farm Tour", "Organic Lunch"],
      "category": "Farming",
      "rating": 4.7,
      "reviews": 124,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### GET /experiences/:id
Get a specific experience by ID.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Organic Farm Experience",
    "description": "Experience the joy of organic farming...",
    "location": "Pune, Maharashtra",
    "price": 1500,
    "duration": "4 hours",
    "maxGuests": 15,
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
      "https://example.com/image3.jpg"
    ],
    "host": {
      "id": 1,
      "name": "Rajesh Kumar",
      "rating": 4.8,
      "experience": "5+ years",
      "bio": "Experienced farmer with passion for organic agriculture...",
      "contact": {
        "phone": "+91 98765 43210",
        "email": "rajesh@farm.com"
      }
    },
    "activities": ["Planting", "Harvesting", "Farm Tour", "Organic Lunch"],
    "category": "Farming",
    "rating": 4.7,
    "reviews": 124,
    "availability": [
      {
        "date": "2024-02-15",
        "availableSlots": 8
      }
    ],
    "policies": {
      "cancellation": "24 hours notice required",
      "refund": "Full refund if cancelled 24+ hours in advance"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "error": "Experience not found"
}
```

#### GET /experiences/search
Search experiences with advanced filters.

**Request:**
```json
{
  "query": "organic farm",
  "filters": {
    "category": "Farming",
    "priceRange": [1000, 2000],
    "location": "Maharashtra",
    "duration": "4 hours"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 5
}
```

### 3. Bookings

#### POST /bookings
Create a new booking.

**Request:**
```json
{
  "experienceId": 1,
  "date": "2024-02-15",
  "guests": 2,
  "name": "John Doe",
  "phone": "9876543210",
  "specialRequests": "Vegetarian meal preference"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "id": "BK123456",
    "experienceId": 1,
    "userId": 1,
    "date": "2024-02-15",
    "guests": 2,
    "name": "John Doe",
    "phone": "9876543210",
    "specialRequests": "Vegetarian meal preference",
    "status": "confirmed",
    "totalAmount": 3000,
    "bookingDate": "2024-01-20T10:00:00Z",
    "confirmationCode": "KS20240215"
  }
}
```

#### GET /bookings
Get user's booking history.

**Query Parameters:**
- `status` (string): Filter by booking status
- `page` (number): Page number
- `limit` (number): Items per page

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "BK123456",
      "experience": {
        "id": 1,
        "title": "Organic Farm Experience",
        "image": "https://example.com/image1.jpg"
      },
      "date": "2024-02-15",
      "guests": 2,
      "status": "confirmed",
      "totalAmount": 3000,
      "bookingDate": "2024-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

#### GET /bookings/:id
Get specific booking details.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "BK123456",
    "experience": {
      "id": 1,
      "title": "Organic Farm Experience",
      "description": "Experience the joy of organic farming...",
      "image": "https://example.com/image1.jpg",
      "location": "Pune, Maharashtra"
    },
    "date": "2024-02-15",
    "guests": 2,
    "status": "confirmed",
    "totalAmount": 3000,
    "bookingDate": "2024-01-20T10:00:00Z",
    "confirmationCode": "KS20240215",
    "cancellationPolicy": "24 hours notice required"
  }
}
```

#### PUT /bookings/:id/cancel
Cancel a booking.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "BK123456",
    "status": "cancelled",
    "refundAmount": 3000,
    "cancelledAt": "2024-01-21T10:00:00Z"
  }
}
```

### 4. User Profile

#### GET /user/profile
Get current user's profile.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user",
    "phone": "9876543210",
    "avatar": "https://example.com/avatar.jpg",
    "preferences": {
      "notifications": true,
      "newsletter": false
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /user/profile
Update user profile.

**Request:**
```json
{
  "name": "John Smith",
  "phone": "9876543210",
  "preferences": {
    "notifications": true,
    "newsletter": true
  }
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "user@example.com",
    "phone": "9876543210",
    "preferences": {
      "notifications": true,
      "newsletter": true
    },
    "updatedAt": "2024-01-21T10:00:00Z"
  }
}
```

### 5. Reviews

#### POST /experiences/:id/reviews
Add a review for an experience.

**Request:**
```json
{
  "rating": 5,
  "comment": "Amazing experience! Learned so much about organic farming.",
  "photos": ["https://example.com/photo1.jpg"]
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "rating": 5,
    "comment": "Amazing experience! Learned so much about organic farming.",
    "photos": ["https://example.com/photo1.jpg"],
    "createdAt": "2024-01-21T10:00:00Z"
  }
}
```

#### GET /experiences/:id/reviews
Get reviews for an experience.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user": {
        "id": 1,
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "rating": 5,
      "comment": "Amazing experience!",
      "photos": ["https://example.com/photo1.jpg"],
      "createdAt": "2024-01-21T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Data Types

### Experience Categories
- `Farming`
- `Dairy`
- `Vineyard`
- `Spices`
- `Horticulture`
- `Aquaculture`

### Booking Statuses
- `pending` - Awaiting confirmation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Experience completed
- `refunded` - Refund processed

### User Roles
- `user` - Regular user (can book experiences)
- `host` - Experience host (cannot book experiences)
- `admin` - Platform administrator

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- Experience endpoints: 100 requests per minute
- Booking endpoints: 10 requests per minute
- Review endpoints: 5 requests per minute

## Pagination

All list endpoints support pagination with the following query parameters:
- `page` (default: 1)
- `limit` (default: 10, max: 100)

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Webhooks (Future)

The API will support webhooks for real-time updates:
- Booking confirmations
- Experience updates
- Payment status changes
- Review notifications

## Support

For API-related questions or issues:
- Email: api@krishisafar.com
- Documentation: https://api.krishisafar.com/docs
- Status Page: https://status.krishisafar.com