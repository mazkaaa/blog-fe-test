describe('Post list flow', () => {
  it('See article list on the homepage. check the network request and the articles and check the frontend app is the component exist.', () => {
    cy.intercept(
      'GET',
      'https://gorest.co.in/public/v2/posts?page=1&per_page=5&body=*',
    ).as('getPosts');
    cy.visit('/');
    cy.contains(
      'Welcome to our blog. You need to sign in before you can use the blog.',
    ).should('be.visible');
    cy.get('input[id="basic_name"]').type('admin');
    cy.get('input[id="basic_token"]').type('password');
    cy.contains('button', 'Sign in').should('be.visible').click();

    cy.wait('@getPosts').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.length(5);

        cy.get('#article_list').should('be.visible');
        cy.get('#article_list article').should('have.length', 5);

        const articles = interception.response.body;
        for (let i = 0; i < articles.length; i++) {
          cy.get(`#article_list article:nth-child(${i + 1})`).should(
            'have.id',
            articles[i].id,
          );
        }
      }
    });
  });

  it('Click load more button and check the network request and the articles and check the frontend app is the component exist.', () => {
    cy.intercept(
      'GET',
      'https://gorest.co.in/public/v2/posts?page=1&per_page=5&body=*',
    ).as('getPosts');
    cy.intercept(
      'GET',
      'https://gorest.co.in/public/v2/posts?page=1&per_page=10&body=*',
    ).as('getPosts2');
    cy.visit('/');
    cy.contains(
      'Welcome to our blog. You need to sign in before you can use the blog.',
    ).should('be.visible');
    cy.get('input[id="basic_name"]').type('admin');
    cy.get('input[id="basic_token"]').type('password');
    cy.contains('button', 'Sign in').should('be.visible').click();

    cy.wait('@getPosts').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.length(5);

        cy.get('#article_list').should('be.visible');
        cy.get('#article_list article').should('have.length', 5);

        const articles = interception.response.body;
        for (let i = 0; i < articles.length; i++) {
          cy.get(`#article_list article:nth-child(${i + 1})`).should(
            'have.id',
            articles[i].id,
          );
        }
      }
    });

    cy.get('button').contains('Load more').click();

    cy.wait('@getPosts2').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.length(10);

        cy.get('#article_list').should('be.visible');
        cy.get('#article_list article').should('have.length', 10);

        const articles = interception.response.body;
        for (let i = 0; i < articles.length; i++) {
          cy.get(`#article_list article:nth-child(${i + 1})`).should(
            'have.id',
            articles[i].id,
          );
        }
      }
    });
  });
});
