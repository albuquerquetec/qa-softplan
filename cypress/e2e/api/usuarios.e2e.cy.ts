import usuarioSchema from '../../e2e/api/contratos/usuario.schema.json';
import { validarContrato } from '../../utils/schema';
import { usuarioFactory } from '../../support/factories';

describe('API | Usuários', () => {
  context('Sucesso', () => {
    it('CRUD completo e validação de contrato', () => {
      const novo = usuarioFactory(false);
      let userId: string;

      cy.request('GET', `${Cypress.env('API_URL')}/usuarios`)
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('usuarios');
          expect(res.body.usuarios).to.be.an('array');
        });

      cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, novo)
        .then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.match(/Cadastro realizado com sucesso/);
          userId = res.body._id;
        })
        .then(() => {
          return cy.request('GET', `${Cypress.env('API_URL')}/usuarios/${userId}`);
        })
        .then((res) => {
          expect(res.status).to.eq(200);
          validarContrato(usuarioSchema, res.body);

          return cy.request('PUT', `${Cypress.env('API_URL')}/usuarios/${userId}`, {
            nome: `${res.body.nome} - usuarioEditado`,
            email: res.body.email,
            password: res.body.password,
            administrador: res.body.administrador,
          });
        })
        .then((res) => {
          expect(res.status).to.eq(200);

          return cy.request('DELETE', `${Cypress.env('API_URL')}/usuarios/${userId}`);
        })
        .then((res) => {
          expect(res.status).to.eq(200);
        });
    });
  });

  context('Falha', () => {
    it('Falha ao cadastrar email duplicado', () => {
      const user = usuarioFactory(false);

      cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, user)
        .its('status').should('eq', 201);

      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/usuarios`,
        body: user,
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.match(/Este email já está sendo usado|duplicado/i);
        });
    });

    it('Falha ao buscar usuário inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('API_URL')}/usuarios/507f1f77bcf86cd7`,
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.match(/Usuário não encontrado/i);
        });
    });

    it('Falha ao atualizar usuário com payload inválido', () => {
      const novo = usuarioFactory(false);

      cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, novo)
        .then((res) => {
          const userId = res.body._id;

          cy.request({
            method: 'PUT',
            url: `${Cypress.env('API_URL')}/usuarios/${userId}`,
            body: { nome: '', email: '', password: '', administrador: '' },
            failOnStatusCode: false,
          })
            .then((res) => {
              expect(res.status).to.eq(400);
            });
        });
    });

    it('Falha ao deletar usuário inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_URL')}/usuarios/idInvalido123`,
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.match(/Nenhum registro excluído/i);
        });
    });

    it('Falha ao cadastrar usuário sem payload', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/usuarios`,
        body: {},
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Falha ao cadastrar usuário com campo administrador inválido', () => {
      const user = usuarioFactory(false) as any;
      user.administrador = 123;

      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/usuarios`,
        body: user,
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Falha ao deletar usuário já deletado', () => {
      const user = usuarioFactory(false);

      cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, user)
        .then((res) => {
          const userId = res.body._id;

          cy.request('DELETE', `${Cypress.env('API_URL')}/usuarios/${userId}`)
            .its('status').should('eq', 200);

          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('API_URL')}/usuarios/${userId}`,
            failOnStatusCode: false,
          })
            .then((res) => {
              expect(res.status).to.eq(200);
              expect(res.body.message).to.match(/Nenhum registro excluído/i);
            });
        });
    });

    it('Falha ao cadastrar usuário com email inválido', () => {
      const user = usuarioFactory(false);
      (user as any).email = "@teste.com";

      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/usuarios`,
        body: user,
        failOnStatusCode: false,
      })
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });
  });
});
