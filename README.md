# Todo Project

A todo app where each signed-in user can create, edit, complete and delete their own todos.

Built with Next.js 16 (App Router, server actions, cache components), Clerk for auth, Prisma with MongoDB, Tailwind CSS and shadcn/ui. Supports light and dark mode.

## Environment variables

Create a `.env` file in the project root (it is git-ignored, never commit it):

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/<database>"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

- `DATABASE_URL`: MongoDB connection string (for example from MongoDB Atlas).
- Clerk keys: from the Clerk dashboard, under **API Keys**.

## Run locally

```bash
npm install        # also runs `prisma generate`
npx prisma db push # create the collections in MongoDB
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: seed sample data with `npx prisma db seed`.

## Deploy on Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new).
2. Add every variable from the list above under **Settings > Environment Variables**.
3. In MongoDB Atlas, under **Network Access**, allow access from anywhere (`0.0.0.0/0`), because Vercel has no fixed IP address.
4. Deploy. When you move to a Clerk production instance, use its production keys and add your Vercel domain in Clerk.
