import { Workbox } from "workbox-window";

export const serviceWorkerRegister = () => {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    const wb = new Workbox("/Service-Workers.js");

    wb.addEventListener("installed", (event) => {
      if (!event.isUpdate) {
        console.log("Service worker installed for the first time.");
        localStorage.setItem("install", "App fully installed");
      }
    });

    // Equivalent to reg.onupdatefound
    wb.addEventListener("waiting", () => {
      // This is the same as: SW has been installed and is waiting to activate
      console.log("Service worker update found.");
      window.dispatchEvent(new Event("swUpdated"));
    });

    // Optional: listen for controller change and reload
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    wb.register();
  }
};
