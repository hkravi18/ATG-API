const { decrypt } = require("./handleEncryption");

const decryptContent = (docs) => {
  if (docs) {
    if (Array.isArray(docs)) {
      docs.forEach((d) => {
        if (d.content) {
          d.content = decrypt(d.content);
        }
      });
    } else {
      if (docs.content) {
        docs.content = decrypt(docs.content);
      }
    }
  }
  return docs;
};

module.exports = decryptContent;
