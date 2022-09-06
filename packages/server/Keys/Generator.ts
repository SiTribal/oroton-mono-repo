import rsa from 'node-rsa';
import fs from 'fs';


export const GeneratePair = () => {
    var key = new rsa().generateKeyPair();
    var publicKey = key.exportKey("public");
    var privateKey = key.exportKey("private")    

    fs.openSync("./Keys/public.pem", "w")
    fs.writeFileSync("./public.pem", publicKey, "utf8")

    fs.openSync("./Keys/private.pem", "w")
    fs.writeFileSync("./private.pem", privateKey, "utf8")
}
