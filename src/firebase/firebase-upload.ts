import { storage, IMAGES_DB } from "./utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default async function upload(file: File): Promise<string> {
  const storageRef = ref(storage, `${IMAGES_DB}/${Date.now()} + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject("Something went wrong!" + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
