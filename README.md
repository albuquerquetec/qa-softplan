# QA Softplan – Automação com Cypress

Este projeto contém a automação de testes para API e UI utilizando Cypress com TypeScript.  
A estrutura foi organizada com Page Objects e validação de contratos de API, além de relatórios em HTML para facilitar a análise dos resultados.

## Tecnologias utilizadas
- **Cypress 13** + TypeScript  
- **AJV** / ajv-formats → validação de contratos de API  
- **Faker** → geração dinâmica de massa de dados  
- **Cypress Mochawesome Reporter** → relatórios em HTML  
- **GitHub Actions** (pipeline CI/CD – em implementação)  

## Pré-requisitos
- Node.js **18+**  
- npm **8+**

## Instalação
- Instalar as dependências:  
npm ci

## Como executar os testes
- Abrir interface interativa:  
  npm run test:open

- Execução headless:  
  npm run test:run

- Execução headless com navegador visível:  
  npm run test:run:headed

- Gerar relatório (executa testes e abre o HTML automaticamente):  
  npm run test:report

## Relatórios
- Local: `cypress/reports/mochawesome/`  
- Evidências (falhas): `cypress/screenshots`  
- O relatório em HTML é aberto automaticamente após rodar `npm run test:report`.  
- Um relatório será gerado e ficará disponível online via GitHub Pages toda vez que a pipeline for executada. 

## Estrutura e convenções
- **Page Objects:** `cypress/pages`  
- **Commands customizados:** `cypress/support/commands.ts`  
- **Factories:** `cypress/support/factories`  
- **Contratos de API:** `cypress/e2e/api/contratos`  

## CI/CD
- O projeto já conta com pipeline no GitHub Actions, responsável por:
  - Executar os testes automatizados (API e UI).
  - Gerar os relatórios em HTML com o Mochawesome.
  - Publicar automaticamente o relatório mais recente no GitHub Pages, disponível em:
    [Relatório de Testes](https://albuquerquetec.github.io/qa-softplan/).
- Os relatórios antigos ficam armazenados como artefatos no histórico do pipeline, permitindo acompanhamento e auditoria dos testes. 
