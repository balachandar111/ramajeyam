require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queryRoutes");

const app = express();

connectDB();

// Explicit origins from env (comma separated), e.g.
// CLIENT_ORIGIN=https://ramajeyam.vercel.app,https://your-custom-domain.com
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, "")) // trim whitespace AND any trailing slash
  .filter(Boolean);

const isDev = (process.env.NODE_ENV || "development") !== "production";

// Matches http://localhost:PORT or http://127.0.0.1:PORT for any port (dev only).
const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

app.use(
  cors({
    origin(origin, callback) {
      // requests with no origin (curl, server-to-server, mobile apps, Postman)
      if (!origin) return callback(null, true);

      // normalize incoming origin the same way (strip trailing slash) before comparing
      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) return callback(null, true);

      if (isDev && localhostRegex.test(normalizedOrigin)) return callback(null, true);

      console.warn(
        `Blocked by CORS. Incoming origin: "${origin}" | Allowed list: [${allowedOrigins.join(
          ", "
        )}]`
      );
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

// Ensure preflight (OPTIONS) requests are answered for every route, not just
// ones that happen to be hit after routing logic runs.
app.options("*", cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ramajeyam-chatbot-backend" });
});

app.use("/api/queries", queryRoutes);

// Catch CORS errors thrown by the origin callback above and return a clean
// 403 instead of an unhandled 500, so real errors are easier to spot in logs.
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes("not allowed by CORS")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  return next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `CORS: allowing [${allowedOrigins.join(", ")}]${
      isDev ? " + any localhost/127.0.0.1 origin (dev mode)" : ""
    }`
  );
});