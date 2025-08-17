export class CompraPage {
  get detalheProduto() { return cy.get('[href="/detalhesProduto/K6leHdftCeOJj8BJ"] > .card-link'); }
  get addProduto() { return cy.get('[data-testid="adicionarNaLista"]'); }
  get addCarrinho() { return cy.get('[data-testid="adicionar carrinho"]'); }
  get limpaCarrinho() { return cy.get('[data-testid="limparLista"]'); }

  get msgEmConstrucao() { return cy.contains(/Em construção aguarde/i); }
  get msgCarrinhoVazio() { return cy.contains(/Seu carrinho está vazio/i); }

  addProdutoCarrinho() {
    this.detalheProduto.click();
    this.addProduto.click();
    this.addCarrinho.click();
  }

  limparCarrinho() {
    this.detalheProduto.click();
    this.addProduto.click();
    this.limpaCarrinho.click();
  }
}
