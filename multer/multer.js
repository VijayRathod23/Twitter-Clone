const multer = require('multer');
const path = require('path');
const storageTweet = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload2 = multer({ storage: storageTweet });


//profile storage
const profile_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profiles')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));

    }
})
const upload = multer({ storage: profile_storage });

module.exports ={upload2,upload}