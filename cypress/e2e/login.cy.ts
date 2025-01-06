describe("Login Flow", () => {
  it("First time visit the site and not fill the authentication form including the name and token and check the error message", () => {
    cy.visit("http://localhost:3000");
    cy.contains(
      "Welcome to our blog. You need to sign in before you can use the blog."
    ).should("be.visible");
    cy.contains("button", "Sign in").should("be.visible").click();
    cy.contains(
      'div[class="ant-form-item-explain-error"]',
      "Please input your name!"
    ).should("be.visible");
    cy.contains(
      'div[class="ant-form-item-explain-error"]',
      "Please input your token!"
    ).should("be.visible");
  });
  it("First time visit the site and fill the authentication form including the name and token", () => {
    cy.visit("http://localhost:3000");
    cy.contains(
      "Welcome to our blog. You need to sign in before you can use the blog."
    ).should("be.visible");
    cy.get('input[id="basic_name"]').type("admin");
    cy.get('input[id="basic_token"]').type("password");
    cy.contains("button", "Sign in").should("be.visible").click();
    cy.contains(
      "Welcome to our blog. You need to sign in before you can use the blog."
    ).should("not.be.visible");
  });
});
