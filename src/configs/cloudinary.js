import { v2 as cloudinary } from "cloudinary";
import { envVar } from "../configs/env.vars.js";

// Configuration
cloudinary.config({
  cloud_name: envVar.cloudinary.name,
  api_key: envVar.cloudinary.apiKey,
  api_secret: envVar.cloudinary.apiSecret,
});

export default cloudinary;
