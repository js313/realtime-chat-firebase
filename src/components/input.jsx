import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import {
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Input = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const db = getFirestore();
    setError(false);
    const text = message.trim();
    if (
      (!text && !image) ||
      (!data.chatId && Object.keys(data.user).length === 0)
    )
      return;
    try {
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, Date.now().toString());

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          (error) => {
            setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    image: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId + ".lastMessage"]: {
          text,
        },
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId + ".lastMessage"]: {
          text,
        },
      });
      setMessage("");
      setImage(null);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div
      className="input"
      style={{
        display:
          data.chatId && Object.keys(data.user).length > 0 ? "flex" : "none",
      }}
    >
      {error && <span style={{ color: "red" }}>Something went wrong!</span>}
      <input
        type="text"
        name=""
        id=""
        value={message}
        placeholder="Type Something..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <div className="send">
        <img src={Img} alt="" />
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name=""
          id="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
