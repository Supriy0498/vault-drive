# Valut Drive

### Vault Drive is a secure, cloud-inspired web application that allows users to register, log in, and efficiently manage, organize, and share their files and folders. The platform features robust user authentication, file uploads, folder organization, sharing capabilities, and views for recent, starred, and trashed items.

#### Tech Stack
- Frontend: Next.js (App Router), React, TypeScript, CSS Modules
- Backend: Next.js API routes (Node.js/Express-like), TypeScript
- Database: PostgreSQL (via pg library)
- Authentication: JWT (access & refresh tokens), HTTP-only cookies, bcryptjs
- File Storage: AWS S3 (via @aws-sdk/client-s3)
- State Management: React Context API, React hooks
- Other Libraries: uuid, jsonwebtoken
- Dev Tools: ESLint, TypeScript, Postman (for API testing)

#### Features
- User registration and login with secure JWT authentication (access & refresh tokens)
- Upload files directly to AWS S3 with signed URLs
- Create, rename, and organize folders
- View, organize, and manage files and folders (My Drive, Recent, Starred, Trash)
- Share files and folders with other users (sharing feature planned/partially implemented)
- Responsive, modern UI for desktop and mobile
- Role-based access control (optional/extendable)

#### Database ER diagram
<img width="500" alt="image" src="https://github.com/user-attachments/assets/fea5a8c4-446a-406c-b7b7-060182b9cf56" />
