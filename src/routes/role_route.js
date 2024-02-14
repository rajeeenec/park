import express from "express";
const router = express.Router();

import { createrole } from "../controllers/role_controller.js";

router.post("/create", async (req, res) => {
  try {
    const role = await createrole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
export default router;
