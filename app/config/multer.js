import multer from 'multer';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MINETYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, '../../uploads'),
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (MINETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${MINETYPES.join(', ')} mimetypes are allowed`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 3_000_000, 
  },
});

export default upload;
