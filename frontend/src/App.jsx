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
    const getUser = window.localStorage.getItem("user");
    console.log(getUser);
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);

  useEffect(() => {
    Blogservice.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async () => {
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
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (exception) {
      throw new Error("wrong credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  if (user === null) {
    return (
      <LogIn
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>
        {user.name} logged in <button onClick={handleLogout}>Log out</button>
      </h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
