import { faker } from '@faker-js/faker';

export function usuarioFactory(admin: boolean = false) {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: 'Senha!123',
    administrador: admin ? 'true' : 'false'
  };
}

export function produtoFactory() {
  return {
    nome: `Produto ${faker.commerce.productName()} ${faker.number.int({ min: 1000, max: 9999 })}`,
    preco: faker.number.int({ min: 10, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 50 })
  };
}
