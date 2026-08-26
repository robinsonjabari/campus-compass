# Campus Compass 🧭

Campus Compass is a full-stack campus navigation platform designed to help students, faculty, and visitors find buildings and navigate university campuses more efficiently.

The project is being built with a scalable, multi-campus architecture so that the platform can eventually support multiple universities rather than being limited to a single campus.

> 🚧 **Project Status:** In active development. Core backend infrastructure, database integration, and authentication are implemented, with core application APIs currently under development.

## Overview

Navigating an unfamiliar university campus can be difficult, especially for new students and visitors trying to locate academic buildings, offices, and other campus resources.

Campus Compass aims to provide a centralized platform where users can:

* Search for campus buildings and locations
* View detailed building information
* Navigate an interactive campus map
* Save frequently visited buildings as favorites
* Access information specific to their university campus

The application is designed with future multi-university support in mind, allowing individual campuses and their associated users, buildings, and data to be managed independently.

## Current Progress

### Backend Foundation

* Node.js and Express backend architecture
* TypeScript configuration
* REST API structure
* PostgreSQL database integration
* Prisma ORM configuration and migrations
* Environment-based configuration
* CORS and JSON request handling

### Authentication

* User registration and login
* Secure password hashing with bcrypt
* JWT-based authentication
* Authentication middleware for protected routes
* Campus-aware user accounts
* Role-based user architecture

### Database Architecture

The current data model supports core entities including:

* **Campus** — represents an individual university campus
* **User** — stores account, campus membership, and role information
* **Building** — represents locations belonging to a campus
* **Favorite** — connects users with saved buildings

The architecture uses UUID-based identifiers and relationships designed to support multiple campuses.

## Planned Features

Campus Compass is actively being developed. Planned functionality includes:

* Interactive campus map
* Searchable building directory
* Building detail pages
* Building categories
* Favorites and saved locations
* Campus-specific user experiences
* Email verification
* Administrative building management
* Campus administration
* Multi-university support
* Responsive frontend interface

## Tech Stack

### Frontend

* React
* TypeScript

### Backend

* Node.js
* Express
* TypeScript
* JWT
* bcrypt

### Database

* PostgreSQL
* Prisma ORM
* Neon

### Development Tools

* Git
* GitHub
* npm
* ts-node-dev

## Architecture

Campus Compass follows a full-stack architecture separating the client application, REST API, and persistence layer.

```text
React + TypeScript
        │
        ▼
   REST API
        │
        ▼
Node.js + Express
        │
        ▼
    Prisma ORM
        │
        ▼
PostgreSQL / Neon
```

This separation allows the frontend and backend to evolve independently while keeping database access centralized through the API.

## Authentication Flow

Campus Compass uses token-based authentication.

```text
User
  │
  ├── Register
  │      │
  │      ▼
  │   Validate User
  │      │
  │      ▼
  │   Hash Password
  │      │
  │      ▼
  │   Store User
  │
  └── Login
         │
         ▼
     Verify Credentials
         │
         ▼
      Generate JWT
         │
         ▼
     Authenticated Request
         │
         ▼
     JWT Middleware
         │
         ▼
      Protected Route
```

Passwords are stored as hashes rather than plaintext, and protected API endpoints use authentication middleware to verify JWTs before allowing access.

## User Roles

The application is designed around several authorization levels:

* **Student** — standard campus user
* **Staff** — university staff account
* **Admin** — campus-level administrative access
* **Super Admin** — platform-level administration

This role structure is intended to support future administrative functionality while maintaining separation between campuses. Endpoint-level authorization rules will be implemented as the corresponding application APIs are developed.

## Project Structure

```text
campus-compass/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── types/
│       ├── app.ts
│       └── server.ts
│
├── docs/
│
└── README.md
```

The `docs` directory contains project planning and technical documentation used during development.

## Development Approach

Campus Compass is being developed using a feature-based Git workflow. Major functionality is implemented on dedicated branches, reviewed, and merged into the main branch through pull requests.

Project development began with technical planning and documentation, including:

* Product requirements
* Database design
* API specification
* Application wireframes
* Backend architecture

This documentation-first approach helps maintain consistency as the application grows.

## Roadmap

### Phase 1 — Foundation

* [x] Define product requirements
* [x] Design database architecture
* [x] Define API structure
* [x] Configure backend environment
* [x] Connect PostgreSQL with Prisma
* [x] Implement authentication foundation
* [x] Implement JWT authentication middleware

### Phase 2 — Core Backend

* [ ] Campus endpoints
* [ ] Building endpoints
* [ ] Building search and filtering
* [ ] Favorites API
* [ ] Role-based endpoint authorization
* [ ] Additional validation and error handling

### Phase 3 — Frontend

* [ ] React application foundation
* [ ] Authentication interface
* [ ] Campus dashboard
* [ ] Building directory
* [ ] Building detail pages
* [ ] Favorites interface

### Phase 4 — Navigation

* [ ] Interactive campus map
* [ ] Building markers
* [ ] Location search
* [ ] Navigation functionality

### Phase 5 — Expansion

* [ ] Administrative tools
* [ ] Multi-campus onboarding
* [ ] Production deployment
* [ ] Performance and accessibility improvements

## Goals

Campus Compass is both a practical software engineering project and an exploration of designing a full-stack application for long-term scalability.

The project focuses on applying concepts including:

* REST API design
* Relational database modeling
* Authentication and authorization
* Full-stack application architecture
* Type-safe development
* Version control workflows
* Scalable system design

---

## Copyright

**Built and maintained by Jabari Robinson**

Copyright © 2026 Jabari Robinson. All rights reserved.

This repository is publicly available for portfolio and demonstration purposes. No permission is granted to copy, modify, distribute, sublicense, or use this software for commercial purposes.
