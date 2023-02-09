import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/chatContext";
import { DisplayContext } from "../context/displayContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(DisplayContext);

  return (
    <div className="chat">
      {data?.user && (
        <div className="chatInfo">
          <span>{data.user?.name}</span>
          <div className="chatIcons">
            <img src={Cam} alt="" />
            <img
              src={Add}
              alt=""
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            />
            <img src={More} alt="" />
          </div>
        </div>
      )}
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
