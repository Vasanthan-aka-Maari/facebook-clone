import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SendIcon from "@material-ui/icons/Send";
import db from "./firebase";
import firebase from "firebase";

function Post({ profilePic, image, username, timestamp, message, postId }) {
  const [writeComment, setWriteComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // function to add comment
  const commentHandler = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      username,
      comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  // function to fetch comment
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
  }, [postId]);

  return (
    <div className="post">
      <div className="post-top">
        <Avatar src={profilePic} className="post-avatar" />
        <div className="post-topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post-bottom">
        <p>{message}</p>
      </div>
      <div className="post-image">
        <img src={image} alt="" />
      </div>
      <div className="post-options">
        <div className="post-option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div
          onClick={() => setWriteComment(!writeComment)}
          className="post-option"
        >
          <ChatBubbleIcon />
          <p>Comment</p>
        </div>
        <div className="post-option">
          <ShareIcon />
          <p>Share</p>
        </div>
      </div>
      {writeComment && (
        <div className="comment-section">
          <form className="comment-box" onSubmit={commentHandler}>
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Write a comment..."
              type="text"
            />
            <Button
              disabled={!comment}
              className="comment-button"
              type="submit"
            >
              <SendIcon />
            </Button>
          </form>
          {comments?.map(({ username, comment }) => (
            <p className="comment">
              <strong>{username}</strong> {comment}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
