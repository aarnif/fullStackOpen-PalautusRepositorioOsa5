describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", `${Cypress.env("backend")}/testing/reset`);
    const user = {
      name: "John Doe",
      username: "johnD",
      password: "horsemeat",
    };
    cy.request("POST", `${Cypress.env("backend")}/users`, user);
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("johnD");
      cy.get("#password").type("horsemeat");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("JohnD");
      cy.get("#password").type("dogmeat");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "johnD", password: "horsemeat" });
      cy.contains("logged in");
    });

    it("A New blog can be created", function () {
      const newBlogContent = {
        title: "Express is awesome!",
        author: "Jimmy Doolittle",
        url: "http://www.fakeblogsite.com",
      };

      cy.get("#title").type(newBlogContent.title);
      cy.get("#author").type(newBlogContent.author);
      cy.get("#url").type(newBlogContent.url);
      cy.get("#submit-button").click();

      cy.contains("Express is awesome!");
    });
  });
});
