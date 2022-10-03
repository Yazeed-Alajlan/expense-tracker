import { useState, useEffect } from "react";
import { db } from "firebase.js";
import { useAuth } from "contexts/AuthContext";
import { icons } from "data/Data";

const useFirestore = (collection) => {
  const currentUser = useAuth().currentUser;

  const [docs, setDocs] = useState([]);

  // const [data, setData] = useState([]);
  // const getData = async () => {
  //   await db
  //     .collection(collection)
  //     .get()
  //     .then((querySnapshot) => {
  //       // Loop through the data and store
  //       // it in array to display
  //       querySnapshot.forEach((element) => {
  //         if (element.data().uid === currentUser.uid)
  //           setData((arr) => [...arr, element.data()]);
  //       });
  //     });
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      // .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          if (doc.data().uid === currentUser.uid)
            documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [currentUser]);

  if (collection === "categories") {
    docs.forEach((category) => {
      // category.icon = <FaTshirt />;
      icons.map((icon) => {
        if (icon.iconName === category.iconName) {
          category.icon = icon.icon;
          return;
        }
      });
    });
  }

  return { docs };
};

export default useFirestore;
