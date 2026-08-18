console.log("HTTP method jb user krte h")
const http = require("http");

let server = http.createServer((req,res)=>{
    if(req.url==="")
        res.end("Server running now")
    if(req.url==="/users")
        res.end("Users me hu")
    if(req.url==="/cart")
        res.end("Cart me hu")
    else
        res.end("Invalid URL ")
    
})

server.listen(3000,()=>{
    console.log("Yuuuuuhuuuuu")
})