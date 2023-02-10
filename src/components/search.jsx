import React, { useContext, useState } from "react";
import {
  collection,
  query,
  getFirestore,
  getDocs,
  orderBy,
  startAt,
  endAt,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import { DisplayContext } from "../context/displayContext";
import { ChatContext } from "../context/chatContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch: chatDispatch } = useContext(ChatContext);
  const { dispatch } = useContext(DisplayContext);

  const searchUser = async () => {
    try {
      const db = getFirestore();
      const q = query(
        collection(db, "users"),
        orderBy("name"),
        startAt(userName),
        endAt(userName + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      let searchUsers = [];
      querySnapshot.forEach((snapshot) => {
        searchUsers.push(snapshot.data());
      });
      setUsers(searchUsers);
    } catch (err) {
      setErr(true);
    }
  };
  const handleKeyDown = async (event) => {
    if (event.code === "Enter") {
      setErr(false);
      if (userName === "") {
        setUsers([]);
        return;
      }
      searchUser();
    }
  };

  const handleSelect = (user) => {
    return async () => {
      try {
        const db = getFirestore();
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid; //condition to make it searchable from both ends
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              name: user.name,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
        chatDispatch({ type: "CHANGE_USER", payload: user });
        dispatch({ type: "TOGGLE_SIDEBAR" });
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          name=""
          id=""
          placeholder="Find a user"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>
      {err && <span style={{ color: "red" }}>User not found!</span>}
      {!err &&
        users.map((user) => {
          if (user.uid === currentUser.uid) return <div key={user.uid}></div>;
          return (
            <div
              key={user.uid}
              className="userChat"
              onClick={handleSelect(user)}
            >
              <img src={user.photoURL} alt={user.name} />
              <div className="userChatInfo">
                <span>{user.name}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Search;
