import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      trim: true
    },
    location: {
      city: String,
      country: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere"
      }
    },
    socialMedia: {
      twitter: String,
      instagram: String,
      facebook: String,
      linkedIn: String
    },
    preferences: {
      language: {
        type: String,
        default: "en"
      },
      notificationSettings: {
        email: {
          type: Boolean,
          default: true
        },
        push: {
          type: Boolean,
          default: true
        }
      },
      dietaryRestrictions: [String]
    },
    stats: {
      attractionsVisited: {
        type: Number,
        default: 0
      },
      eventsAttended: {
        type: Number,
        default: 0
      },
      restaurantsReviewed: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster querying
profileSchema.index({ user: 1 });

// Auto-create profile when user is created
profileSchema.statics.createForUser = async function(userId) {
  return this.create({ user: userId });
};

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;