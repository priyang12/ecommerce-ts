import { Workbox, WorkboxLifecycleWaitingEvent } from "workbox-window";

async function updateServiceWorker(
  wb: Workbox,
  event: WorkboxLifecycleWaitingEvent
) {
  wb.addEventListener("controlling", async () => {
    if (event.isUpdate === true) {
      if (
        window.confirm(
          "New Update of the website is available want to Update, Just Takes Seconds"
        )
      ) {
        window.location.reload();
      }
      await wb.messageSkipWaiting();
    }
  });
}

export const serviceWorkerRegister = async () => {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    try {
      const wb = new Workbox("/service-worker.js");
      wb.addEventListener("installed", (event) => {
        if (!event.isUpdate) {
          window.localStorage.setItem("install", "The Apps is Fully Installed");
        }
      });
      wb.addEventListener("waiting", (event) => {
        updateServiceWorker(wb, event);
      });
      wb.register();
    } catch (error) {
      console.error(error);
    }
  } else {
    // console.log("Service worker not supported");
  }
};
