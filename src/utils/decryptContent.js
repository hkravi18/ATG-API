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

// const decryptContent = async (docs) => {
//   if (docs) {
//     let plainDocs = docs;
//     if (Array.isArray(docs)) {
//       plainDocs = docs.toObject();
//       plainDocs.forEach((d) => {
//         if (d.content) {
//           d.content = decrypt(d.content);
//         }
//         if (d?.postId?.content) {
//           d.postId.content = decrypt(d?.postId?.content);
//         }
//       });
//     } else {
//       plainDocs = docs.toObject();
//       if (plainDocs.content) {
//         plainDocs.content = decrypt(plainDocs.content);
//       }
//     }
//     return plainDocs;
//   }
//   return docs;
// };

module.exports = decryptContent;
