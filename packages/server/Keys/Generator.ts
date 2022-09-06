import rsa from 'node-rsa';
import fs from 'fs';


export const GeneratePair = () => {
    var key = new rsa().generateKeyPair();
    var publicKey = key.exportKey("public");
    var privateKey = key.exportKey("private")    

    console.log(publicKey)
    console.log(privateKey)

    fs.openSync("./public.pem", "w")
    fs.writeFileSync("./public.pem", publicKey, "utf8")

    fs.openSync("./private.pem", "w")
    fs.writeFileSync("./private.pem", privateKey, "utf8")
}
