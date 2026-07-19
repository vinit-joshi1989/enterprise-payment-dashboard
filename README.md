# Enterprise Payment Dashboard

A modern enterprise payment dashboard built with **React**, **TypeScript**, **Material UI**, and **Axios**, consuming a Spring Boot REST API.

This project is the frontend for the Enterprise Payment API and demonstrates a production-style architecture using reusable components, a service layer, environment-based configuration, and TypeScript models.

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- Axios
- ESLint

Backend:

- Spring Boot
- Spring Data JPA
- PostgreSQL
- Docker
- Maven

---

## Architecture

```
React Components
        │
        ▼
Service Layer
        │
        ▼
Axios API Client
        │
        ▼
Spring Boot REST API
        │
        ▼
PostgreSQL
```

---

## Features

- Dashboard summary cards
- Payment table
- REST API integration
- Environment configuration
- Responsive Material UI layout

---

## Project Structure

```
src
├── api
├── components
├── layouts
├── pages
├── services
├── types
```

---

## Running Locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Application:

```
http://localhost:5173
```

---

## Environment Variables

Create:

```
.env.development
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Backend Repository

https://github.com/vinit-joshi1989/enterprise-payment-api

---

## Roadmap

- Search payments
- Filter by status
- Pagination
- Create payment
- Edit payment
- Delete payment
- JWT Authentication
- Dashboard analytics
- Deployment

---

## Author

**Vinit Joshi**
