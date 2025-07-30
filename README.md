# 🚀 Portfolio Manager - Team 6 Project

Welcome to the Portfolio Manager project! This application is designed to help users manage their financial portfolios, including stocks, bonds, and cash. Our goal is to provide a user-friendly interface for browsing, viewing performance, and managing portfolio items.

## 🌟 Overview

This project is divided into two main components: a JavaScript-based frontend for the user interface and a Node.js backend that serves as a REST API for managing portfolio data. We aim to create a robust and scalable solution for financial portfolio management.

### Technical Goals:
- **Portfolio Management REST API**: Develop a Node.js API to handle saving, retrieving, adding, and removing portfolio records.
- **Intuitive Frontend**: Build a responsive JavaScript frontend that allows users to:
  - Browse their portfolio.
  - View portfolio performance (with graphical representation if possible).
  - Add new items to their portfolio.
  - Remove existing items from their portfolio.

### Key Features:
- **Single User Focus**: For simplicity, the application currently assumes a single user with no authentication.
- **Persistent Storage**: Data will be stored using a database technology suitable for Node.js applications (e.g., MongoDB, PostgreSQL, or a simple JSON file for initial development).
- **API Documentation**: We will strive to provide clear documentation for the REST API endpoints.

## 🛠️ Environment Configuration

To get this project up and running on your local machine, you'll need to set up both the backend and frontend environments.

### Prerequisites:
- **Node.js**: Ensure you have Node.js installed (LTS version recommended). You can download it from [nodejs.org](https://nodejs.org).
- **npm (Node Package Manager)**: npm comes bundled with Node.js.
- **Git**: For version control.

### Backend Setup (Node.js):
1. **Clone the Repository**:
   ```bash
   git clone <your-backend-repo-url>
   cd <your-backend-repo-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables (Optional but Recommended)**:
   Create a `.env` file in the root of your backend directory for sensitive information or configuration.
   ```env
   PORT=3000
   DATABASE_URL=your_database_connection_string
   # Add any other necessary environment variables here
   ```
   Make sure to add `.env` to your `.gitignore` file.

### Frontend Setup (JavaScript):
1. **Clone the Repository**:
   ```bash
   git clone <your-frontend-repo-url>
   cd <your-frontend-repo-directory>
   ```

2. **Install Dependencies (if any, e.g., for a build step or dev server)**:
   ```bash
   npm install
   ```
   For a vanilla JavaScript project, this step might not be strictly necessary beyond dev dependencies.

## 🔗 API Information

The backend Node.js application exposes a RESTful API for portfolio management. Here's a general outline of the expected endpoints. Detailed API documentation (e.g., using Swagger/OpenAPI) will be provided separately or within the backend codebase.

### Base URL:
`http://localhost:3000/api` (or whatever port your backend is running on)

### Endpoints (Examples):
- **GET /api/portfolio**: Retrieve the entire portfolio.
  - **Response**: `[ { id: '...', ticker: 'GOOG', volume: 10, ... }, ... ]`

- **GET /api/portfolio/:id**: Retrieve a specific portfolio item by ID.

- **POST /api/portfolio**: Add a new item to the portfolio.
  - **Request Body**: `{ ticker: 'AAPL', volume: 5, purchasePrice: 150.00, ... }`

- **PUT /api/portfolio/:id**: Update an existing portfolio item.
  - **Request Body**: `{ volume: 12, ... }`

- **DELETE /api/portfolio/:id**: Remove a portfolio item by ID.

Note: The exact fields and structure of portfolio items will evolve based on our agile development process.

## 📁 Project Structure & Main Files

### Backend (Node.js):
```
portfolio-backend/
├── node_modules/
├── src/
│   ├── app.js             # 🚀 Main entry point of the application, sets up Express server.
│   ├── routes/            # 🚦 Defines API routes (e.g., portfolio.js).
│   │   └── portfolio.js
│   ├── controllers/       # 🧠 Contains the logic for handling API requests.
│   │   └── portfolioController.js
│   ├── models/            # 📦 Defines data models (e.g., PortfolioItem.js).
│   │   └── PortfolioItem.js
│   ├── config/            # ⚙️ Configuration files (e.g., database connection).
│   │   └── db.js
│   └── utils/             # 🛠️ Utility functions.
├── .env                   # Environment variables (local).
├── package.json           # Project metadata and dependencies.
├── package-lock.json
└── README.md              # This file!
```

### Frontend (JavaScript):
```
portfolio-frontend/
├── node_modules/
├── public/                # 🌐 Static assets (index.html, CSS, images).
│   ├── index.html         # 📄 The main HTML file for the application.
│   ├── css/
│   │   └── style.css      # 🎨 Main stylesheet.
│   └── images/
├── src/
│   ├── app.js             # 🚀 Main JavaScript file, handles UI logic and API calls.
│   ├── components/        # 🧩 Reusable UI components (e.g., PortfolioTable.js, Chart.js).
│   │   ├── PortfolioTable.js
│   │   └── Chart.js
│   ├── services/          # 📞 Functions for interacting with the backend API.
│   │   └── portfolioService.js
│   ├── utils/             # 🛠️ Frontend utility functions.
│   └── views/             # 🖼️ Specific view logic (if using a view-based structure).
├── package.json
├── package-lock.json
└── README.md              # This file!
```

## 🚀 How to Start Locally

Follow these steps to get both the backend and frontend running on your local machine.

### 1. Start the Backend:
- Open your terminal or command prompt.
- Navigate to the backend project directory:
  ```bash
  cd portfolio-backend
  ```
- Start the Node.js server:
  ```bash
  npm start
  # Or if you have a specific script: npm run dev
  ```
- You should see a message indicating that the server is running (e.g., "Server running on port 3000").

### 2. Start the Frontend:
- Open a new terminal or command prompt window.
- Navigate to the frontend project directory:
  ```bash
  cd portfolio-frontend
  ```
- Serve the frontend files. If you're using a simple static server (e.g., http-server):
  ```bash
  # If you don't have http-server installed, install it globally:
  # npm install -g http-server
  http-server public/ -p 8080
  ```
- If you're using a development server from a framework (e.g., npm start for React/Vue):
  ```bash
  npm start
  ```

### 3. Access the Application:
- Open your web browser and navigate to:
  ```
  http://localhost:8080
  ```
- You should now see the Portfolio Manager application! 🎉

Feel free to explore the code, contribute, and let's build an amazing portfolio manager together! If you encounter any issues, don't hesitate to reach out to the team. Happy coding! 💻