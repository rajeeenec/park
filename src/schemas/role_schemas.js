import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  role_name: { type: String, required: true },
  role_id: { type: String, required: true },
  status: { type: Boolean },
  created_at: { type: Date },
  updated_at: { type: Date },
});

export default model("Role", roleSchema);
