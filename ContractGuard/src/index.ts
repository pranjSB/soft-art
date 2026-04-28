import "dotenv/config";
import express from "express";
import schemaRoutes from "./routes/schemaRoutes";

const app = express();

// middleware
app.use(express.json());

// tests route (sanity check)
app.get("/", (req, res) => {
  res.send("Server is working");
});

// mounts routes
app.use("/", schemaRoutes);

// starts server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});