import { Router } from "express";
import { uploadImages } from "../controllers/images.js";

const routerImages = Router();
routerImages.post("/upload", uploadImages);
export default routerImages;