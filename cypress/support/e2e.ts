import "./commands";
import "@testing-library/cypress/add-commands";

export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): Chainable<Element>;
      loginByApi(email?: string, password?: string): Chainable<void>;
      applyCommandDelay(delay: number): Chainable<void>;
    }
  }
}
