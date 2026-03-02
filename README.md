# Task Management Application (CATI Challenge)

A full-stack task management application with a Kanban-style board interface. Users can create lists and tasks with priorities, descriptions, and due dates.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Frontend Components](#frontend-components)
7. [Data Flow](#data-flow)
8. [Diagrams](#diagrams)
9. [Setup & Installation](#setup--installation)
10. [Running the Application](#running-the-application)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         APPLICATION ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐                         ┌──────────────┐
    │   FRONTEND   │                         │   BACKEND    │
    │    (React)   │                         │   (NestJS)   │
    └──────┬───────┘                         └──────┬───────┘
           │                                        │
           │         HTTP (REST API)                │
           │        http://localhost:8000           │
           └────────────────┬───────────────────────┘
                            │
                            ▼
    ┌──────────────────────────────────────────────────────────────┐
    │                        POSTGRES DATABASE                      │
    │                     (Managed by Prisma ORM)                  │
    └──────────────────────────────────────────────────────────────┘
```

### High-Level Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           REQUEST FLOW                                    │
└──────────────────────────────────────────────────────────────────────────┘

  1. User Action          2. React Component         3. API Call
  ┌─────────────┐         ┌─────────────┐           ┌─────────────┐
  │  Click on   │────────▶│  Updates    │──────────▶│   axios     │
  │  "Create"   │         │  local state │           │   request   │
  └─────────────┘         └─────────────┘           └──────┬──────┘
                                                           │
                          4. NestJS Controller             │
                          ┌─────────────┐                  │
                          │  Receives  │◀─────────────────┘
                          │  request   │
                          └──────┬──────┘
                                 │
                                 ▼
                          5. Service Layer
                          ┌─────────────┐
                          │  Business   │
                          │  Logic +    │
                          │  Validation │
                          └──────┬──────┘
                                 │
                                 ▼
                          6. Prisma ORM
                          ┌─────────────┐
                          │  Database   │
                          │  Operation  │
                          └──────┬──────┘
                                 │
                                 ▼
                          7. PostgreSQL
                          ┌─────────────┐
                          │  Store/     │
                          │  Retrieve   │
                          └─────────────┘
```

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **NestJS** | Node.js framework for building scalable server-side applications |
| **Prisma** | Type-safe ORM for database operations |
| **PostgreSQL** | Relational database |
| **TypeScript** | Type-safe JavaScript |
| **class-validator** | DTO validation |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI library for building user interfaces |
| **Vite** | Build tool and development server |
| **TypeScript** | Type-safe JavaScript |
| **Axios** | HTTP client for API requests |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Icons** | Icon library |

---

## Project Structure

```
desafio-cati/
├── backend/                    # NestJS Backend
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/         # Database migrations
│   ├── src/
│   │   ├── main.ts            # Application entry point
│   │   ├── app.module.ts      # Root module
│   │   ├── app.controller.ts  # Default controller
│   │   ├── app.service.ts     # Default service
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── lists/
│   │   │   ├── lists.controller.ts
│   │   │   ├── lists.service.ts
│   │   │   ├── lists.module.ts
│   │   │   └── dto/
│   │   │       ├── create-list.dto.ts
│   │   │       └── update-list.dto.ts
│   │   └── tasks/
│   │       ├── tasks.controller.ts
│   │       ├── tasks.service.ts
│   │       ├── tasks.module.ts
│   │       └── dto/
│   │           ├── create-task.dto.ts
│   │           ├── update-task.dto.ts
│   │           └── priority.dto.ts
│   ├── generated/
│   │   └── prisma/           # Generated Prisma client
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── main.tsx          # React entry point
    │   ├── App.tsx           # Main App component
    │   ├── api/
    │   │   ├── axios.ts      # Axios instance
    │   │   └── endpoints/
    │   │       ├── Lists.ts  # Lists API calls
    │   │       └── task.ts   # Tasks API calls
    │   ├── components/
    │   │   ├── Board.tsx     # Main board component
    │   │   ├── ListComponent.tsx  # Individual list
    │   │   ├── TaskCard.tsx       # Task card display
    │   │   ├── TaskModal.tsx      # Task create/edit modal
    │   │   ├── Navbar.tsx         # Navigation bar
    │   │   ├── PrioritySelect.tsx # Priority dropdown
    │   │   └── ui/
    │   │       └── CreateTaskBtn.tsx
    │   ├── types/
    │   │   └── api.ts        # TypeScript interfaces
    │   └── index.css         # Global styles
    ├── index.html
    ├── package.json
    └── tsconfig.json
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE SCHEMA                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    List     │       │    Task     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │───┐   │ id (PK)     │───┐   │ id (PK)     │
│ email       │   │   │ name        │   │   │ title       │
│ name        │   │   │ userId (FK) │───┼───┤ description │
│ password    │   │   │ userId (FK) │   │   │ priority    │
│ createdAt   │   │   │ createdAt   │   │   │ expected-   │
│ updatedAt   │   │   │ updatedAt   │   │   │   FinishDate│
└─────────────┘   │   └─────────────┘   │   │ finishDate  │
                  │                      │   │ listId (FK) │
                  │                      │   │ userId (FK) │
                  │                      │   │ createdAt   │
                  │                      │   │ updatedAt   │
                  │                      │   └─────────────┘
                  │                      │
                  └──────────────────────┘

PRIORITY ENUM:
┌─────────────┐
│  priority   │
├─────────────┤
│ LOW         │
│ MEDIUM      │
│ HIGH        │
│ VERY_HIGH   │
└─────────────┘
```

### Prisma Schema Details

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lists     List[]
  tasks     Task[]
}

model List {
  id     Int    @id @default(autoincrement())
  name   String @unique
  userId Int
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks  Task[]
}

model Task {
  id                 Int       @id @default(autoincrement())
  title              String
  description        String?
  priority           priority
  expectedFinishDate DateTime?
  finishDate         DateTime?
  listId             Int
  userId             Int
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  list               List      @relation(fields: [listId], references: [id])
  user               User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## API Endpoints

### Lists API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/lists/` | Create a new list | `{ name: string, userId: number }` |
| `GET` | `/lists` | Get all lists (with tasks) | - |
| `GET` | `/lists/:id` | Get a specific list | - |
| `PATCH` | `/lists/:id` | Update a list | `{ name: string }` |
| `DELETE` | `/lists/:id` | Delete a list | - |

### Tasks API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/tasks/` | Create a new task | `{ title, description?, priority, expectedFinishDate?, listId, userId }` |
| `GET` | `/tasks` | Get all tasks | - |
| `GET` | `/tasks/:id` | Get a specific task | - |
| `PATCH` | `/tasks/:id` | Update a task | `{ title?, description?, priority?, expectedFinishDate?, finishDate? }` |
| `DELETE` | `/tasks/:id` | Delete a task | - |

---

## Frontend Components

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND COMPONENT TREE                              │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │    App      │
                              │  (Root)     │
                              └──────┬──────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
      ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
      │   Navbar    │        │    Board    │        │             │
      └─────────────┘        └──────┬──────┘        │             │
                                   │                │             │
              ┌────────────────────┼────────────────┘             │
              │                    │                                │
              ▼                    ▼                                │
      ┌─────────────┐        ┌─────────────┐                        │
      │ListComponent│        │ListComponent│◀──────┐              │
      └──────┬──────┘        └──────┬──────┘       │              │
             │                      │              │              │
    ┌────────┴────────┐    ┌────────┴────────┐    │              │
    │                 │    │                 │    │              │
    ▼                 ▼    ▼                 ▼    ▼              │
┌────────┐      ┌──────────┐  ┌────────┐  ┌──────────┐  ┌─────────┐ │
│TaskCard│      │TaskModal│  │TaskCard│  │TaskModal│  │Create   │
└────────┘      └──────────┘  └────────┘  └──────────┘  │TaskBtn  │
                                                       └─────────┘ │
                                              ┌─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ PrioritySelect │
                                    └─────────────────┘
```

### Component Responsibilities

| Component | File | Responsibility |
|-----------|------|----------------|
| `App` | `App.tsx` | Root component, fetches initial lists data |
| `Board` | `Board.tsx` | Main Kanban board, renders lists horizontally, handles create list modal |
| `ListComponent` | `ListComponent.tsx` | Renders individual list with tasks, handles rename/delete |
| `TaskCard` | `TaskCard.tsx` | Displays task info (title, priority badge) |
| `TaskModal` | `TaskModal.tsx` | Create/edit task form with all fields |
| `Navbar` | `Navbar.tsx` | Top navigation bar |
| `PrioritySelect` | `PrioritySelect.tsx` | Priority dropdown selector |
| `CreateTaskBtn` | `CreateTaskBtn.tsx` | "Add Task" button component |

---

## Data Flow

### Creating a New Task

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CREATE TASK DATA FLOW                                     │
└─────────────────────────────────────────────────────────────────────────────┘

User clicks "Nova Tarefa"
        │
        ▼
TaskModal opens (mode: 'create')
        │
        ▼
User fills form:
- title (required)
- description (optional)
- priority (LOW/MEDIUM/HIGH/VERY_HIGH)
- expectedFinishDate (optional)
        │
        ▼
User clicks "Salvar"
        │
        ▼
handleSubmit() is called
        │
        ├──▶ Build taskData object
        │   {
        │     title,
        │     description,
        │     priority,
        │     expectedFinishDate,
        │     listId
        │   }
        │
        ▼
Call createTask() from API
        │
        ▼
axios.post('/tasks/', taskData)
        │
        ▼
Backend: TasksController.create()
        │
        ▼
Backend: TasksService.create()
        │
        ▼
Prisma: prisma.task.create()
        │
        ▼
PostgreSQL: INSERT INTO Task...
        │
        ▼
Response sent back to frontend
        │
        ▼
refetchLists() - re-fetches all lists
        │
        ▼
App state updated, UI re-renders
        │
        ▼
New task appears in the list
```

### Fetching Lists (Initial Load)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INITIAL DATA LOAD FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

App component mounts
        │
        ▼
useEffect(() => { fetchLists() }, [])
        │
        ▼
getLists() called
        │
        ▼
axios.get('/lists')
        │
        ▼
Backend: ListsController.findAll()
        │
        ▼
Backend: ListsService.findAll()
        │
        ▼
Prisma: prisma.list.findMany({ include: { tasks: true } })
        │
        ▼
PostgreSQL: SELECT * FROM List LEFT JOIN Task...
        │
        ▼
Returns array of lists, each with nested tasks array
        │
        ▼
Response: [{ id, name, tasks: [...] }, ...]
        │
        ▼
setLists(responseData)
        │
        ▼
UI renders Board component with lists
        │
        ▼
Board maps through lists and renders ListComponent for each
```

---

## Diagrams

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COMPLETE SYSTEM VIEW                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   User Browser   │
                              └────────┬────────┘
                                       │ HTTP Requests
                                       │ (port 8000)
                                       ▼
                              ┌─────────────────┐
                              │   NestJS Server  │
                              │   (backend/src)   │
                              │                   │
                              │ ┌───────────────┐ │
                              │ │ ListsModule   │ │
                              │ │ - Controller  │ │
                              │ │ - Service     │ │
                              │ └───────────────┘ │
                              │                   │
                              │ ┌───────────────┐ │
                              │ │ TasksModule   │ │
                              │ │ - Controller  │ │
                              │ │ - Service     │ │
                              │ └───────────────┘ │
                              │                   │
                              │ ┌───────────────┐ │
                              │ │ PrismaModule  │ │
                              │ │ - Service     │ │
                              │ └───────────────┘ │
                              └────────┬────────┘
                                       │ Prisma Client
                                       │ (generated/prisma)
                                       ▼
                              ┌─────────────────┐
                              │  PostgreSQL DB  │
                              │   (port 5432)   │
                              │                 │
                              │ Tables:         │
                              │ - User          │
                              │ - List          │
                              │ - Task          │
                              └─────────────────┘
```

### Frontend State Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FRONTEND STATE FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ App.tsx                                                                     │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ State:                                                                │ │
│ │ - lists: List[]          ←── Main data                               │ │
│ │ - initialLoading: boolean ←── Loading state                          │ │
│ │                                                                         │ │
│ │ Methods:                                                              │ │
│ │ - fetchLists(): Promise<void>                                        │ │
│ │   └── Calls getLists() API → setLists(data)                         │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │ props: { lists, refetchLists }
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Board.tsx                                                                   │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ Props:                                                                │ │
│ │ - lists: List[]                                                       │ │
│ │ - refetchLists: () => Promise<void>                                  │ │
│ │                                                                         │ │
│ │ Renders:                                                              │ │
│ │ - Maps lists → ListComponent                                          │ │
│ │ - "Nova Lista" button → Create list modal                            │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ ListComponent  │   │ ListComponent  │   │ ListComponent  │
│ (List 1)        │   │ (List 2)        │   │ (List 3)        │
├─────────────────┤   ├─────────────────┤   ├─────────────────┤
│ id: 1           │   │ id: 2           │   │ id: 3           │
│ name: "To Do"  │   │ name: "Doing"   │   │ name: "Done"   │
│ tasks: [...]   │   │ tasks: [...]   │   │ tasks: [...]   │
│                 │   │                 │   │                 │
│ - TaskCard x3  │   │ - TaskCard x2   │   │ - TaskCard x1  │
│ - TaskModal    │   │ - TaskModal     │   │ - TaskModal    │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Database Operations Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATABASE OPERATIONS BY ENTITY                            │
└─────────────────────────────────────────────────────────────────────────────┘

CREATE OPERATIONS:
──────────────────

POST /lists/
  └── prisma.list.create({ data: { name, userId } })
       └── INSERT INTO "List" (name, "userId") VALUES (...)

POST /tasks/
  └── prisma.task.create({ data: { title, description, priority, 
                                    expectedFinishDate, listId, userId } })
       └── INSERT INTO "Task" (title, description, priority, ...)


READ OPERATIONS:
────────────────

GET /lists
  └── prisma.list.findMany({ 
        include: { tasks: { orderBy: { createdAt: 'asc' } } } 
      })
       └── SELECT * FROM "List" LEFT JOIN "Task" ...

GET /lists/:id
  └── prisma.list.findUnique({ 
        where: { id }, 
        include: { tasks: true } 
      })
       └── SELECT * FROM "List" WHERE id = ? LEFT JOIN "Task" ...

GET /tasks/:id
  └── prisma.task.findUnique({ where: { id } })
       └── SELECT * FROM "Task" WHERE id = ?


UPDATE OPERATIONS:
──────────────────

PATCH /lists/:id
  └── prisma.list.update({ where: { id }, data: { name } })
       └── UPDATE "List" SET name = ? WHERE id = ?

PATCH /tasks/:id
  └── prisma.task.update({ where: { id }, data: { ...fields } })
       └── UPDATE "Task" SET title = ?, description = ?, ... WHERE id = ?


DELETE OPERATIONS:
──────────────────

DELETE /lists/:id
  ├── prisma.task.deleteMany({ where: { listId: id } })
  │     └── DELETE FROM "Task" WHERE "listId" = ?
  └── prisma.list.delete({ where: { id } })
        └── DELETE FROM "List" WHERE id = ?

DELETE /tasks/:id
  └── prisma.task.delete({ where: { id } })
       └── DELETE FROM "Task" WHERE id = ?
```

---

## Setup & Installation

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **PostgreSQL** (running on port 5432)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client (after fixing the schema)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
# Server running on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App running on http://localhost:5173
```

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## API Testing

Use the included `api.http` file in the backend directory with VS Code's REST Client extension, or use tools like Postman/curl.

### Example Requests

```bash
# Get all lists
curl http://localhost:8000/lists

# Create a new list
curl -X POST http://localhost:8000/lists \
  -H "Content-Type: application/json" \
  -d '{"name": "My List", "userId": 1}'

# Get all tasks
curl http://localhost:8000/tasks

# Create a new task
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Example Task",
    "description": "Task description",
    "priority": "HIGH",
    "listId": 1,
    "userId": 1
  }'
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Server
PORT=8000
```

---

## Key Features

1. **Kanban Board** - Horizontal scrolling board with multiple lists
2. **Task Management** - Create, edit, delete tasks with full CRUD operations
3. **Priority System** - Four priority levels (LOW, MEDIUM, HIGH, VERY_HIGH)
4. **Due Dates** - Set expected finish dates for tasks
5. **Descriptions** - Add detailed descriptions to tasks
6. **List Management** - Create, rename, and delete lists
7. **Cascade Deletion** - Deleting a list deletes all associated tasks

---

## License

UNLICENSED
