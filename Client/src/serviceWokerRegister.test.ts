// @ts-nocheck
import { register } from "./serviceWokerRegister";

Object.defineProperty(window.navigator, "serviceWorker", {
  value: {
    register: register,
  },
});

global.navigator = {
  userAgent: "node.js",
  serviceWorker: {
    register: jest.fn(),
    getRegistration: jest.fn(),
    getRegistrations: jest.fn(),
    unregister: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  },
};

describe("serviceWokerRegister", () => {
  it("should be defined", () => {
    register({
      onUpdate: (registration: any) => {
        alert("New version available!  Ready to update?");
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
        window.location.reload();
      },
    });
    new window.Event("load");
  });
});
