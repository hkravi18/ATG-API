const CryptoJS = require("crypto-js");
const encryptionKey = process.env.ENCRYPTION_KEY;

// Encrypt
const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

// // Decrypt
// const decrypt = (data) => {
//   const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
//   const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//   return decryptedData;
// };

const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log(`data: ${data}, decryptedData: ${decryptedData}`);
    if (!decryptedData) {
      throw new Error("Failed to decrypt or data is empty.");
    }
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error.message);
    return null; // Or handle this case as you see fit
  }
};
module.exports = {
  encrypt,
  decrypt,
};
