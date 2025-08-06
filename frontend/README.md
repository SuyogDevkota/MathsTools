# Mathematics Website

A comprehensive mathematics education platform with interactive tools, resources, and an admin management system.

## Features

### Frontend
- **Modern React Application** with Vite
- **Responsive Design** that works on all devices
- **Interactive Navigation** with dropdown menus
- **File Management** with PDF viewers and search functionality
- **Admin Panel** for content management

### Backend
- **Express.js Server** with RESTful API
- **MongoDB Database** for persistent storage
- **JWT Authentication** for secure admin access
- **File Upload System** with category management
- **Admin Dashboard** with statistics and user management

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- CSS3 with responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

## Quick Start

### Prerequisites
1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Mathematics_website
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   - Copy `server/config.env` and modify as needed
   - Update MongoDB connection string
   - Change JWT secret and admin credentials

5. **Set up the database:**
   ```bash
   cd server
   npm run setup-admin
   cd ..
   ```

6. **Start the development environment:**
   ```bash
   npm run start-full
   ```

This will start both frontend and backend servers:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

## Project Structure

```
Mathematics_website/
├── src/                    # Frontend source code
│   ├── Components/         # Reusable components
│   ├── Pages/             # Page components
│   ├── data/              # Static data
│   └── assets/            # Images and static files
├── server/                 # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── uploads/           # Uploaded files
├── public/                # Public assets
└── package.json           # Frontend dependencies
```

## Admin Panel

The admin panel provides comprehensive content management:

### Features
- **Dashboard** with statistics and recent uploads
- **File Management** - upload, delete, and organize files
- **User Management** - view and manage user accounts
- **Category Management** - organize files by categories

### Access
- URL: `/admin`
- Default credentials: `admin` / `admin123`
- Secure JWT-based authentication

### File Categories
- **Books** - Educational textbooks and resources
- **Olympiad** - Competition materials
- **Practice** - Exercise problems and worksheets
- **Teachers Guide** - Teaching resources
- **Teachers Tools** - Interactive tools and materials

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/setup-admin` - Create admin user

### File Management
- `POST /api/files/upload` - Upload file (admin)
- `GET /api/files/all` - Get all files (admin)
- `GET /api/files/category/:category` - Get files by category
- `GET /api/files/download/:id` - Download file
- `PUT /api/files/:id` - Update file (admin)
- `DELETE /api/files/:id` - Delete file (admin)

### Admin Dashboard
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## Development

### Frontend Development
```bash
npm run dev          # Start frontend only
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd server
npm run dev          # Start backend with nodemon
npm start           # Start backend in production mode
npm run setup-admin # Create admin user
```

### Full Stack Development
```bash
npm run start-full  # Start both frontend and backend
```

## File Upload

The system supports various file types:
- **Documents**: PDF, DOC, DOCX
- **Images**: JPEG, PNG, GIF
- **Archives**: ZIP
- **Tools**: GGB (GeoGebra files)

**Upload Limits:**
- Maximum file size: 50MB
- File type validation
- Automatic categorization

## Security Features

- **JWT Authentication** with token expiration
- **Password Hashing** using bcrypt
- **Role-based Access Control**
- **File Type Validation**
- **CORS Protection**
- **Input Validation**

## Database Schema

### Users
```javascript
{
  username: String (unique),
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date
}
```

### Files
```javascript
{
  filename: String,
  originalName: String,
  path: String,
  size: Number,
  mimetype: String,
  category: String,
  subcategory: String,
  description: String,
  uploadedBy: ObjectId,
  uploadedAt: Date,
  isActive: Boolean
}
```

## Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Database Setup
1. Set up MongoDB (local or cloud)
2. Update connection string in environment variables
3. Run admin setup: `npm run setup-admin`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in config.env
   - Verify network connectivity

2. **File Upload Errors**
   - Check file size (max 50MB)
   - Verify file type is supported
   - Ensure upload directory has write permissions

3. **Authentication Issues**
   - Verify JWT secret in config.env
   - Check token expiration
   - Ensure admin user exists

4. **CORS Errors**
   - Verify frontend URL in CORS settings
   - Check API endpoint URLs

### Development Tips

- Use `npm run start-full` for full-stack development
- Check server logs for detailed error messages
- Use browser developer tools for frontend debugging
- Monitor MongoDB connections and queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Review the troubleshooting section
- Create an issue on GitHub
