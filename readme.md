# Personnel API

A secure and modular RESTful API built with **Node.js**, **Express**, and **MongoDB**, designed to manage personnel records with filtering, session-based authentication, and Excel import support. Written in **TypeScript** and containerized with **Docker** for seamless deployment.

## 🚀 Features

- 🔐 Cookie-based authentication using `cookie-session`
- 📄 Excel file parsing via `convert-excel-to-json`
- 🔍 Advanced filtering and search middleware
- 🧾 Pagination for large datasets
- 🛡️ Secure headers, error handling, and CORS setup
- ⚙️ Environment configuration with `.env`
- 🐳 Docker-ready with multi-stage build
- 🧪 Seeder scripts for test data

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Docker**
- **cookie-session**
- **convert-excel-to-json**

## 📦 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/SaperZP/personnel_api.git
   cd personnel_api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root:
   ```
   PORT=3000
   DBURI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>
   SESSION_SECRET=your_cookie_session_secret
   ```

4. Build and start the server:
   ```bash
   npm run build
   npm start
   ```

## 🐳 Docker Deployment

To build and run the app in a container:

```bash
docker build -t personnel-api .
docker run -p 3000:3000 personnel-api
```

## 🧪 Database Seeding

```bash
# Import mock data
npx ts-node seeder.ts -i

# Delete mock data
npx ts-node seeder.ts -d
```

## 👨‍💻 Author

**Andriy Bilous**  
[bilous.info](https://bilous.info)  
Full-Stack Developer (MERN) | Ottawa, Canada
