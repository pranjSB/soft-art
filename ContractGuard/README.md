# ContractGuard

A backend utility to detect API contract drift by comparing real-time responses against expected schemas.

## Overview

Modern applications rely heavily on APIs. Even small, unnoticed changes in API responses can break downstream systems like frontends, mobile apps, or other services.

ContractGuard helps detect these issues early by validating API responses against predefined schemas and highlighting any drift.

## Features

- Store API schemas (contracts)
- Validate real-time responses
- Detect contract drift:

  - Missing fields
  - Type mismatches
  - Structural changes
- Persist validation history
- Drift classification for better debugging

## How It Works

1. Define expected API schema
2. Send actual API response
3. System validates using JSON Schema
4. Differences are detected and classified
5. Results are stored for analysis

## Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL (hosted via Supabase)
- Prisma ORM
- Ajv (JSON Schema validation)

## Setup

### 1. Clone repo

```bash
git clone <repo-url>
cd contract-guard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Create `.env`:

```env
DATABASE_URL="your_postgres_url"
```

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Start server

```bash
npm run dev
```

## API Endpoints

### Store Schema

```
POST /api/schema
```

### Validate Response

```
POST /api/validate
```

### Drift Report

```
GET /api/drift-report
```

## Example

### Schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" }
  },
  "required": ["id", "name"]
}
```

### Response

```json
{
  "id": "wrong-type"
}
```

### Output

```json
{
  "valid": false,
  "drift": [
    { "type": "TYPE_MISMATCH" },
    { "type": "MISSING_FIELD" }
  ]
}
```

## Use Cases

- Microservices contract validation
- CI/CD pipeline checks
- Frontend-backend integration safety
- Third-party API monitoring

## Future Improvements

- Real-time traffic interception
- Slack/email alerts
- UI dashboard
- AI-based anomaly detection

## Why This Project

This project demonstrates backend engineering concepts including:

- API design
- Schema validation
- Data persistence
- System reliability tooling

## Author

Pranjali Bhanap
