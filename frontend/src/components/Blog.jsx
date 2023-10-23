import { useState } from "react";
import "../index.css";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px",
    marginBottom: 5,
  };

  const showBlogInfo = () => {
    if (showDetails) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            like {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      );
    }
  };

  return (
    <div style={blogStyle}>
      {" "}
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
        {showBlogInfo()}
      </div>
    </div>
  );
};

export default Blog;
