#  Doctor Appointment Booking System

A comprehensive backend system built with **NestJS** for managing doctor appointments with robust booking logic, time slot management, and conflict prevention.

##  Features

### Core Features
- **Doctor Management**: CRUD operations for doctors with specialization filtering
- **Smart Time Slot System**: Dynamic time slot generation based on doctor availability
- **Conflict Prevention**: Robust validation preventing double-booking and overlapping appointments
- **JWT Authentication**: Secure API access with JWT tokens
- **Pagination & Filtering**: Efficient data retrieval with search capabilities
- **Comprehensive Validation**: Request validation using DTOs and class-validator
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Error Handling**: Proper HTTP status codes and descriptive error messages
- **Database Relations**: Well-structured entity relationships with TypeORM

### Business Logic
- **Double-booking Prevention**: No two appointments for same doctor at same time
- **Working Hours Validation**: Appointments only within doctor's schedule
- **Day Availability Check**: Only on doctor's available days
- **Time Slot Alignment**: Appointments align with doctor's slot duration

##  Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture with separation of concerns

##  Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)  
- npm or yarn



### 1. Clone the Repository
```bash
git clone   -  https://github.com/Abishek0612/doctor-appointment-booking-nestjs.git
cd doctor-appointment-booking-nestjs


###  2. Install Dependencies

npm install

3. Database Setup
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE doctor_appointment_db;


###  4. Environment Configuration
Create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=doctor_appointment_db
JWT_SECRET=sscnsii2224422


5. Run the Application
### Development mode
npm run start:dev

# Production mode
npm run start:prod

### 6. Seed Database 
  npm run seed


# API Documentation
Once the application is running, access the Swagger documentation at:
http://localhost:3000/api/docs



How to Authenticate:

1) Login to get JWT token:

POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin@123"
}

2. Use token in subsequent requests:

Authorization: Bearer your-jwt-token


1. API Endpoints Table

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/auth/login` | ❌ | Get JWT token |

### Doctors
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/doctors` | ✅ | Get all doctors (paginated, filterable) |
| `GET` | `/doctors/:id` | ✅ | Get doctor by ID |
| `POST` | `/doctors` | ✅ | Create new doctor |
| `GET` | `/doctors/:id/time-slots?date=YYYY-MM-DD` | ✅ | Get available time slots |

### Appointments
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/appointments` | ✅ | Get all appointments (paginated) |
| `GET` | `/appointments/:id` | ✅ | Get appointment by ID |
| `POST` | `/appointments` | ✅ | Book new appointment |


### **3. Assignment Completion Status**
##  Assignment Completion

### ✅Core Requirements (100%)
- [x] Data models (Doctor, Appointment entities)
- [x] View list of doctors with pagination & filtering
- [x] View available time slots with dynamic generation
- [x] Book appointments with comprehensive validation
- [x] RESTful API design with proper naming
- [x] Business rules (double-booking prevention)
- [x] NestJS modular structure
- [x] PostgreSQL with TypeORM
- [x] DTOs with validation decorators
- [x] Error handling with proper responses

###  Bonus Features (100%)
- [x] **Swagger/OpenAPI documentation**
- [x] **JWT Authentication**
- [x] **Pagination and filtering**
- [x] **Seed script for initial data**

###  Additional Professional Features
- [x] Response DTOs for clean API documentation
- [x] JWT guards for route protection
- [x] Comprehensive input validation
- [x] Time slot conflict resolution
- [x] Meaningful error messages
- [x] Clean architecture implementation



 **Status**: All requirements completed with bonus features

---

Built with  using NestJS, TypeScript, and PostgreSQL