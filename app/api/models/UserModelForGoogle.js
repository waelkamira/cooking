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

    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dh2xlutfu/image/upload/v1716844354/cooking/userImage_qeyh2w.png',
    },
  },
  { timestamps: true }
);

export const GoogleUser = models?.GoogleUser || model('GoogleUser', UserSchema);
