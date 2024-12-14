import upload from "../configs/uploadImg.js";
export const uploadImages = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
    
        const images = req.files.map(file => ({
          massage:"upload thành công",
          imageUrl: file.path,
          publicId: file.filename
        }));
    
        res.status(200).json({ images });
      });
};

