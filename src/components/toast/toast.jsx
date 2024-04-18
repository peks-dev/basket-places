import React from "react";
import "./toast.css";

// icons
import AlertIcon from "@/components/icons/alert-icon";
import WifiOff from "@/components/icons/wifi-off-icon";
import SuccessIcon from "@/components/icons/success-icon";

const Toast = ({ text, type }) => {
  const toastList = {
    error: { icon: <AlertIcon />, style: "error" },
    noConnection: { icon: <WifiOff />, style: "error" },
    success: { icon: <SuccessIcon />, style: "success" },
  };

  return (
    <div className="toast" data-variant={toastList[type].style}>
      <div className="toast__icon">{toastList[type].icon}</div>
      {text}
    </div>
  );
};

export default Toast;
