import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser.uid) return;
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });
    return () => {
      unsub();
    };
  }, [currentUser.uid]);
  return (
    <div className="chats">
      {console.log(chats) &&
        chats.map((chat) => {
          return;
        })}
    </div>
  );
};

export default Chats;
