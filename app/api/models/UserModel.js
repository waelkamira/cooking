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
      required: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dh2xlutfu/image/upload/v1716910329/bahiga_sqohf7.png',
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
