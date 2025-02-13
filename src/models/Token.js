// models/Token.js
import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // Borra automáticamente el documento cuando expire
  }
});

export default model('Token', tokenSchema);