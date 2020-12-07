import { Avatar } from "@material-ui/core";
import { InsertEmoticon, PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import "./MessageSender.css";
import { useStateValue } from "./StateProvider";
import db, { storage } from "./firebase";
import firebase from "firebase";

function MessageSender() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      if (image) {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
          "state_changed",
          () => {
            return;
          },
          (err) => {
            alert(err.message);
          },
          () => {
            storage
              .ref(`images`)
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("posts").add({
                  message: input,
                  imageUrl: url,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  username: user.displayName,
                  profilePic: user.photoURL,
                });
              });
          }
        );
      } else {
        db.collection("posts").add({
          message: input,
          imageUrl: null,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user.displayName,
          profilePic: user.photoURL,
        });
      }
    } else {
      alert("Invalid Post");
    }
    setInput("");
    setImage(null);
  };

  const imageSetter = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="messageSender">
      <div className="messageSender-top">
        <Avatar src={user.photoURL} />
        <form onSubmit={handleSubmit}>
          <input
            className="messageSender-input"
            placeholder={`What's on your mind ${user.displayName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={imageSetter}
            id="imageInput"
            hidden
          />
          <label htmlFor="imageInput">
            <PhotoLibrary style={{ color: "green" }} />
            <span>{image ? `${image.name}` : "Add Image"}</span>
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="messageSender-bottom">
        <div className="messageSender-option">
          <Videocam style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender-option">
          <PhotoLibrary style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender-option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
