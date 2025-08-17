import { defineConfig } from 'cypress';
import { env as localEnv } from './cypress/utils/env';
import { beforeRunHook, afterRunHook } from 'cypress-mochawesome-reporter/lib';
import fs from 'fs-extra';
import path from 'path';

function deleteFolder(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Limpou pasta: ${folderPath}`);
  }
}

export default defineConfig({
  e2e: {
    baseUrl: localEnv.FRONT_URL,
    env: localEnv,
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: 'cypress/screenshots',
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        console.log('Limpando reports e screenshots...');
        deleteFolder(path.join(__dirname, 'cypress/reports'));
        deleteFolder(path.join(__dirname, 'cypress/screenshots'));
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('Gerando relatório HTML...');
        await afterRunHook();

        const reportPath = path.join(__dirname, 'cypress/reports/html/index.html');
        console.log(`Relatório gerado em: ${reportPath}`);
      });

      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportPageTitle: 'Relatório de Testes',
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
});
