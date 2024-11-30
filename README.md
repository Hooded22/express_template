# Asynchronous Access Card System

## Project Overview

This project is an Express application designed to manage an Access Card system. It includes functionalities for managing user and access card information, asynchronous processing of access creation, and utilizes a caching mechanism for performance optimization.

## Run Instructions

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

   Execute the following command to run a MySQL database in a Docker container:
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

The application will run locally on the specified port (default is 3000). You can access the API via `http://localhost:3000`.

Ensure the Docker container is running before starting the application to allow database connections.