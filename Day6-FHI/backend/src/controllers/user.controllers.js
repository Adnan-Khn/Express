const createUser = (req, res) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
    
//   req.files.forEach((file)=>{
//     console.log("File name:", file.originalname);
//     console.log("Mimetype:", file.mimetype);
//     console.log("Size:", file.size);
//     console.log("Buffer:", file.buffer);
//   })
  res.send("Got it");
};

module.exports = { createUser };
