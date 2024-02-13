import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect } from "mongoose";
import userRoutes from "./src/routes/user_route.js";

const app = express();

// Connect to MongoDB
connect("mongodb://localhost:27017/park", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(json());

// Routes
app.use("/api", userRoutes);

// Start the server
const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
