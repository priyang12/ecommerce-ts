// AppUpdatePrompt.tsx
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRegisterSW } from "virtual:pwa-register/react";
import { styled } from "@linaria/react";
import "react-toastify/dist/ReactToastify.css";
import { UpdateButton, UpdateToast } from "./StyledAppUpdatePrompt";

const AppUpdatePrompt: React.FC = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    if (needRefresh) {
      toast.info(
        <UpdateToast>
          <span>A new version is available.</span>
          <UpdateButton onClick={() => updateServiceWorker(true)}>
            Update
          </UpdateButton>
        </UpdateToast>,
        {
          position: "bottom-center",
          closeOnClick: false,
          closeButton: false,
          autoClose: false,
          style: {
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
          },
        }
      );
    }
  }, [needRefresh, updateServiceWorker]);

  return <></>;
};

export default AppUpdatePrompt;
