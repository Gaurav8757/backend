import multer from "multer";
import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// Get the directory name of the current module file
const currentModuleFile = fileURLToPath(import.meta.url);

import path from 'path';

// Define a function to filter files to only accept image files
const imageFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|gif|heic|pdf|docx|avif)$/;

  if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
    return cb(new Error("Only image, pdf, or docx files are allowed."), false);
  }

  cb(null, true);
};

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // Construct the upload path
    const uploadPath = path.join( 'F:/policy/backend/assets');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    // console.log(name);
    cb(null, name);
  },
});

const uploadFile = multer({
  storage: storageConfig,
  fileFilter: imageFilter,
})
.fields([
  { name: "empaadhar", maxCount: 1 },
  { name: "empaadharfile", maxCount: 1 },
  { name: "addpolicyimage", maxCount: 1 },
  { name: "addpolicylogo", maxCount: 1 },
  { name: "feedbackuser_upload", maxCount: 1 },
  { name: "comp_cfiles", maxCount: 1 },
  { name: "usercarousel_upload", maxCount: 1 },
]);
console.log(uploadFile.storage);
export default uploadFile;

