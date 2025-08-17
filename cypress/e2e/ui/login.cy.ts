import { LoginPage } from '../../pages/LoginPage';

describe('UI | Login', () => {
  const login = new LoginPage();

  beforeEach(() => {
    cy.criarUsuarioRandom().then((user) => {
      Cypress.env('EMAIL', user.email);
      Cypress.env('PASSWORD', user.senha);
    });
  });

  context('Sucesso', () => {
    it('Valida todas as labels da tela de login', () => {
      login.paginaLogin();
      login.titulo.should('be.visible');
      login.placeholderEmail.should('have.attr', 'placeholder', 'Digite seu email');
      login.placeholderSenha.should('have.attr', 'placeholder', 'Digite sua senha');
      login.botaoEntrar.should('be.visible');
      login.textoNaoCadastrado.should('be.visible');
      login.linkCadastro.should('be.visible');
    });

    it('Login válido redireciona para Home/Admin', () => {
      login.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
      cy.url().should('match', /home|admin/i);
      cy.contains(/Serverest |Store/i, { matchCase: false }).should('be.visible');
    });
  });

  context('Falha', () => {
    it('Validar tentativa de login sem email', () => {
      login.loginSemEmail(Cypress.env('PASSWORD'));
      login.msgEmailObrigatorio.should('be.visible');
    });

    it('Validar tentativa de login sem senha', () => {
      login.loginSemSenha(Cypress.env('EMAIL'));
      login.msgSenhaObrigatoria.should('be.visible');
    });

    it('Validar tentativa de login sem email e senha', () => {
      login.loginSemEmailSenha();
      login.msgEmailObrigatorio.should('be.visible');
      login.msgSenhaObrigatoria.should('be.visible');
    });

    it('Exibe erro com credenciais inválidas', () => {
      login.loginInvalido();
      login.msgLoginInvalido.should('be.visible');
    });
  });
});
