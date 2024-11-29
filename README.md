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

## Run On Docker

Clone the project

```bash
  git clone https://github.com/Zayed-Fahim/Pimjo
```

Go to the project directory

```bash
  cd Pimjo
```

Start server

```bash
  docker-compose up --build --force-recreate
```

## Environment Variables for Local Development

To run this project, create two separate .env file, locate them in root of client folder and server folder. then you will need to add the following environment variables to your separate .env file

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

## Environment Variables for Docker

To run this project, you need to create .env file at the same location of docker-compose.yaml file will. After this add all the following environment variables

`NODE_ENV`

`AUTH_SECRET`

`PORT`

`NODE_ENV`

`DB_NAME`

`DB_USER`

`DB_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`
