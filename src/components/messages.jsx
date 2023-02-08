import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import Message from "./message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser.uid || !data?.chatId) return;
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data()?.messages);
    });
    return () => unsub();
  }, [currentUser.uid, data.chatId]);

  return (
    <div className="messages">
      {messages &&
        messages.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
    </div>
  );
};

export default Messages;
