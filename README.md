# temporal-email-cadence
monorepo to create an email cadence using Temporal.io with Typescript

## Installation
```
npm install --legacy-peer-deps
```

## Commands for each workspace to run
Frontend
```
npm run dev:web
```
API 
```
npm run dev:api
```
Temporal Server and Worker
```
npm run dev:worker
```

Run All of the workspaces 
```
npm run dev
```

optional .env file to update temporal.io 
```
TEMPORAL_ADDRESS=localhost:7233
TASK_QUEUE=my-task-queue
NAMESPACE=default
```


localhost urls to check functionality
```
frontend - localhost:3000
temporal UI - localhost:8233
```
