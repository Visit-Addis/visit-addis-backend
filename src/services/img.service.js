import { Image } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const saveImageUrl = async (url) => {
  const img = await Image.create({ url: url });
  if (!img) {
    throw new CustomError(400, "Failed to save image url", true);
  }
  return img.id;
};

const deleteImageUrl = async (id) => {
  const deletedImage = await Image.findByIdAndDelete(id);
  if (!deletedImage) {
    throw new CustomError(400, "failed to delete image", true);
  }
  return deletedImage.url;
};

export default { saveImageUrl, deleteImageUrl };
