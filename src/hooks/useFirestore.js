import { useState, useEffect } from "react";
import { db } from "firebase.js";

// import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      //   .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  // const currentUser = useAuth().currentUser;
  // const todosRef = collection(db, "todos");

  // const fetchTodos = async () => {
  //   const q = query(todosRef, where("uid", "==", currentUser.uid));

  //   const querySnapshot = await getDocs(q);
  //   let todosArray = [];

  //   querySnapshot.forEach((doc) => {
  //     todosArray.push(doc.data());
  //   });
  //   setTodosList(todosArray);
  // };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  return { docs };
};

export default useFirestore;
