# Full-Stack Task Manager (Task Nest) with Next.js and Express.js

- This is a full-stack web application built using Next.js (frontend) and Express.js (backend). The project is structured into two separate directories: client for the frontend and server for the backend.

## Features

## Frontend (Client)

- Built with Next.js 15 for server-side rendering (SSR) and static site generation (SSG).
- Styled using Tailwind CSS for responsive and modern design.
- Includes reusable components for scalability.
- API integration with the backend using axios.
- Follow ATOMIC design pattern.

## Backend (Server)

- Built with Express.js for handling RESTful API endpoints.
- TypeScript for static type checking and better development experience.
- Rate limiting for secured API endpoints.
- .env for sensitive configurations.
- Maintain clean code architecture (MVC).

## Run Frontend Locally (http://localhost:3000)

Clone the project

```bash
  git clone https://github.com/Zayed-Fahim/Pimjo
```

Go to the project directory

```bash
  cd Pimjo
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  yarn
```

Start the frontend server

```bash
  yarn dev
```

## Run Backend Locally (http://localhost:3001/api-docs)

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  yarn
```

Start the frontend server

```bash
  yarn start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

## Client side

`AUTH_SECRET`

## Server side

`PORT`

`NODE_ENV`

`DB_NAME`

`DB_USER`

`DB_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`
