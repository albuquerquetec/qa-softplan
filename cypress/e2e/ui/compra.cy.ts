import { LoginPage } from '../../pages/LoginPage';
import { CompraPage } from '../../pages/CompraPage';

describe('UI | Compra de produto', () => {
  const login = new LoginPage();
  const compra = new CompraPage();

  beforeEach(() => {
    cy.criarUsuarioRandom().then((user) => {
      cy.loginAPI(user.email, user.senha);
      login.login(user.email, user.senha);
    });
  });

  context('Sucesso', () => {
    it('Fluxo principal de compra', () => {    
      compra.addProdutoCarrinho();
      compra.msgEmConstrucao.should('be.visible');    
    });  
  
    it('Limpar lista de compras', () => {
      compra.limparCarrinho();    
      compra.msgCarrinhoVazio.should('be.visible');    
    });
  });
});
