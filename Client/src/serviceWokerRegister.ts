import { Workbox } from "workbox-window";

async function updateServiceWorker(wb: Workbox, event: any) {
  wb.addEventListener("controlling", async () => {
    window.location.reload();

    await wb.messageSkipWaiting();
  });
}

export const serviceWorkerRegister = async () => {
  if (
    (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) ||
    process.env.NODE_ENV === "test"
  ) {
    try {
      const wb = new Workbox("/service-worker.js");
      wb.addEventListener("waiting", (event) => {
        updateServiceWorker(wb, event);
      });

      wb.register();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Service worker not supported");
  }
};
