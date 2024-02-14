import express from "express";
const router = express.Router();

import { getUser, createUser } from "../controllers/user_controller.js";

router.get("/list", async (req, res) => {
  try {
    const user = await getUser();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
