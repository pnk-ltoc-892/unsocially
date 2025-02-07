import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: [process.env.CORS_ORIGIN_LOCAL, process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2, process.env.CORS_ORIGIN_3],
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.use(cookieParser())

// Routes
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'
import likeRouter from './routes/like.routes.js'
import followRouter from './routes/follow.routes.js'
import repostRouter from './routes/repost.routes.js'
import bookmarkRouter from './routes/bookmark.routes.js'


// Routes Declaration for Version 1

app.use("/api/v1/user", userRouter);

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/reposts", repostRouter);

app.use("/api/v1/comments", commentRouter);

app.use("/api/v1/follow", followRouter);

app.use("/api/v1/like", likeRouter);

app.use("/api/v1/bookmarks", bookmarkRouter);

// Server - Check
app.get("/api/v1/", (req, res) => {
    res.status(200).json({ message: "Server is running !" });
});


export { app }