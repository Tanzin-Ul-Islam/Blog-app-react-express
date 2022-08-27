const multer = require('multer');
const path = require('path')

function MulterHelper(folderName) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/' + folderName));
        }, filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })

    let upload = multer({ storage: storage });
    return upload;
}




module.exports = MulterHelper; 