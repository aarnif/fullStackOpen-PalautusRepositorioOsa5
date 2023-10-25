describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "John Doe",
      username: "JohnD",
      password: "horsemeat",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("JohnD");
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
});
