import bcrypt from "bcryptjs";
import { CustomError, logError } from "../utils/index.js";

const format = (schema, option) => {
  let existingTransform = null;
  if (schema.options[option] && schema.options[option].transform) {
    existingTransform = schema.options[option].transform;
  }
  schema.set(option, {
    transform: (doc, ret) => {
      if (ret.password) {
        delete ret.password;
      }
      delete ret.createdAt;
      delete ret.updatedAt;
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      if (existingTransform) {
        return existingTransform(doc, ret);
      }
      return ret;
    },
  });
};

const isEmailUsed = (schema) => {
  schema.statics.isEmailUsed = async function (email) {
    try {
      return !!(await this.findOne({ email: email }));
    } catch (error) {
      logError(error);
      throw new CustomError(400, `Your Email is used `, true);
    }
  };
};

const isUserNameUsed = (schema) => {
  schema.statics.isUserNameUsed = async function (userName) {
    try {
      return !!(await this.findOne({ userName: userName }));
    } catch (error) {
      logError(error);
      throw new CustomError(400, `Your user name is used `, true);
    }
  };
};

const verifyPassword = (schema) => {
  schema.methods.verifyPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      logError(error);
      throw new CustomError(403, `password checking failed`, true);
    }
  };
};
const verifyEmail = (schema) => {
  schema.methods.verifyEmail = async function (email) {
    try {
      if ((await this.email) === email) {
        this.isVerified = true;
        await this.save();
      }
      return this.isVerified;
    } catch (error) {
      logError(error);
      throw new CustomError(403, `email checking failed`, true);
    }
  };
};

export { format, isEmailUsed, verifyPassword, verifyEmail, isUserNameUsed };
