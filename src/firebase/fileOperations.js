import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import firebase from "./firebaseInit";

const storage = firebase.storage;
const imageUploadToFirebase = async (image, folderName) => {
  // unique string ////
  const uniqueString = new Date().getTime().toString();
  // Combine the original file name with the unique string
  const uniqueFileName = `${uniqueString}_${image.name}`;
  // Create a storage reference............
  const imageRef = ref(storage, `${folderName}/${uniqueFileName}`);
  // Upload the file...............................
  const snapshot = await uploadBytes(imageRef, image);
  const imgUrl = await getDownloadURL(snapshot.ref);

  return imgUrl;
};

const imageDeleteFromFirebase = (imgUrl) => {
  // Create a storage reference
  const imageRef = ref(storage, imgUrl);
  // Delete the file
  return deleteObject(imageRef);
};

const deleteMultipleImagesFromFirebase = (imgUrls) => {
  let rsList = [];
  imgUrls.forEach((imgUrl) => {
    const imageRef = ref(storage, imgUrl);
    rsList.push(deleteObject(imageRef));
  });

  return rsList;

  // return imgUrls.map(imgUrl=>{

  //   const imageRef = ref(storage, imgUrl);

  //  return  deleteObject(imageRef);
  // });
};

export {
  imageUploadToFirebase,
  imageDeleteFromFirebase,
  deleteMultipleImagesFromFirebase,
};
