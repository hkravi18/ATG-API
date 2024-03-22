const CryptoJS = require("crypto-js");
const encryptionKey = process.env.ENCRYPTION_KEY;

// Encrypt
const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey);
  return encryptedData;
};

// Decrypt
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

module.exports = {
  encrypt,
  decrypt,
};
