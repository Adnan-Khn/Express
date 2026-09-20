import crypto from "crypto"

const generateCode = () =>{
    let code = crypto.randomBytes(6).toString("base64").slice(0,6)
    //console.log(code)
    return code
}
export default generateCode