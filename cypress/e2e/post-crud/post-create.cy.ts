describe('Post Create Flow', () => {
  it('Create post and check the network request', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/posts',
      headers: {
        authorization:
          'Bearer 95a43185e712a161c8d906ee571d865c417a4819a050f3ad09a1e62409fbd65c',
      },
    }).as('createPost');

    cy.intercept('GET', 'https://gorest.co.in/public/v2/users').as('getUsers');

    cy.visit('http://localhost:3000');
    cy.contains(
      'Welcome to our blog. You need to sign in before you can use the blog.',
    ).should('be.visible');
    cy.get('input[id="basic_name"]').type('admin');
    cy.get('input[id="basic_token"]').type(
      '95a43185e712a161c8d906ee571d865c417a4819a050f3ad09a1e62409fbd65c',
    );
    cy.contains('button', 'Sign in').should('be.visible').click();

    cy.get('button').contains('Create post').click();
    cy.get('input[id="basic_title"]').type('Title');
    cy.get('textarea[id="basic_body"]').type('Body');

    cy.get('input[id="basic_user_id"]').click();
    cy.get('div[class="rc-virtual-list-holder-inner"]').should('be.visible');
    cy.get('div[class="rc-virtual-list-holder-inner"]')
      .find('div')
      .first()
      .click();

    cy.get('button[type="submit"]').contains('Create').click();

    cy.wait('@createPost').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(201);

        // Post created successfully
        cy.get('span')
          .contains('Post created successfully')
          .should('be.visible');
      }
    });
  });
});
