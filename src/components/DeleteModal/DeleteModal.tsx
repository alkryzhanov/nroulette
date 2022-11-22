import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";
import styles from "./DeleteModal.module.css";
import closeIcon from "../../assets/close-btn.svg";

type Props = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

const DeleteModal = ({ setIsDeleteModalOpen }: Props) => {
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };
  return ReactDOM.createPortal(
    <>
      <div className={cx("overlay")} />
      <div className={cx("delete-modal")}>
        <button
          type="button"
          className={cx("delete-model-close-btn")}
          onClick={closeDeleteModalHandler}
        >
          <img src={closeIcon} alt="Close button" />
        </button>
        <h5 className={cx("delete-modal-title")}>Delete MOVIE</h5>
        <p className={cx("delete-modal-text")}>
          Are you sure you want to delete this movie?
        </p>
        <button type="button" className={cx("confirm-btn")} name="confirm-btn">
          confirm
        </button>
      </div>
      ,
    </>,
    document.getElementById("portal")!,
  );
};

export default DeleteModal;
