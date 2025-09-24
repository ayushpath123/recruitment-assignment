# 🚀 Recruitment Platform MVP

A minimal recruitment platform built with Node.js + Express backend and React + Vite frontend. This MVP demonstrates authentication flow with JWT tokens and provides a foundation for building a full-featured recruitment platform.

## 🏗️ Architecture Overview

### Backend (Node.js + Express)
- RESTful API with Express.js
- JSON file-based data storage (easily upgradeable to MongoDB)
- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled for cross-origin requests

### Frontend (React + Vite)
- Modern React with hooks
- Tailwind CSS for styling
- JWT token management with localStorage
- Responsive design with production-ready UI
- Lucide React icons

## 📁 Project Structure

```
recruitment-platform/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── db.js                  # Database operations (JSON file)
│   ├── models/User.js         # User model with authentication methods
│   ├── routes/auth.js         # Authentication routes
│   ├── middleware/authMiddleware.js  # JWT verification middleware
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── database.json          # JSON database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component with auth state
│   │   ├── api.js             # API helper functions
│   │   ├── pages/
│   │   │   ├── Register.jsx   # User registration page
│   │   │   ├── Login.jsx      # User login page
│   │   │   └── Profile.jsx    # User profile page (protected)
│   │   ├── main.jsx           # React app entry point
│   │   └── index.css          # Tailwind CSS styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration with proxy
│   └── index.html             # HTML template
│
└── README.md                  # This file
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "unique-user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔒 Authentication Flow

1. **User Registration/Login**: User provides credentials
2. **Password Hashing**: Passwords are hashed with bcrypt (salt rounds: 10)
3. **JWT Generation**: Server creates JWT token with user ID payload
4. **Token Storage**: Frontend stores JWT in localStorage
5. **Protected Requests**: Frontend sends JWT in Authorization header
6. **Token Verification**: Middleware verifies JWT and attaches user info
7. **Logout**: Frontend removes token from localStorage

### JWT Token Structure
```json
{
  "payload": {
    "userId": "user-unique-id"
  },
  "expiresIn": "24h"
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone & Setup Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Setup Frontend (New Terminal)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🎯 Features

### ✅ Implemented
- User registration with validation
- User login with JWT tokens
- Password hashing and security
- Protected route middleware
- Responsive UI with Tailwind CSS
- Error handling and user feedback
- Token-based authentication
- Profile page with user information
- API proxy configuration

### 🔄 Coming Soon (Scalability Roadmap)
- Job posting and management
- Application tracking
- Email notifications
- File upload for resumes
- Advanced search and filtering
- Real-time messaging
- Admin dashboard

## ⚠️ Error Handling Strategy

### Backend Error Handling
1. **Validation Errors**: Field validation with descriptive messages
2. **Authentication Errors**: JWT verification and user existence
3. **Database Errors**: Graceful handling of data operations
4. **Global Error Handler**: Catches all unhandled errors
5. **Environment-based Error Details**: Full errors in development, minimal in production

### Frontend Error Handling
1. **API Error Parsing**: Extracts error messages from responses
2. **User-friendly Messages**: Clear feedback for all error states
3. **Loading States**: Visual feedback during API calls
4. **Form Validation**: Real-time validation with error clearing
5. **Retry Mechanisms**: Refresh buttons for failed requests

## 🚀 Scalability Improvements

### Database Migration (Production Ready)
Replace JSON file storage with MongoDB:

```javascript
// Replace db.js with MongoDB connection
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### Environment Variables (.env)
```bash
# Production Environment Variables
NODE_ENV=production
PORT=5000
JWT_SECRET=super_secure_jwt_secret_256_bits_minimum
MONGODB_URI=mongodb://localhost:27017/recruitment-platform

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com
```

### Advanced Security Features
1. **Rate Limiting**: Implement rate limiting with `express-rate-limit`
2. **Input Sanitization**: Use `express-validator` for input validation
3. **Security Headers**: Add `helmet` for security headers
4. **CORS Configuration**: Restrict origins in production
5. **Password Requirements**: Enforce strong password policies

### Microservices Architecture
```
├── user-service/          # Authentication & user management
├── job-service/           # Job postings & management  
├── application-service/   # Job applications
├── notification-service/  # Email & push notifications
├── file-service/         # Resume & document uploads
└── gateway/              # API Gateway with routing
```

### Docker Configuration
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Monitoring & Logging
1. **Application Monitoring**: Implement with Winston + Morgan
2. **Health Checks**: Add comprehensive health endpoints
3. **Performance Monitoring**: Use tools like New Relic or DataDog
4. **Error Tracking**: Implement Sentry for error reporting

## 🧪 Testing Strategy

### Backend Testing
```bash
npm install --save-dev jest supertest
```

Example test:
```javascript
describe('Auth Endpoints', () => {
  test('POST /api/auth/register', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
```

### Frontend Testing
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📝 Development Notes

1. **Database**: Currently uses JSON file storage for simplicity. Upgrade to MongoDB for production.
2. **Environment**: JWT secret should be strong (256+ bits) in production.
3. **CORS**: Configure specific origins instead of "*" for production.
4. **File Uploads**: Add file upload service for resume management.
5. **Email Service**: Integrate email service for notifications and password reset.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.