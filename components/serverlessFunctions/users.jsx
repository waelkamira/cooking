// /api/users.js
import mongoose from 'mongoose';
import { User } from '../../app/api/models/UserModel';

const uri = process.env.NEXT_PUBLIC_MONGODB; // Environment variable for users DB

export default async function handler(req, res) {
  try {
    // Connect to users database using Mongoose
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Perform your database operations here (e.g., find users)
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  } finally {
    // Close connection after use (important)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}
