# Mathematics Website Backend

This is the backend server for the Mathematics website, built with Express.js, Node.js, and MongoDB.

## Features

- **Authentication System**: JWT-based authentication with admin roles
- **File Management**: Upload, download, update, and delete files
- **Admin Dashboard**: Complete admin interface for managing content
- **MongoDB Integration**: Persistent data storage
- **File Upload**: Support for PDFs, images, and other file types
- **RESTful API**: Clean and organized API endpoints

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **yarn**

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `config.env` and modify the values as needed
   - Update `MONGODB_URI` to point to your MongoDB instance
   - Change `JWT_SECRET` to a secure random string
   - Update admin credentials if needed

4. **Start MongoDB:**
   - If using local MongoDB, make sure the service is running
   - If using MongoDB Atlas, ensure your connection string is correct

5. **Create admin user (first time only):**
   ```bash
   curl -X POST http://localhost:5000/api/auth/setup-admin
   ```
   Or visit the endpoint in your browser/Postman

6. **Start the server:**
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/setup-admin` - Create initial admin user

### File Management
- `POST /api/files/upload` - Upload new file (admin only)
- `GET /api/files/all` - Get all files (admin only)
- `GET /api/files/category/:category` - Get files by category
- `GET /api/files/download/:id` - Download file
- `PUT /api/files/:id` - Update file (admin only)
- `DELETE /api/files/:id` - Delete file (admin only)

### Admin Dashboard
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## File Categories

The system supports the following file categories:
- `books` - Educational books and textbooks
- `olympiad` - Olympiad materials
- `practice` - Practice problems and exercises
- `teachersguide` - Teacher guides and resources
- `teacherstools` - Teaching tools and materials

## Admin Access

Default admin credentials (can be changed in config.env):
- Username: `admin`
- Password: `admin123`

## File Upload Limits

- Maximum file size: 50MB
- Supported file types: PDF, DOC, DOCX, JPEG, PNG, GIF, ZIP, GGB

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- File type validation
- File size limits

## Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'user']),
  createdAt: Date
}
```

### File Model
```javascript
{
  filename: String (required),
  originalName: String (required),
  path: String (required),
  size: Number (required),
  mimetype: String (required),
  category: String (required),
  subcategory: String,
  description: String,
  uploadedBy: ObjectId (ref: User),
  uploadedAt: Date,
  isActive: Boolean
}
```

## Frontend Integration

The admin interface is available at `/admin` route in the frontend application. The frontend communicates with the backend API endpoints to manage files and users.

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **File Upload Errors**: Check file size and type restrictions
3. **Authentication Issues**: Verify JWT secret and token expiration
4. **CORS Errors**: Ensure the frontend URL is properly configured in CORS settings

## Development

For development, the server runs on `http://localhost:5000` by default. The frontend should be configured to communicate with this URL. 