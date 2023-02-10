import React, { useContext } from "react";
import { DisplayContext } from "../context/displayContext";
import Chats from "./chats";
import Navbar from "./navbar";
import Search from "./search";

const Sidebar = () => {
  const { data } = useContext(DisplayContext);
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
    </div>
  );
};

export default Sidebar;
