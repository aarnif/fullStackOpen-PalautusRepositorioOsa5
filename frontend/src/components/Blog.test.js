import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title", () => {
  const blog = {
    title: "React patterns",
    id: "5a422a851b54a676234d17f7",
  };

  render(
    <Blog
      key={blog.id}
      blog={blog}
      userName={""}
      updateBlog={() => {}}
      deleteBlog={() => {}}
    />
  );

  const element = screen.getByText(blog.title);

  expect(element).toBeDefined();
});
