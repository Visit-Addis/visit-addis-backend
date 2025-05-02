import { uploadImage } from "../utils/index.js";
import { imgService } from "../services/index.js";

export const updloadAndSaveImge = async (req, folder) => {
  const url = await uploadImage(req, folder);
  if (url) {
    const imgeId = await imgService.saveImageUrl(url);
    req.body.images = imgeId;
  }
  return req.body;
};
