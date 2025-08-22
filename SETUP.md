# S3UI Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# JWT Secret (Generate a strong secret key)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here

# MongoDB Database
DB_URL=your_mongodb_connection_string_here
```

## Setup Steps

1. **Generate JWT Secret**:
   - Create a strong secret key for JWT token signing
   - You can use: `openssl rand -base64 32` or any secure random string generator

2. **AWS S3 Setup**:
   - Create an S3 bucket named `vipuls3-bucket` (or update the bucket name in the code)
   - Create an IAM user with S3 permissions
   - Copy the access key ID and secret access key to the environment variables

3. **MongoDB Setup**:
   - Create a MongoDB database (MongoDB Atlas or local)
   - Copy the connection string to the `DB_URL` environment variable

4. **Install Dependencies**:
   ```bash
   pnpm install
   ```

5. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

## Authentication System

The application now uses a custom authentication system with:

- **JWT Tokens**: For secure authentication
- **bcrypt**: For password hashing
- **Zod**: For input validation
- **MongoDB**: For user storage

### Features:

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Token-based API authentication
- ✅ Automatic token refresh
- ✅ Secure logout functionality

## API Endpoints

### Authentication:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### File Management:
- `GET /api/objects` - List user's files and folders
- `POST /api/upload` - Get upload URL
- `POST /api/download` - Get download URL
- `DELETE /api/delete` - Delete file
- `POST /api/folderdata` - Get folder contents

## Pages

- `/` - Landing page (public)
- `/login` - Login page (public)
- `/register` - Registration page (public)
- `/dashboard` - Dashboard (protected)

## Security Features

- JWT token expiration (7 days)
- Password hashing with bcrypt (12 salt rounds)
- Input validation with Zod schemas
- Protected API routes
- Secure token storage in localStorage
- Automatic token verification on each request

## Fixed Issues

The following issues have been resolved:

1. **Removed Clerk Dependency**: Replaced with custom JWT authentication
2. **Custom Authentication**: Built secure auth system from scratch
3. **Database Schema**: Updated to store user credentials securely
4. **API Protection**: All routes now use JWT authentication
5. **Frontend Integration**: Updated components to use new auth system
6. **Error Handling**: Comprehensive error handling throughout
7. **Type Safety**: Full TypeScript support with proper types
