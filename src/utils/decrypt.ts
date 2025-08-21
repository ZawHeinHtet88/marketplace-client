import CryptoJS from "crypto-js";


export const decryptAES = (encryptedBase64: string) => {

  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, "secret-key-123");
  if (decrypted) {
    try {
      const str = decrypted.toString(CryptoJS.enc.Utf8);
      console.log(JSON.parse(str));

      if (str.length > 0) {
        console.log("log",typeof str);
        
        return JSON.parse(str);
      } else {
        return "error 1";
      }
    } catch (e) {
      console.log(e);

      return "error 2";
    }
  }
  return "error 3";
};
