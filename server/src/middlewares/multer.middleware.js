import multer from "multer";

// explore more.....

const storage = multer.diskStorage({
    destination: function(req, file, cb){   // cb - CallBack function
        cb(null, './public/temp')    // file - has access to file coming
    },
    filename: function(req, file, cb){
        // console.log(file);
        cb(null, file.originalname) // update name of file to random character addition
    }
})

export const upload = multer({  // Storage methods - used as a middleware
    storage: storage
})