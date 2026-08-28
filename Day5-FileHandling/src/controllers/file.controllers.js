
const filePost = (req,res) =>{
    const body = req.body
    const file = req.file
    console.log(body,file)
    try{
        res.status(200).json({
            message : "File posted"
        })
    }catch(err){
        res.status(500).json({
            message:"Error in posting file"
        })
    }
}

module.exports = {filePost}