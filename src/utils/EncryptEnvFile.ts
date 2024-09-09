// @ts-ignore
import CryptoJSUtil from "crypto-js";
// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";

const SALT = process.env.SALT || "defaultSalt";

const getEnvFilePath = (): string => {
    const srcDir = path.resolve(__dirname, "..");
    const configDir = path.resolve(srcDir, "config");
    let envFilePath = `${configDir}\\.env`;
    
    if(process.env.NODE_ENV)
        envFilePath = `${envFilePath}.${process.env.NODE_ENV}`

    return envFilePath;
}

const envFilePath = getEnvFilePath();

console.log(envFilePath);

export function encryptEnvFile() {
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const contentArray = envFileContent.split("\n");

    const encryptedEnvLines = contentArray.map(line => {
        const [key, value] = line.split("=");

        if(value) {
            const encryptValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptValue}`;
        }
    });

    const encryptedEnvFileContent = encryptedEnvLines.join("\n");
    fs.writeFileSync(envFilePath, encryptedEnvFileContent, "utf8");

    console.log("Encryption completed.");
}


export function decryptEnvFile() {
    const encryptedEnvFileContent = fs.readFileSync(envFilePath, "utf8");
    const encryptedEnvLines = encryptedEnvFileContent.split("\n");

    const decryptedEnvLines = encryptedEnvLines.map(line => {
        const [key, value] = line.split("=");

        if(value) {
            const decryptedValue = CryptoJSUtil.AES.decrypt(value, SALT).toString(CryptoJSUtil.enc.Utf8);
            return `${key}=${decryptedValue}`;
        }
    });

    const decryptedEnvFileContent = decryptedEnvLines.join("\n");
    fs.writeFileSync(envFilePath, decryptedEnvFileContent, "utf8");

    console.log("Decryption completed.");
}

