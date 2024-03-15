require("dotenv").config();
const app = require("./app.js");

//db connection
const connectDB = require("./src/db/connectDB.js");

//port
const port = process.env.PORT || 4000;

//importing routes
const authRoutes = require("./src/routes/authRoutes.js");
const passwordRoutes = require("./src/routes/passwordRoutes.js");
const postRoutes = require("./src/routes/postRoutes.js");
const commentRoutes = require("./src/routes/commentRoutes.js");
const likeRoutes = require("./src/routes/likeRoutes.js");

//middlewares
const logger = require("./src/middleware/loggerMiddleware.js");

//logger middleware
app.use(logger);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/like", likeRoutes);

//database connection
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("App error: " + err?.message);
    });

    app.listen(port, () => {
      console.log(`Server listening on ${port}\n`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed: ", err);
  });
