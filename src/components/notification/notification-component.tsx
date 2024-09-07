// import { ComponentProps, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface NotificationComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

export default function NotificationComponent() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
