import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { DisplayContext } from "../context/displayContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { dispatch: displayDispatch } = useContext(DisplayContext);

  useEffect(() => {
    if (!currentUser.uid) return;
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(
        Object.entries(doc.data()).sort((c1, c2) => {
          return c2[1].date - c1[1].date;
        })
      );
    });
    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    displayDispatch({ type: "TOGGLE_SIDEBAR" });
  };
  console.log(chats);

  return (
    <div className="chats">
      {chats &&
        chats.length > 0 &&
        chats.map((chat) => {
          return (
            <div
              key={chat[0]}
              className="userChat"
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                src={chat[1].userInfo.photoURL}
                alt={chat[1].userInfo.name}
              />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.name}</span>
                <p>{chat[1].lastMessage?.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
