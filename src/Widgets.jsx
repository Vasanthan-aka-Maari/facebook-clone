import React from "react";
import "./Widgets.css";

function Widgets() {
  return (
    <div className="widget">
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fjai.surya.3154284%2Fposts%2F1046353199120650%3A0&show_text=true&width=340&height=1500&appId"
        width="340"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Widgets;
