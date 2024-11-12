import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import firebase from "./firebaseInit";

const { db } = firebase;

const createDocument = async (data, collName) => {
  try {
    const docRef = await addDoc(collection(db, collName), data);
    return { didSucceed: true, docId: docRef.id };
  } catch (error) {
    console.error("Error creating document:", error);
    return { didSucceed: false, message: "Failed to create document." };
  }
};

const fetchDocuments = async (collName) => {
  let items = [];
  try {
    const docsQuery = query(
      collection(db, collName),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(docsQuery);

    querySnapshot.forEach((doc) => {
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });

    return { didSucceed: true, items };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { didSucceed: false, items: [] };
  }
};

const updateDocument = async (collName, docId, data) => {
  try {
    await updateDoc(doc(db, collName, docId), data);
    return { didSucceed: true };
  } catch (error) {
    console.error("Error updating document:", error);
    return { didSucceed: false };
  }
};

const deleteDocument = async (collName, docId) => {
  try {
    await deleteDoc(doc(db, collName, docId));
    return { didSucceed: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { didSucceed: false };
  }
};

const getSingleDocument = async (collName, docId) => {
  try {
    const docSnap = await getDoc(doc(db, collName, docId));

    if (docSnap.exists()) {
      return { didSucceed: true, document: docSnap.data() };
    } else {
      return { didSucceed: false };
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return { didSucceed: false };
  }
};

//doc get by matchihng a  single field that is just a string . eg. title,.........................
const getSingleDocByFieldName = async (cln, value) => {
  try {
    const qr = query(
      collection(db, cln),
      where("userID", "==", value),
      orderBy("createdAt", "desc")
    );
    const docSnap = await getDocs(qr);

    if (!docSnap.empty) {
      let item = {};
      docSnap.forEach((doc) => {
        item = { ...doc.data(), id: doc.id };
      });

      return {
        didSucceed: true,
        document: item,
      };
    } else {
      return { didSucceed: false, document: null };
    }
  } catch (error) {
   // console.log("Indexing abra:...", error); // querring indexing
    return { didSucceed: false, document: null };
  }
};

const getSingleDocByFieldNameOrg = async (cln, fieldName, fieldValue) => {
  try {
    const qr = query(collection(db, cln), where(fieldName, "==", fieldValue));
    const docSnap = await getDocs(qr);

    if (!docSnap.empty) {
      let item = {};
      docSnap.forEach((doc) => {
        item = { ...doc.data(), id: doc.id };
      });

      return {
        didSucceed: true,
        document: item,
      };
    } else {
      return { didSucceed: false, document: null };
    }
  } catch (error) {
    console.error("Error querying document by field:", error);
    return { didSucceed: false, document: null };
  }
};

export {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument,
  getSingleDocument,
  getSingleDocByFieldName,
  getSingleDocByFieldNameOrg,
};
