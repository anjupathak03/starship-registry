# Starfleet Registry 🚀

A full-stack demo that tracks Starfleet starships.

| Layer | Tech |
|-------|------|
| **API** | REST, documented in [`openapi.yml`](server/openapi.yml) |
| **Server** | Node · Express · MongoDB (Mongoose) |
| **Client** | Next.js · React · Tailwind |
| **Tests** | Jest · Supertest · mongodb-memory-server |

---

## 🔌 API at a glance

| Method   | Endpoint                          | Description             |
| -------- | --------------------------------- | ----------------------- |
| `GET`    | `/starfleet/starships`            | List all starships      |
| `GET`    | `/starfleet/starships/{registry}` | Get single starship     |
| `POST`   | `/starfleet/starships`            | Register new starship   |
| `PUT`    | `/starfleet/starships/{registry}` | Update starship details |
| `DELETE` | `/starfleet/starships/{registry}` | De-commission (delete)  |

---

## 🔧 Getting Started

### Prerequisites

* Node >= 18
* A local MongoDB instance *or* Docker Desktop

### 1  Clone

```bash
git clone https://github.com/YOUR_HANDLE/starfleet-registry.git
cd starfleet-registry
```

### 2  Server

```bash
cd server
cp .env.example .env              # contains MONGO_URI=mongodb://localhost:27017/starfleet
npm install
npm run dev                       # nodemon on :4000
```

### 3  Client

```bash
cd ../client
cp .env.example .env
npm install
npm run dev                       # Next.js on :3000
```

Open `http://localhost:3000` 

---

## Keploy API Test Generation

I downloaded the Keploy agent for my Windows machine to generate and run tests locally. Below is the screenshot of the test run reports page: 

![image](https://github.com/user-attachments/assets/072effb8-5ff9-4263-98b9-7d45faa23437)


Additionally, I have integrated Keploy API tests into the CI/CD pipeline. The configuration details can be found in the .github/workflows/ci.yml file.

## 🧪 Running Tests

```bash
cd server
npm test            # Jest with coverage
```

The run spins up an **in-memory MongoDB**, so no local database is touched.

### Coverage

![Screenshot 2025-06-24 002013](https://github.com/user-attachments/assets/4842a8c8-71ce-46f3-9723-d50ca2e5df99)

Total coverage: **85%** line (see full report in `server/coverage/`).

---

## 🛠️ Scripts

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Hot-reload Express server (nodemon) |
| `npm start`            | Production server                   |
| `npm test`             | Jest + coverage                     |
| `client/npm run dev`   | Next.js with Turbopack              |
| `client/npm run build` | Static production build             |

---

## 📜 API Reference

See [`server/openapi.yml`](server/openapi.yml) or browse the live Swagger UI at `http://localhost:4000/api-docs`.

