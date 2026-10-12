# Campus Compass 🧭

Campus Compass is a full-stack campus navigation platform designed to help students, faculty, and visitors discover buildings, explore university campuses, and access location-specific information.

Built with a multi-campus architecture, Campus Compass is designed to support multiple universities through a centralized platform while maintaining campus-specific users, buildings, and resources.

> 🚧 **Project Status:** Active Development — Core backend functionality, authentication, favorites, and administrative building management are implemented. Interactive map integration and frontend development are upcoming.

## Overview

Navigating an unfamiliar university campus can be challenging, particularly for new students and visitors looking for academic buildings, administrative offices, and campus resources.

Campus Compass aims to simplify this experience through:

- Searchable campus building directories
- Interactive campus maps and building markers
- Detailed building information
- Personalized favorite locations
- University-specific user experiences
- Campus administration and building management

The application is being developed with scalability, security, and maintainability in mind.

## Current Progress

### Backend Infrastructure ✅

- Node.js and Express REST API
- TypeScript-based backend architecture
- Modular routes, controllers, and middleware
- PostgreSQL database hosted on Neon
- Prisma ORM and database migrations
- Environment-based configuration
- CORS and JSON request handling
- Campus, building, authentication, and favorites endpoints

### Authentication & Authorization ✅

- User registration and login
- bcrypt password hashing
- JWT-based authentication
- Protected API endpoints
- University email-domain validation during registration
- Campus-associated user accounts
- Role-based administrative authorization
- Campus ownership checks for building management

### Campus & Building Management ✅

- Campus data retrieval
- Building directory API
- Individual building retrieval
- Admin-only building creation
- Admin-only building updates
- Admin-only building deletion
- Campus-scoped administrative operations

### Favorites System ✅

- Retrieve authenticated user's favorites
- Save buildings to favorites
- Remove buildings from favorites
- Prevent duplicate favorites
- Return associated building information

### Testing & Validation

Core backend functionality has been manually tested using Thunder Client, including:

- Successful registration and login
- Protected route authentication
- Student restrictions on administrative operations
- Building creation, updates, and deletion
- Favorites creation and removal
- Missing-resource and duplicate-resource responses
- TypeScript compilation checks

Additional automated tests and cross-campus authorization testing are planned.

## Tech Stack

### Frontend (Planned)

- React
- TypeScript
- Interactive mapping library (under evaluation)

### Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt

### Database

- PostgreSQL
- Prisma ORM
- Neon

### Development Tools

- Git and GitHub
- npm
- tsx
- VS Code
- Thunder Client

## Architecture

Campus Compass separates frontend presentation, backend business logic, and database persistence.

```text
       React + TypeScript
               |
               v
           REST API
               |
               v
       Express.js Routes
               |
               v
      Authentication &
      Authorization
               |
               v
       Controllers / Services
               |
               v
           Prisma ORM
               |
               v
       PostgreSQL (Neon)
```

This architecture allows the frontend and backend to evolve independently while maintaining centralized database access and consistent authorization rules.

## Database Design

The application currently uses four primary models:

| Model | Responsibility |
|---|---|
| Campus | Stores university information and email-domain configuration |
| User | Stores account information, roles, and campus membership |
| Building | Stores campus locations and associated details |
| Favorite | Associates users with saved buildings |

The database uses UUID identifiers and relational associations.

Each user belongs to a campus, and buildings are associated with their respective campuses.

## Authentication Flow

```text
User Registration
       |
       v
Validate Input
       |
       v
Verify University Email Domain
       |
       v
Hash Password
       |
       v
Create Campus-Associated User

User Login
       |
       v
Verify Credentials
       |
       v
Generate JWT
       |
       v
Authenticated API Request
       |
       v
JWT Middleware
       |
       v
Role Authorization (when required)
       |
       v
Controller
```

Passwords are stored as hashes rather than plaintext. Protected endpoints require valid authentication tokens, while administrative endpoints additionally enforce role restrictions.

## User Roles

Campus Compass supports a role-based authorization architecture.

- **Student:** Standard authenticated user with access to campus resources and personal favorites.
- **Admin:** Campus-level administrator authorized to manage buildings associated with their campus.
- **Super Admin:** Elevated administrative role intended for platform-level management.

Administrative building operations currently require an `admin` or `super_admin` role.

Additional role-specific functionality and administrative interfaces are planned for future development.

## API Overview

Current REST API endpoints include:

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Buildings

```http
GET    /api/v1/buildings
GET    /api/v1/buildings/:id
POST   /api/v1/buildings
PATCH  /api/v1/buildings/:id
DELETE /api/v1/buildings/:id
```

Building creation, modification, and deletion require administrative authorization.

### Favorites

```http
GET    /api/v1/favorites
POST   /api/v1/favorites
DELETE /api/v1/favorites/:buildingId
```

Favorites endpoints require authentication and operate on the authenticated user's account.

### Health Check

```http
GET /api/v1/health
```

## Project Structure

```text
campus-compass/
|
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
|
├── frontend/
|
├── docs/
|
└── README.md
```

The `docs` directory contains product requirements, database design, API specifications, and wireframes.

## Development Workflow

Campus Compass follows a feature-based Git workflow.

Each major feature is developed on a dedicated branch, tested, and integrated into the main branch through GitHub pull requests.

Development emphasizes:

- Incremental feature implementation
- Separation of concerns
- Type-safe development
- API testing
- Authentication and authorization
- Maintainable project structure
- Documentation-driven planning

## Development Roadmap

### Phase 1 — Planning & Foundation

- [x] Define product requirements
- [x] Design database architecture
- [x] Define REST API structure
- [x] Create application wireframes
- [x] Configure backend environment
- [x] Integrate PostgreSQL and Prisma
- [x] Establish modular backend architecture

### Phase 2 — Core Backend

- [x] Implement campus resource API
- [x] Implement building resource API
- [x] Implement user registration and login
- [x] Implement JWT authentication
- [x] Implement favorites API
- [x] Implement role-based admin authorization
- [x] Implement admin building CRUD operations
- [ ] Add building search and filtering
- [ ] Expand input validation and error handling
- [ ] Add automated API tests

### Phase 3 — Interactive Map Integration

- [ ] Select and integrate mapping library
- [ ] Display campus map
- [ ] Render building markers using database coordinates
- [ ] Display building details through map interactions
- [ ] Filter map data by campus
- [ ] Implement location search
- [ ] Add navigation and walking directions

### Phase 4 — Frontend Application

- [ ] Build React application foundation
- [ ] Implement authentication interface
- [ ] Create campus dashboard
- [ ] Build searchable building directory
- [ ] Create building detail views
- [ ] Implement favorites interface
- [ ] Build administrative dashboard UI
- [ ] Implement responsive layouts

### Phase 5 — Expansion & Deployment

- [ ] Implement email verification
- [ ] Expand campus administration
- [ ] Support multi-university onboarding
- [ ] Add accessibility improvements
- [ ] Improve performance and security
- [ ] Deploy production application

## Project Goals

Campus Compass serves as both a practical campus navigation solution and a portfolio project demonstrating real-world software engineering principles.

Key technical objectives include:

- RESTful API design
- Relational database modeling
- Authentication and authorization
- Multi-campus data organization
- Secure administrative operations
- Full-stack application development
- TypeScript and modular architecture
- Collaborative Git workflows
- Scalable application design

---

## Copyright

**Built and maintained by Jabari Robinson**

Copyright © 2026 Jabari Robinson. All rights reserved.

This repository is publicly available for portfolio and demonstration purposes. No permission is granted to copy, modify, distribute, sublicense, or use this software for commercial purposes.
