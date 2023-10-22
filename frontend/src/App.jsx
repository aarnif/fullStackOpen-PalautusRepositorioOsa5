import { useState, useEffect } from "react";
import LogIn from "./components/LogIn";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogservice from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const successMessageType = "success";
  const errorMessageType = "error";

  useEffect(() => {
    const getUser = window.localStorage.getItem("user");
    console.log(getUser);
    if (getUser) {
      const user = JSON.parse(getUser);
      setUser(user);
      console.log(user.token);
      Blogservice.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    Blogservice.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

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
      window.localStorage.setItem("user", JSON.stringify(user));
      Blogservice.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const handleNewBlogSubmit = async () => {
    event.preventDefault();

    const newBlogContent = {
      title: title,
      author: author,
      url: url,
    };

    console.log("Try to add new blog...");
    console.log(newBlogContent);

    try {
      const NewBlog = await Blogservice.addNew(newBlogContent);
      setTitle("");
      setAuthor("");
      setUrl("");
      displayMessage(`Added blog titled ${NewBlog.title}`, successMessageType);
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }
  };

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
  };

  if (user === null) {
    return (
      <>
        <Notification message={message} type={messageType} />
        <LogIn
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <h3>
        {user.name} logged in <button onClick={handleLogout}>Log out</button>
      </h3>
      <Togglable buttonLabel={"new blog"}>
        <NewBlog
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          handleNewBlogSubmit={handleNewBlogSubmit}
        />
      </Togglable>
      <h2>Blogs:</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
