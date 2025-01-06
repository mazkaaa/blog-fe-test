describe("Post delete flow", () => {
  it("Delete the post and check the network request and the articles and check the frontend app is the article still exist", () => {
    cy.intercept(
      "GET",
      "https://gorest.co.in/public/v2/posts?page=1&per_page=5&body=*"
    ).as("getPosts");
    // cy.intercept("DELETE", "https://gorest.co.in/public/v2/posts/*").as(
    //   "deletePost"
    // );
    cy.intercept({
      method: "DELETE",
      url: "https://gorest.co.in/public/v2/posts/*",
      headers: {
        authorization:
          "Bearer 95a43185e712a161c8d906ee571d865c417a4819a050f3ad09a1e62409fbd65c",
      },
    }).as("deletePost");

    cy.visit("http://localhost:3000");
    cy.contains(
      "Welcome to our blog. You need to sign in before you can use the blog."
    ).should("be.visible");
    cy.get('input[id="basic_name"]').type("admin");
    cy.get('input[id="basic_token"]').type(
      "95a43185e712a161c8d906ee571d865c417a4819a050f3ad09a1e62409fbd65c"
    );
    cy.contains("button", "Sign in").should("be.visible").click();

    cy.wait("@getPosts").then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.length(5);

        cy.get("#article_list").should("be.visible");
        cy.get("#article_list article").should("have.length", 5);

        const articles = interception.response.body;
        for (let i = 0; i < articles.length; i++) {
          cy.get(`#article_list article:nth-child(${i + 1})`).should(
            "have.id",
            articles[i].id
          );
        }

        cy.get("#article_list article:nth-child(1) #post_delete").click();
        cy.get(
          'div[class="ant-modal-confirm-btns"] button span:contains("OK")'
        ).click();
        cy.wait("@deletePost").then((interception) => {
          expect(interception.response).to.not.be.undefined;
          if (interception.response) {
            expect(interception.response.statusCode).to.eq(204);

            // Post deleted successfully
            cy.get("span")
              .contains("Post deleted successfully")
              .should("be.visible");
          }
        });
      }
    });
  });
});
