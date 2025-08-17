export {};

const randomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);

Cypress.Commands.add('loginAPI', (email: string, senha: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/login`,
    body: { email, password: senha }
  }).then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env('TOKEN', res.body.authorization);
  });
});

Cypress.Commands.add('criarProdutoAPI', (produto, failOnStatusCode: boolean = true) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/produtos`,
    headers: { Authorization: Cypress.env('TOKEN') },
    body: produto,
    failOnStatusCode,
  });
});

Cypress.Commands.add('criarUsuarioAPI', (usuario, failOnStatusCode: boolean = true) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/usuarios`,
    body: usuario,
    failOnStatusCode,
  });
});

Cypress.Commands.add('criarUsuarioRandom', () => {
  const nome = `Teste ${randomString(5)}`;
  const email = `user_${randomString(8)}@teste.com`;
  const senha = '123456';
  const administrador = 'false';

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/usuarios`,
    body: { nome, email, password: senha, administrador }
  }).then((res) => {
    expect(res.status).to.eq(201);
    Cypress.env('USER_EMAIL', email);
    Cypress.env('USER_PASSWORD', senha);
    Cypress.env('USER_ID', res.body._id);
    return { nome, email, senha, id: res.body._id };
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAPI(email: string, senha: string): Chainable<void>;
      criarUsuarioAPI(usuario: any, failOnStatusCode?: boolean): Chainable<Cypress.Response<any>>;
      criarProdutoAPI(produto: any, failOnStatusCode?: boolean): Chainable<Cypress.Response<any>>;
      criarUsuarioRandom(): Chainable<{ nome: string; email: string; senha: string; id: string }>;
    }
  }
}
