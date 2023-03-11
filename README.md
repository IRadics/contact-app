Contact list application created for Developer Challange

Used Next.js with TypeScript, Tailwind CSS and Prisma for SQLite database.

With the current setup - db file saved locally in prisma folder - the following env variable is needed: (if locally run, in a .env file in the root folder)

| variable     | description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| DATABASE_URL | URL to the SQlite database, <br> To use the provided SQlite db file-> file:./dev.db |
| PORT         | DOCKER ONLY - exposed port <br> default: 3000                                       |

---

**Note**: Due to the limited time to work on it - photo upload is not available yet, a few parts of code cries for refactoring and responsivity is limited

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
