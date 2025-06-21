#  Starfleet Registry

A full-stack sandbox that lets you **register, update, list, and de-commission Federation starships**.

---

## 📂 Monorepo layout

```text
starship-registry/
├─ client/                # Next.js UI
│  └─ …                  
├─ server/                # Express API
│  └─ …                   
└─ README.md
```

---

## ⚡ Quick-start

### 1. Prerequisites

* **Node**
* **npm**
* **MongoDB** running locally (`mongodb://localhost:27017`)

### 2. Clone & install

```bash
git clone https://github.com/your-handle/starship-registry.git
cd starship-registry

# install root-level git hooks / lint configs (optional)
npm install

# install each workspace
npm --workspace server install
npm --workspace client install
```

### 3. Environment variables

| File                | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `server/.env`       | `MONGO_URI=mongodb://localhost:27017/starfleet` <br>`PORT=4000` |
| `client/.env.local` | `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/starfleet`      |

---

## 🔌 API at a glance

| Method   | Endpoint                          | Description             |
| -------- | --------------------------------- | ----------------------- |
| `GET`    | `/starfleet/starships`            | List all starships      |
| `GET`    | `/starfleet/starships/{registry}` | Get single starship     |
| `POST`   | `/starfleet/starships`            | Register new starship   |
| `PUT`    | `/starfleet/starships/{registry}` | Update starship details |
| `DELETE` | `/starfleet/starships/{registry}` | De-commission (delete)  |

See [`openapi.yaml`](./openapi.yaml) for the full contract (plug it into **Swagger UI** or **Insomnia**).

---

## 🛠️ Scripts cheat-sheet

| Command (root)       | Action                                            |
| -------------------- | ------------------------------------------------- |
| `npm run server` | Nodemon + Express hot-reload                      |
| `npm run client` | Next.js dev server                                |
| `npm run build`      | `server/dist` + `client/.next` production bundles |

