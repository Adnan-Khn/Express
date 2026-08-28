const multer = require("multer")

//for local storage 
// const storage = multer.diskStorage({
//     //destination decide krti h ki file kis folder me jaane wali h 
//     //req mtlb jo api aari h
//     //file mtlb jo file hmlog denge body me kyuki abki json data ni rhega
//   destination: (req, file, cb) => {
//     //cb do chiz leta h. i>error , ii>tmhare files ko kidhr rhna h
//     //cb(error,destination)
//     cb(null,"uploads/")
//   },

//   //file name decide krti h kis naam se jaane wali h
//   filename: (req, file, cb) => {
//     //cb(error, and filename)
//     cb(null,Date.now() + file.originalname)
//   },
// });

//for server storage
const storage = multer.memoryStorage()
//multer ki saari functionality hmne upload ko de diya
const upload = multer({storage})

module.exports = upload
