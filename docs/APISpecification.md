# Campus Compass - API Specification

## Overview

The Campus Compass API provides endpoints for authentication, campus management, building management, favorites, and administration.

Base URL:

/api/v1

---

# Authentication Endpoints

## Register User

POST /auth/register

Request Body

```json
{
  "campusId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "student@uncp.edu",
  "password": "password123"
}
```

Response

```json
{
  "message": "Registration successful. Please verify your email."
}
```

---

## Verify Email

POST /auth/verify-email

Request Body

```json
{
  "token": "verification_token"
}
```

Response

```json
{
  "message": "Email verified successfully"
}
```

---

## Resend Verification Email

POST /auth/resend-verification

Response

```json
{
  "message": "Verification email sent"
}
```

---

## Login User

POST /auth/login

Request Body

```json
{
  "email": "student@uncp.edu",
  "password": "password123"
}
```

Response

```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "role": "student"
  }
}
```

---

## Get Current User

GET /auth/me

Authorization Required

Response

```json
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "student@uncp.edu",
  "role": "student"
}
```

---

# Campus Endpoints

## Get All Campuses

GET /campuses

Public

---

## Get Campus By ID

GET /campuses/:id

Public

---

## Create Campus

POST /campuses

Super Admin Only

---

## Update Campus

PUT /campuses/:id

Super Admin Only

---

# Building Endpoints

## Get All Buildings

GET /buildings

Public

Query Parameters

* campusId
* search
* category

---

## Get Building By ID

GET /buildings/:id

Public

---

## Create Building

POST /buildings

Admin Required

---

## Update Building

PUT /buildings/:id

Admin Required

---

## Delete Building

DELETE /buildings/:id

Admin Required

---

# Favorites Endpoints

## Add Favorite

POST /favorites

Student Login Required

Request Body

```json
{
  "buildingId": "uuid"
}
```

---

## Get Favorites

GET /favorites

Student Login Required

---

## Remove Favorite

DELETE /favorites/:id

Student Login Required

---

# Admin Endpoints

## Get Dashboard Data

GET /admin/dashboard

Admin Required

---

## Get Campus Statistics

GET /admin/stats

Admin Required

Response

```json
{
  "totalBuildings": 50,
  "totalFavorites": 320,
  "totalUsers": 1200
}
```

---

# Response Standards

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## HTTP Status Codes

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Internal Server Error
