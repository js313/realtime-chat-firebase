import { getAuth, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="logo">Lama chat</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            const auth = getAuth();
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
