# Express application template

## Project Overview

This is a robust, versatile starter template designed to accelerate the development of scalable Express applications integrated with TypeScript, Prisma ORM, and Redis caching. It focuses on clean architecture and full-stack functionality with essential backend technologies, including user authentication, database schema management, and more.

## Key Functionalities
- **TypeScript Configuration** ✅
- **Authentication Logic**
- **Prisma ORM** ✅
- **Database Connection** ✅
- **Folder Structure** ✅
- **User Implementation** ✅
- **Sample Relation Implementation** ✅
- **ESLint Configuration** ✅
- **Environment Configuration** ✅
- **Logging Infrastructure**
- **Data Validation** ✅
- **Testing Suite**
- **CI/CD Integration**
- **API Documentation**
- **Security Enhancements**
- **Error Handling Middleware**

## Run Instructions

### Option 1: Docker Setup (Recommended)

1. **Prerequisites**:
   - Docker
   - Colima (for MacOS users without Docker Desktop)

2. **Start Docker Daemon (MacOS with Colima)**:
   ```bash
   brew install colima docker docker-compose
   colima start
   ```
   Add to your shell config (~/.zshrc or ~/.bash_profile):
   ```bash
   export DOCKER_HOST="unix://${HOME}/.colima/docker.sock"
   ```

3. **Build and Run**:
   ```bash
   docker-compose up --build
   ```

The application will be available at http://localhost:3000.

### Option 2: Traditional Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000
   DATABASE_URL="mysql://root:express_app@localhost:3307/express_app_db"
   ```

4. **Run MySQL in Docker**:
   ```bash
   docker run --name my-mysql-express-app -e MYSQL_ROOT_PASSWORD=express_app -e MYSQL_DATABASE=express_app_db -e MYSQL_PASSWORD=express_app -p 3307:3306 -d mysql:8.0
   ```

5. **Run Database Migrations**:
   ```bash
   npm run migrate
   ```

6. **Start the Application**:
   ```bash
   npm start
   ```

The application will run locally on the specified port (default is 3000). You can access the API via `http://localhost:3000`. Ensure the Docker container is running before starting the application to allow database connections.