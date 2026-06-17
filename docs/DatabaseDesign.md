# Campus Compass - Database Design Document (DBD)

## 1. Overview

Campus Compass uses PostgreSQL as its primary database management system.

The database is designed to support multiple universities while maintaining separation between campus data. Each campus can manage its own buildings, branding, and administrative users while sharing a common platform.

---

## 2. Design Goals

### Current Goals (Version 1)

* User authentication and authorization
* University email verification
* Campus management
* Building management
* Favorite locations
* Administrative controls

### Future Goals

* Multi-campus support
* Event management
* Class schedule integration
* Route generation
* Accessibility routes
* Mobile application support

---

## 3. Entity Relationship Overview

Users
│
├── Favorites
│       │
│       └── Buildings
│                │
│                └── Campuses
│
└── Campus_Admins
│
└── Campuses

---

## 4. Tables

### users

Stores all registered users.

| Column         | Type         | Description                 |
| -------------- | ------------ | --------------------------- |
| id             | UUID         | Primary Key                 |
| campus_id      | UUID         | Foreign Key → campuses      |
| first_name     | VARCHAR(100) | User first name             |
| last_name      | VARCHAR(100) | User last name              |
| email          | VARCHAR(255) | Unique university email     |
| password_hash  | VARCHAR(255) | Hashed password             |
| email_verified | BOOLEAN      | Email verification status   |
| role           | VARCHAR(50)  | student, admin, super_admin |
| created_at     | TIMESTAMP    | Creation date               |
| updated_at     | TIMESTAMP    | Last modification date      |

---

### campuses

Stores information for each supported university.

| Column          | Type         | Description             |
| --------------- | ------------ | ----------------------- |
| id              | UUID         | Primary Key             |
| name            | VARCHAR(255) | Campus name             |
| slug            | VARCHAR(255) | URL-friendly identifier |
| description     | TEXT         | Campus description      |
| email_domain    | VARCHAR(255) | University email domain |
| website_url     | VARCHAR(500) | Campus website          |
| primary_color   | VARCHAR(50)  | Branding color          |
| secondary_color | VARCHAR(50)  | Branding color          |
| logo_url        | VARCHAR(500) | Campus logo             |
| created_at      | TIMESTAMP    | Creation date           |
| updated_at      | TIMESTAMP    | Last modification date  |

Example:

email_domain = "uncp.edu"

---

### campus_admins

Maps administrators to campuses.

| Column     | Type      | Description            |
| ---------- | --------- | ---------------------- |
| id         | UUID      | Primary Key            |
| user_id    | UUID      | Foreign Key → users    |
| campus_id  | UUID      | Foreign Key → campuses |
| created_at | TIMESTAMP | Assignment date        |

---

### buildings

Stores campus building information.

| Column      | Type          | Description                                 |
| ----------- | ------------- | ------------------------------------------- |
| id          | UUID          | Primary Key                                 |
| campus_id   | UUID          | Foreign Key → campuses                      |
| name        | VARCHAR(255)  | Building name                               |
| category    | VARCHAR(100)  | Academic, Housing, Dining, Recreation, etc. |
| description | TEXT          | Building description                        |
| address     | VARCHAR(500)  | Building address                            |
| latitude    | DECIMAL(10,8) | GPS latitude                                |
| longitude   | DECIMAL(11,8) | GPS longitude                               |
| hours       | VARCHAR(255)  | Operating hours                             |
| image_url   | VARCHAR(500)  | Building image                              |
| created_at  | TIMESTAMP     | Creation date                               |
| updated_at  | TIMESTAMP     | Last modification date                      |

---

### favorites

Stores user favorite locations.

| Column      | Type      | Description             |
| ----------- | --------- | ----------------------- |
| id          | UUID      | Primary Key             |
| user_id     | UUID      | Foreign Key → users     |
| building_id | UUID      | Foreign Key → buildings |
| created_at  | TIMESTAMP | Date favorited          |

---

## 5. Relationships

### Campus → Buildings

One campus can have many buildings.

Campus (1)
└── Buildings (Many)

---

### User → Favorites

One user can have many favorite buildings.

User (1)
└── Favorites (Many)

---

### Building → Favorites

One building can be favorited by many users.

Building (1)
└── Favorites (Many)

---

### Campus → Campus Admins

One campus can have multiple administrators.

Campus (1)
└── Campus Admins (Many)

---

### User → Campus Admins

One user can manage multiple campuses.

User (1)
└── Campus Admins (Many)

---

## 6. Security Considerations

* Passwords will never be stored in plain text.
* Passwords will be hashed using bcrypt.
* Authentication will use JWT tokens.
* University email verification is required.
* Campus administrators can only modify data belonging to their assigned campus.
* Super administrators have access to all campuses.

---

## 7. Future Database Expansion

### events

Campus events and activities.

### schedules

Student class schedules.

### routes

Generated navigation routes.

### accessibility_routes

ADA-compliant navigation paths.

### notifications

Campus announcements and alerts.

### reviews

Building reviews and ratings.
