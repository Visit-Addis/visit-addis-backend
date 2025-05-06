import cloudinary from "../configs/cloudinary.js";
import fs from "fs";

const uploadImage = async (req, folder) => {
  let url = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
    });
    url = result.secure_url;
    fs.unlinkSync(req.file.path);
  }
  return url;
};

export default uploadImage;
