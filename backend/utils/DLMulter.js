import multer from 'multer';
import path from 'path';

// Configure storage options for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// File type validation
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Initialize upload with specified settings
const DLUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Middleware for handling multiple file uploads
const DLUploadMultipleFiles = DLUpload.fields([
    { name: 'idCardPhoto', maxCount: 1 },
    { name: 'licensePhoto', maxCount: 1 },
    { name: 'personalPhoto', maxCount: 1 },
]);

export { DLUploadMultipleFiles };
