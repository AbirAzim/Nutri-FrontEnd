import { toast } from "react-toastify";

type notificationProps = (
  type?: "success" | "error" | "info" | "warning",
  content?: string,
  position?:
    | "top-right"
    | "top-right"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center",
  autoClose?: number,
  hideProgressBar?: boolean,
  closeOnClick?: boolean,
  pauseOnHover?: boolean,
  draggable?: boolean,
  progress?: string | number,
) => void;

const notification: notificationProps = (
  type = "success",
  content = "",
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = 0,
) => {
  if (type === "success") {
    return toast.success(content, {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "error") {
    return toast.error(content, {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "info") {
    return toast.info(content, {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "warning") {
    return toast.warning(content, {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  //@ts-ignore
  return toast.default(content, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
  });
};

export default notification;
