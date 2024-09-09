// @ts-ignore
import CryptoJSUtil from "crypto-js";

const SALT = process.env.SALT || "defaultSalt";

export function encrypt(text: string): string {
    return CryptoJSUtil.AES.encrypt(text, SALT).toString();
}

export function decrypt(cipherText: string): string {
    return CryptoJSUtil.AES.decrypt(cipherText, SALT).toString(CryptoJSUtil.enc.Utf8);
}