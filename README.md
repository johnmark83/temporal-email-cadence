
# 📧 temporal-email-cadence

A monorepo application for building and running email cadences using **Temporal.io** and **TypeScript**.

# 📦 Installation and Requirements
**Node.js version ">=20.9.0" for Next.js**

Install Temporal CLI from this website
https://docs.temporal.io/develop/typescript/set-up-your-local-typescript

Install all dependencies:

```bash
npm install --legacy-peer-deps
````

---

# 🚀 Running the Application

## Run Individual Workspaces

### 🌐 Frontend

```bash
npm run dev:web
```

### 🔌 API

```bash
npm run dev:api
```

### ⚙️ Temporal Worker

```bash
npm run dev:worker
```

---

## ▶️ Run Everything

To start all services together:

```bash
npm run dev
```

---

# ⚙️ Environment Variables (Optional)

Create a `.env` file in the root directory if you need to customize Temporal settings:

```env
TEMPORAL_ADDRESS=localhost:7233
TASK_QUEUE=my-task-queue
NAMESPACE=default
```

---

# 🌍 Local URLs

After starting the services, you can access:

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Temporal UI:** [http://localhost:8233](http://localhost:8233)

---

# 📡 Sample API Endpoints

## Get a Cadence

```
GET /cadences/cad_12345
```

---

## Create a Cadence

```
POST /cadences
```

```json
{
  "id": "cad_57545",
  "name": "Welcome Flow",
  "steps": [
    {
      "id": "1",
      "type": "SEND_EMAIL",
      "subject": "Welcome",
      "body": "Hello there"
    },
    {
      "id": "2",
      "type": "WAIT",
      "seconds": 10
    },
    {
      "id": "3",
      "type": "SEND_EMAIL",
      "subject": "Follow up",
      "body": "Checking in"
    }
  ]
}
```

---

## Update a Cadence

```
PUT /cadences/cad_12345
```

```json
{
  "name": "Welcome Flow version 2",
  "steps": [
    {
      "id": "1",
      "type": "SEND_EMAIL",
      "subject": "Welcome",
      "body": "Hello there"
    },
    {
      "id": "2",
      "type": "WAIT",
      "seconds": 10
    },
    {
      "id": "3",
      "type": "SEND_EMAIL",
      "subject": "Follow up",
      "body": "Checking in"
    }
  ]
}
```

---

## Enroll a Contact into a Cadence

```
POST /enrollments
```

```json
{
  "cadenceId": "cad_12345",
  "contactEmail": "test@example.com"
}
```

---

## Get Enrollment Status

```
GET /enrollments/enrollment-nak0uu30d4
```

---

## Update cadence of active workflow

```
POST /enrollments/enrollment-nak0uu30d4/update-cadence
```

```json
{
  "steps": [
    {
      "id": "1",
      "type": "SEND_EMAIL",
      "subject": "Welcome",
      "body": "Hello there"
    },
    {
      "id": "2",
      "type": "WAIT",
      "seconds": 10
    },
    {
      "id": "3",
      "type": "WAIT",
      "seconds": 100
    },
    {
      "id": "4",
      "type": "SEND_EMAIL",
      "subject": "Follow up",
      "body": "Checking in"
    }
  ]
}
```


