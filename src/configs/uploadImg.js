
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "./cloudinaryConfig.js";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'flower', // Tên thư mục bạn muốn lưu trữ ảnh trên Cloudinary
      allowed_formats: ['jpg', 'png'],
    },
  });
  const upload = multer({ storage: storage }).array('images',30);

export default upload