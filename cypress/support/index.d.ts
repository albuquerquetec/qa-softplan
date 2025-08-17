/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    criarProdutoAPI(produto: Record<string, any>, failOnStatusCode?: boolean): Chainable<Response<any>>;
    criarUsuarioAPI(usuario: Record<string, any>, failOnStatusCode?: boolean): Chainable<Response<any>>;
    loginAPI(email: string, password: string): Chainable<Response<any>>;
    criarUsuarioRandom(): Chainable<{ nome: string; email: string; senha: string; id: string }>;
  }
}
