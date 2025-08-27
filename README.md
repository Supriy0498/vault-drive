# Valut Drive

### Vault Drive is a secure, cloud-inspired web application that allows users to register, log in, and efficiently manage, organize, and share their files and folders. The platform features robust user authentication, file uploads, folder organization, sharing capabilities, and views for recent, starred, and trashed items.

CAUTION: Work in Progress⚠🚧🚧

#### Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, CSS Modules
- **Backend:** Next.js API routes (Node.js/Express-like), TypeScript
- **Database:** PostgreSQL (via pg library)
- **Authentication:** JWT (access & refresh tokens), HTTP-only cookies, bcryptjs
- **File Storage:** AWS S3 (via @aws-sdk/client-s3)
- **State Management:** React Context API, React hooks
- **Other Libraries:** uuid, jsonwebtoken
- **Dev Tools:** ESLint, TypeScript, Postman (for API testing)

#### Features
- **User Authentication:** Secure registration and login with JWT (access & refresh tokens)
- **File Management:** Upload, view, delete, and rename files
- **Folder Management:** Create, rename, move, and organize folders
- **Move Files/Folders:** Easily move files and folders within your drive
- **Sharing:** Share file/folder links with other users
- **Access Control:** Set files/folders as public or private with role-based permissions (View, Editor)
- **Trash Storage:** Deleted files/folders go to trash and are auto-deleted after 30 days
- **Starred/Favorites:** Mark files/folders as starred for quick access
- **Recent:** Quickly access recently used files and folders
- **Search:** Search across all files and folders (optional)
- **Email/Notifications:** Send notifications or emails for sharing and activity (optional)
- **Activity Logs:** Track file/folder activity history (optional)
- **Storage Quota:** View storage usage and quota information (optional)


#### Database ER diagram
<img width="500" alt="image" src="https://github.com/user-attachments/assets/fea5a8c4-446a-406c-b7b7-060182b9cf56" />
