import { produtoFactory, usuarioFactory } from '../../support/factories';

describe('API | Produtos', () => {
  before(() => {
    const admin = usuarioFactory(true);
    cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, admin)
      .its('status')
      .should('eq', 201);

    cy.loginAPI(admin.email, admin.password);
  });

  context('Sucesso', () => {
    it('CRUD completo de produto autenticado', () => {
      const produto = produtoFactory();
      let produtoId: string;

      cy.criarProdutoAPI(produto)
        .then((res) => {
          expect(res.status).to.eq(201);
          produtoId = res.body._id;
        })
        .then(() => {
          return cy.request('GET', `${Cypress.env('API_URL')}/produtos/${produtoId}`);
        })
        .then((getRes) => {
          expect(getRes.status).to.eq(200);
          expect(getRes.body.nome).to.eq(produto.nome);
        })
        .then(() => {
          return cy.request({
            method: 'PUT',
            url: `${Cypress.env('API_URL')}/produtos/${produtoId}`,
            headers: { Authorization: Cypress.env('TOKEN') },
            body: { ...produto, nome: produto.nome + ' - Editado' }
          });
        })
        .then((putRes) => {
          expect(putRes.status).to.eq(200);
          expect(putRes.body.message).to.match(/Registro alterado com sucesso/);
        })
        .then(() => {
          return cy.request({
            method: 'DELETE',
            url: `${Cypress.env('API_URL')}/produtos/${produtoId}`,
            headers: { Authorization: Cypress.env('TOKEN') }
          });
        })
        .then((delRes) => {
          expect(delRes.status).to.eq(200);
          expect(delRes.body.message).to.match(/Registro excluído com sucesso/);
        });
    });

    it('Lista produtos com sucesso', () => {
      cy.request('GET', `${Cypress.env('API_URL')}/produtos`)
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.produtos).to.be.an('array');
        });
    });
  });

  context('Falha', () => {
    it('Falha ao criar produto sem token', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/produtos`,
        body: produtoFactory(),
        failOnStatusCode: false
      })
      .its('status')
      .should('eq', 401);
    });

    it('Falha ao criar produto duplicado', () => {
      const produto = produtoFactory();
      cy.criarProdutoAPI(produto)
        .its('status')
        .should('eq', 201);

      cy.criarProdutoAPI(produto, false)
        .then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.match(/Já existe produto com esse nome/i);
        });
    });

    it('Falha ao buscar produto inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('API_URL')}/produtos/idInvalido123456`,
        failOnStatusCode: false
      })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.match(/Produto não encontrado/i);
      });
    });

    it('Falha ao atualizar produto com payload inválido', () => {
      const produto = produtoFactory();
      cy.criarProdutoAPI(produto)
        .then((res) => {
          const id = res.body._id;
          return cy.request({
            method: 'PUT',
            url: `${Cypress.env('API_URL')}/produtos/${id}`,
            headers: { Authorization: Cypress.env('TOKEN') },
            body: { nome: 'Produto Inválido', descricao: 'Sem preço', quantidade: 10 },
            failOnStatusCode: false
          });
        })
        .then((putRes) => {
          expect(putRes.status).to.eq(400);
          expect(putRes.body).to.have.property('preco');
        });
    });

    it('Falha ao deletar produto inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_URL')}/produtos/idInvalido123456`,
        headers: { Authorization: Cypress.env('TOKEN') },
        failOnStatusCode: false
      })
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.match(/Nenhum registro excluído/i);
      });
    });
  });
});
