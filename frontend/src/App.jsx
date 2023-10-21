import { useState, useEffect } from "react";
import LogIn from "./components/LogIn";
import Blog from "./components/Blog";
import Blogservice from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Blogservice.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();
    console.log("logging credentials:");
    console.log("username:", username);
    console.log("password:", password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (exception) {
      throw new Error("wrong credentials");
    }
  };

  if (user === null) {
    return (
      <LogIn
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
