# TaskFlow

A full-stack task management application with authentication, built with Next.js and Express.

## Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | Next.js 16, TailwindCSS 4, TypeScript |
| Backend  | Node.js, Express.js                   |
| Database | MongoDB with Mongoose                 |
| Auth     | JWT, bcrypt                           |
| Styling  | Neobrutalism Design                   |

## Features

- User authentication (signup/login)
- JWT-based session management
- Profile management
- Task CRUD operations
- Search and filter tasks
- Responsive design
- Loading and error states

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    └── package.json
```

## Setup

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- pnpm
- Docker & Docker Compose (optional)

### Docker Setup (Quick Start)

Run the application using Docker Compose:

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Manual Setup

### Backend Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

Install and run:

```bash
pnpm install
pnpm dev
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Install and run:

```bash
pnpm install
pnpm dev
```

## API Endpoints

### Auth

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

### Profile

- `GET /api/v1/me` - Get current user profile
- `PUT /api/v1/me` - Update profile

### Tasks

- `GET /api/v1/tasks` - List tasks (supports ?search, ?status, ?priority)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id` - Get single task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## Demo Credentials

### Seeding Data

To populate the database with a test user and initial tasks, run:

```bash
cd backend
npm run seed
```

Create an account using the signup form, or use these after seeding:

- Email: demo@example.com
- Password: demo123

## Scaling for Production

1. **Deployment**: Deploy backend on Railway/Render, frontend on Vercel
2. **Database**: Use MongoDB Atlas with connection pooling and read replicas
3. **CORS**: Configure strict origin policies for production domains
4. **Environment**: Use environment variables for all secrets, never commit .env
5. **Indexing**: Add database indexes on frequently queried fields (user, status, priority)
6. **Caching**: Implement Redis for session management and API response caching
7. **Rate Limiting**: Add express-rate-limit to prevent API abuse
8. **Logging**: Use structured logging with winston or pino
9. **Monitoring**: Set up error tracking with Sentry
10. **CDN**: Use Vercel Edge or Cloudflare for static assets
