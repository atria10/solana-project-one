"use client";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Toast = () => {
  const { isOpen, message, status } = useSelector(
    (state: RootState) => state.toast
  );
  console.log(status,isOpen,message)
  const dispatch = useDispatch();
  return (
    isOpen && (
      <div className="toast toast-start">
        <div
          className={`alert ${
            status === 200 ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      </div>
    )
  );
};

export default Toast;
