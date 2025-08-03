#  Doctor Appointment Booking System

A comprehensive backend system built with **NestJS** for managing doctor appointments with robust booking logic, time slot management, and conflict prevention.

##  Features

- **Doctor Management**: CRUD operations for doctors with specialization filtering
- **Smart Time Slot System**: Dynamic time slot generation based on doctor availability
- **Conflict Prevention**: Robust validation preventing double-booking and overlapping appointments
- **Pagination & Filtering**: Efficient data retrieval with search capabilities
- **Comprehensive Validation**: Request validation using DTOs and class-validator
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Error Handling**: Proper HTTP status codes and error messages
- **Database Relations**: Well-structured entity relationships with TypeORM

##  Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture with separation of concerns

##  Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone 
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
