const CryptoJS = require("crypto-js");
const encryptionKey = process.env.ENCRYPTION_KEY;

//Encrypt
const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

//Decrypt
const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      console.log("Failed to decrypt or data is empty.");
      return null;
    }
    return decryptedData;
  } catch (error) {
    console.error(`ERROR (decryption): ${err.message}`);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
