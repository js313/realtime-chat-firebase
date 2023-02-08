import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const owner = message.senderId === currentUser.uid;

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`message ${owner ? "owner" : ""}`} ref={ref}>
      <div className="messageInfo">
        <img
          src={owner ? currentUser.photoURL : data.user.photoURL}
          alt={owner ? currentUser.displayName : data.user.name}
        />
        <span>
          {new Date(message.date.seconds * 1000).toLocaleDateString()}
        </span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.image && <img src={message.image} alt={message.text} />}
      </div>
    </div>
  );
};

export default Message;
