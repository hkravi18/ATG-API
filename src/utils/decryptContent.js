const { decrypt } = require("./handleEncryption");

const decryptContent = (docs) => {
  const decryptDoc = (doc) => {
    if (doc.content) {
      doc.content = decrypt(doc.content);
    }
    if (doc?.postId?.content) {
      doc.postId.content = decrypt(doc.postId.content);
    }
  };

  if (Array.isArray(docs)) {
    return docs.map((doc) => {
      const plainDoc = doc.toObject ? doc.toObject() : doc;
      decryptDoc(plainDoc);
      return plainDoc;
    });
  } else {
    const plainDoc = docs.toObject ? docs.toObject() : docs;
    decryptDoc(plainDoc);
    return plainDoc;
  }
};

module.exports = decryptContent;
