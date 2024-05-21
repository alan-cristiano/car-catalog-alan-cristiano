# Car catalog API

## Description

API developed to catalog car data

## Requirements

-   [Node.js](https://nodejs.org/en)
-   [PostgreSQL](https://www.postgresql.org/)

## Cloning the project

```bash
git clone <github template url> <project_name>
```

## Installing dependencies

Installing production and development dependencies:

```bash
cd <project_name>
npm install
```

## Creating the PostgreSQL databases

Development database:

```bash
psql -c "CREATE DATABASE 'db_name_dev';"
```

Test database:

```bash
psql -c "CREATE DATABASE 'db_name_test';"
```

## Environment variables

Copy the '.env.example' file and rename it to '.env.dev'. Replace the values of the environment variables present in this file with the values of your credentials.

Repeat these steps for a '.env.test' file so that you can run the application's automatic tests.

This project uses the following environment variables:
|Name|Description|Required|
|----|-----------|--------|
|DATABASE_URL|Database credentials|[x]|
|JWT_SECRET_KEY|Token secret key|[x]|
|EXPIRES_IN|Token expiring time (e.g. "1h", "30m", etc.)|[ ]|
|PORT|Port used by the server to listen to requests|[ ]|

## Database migration

In the project root:

```bash
npm run migrate:dev
```

```bash
npm run migrate:test
```

## Initializing the automatic tests

```bash
npm run test
```

## Initializing the server

The API server will run by default on port 3000.

```bash
npm run dev
```

Navigate to http://localhost:3000 to access the API.

## Documentation

Access route documentation on http://localhost:3000/docs

Download swagger documentation on http://localhost:3000/docs.json
