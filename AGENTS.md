# Unsocially — Agent Guide

MERN social platform (posts, comments, likes, follows, bookmarks). Two independent apps in one repo, no root `package.json` and no workspace tooling — run each side separately.

```
server/   Express 4 + Mongoose 8 API, ES modules
client/   React 18 + Vite SPA, Redux Toolkit
```

## Commands

```bash
cd server && npm install && npm run dev   # nodemon, loads .env via dotenv/config
cd client && npm install && npm run dev   # vite
cd client && npm run lint                 # eslint (client only; server has no linter)
```

There are no tests and no CI. Don't claim a change is verified without running the app.

## Environment

`server/.env.sample` exists but is empty, and `client/` has none (the README's `cp .env.sample .env` step is therefore useless, as are its `backend/` and `frontend/` folder names). Required vars:

- **server**: `PORT`, `MONGODB_URL`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`, `CORS_ORIGIN_LOCAL`, `CORS_ORIGIN_1`, `CORS_ORIGIN_2`, `CORS_ORIGIN_3`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **client**: `VITE_BACKEND_URL` (includes the `/api/v1` prefix)

The auth cookie is hardcoded `secure: true, sameSite: "none", partitioned: true` in `server/src/config/index.js`. Browsers treat `localhost` as a secure context, so this generally works in local dev, but it's the first thing to suspect if login appears to succeed yet the session doesn't stick.

`MONGODB_URL` accepts either the `mongodb+srv://` or the plain `mongodb://` form; `connectDB` splits off any query string before appending `DB_NAME` (`"socap"`). The non-SRV form is needed on machines whose Node resolver can't perform SRV lookups — only `mongodb+srv://` needs `dns.resolveSrv`, while `mongodb://` goes through the OS resolver.

## Backend conventions

Follow these when adding endpoints — they're consistent across the existing code.

- Wrap every controller in `asyncHandler`. Throw `ApiError(status, message)`; return `res.status(n).json(new ApiResponse(n, data, message))`.
- Auth is a JWT in an httpOnly `accessToken` cookie. Protect routes with `verifyJWT`, which sets `req.user`. Most routers call `router.use(verifyJWT)` once rather than per-route.
- Counts and per-user flags (`likes`, `comments`, `isLiked`, `isBookmarked`, `isFollowing`) are **never stored** — they're computed per request with `$lookup` + `$size` + `$cond`. `Like`, `Follow`, and `Bookmark` are pure join collections.
- Reuse `postCommonAggregation(req)` from `post.controller.js` for anything returning posts; spread it after your `$match`.
- Paginate with `Model.aggregatePaginate(aggregation, getMongoosePaginationOptions({ page, limit, customLabels }))`. Pass the **unexecuted** aggregation (no `await`). Rename `docs`/`totalDocs` via `customLabels` to match what the client slice reads.

## Frontend conventions

- All state is Redux Toolkit slices in `src/store/slices/`. There is no API client layer — slices call `axios` directly with `` `${import.meta.env.VITE_BACKEND_URL}/...` `` and **must** pass `withCredentials: true`, since auth is cookie-based.
- Paginated slices keep `page` / `nextPage` / `hasNextPage` locally and **replace** the list when `page === 1`, otherwise append. Preserve this — dropping it reintroduces duplicated feed items.
- `@` aliases to `client/src` (configured in both `vite.config.js` and `jsconfig.json`).
- UI mixes shadcn/ui (Radix + Tailwind + CVA) with MUI. Prefer the existing shadcn primitives in `src/components/ui/` for new work.

## Known broken code — do not treat as intentional

Fix these if you touch the surrounding area; don't design around them.

- **No Express error-handling middleware exists.** `asyncHandler` calls `next(err)` but nothing serializes it. Express's default handler does honour `ApiError.statusCode`, so the status is correct, but the body is an **HTML stack trace** rather than an `ApiResponse` JSON payload — and it leaks absolute server file paths. Adding the middleware in `app.js` is the highest-impact fix available.
- **`req.SideBar("Authorization")`** in `server/src/middlewares/auth.middleware.js` (both functions) should be `req.header(...)`. A global "Header" → "SideBar" rename hit an Express API. This fires on **every** request that lacks the auth cookie: the `TypeError` is caught and rethrown as a 401 whose message is `req.SideBar is not a function`, so the intended "Unauthorized, Please Login First" never reaches the client. Confirmed live against a running server.
- **`updateProfile`** runs `User.find({ username })`; Mongoose strips `undefined`, so a bio-only edit queries `find({})`, matches everyone, and falsely throws "username already taken". It also matches the user's own record.
- **`getPostsByTag`** references an undefined `username` in its success message and throws at runtime.
- **`updatePost` and `removePostImage`** are empty bodies still wired to live routes, so those requests hang without responding.
- **`deletePost` in `client/src/store/slices/post-slice.js`** POSTs to the create-post endpoint (copy-paste leftover).
- `Comment.author` is missing `ref: "User"`; `getLoggedInUserOrIgnore` reads `decodedToken.token` instead of `.id`; the `Repost` model and router are stubs with no controller.

## Naming gotcha

On the **client**, shadcn's `DialogHeader` was renamed to `DialogSideBar` throughout. It is self-consistent (the export in `ui/dialog.jsx` matches every import), so leave it alone unless doing a deliberate repo-wide rename. Only the server's `req.SideBar` is an actual bug.
