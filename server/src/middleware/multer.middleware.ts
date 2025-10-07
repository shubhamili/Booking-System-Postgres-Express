// import multer from "multer"

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })



import multer, { type StorageEngine } from "multer";
import type { Request } from "express";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req: Request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        console.log(file);
    },
    
});

export const upload = multer({ storage });
