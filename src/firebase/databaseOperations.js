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
  arrayUnion,
  writeBatch,
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

// const updateDocument = async (collName, docId, data) => {
//   try {
//     await updateDoc(doc(db, collName, docId), data);
//     return { didSucceed: true };
//   } catch (error) {
//     console.error("Error updating document:", error);
//     return { didSucceed: false };
//   }
// };

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
// const getSingleDocByFieldName = async (cln, value) => {
//   try {
//     const qr = query(
//       collection(db, cln),
//       where("userID", "==", value),
//       orderBy("createdAt", "desc")
//     );
//     const docSnap = await getDocs(qr);

//     if (!docSnap.empty) {
//       let item = {};
//       docSnap.forEach((doc) => {
//         item = { ...doc.data(), id: doc.id };
//       });

//       return {
//         didSucceed: true,
//         document: item,
//       };
//     } else {
//       return { didSucceed: false, document: null };
//     }
//   } catch (error) {
//    // console.log("Indexing abra:...", error); // querring indexing
//     return { didSucceed: false, document: null };
//   }
// };

//Featured Tours.....................................................
const fetchFeaturedTours = async () => {
  let items = [];
  try {
    const qr = query(
      collection(db, "tour-packages"),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(qr);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots.......
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });
    return { didSucceed: true, items };
  } catch (error) {
    return { didSucceed: false, items };
  }
};

//doc get by matchihng a  multiple fields that are just a strings . eg. title,.........................
// Function to create a Firestore query with dynamic where clauses
const createDynamicQuery = (db, collectionName, filters,orderByData) => {
  let q = collection(db, collectionName);

  filters.forEach(filter => {
    q = query(q, where(filter.fieldName, "==", filter.value));
  });

  // Add orderBy clause if needed
  q = query(q, orderBy(orderByData.fieldName, orderByData.value));
  return q;
};


//returns single data
const getSingleDocByFieldName = async (
  cln,
  userFilters,
  orderByData
) => {
  try {
    // Usage

    const qr = createDynamicQuery(db, cln, userFilters, orderByData);

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
    
    return { didSucceed: false, document: null };
  }
};


// returns Multiple data
const getMultipleDocsByFieldNames = async (cln, userFilters, orderByData) => {
  try {
    // Usage

    const qr = createDynamicQuery(db, cln, userFilters, orderByData);

    const docSnap = await getDocs(qr);

    if (!docSnap.empty) {
      let item = {};
      let itemsArrary = [];
      docSnap.forEach((doc) => {
        item = { ...doc.data(), id: doc.id };
        itemsArrary = [...itemsArrary, item];
      });

      return {
        didSucceed: true,
        documents: itemsArrary,
      };
    } else {
      return { didSucceed: false, documents: null };
    }
  } catch (error) {
    console.log("error", error);
    return { didSucceed: false, documents: null };
  }
};


//doc get by matchihng a  single field that is just a string . eg. title,.........................
const getSingleUser = async (cln, value) => {
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

// function is implemented correctly to update the array in the Firestore document.
const updateDocumentArray = async (
  collection,
  docId,
  arrayField,
  newElement
) => {
  try {
    const docRef = doc(db, collection, docId);
    await updateDoc(docRef, {
      [arrayField]: arrayUnion(newElement),
    });
    return { didSucceed: true };
  } catch (error) {
    console.error("Error updating document array: ", error);
    return { didSucceed: false, message: error.message };
  }
};

export const updateDocumentArrayOrg = async (
  collection,
  documentId,
  updateData
) => {
  try {
    const docRef = doc(db, collection, documentId);
    await updateDoc(docRef, updateData); // Perform the update with dynamic paths
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document array: ", error);
    throw error;
  }
};

const batchUpdateDocuments = async (updates) => {
  const batch = writeBatch(db);
  try {
    updates.forEach(({ collName, docId, data }) => {
      const docRef = doc(db, collName, docId);
      batch.update(docRef, data);
    });

    await batch.commit();
    return { didSucceed: true };
  } catch (error) {
    console.error("Error batch updating documents:", error);
    return { didSucceed: false };
  }
};

const fetchDocumentsPagination = async (collName, lastVisible = null, limit = 10) => {
  let items = [];
  try {
    let docsQuery = query(
      collection(db, collName),
      orderBy("createdAt", "desc"),
      limit(limit)
    );

    if (lastVisible) {
      docsQuery = query(docsQuery, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(docsQuery);
    querySnapshot.forEach((doc) => {
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { didSucceed: true, items, lastDoc };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { didSucceed: false, items: [] };
  }
};

//filter tours.......................................................
const getFilteredTours = async (cln, searchOptions) => {
  let items = [];
  try {
    // Function to fetch tours based on multiple filters.......................

    let tourQuery = collection(db, cln);

    // Apply filters...........................................................

    //tour focus...............................................
    if (searchOptions.focus !== undefined && searchOptions.focus !== "") {
      tourQuery = query(tourQuery, where("focus", "==", searchOptions.focus));
    }
    //.........................................................

    if (searchOptions.duration !== undefined && searchOptions.duration !== "") {
      const minValue = searchOptions.duration.value[0];
      const maxValue = searchOptions.duration.value[1];

      tourQuery = query(
        tourQuery,
        where("durationTitle", "==", searchOptions.duration.durationTitle),
        where("duration", ">=", parseInt(minValue)),
        where("duration", "<=", parseInt(maxValue))
      );
    }

    //when........................................
    if (searchOptions.months !== undefined && searchOptions.months !== "") {
      tourQuery = query(
        tourQuery,
        where("availability", "array-contains-any", [
          parseInt(searchOptions.months[0]),
          parseInt(searchOptions.months[1]),
        ])
      );
    }

    tourQuery = query(tourQuery, orderBy("createdAt", "desc"));
    //get docs....
    const querySnapshot = await getDocs(tourQuery);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const item = { ...doc.data(), id: doc.id };
      items.push(item);
    });

    //destination(done after docs have been fetched)..............................
    if (
      searchOptions.destination !== undefined &&
      searchOptions.destination !== "" &&
      items.length > 0
    ) {
      let filteredTours = [];
      //iterating through tours array
      items.forEach((item) => {
        const hasDestination = item.itinerary.some(
          (itn) => itn.destination == searchOptions.destination
        );
        if (hasDestination) {
          filteredTours.push(item);
        }
      });

      items = [...filteredTours];
    }

    return { didSucceed: true, items };
  } catch (error) {
    console.log("ahahah", error);
    return { didSucceed: false, items };
  }
};
//end of filter tours................................


export {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument,
  fetchFeaturedTours,
  getFilteredTours,
  getSingleDocument,
  getSingleDocByFieldName,
  getSingleDocByFieldNameOrg,
 // updateDocumentArrayOrg,
  updateDocumentArray,
  batchUpdateDocuments,
  fetchDocumentsPagination,
  getSingleUser,
  getMultipleDocsByFieldNames,
};
