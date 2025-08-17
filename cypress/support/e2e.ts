import 'cypress-mochawesome-reporter/register';
import './commands';

afterEach(function () {
  if (this.currentTest?.state === 'failed') {
    const testName = this.currentTest.title.replace(/[/\\?%*:|"<>]/g, '-');
    cy.screenshot(`FAILED_${testName}`, { capture: 'runner' });
  }
});
