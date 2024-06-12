const { Schema, models, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dh2xlutfu/image/upload/v1716844354/cooking/userImage_qeyh2w.png',
    },
    googleId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
