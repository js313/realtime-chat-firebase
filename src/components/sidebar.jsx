import React, { useContext } from "react";
import { DisplayContext } from "../context/displayContext";
import Chats from "./chats";
import Navbar from "./navbar";
import Search from "./search";
import Close from "../img/close.png";

const Sidebar = () => {
  const { data, dispatch } = useContext(DisplayContext);
  return (
    <div
      className="sidebar"
      style={{
        flex: data.sidebar,
      }}
    >
      <Navbar />
      <Search />
      <Chats />
      {window.innerWidth < 600 && (
        <img
          id="close"
          src={Close}
          alt=""
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        />
      )}
    </div>
  );
};

export default Sidebar;
