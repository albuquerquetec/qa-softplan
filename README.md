# QA Softplan – Automação com Cypress

Projeto de testes automatizados (API + UI) utilizando Cypress com TypeScript, seguindo boas práticas de Page Objects, validação de contratos com AJV e relatórios HTML via Mochawesome.

## Tech Stack
- Cypress 13 + TypeScript
- AJV / ajv-formats - validação de contratos de API
- Faker - geração de massa de dados dinâmica
- Cypress Mochawesome Reporter - relatórios em HTML
- GitHub Actions (CI/CD – em breve)

## Pré-requisitos
- Node.js 18+
- npm 8+

## Instalação
Instalar dependências (sem alterar versões exatas):
npm ci

## Execução dos Testes
UI Interativa
npm run test:open

Headless (CI/CD ou local)
npm run test:run

Headless (com navegador visível)
npm run test:run:headed

Gerar Relatório (executa testes e abre HTML automaticamente)
npm run test:report

## Relatórios
- Relatórios em: cypress/reports/html
- Screenshots e vídeos (falhas): cypress/screenshots e cypress/videos
- O relatório final em HTML abre automaticamente após npm run test:report
- No dia a dia uso mais os screenshots de falhas para análise rápida, e deixo o relatório para acompanhamento geral.
- O relatório atualizado dos testes pode ser acessado diretamente pelo GitHub Pages no link abaixo:
  Acesse o Relatório de Testes - (https://albuquerquetec.github.io/qa-softplan/)

## Convenções de Código
- Page Objects - cypress/pages
- Commands - cypress/support/commands.ts
- Factories - cypress/support/factories
- Schemas JSON - cypress/e2e/api/contratos
- Nada de cy.log ou comentários desnecessários
- Artefatos e relatórios não são versionados

## CI/CD (em breve)
- Pipeline no GitHub Actions para executar testes (API e UI) e publicar relatórios como artefatos.
- A ideia é rodar por tipo de teste (API separado de UI) e manter os relatórios disponíveis no histórico do pipeline.