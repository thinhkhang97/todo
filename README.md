# Start guide

## Set up env

- Install pnpm, quit terminal after installation

```
npm install -g pnpm
```

- Test pnpm installation

```
pnpm -v
```

- Create .env in root directory like .env.example

## Install dependencies

```
pnpm install
```

## Set up database

```
npx prisma migrate dev
```

## Start service

- Start service at port 3000

```
npm run start:dev
```
