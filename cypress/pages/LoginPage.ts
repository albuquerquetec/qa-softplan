export class LoginPage {
  visit() { cy.visit('/login'); }
  get email() { return cy.get('[data-testid="email"]'); }
  get senha() { return cy.get('[data-testid="senha"]'); }
  get entrar() { return cy.get('[data-testid="entrar"]'); }

  get titulo() { return cy.contains('h1', 'Login'); }
  get placeholderEmail() { return cy.get('input[type="email"]'); }
  get placeholderSenha() { return cy.get('input[type="password"]'); }
  get botaoEntrar() { return cy.contains('button', 'Entrar'); }
  get linkCadastro() { return cy.contains('a', 'Cadastre-se'); }
  get textoNaoCadastrado() { return cy.contains(/Não é cadastrado/i); }

  get msgEmailObrigatorio() { return cy.contains(/Email é obrigatório/i); }
  get msgSenhaObrigatoria() { return cy.contains(/Password é obrigatório/i); }
  get msgLoginInvalido() { return cy.contains(/Email e|ou senha inválidos/i); }

  login(email: string, senha: string) {
    this.visit();
    this.email.clear().type(email);
    this.senha.clear().type(senha, { log: false });
    this.entrar.click();
  }

  paginaLogin() {
    this.visit();
  }

  loginSemEmail(senha: string) {
    this.visit();
    this.senha.clear().type(senha, { log: false });
    this.entrar.click();
  }

  loginSemSenha(email: string) {
    this.visit();
    this.email.clear().type(email);
    this.entrar.click();
  }

  loginSemEmailSenha() {
    this.visit();
    this.entrar.click();
  }

  loginInvalido() {
    this.visit();
    this.email.clear().type('fake@fake.com');
    this.senha.clear().type('errada');
    this.entrar.click();
  }
}
