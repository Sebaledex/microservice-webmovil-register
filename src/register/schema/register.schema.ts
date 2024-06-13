import * as mongoose from 'mongoose';

export const RegisterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    //registerDate: { type: Date, required: true },
    //users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    users: [{ type: Object, required: true }],
    //users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true },
);
