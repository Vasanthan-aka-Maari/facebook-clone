import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import StoryReel from "./StoryReel";
import Post from "./Post";
import { useStateValue } from "./StateProvider";
import db from "./firebase";

function Feed() {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);

  // function to fetch posts
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {posts.map(({ data }) => (
        <Post
          profilePic={data.profilePic}
          image={data.imageUrl}
          message={data.message}
          username={data.username}
          timestamp={data.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
