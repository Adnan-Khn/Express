
import { ImageKit, toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config()

const client = new ImageKit({
    //url: process.env.IK_URL,
    //publicKey : process.env.IK_PUBLIC_KEY,
    privateKey : process.env.IK_PRIVATE_KEY
})

export const sendFiles = async(file,fileName)=>{
    const uploadFile = await toFile(file, fileName)

    const obj = {
        file:uploadFile,
        fileName,
        folder : "/posts"
    }
    const res = await client.files.upload(obj)
    console.log("Response by ImageKit",res)
    return res
}