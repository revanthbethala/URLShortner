import express from "express";
import { connectDB } from "./config/db.js";
import { Log } from "./middleware/logger.js";
import urlRoutes from "./routes/url.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
connectDB();

const port = 3000;
app.get("/", (req, res) => {
  res.send("backend connected");
});

app.use("/", urlRoutes);
app.use("/", statsRoutes);

app.listen(port, () =>
  Log("backend", "info", "handler", `Server listening on ${port}`)
);
