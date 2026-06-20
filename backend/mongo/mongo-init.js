db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("users");
db.createCollection("blogs");

db.users.insert({
  _id: ObjectId("6a3691cbd81c943387933d6b"),
  username: "tester",
  name: "Test User",
  passwordHash: "$2b$10$/drO3tq2/Bp.WMHs/1b3qOGxBofIFgGVUr2Dar8m4Kn814B8ipcl.", // Password hash for "password"
});

db.blogs.insertMany([
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "6a3691cbd81c943387933d6b",
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "6a3691cbd81c943387933d6b",
  },
]);
