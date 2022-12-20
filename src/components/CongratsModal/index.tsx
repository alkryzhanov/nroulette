import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import Overlay from "../Overlay/Overlay";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideModal } from "../../store/modal-slice";
import closeIcon from "../../assets/close-btn.svg";
import doneIcon from "../../assets/done.png";
import styles from "./CongratsModal.module.css";
import { MODALS } from "../../constants";

const cx = classNames.bind(styles);

const CongratsModal = () => {
  const dispatch = useAppDispatch();
  const { modalType } = useAppSelector((state) => state.modal);
  const closeModalHandler = () => {
    dispatch(hideModal());
  };

  let textMessage;
  if (modalType === MODALS.CONGRATS_DELETE_MODAL) {
    textMessage = "deleted in";
  } else if (modalType === MODALS.CONGRATS_EDIT_MODAL) {
    textMessage = "edited in";
  } else {
    textMessage = "added to";
  }
  const modalFooter = (
    <p className="text-xl font-normal text-center">
      The movie has been {textMessage}
      <br /> database successfully
    </p>
  );
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay")!)}
      {ReactDOM.createPortal(
        <div className={cx("modal")}>
          <button
            type="button"
            className="absolute top-7 right-7"
            onClick={closeModalHandler}
          >
            <img src={closeIcon} alt="Close button" />
          </button>
          <div className="flex justify-center pb-8">
            <img src={doneIcon} alt="Done icon" className={cx("modal-img")} />
          </div>
          <h5 className="font-light text-4xl uppercase text-center pb-8">
            congratulations !
          </h5>
          {modalFooter}
        </div>,
        document.getElementById("modal")!,
      )}
    </>
  );
};

export default CongratsModal;
