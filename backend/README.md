# Finance Dashboard API

A robust, logically structured backend system for managing financial records, user roles, and dashboard analytics. Built with Node.js, Express, and MongoDB.

## 🚀 Architecture & Design Decisions
This project follows a layered **Controller-Route-Model** architecture to ensure a clean separation of concerns:
* **Routes:** Define API endpoints and attach necessary middleware.
* **Controllers:** Handle HTTP request/response logic.
* **Models:** Define strict data structures and database-level validation using Mongoose.
* **Middlewares:** Handle authentication and Role-Based Access Control (RBAC).

### Assumptions & Trade-offs
* **Authentication:** Implemented a standard JWT-based stateless authentication system.
* **Role Management:** For demonstration purposes, the `register` route allows assigning roles. In a true production environment, the default role would strictly be `VIEWER`, and only an existing `ADMIN` could promote other users.
* **Validation:** Relied on Mongoose's built-in schema validation rather than introducing external libraries (like Joi or Zod) to keep the application lightweight and maintainable given the scope of the assignment.
* **Analytics:** Utilized MongoDB Aggregation Pipelines to calculate dashboard summaries (totals, category breakdowns, monthly trends) directly at the database level, ensuring high performance and scalability instead of calculating totals in memory.

## 🛠️ Tech Stack
* **Node.js & Express** - Server framework
* **MongoDB & Mongoose** - Database and Object Data Modeling (ODM)
* **JWT (JSON Web Tokens)** - Authentication
* **Bcrypt.js** - Password hashing
* **Cors & Helmet** - Security

## ⚙️ Local Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Variables**
   Create a `.env` file in the root directory and add the following:
   \`\`\`text
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   \`\`\`

3. **Run the Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user & get token

### Financial Records (Requires Auth)
* `GET /api/records` - Get all records (Accepts `?type=` and `?category=` filters)
* `POST /api/records` - Create a record *(Roles: ADMIN, ANALYST)*
* `PUT /api/records/:id` - Update a record *(Roles: ADMIN)*
* `DELETE /api/records/:id` - Delete a record *(Roles: ADMIN)*

### Dashboard Analytics (Requires Auth)
* `GET /api/dashboard/summary` - Get aggregated totals, category breakdowns, and monthly trends *(Roles: ADMIN, ANALYST)*