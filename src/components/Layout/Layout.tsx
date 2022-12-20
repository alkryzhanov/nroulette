import React from "react";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import MovieList from "../MovieList/MovieList";
import Footer from "../Footer/Footer";
import ErrBoundary from "../ErrorBoundary/ErrorBoundary";
import Modal from "../Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";
// import EditModal from "../EditModal/EditModal";
import { useAppSelector } from "../../hooks";
import { MODALS } from "../../constants";
import CongratsModal from "../CongratsModal";

const Layout = () => {
  const { isLoading, errors, movies } = useAppSelector((state) => state.movies);
  const { isModalShown, modalType } = useAppSelector((state) => state.modal);
  const className = (isLoading || errors || !movies.length) && "h-full";

  let modal;
  if (modalType === MODALS.ADD_MOVIE_MODAL || modalType === MODALS.EDIT_MODAL) {
    modal = <Modal />;
  } else if (modalType === MODALS.DELETE_MODAL) {
    modal = <DeleteModal />;
  } else {
    modal = <CongratsModal />;
  }

  return (
    <>
      <Header />
      <main className={`main-section mt-2 ${className}`}>
        <div className={`container mx-auto ${className}`}>
          <ErrBoundary>
            <Filter />
            <MovieList />
          </ErrBoundary>
        </div>
      </main>
      <Footer />
      {isModalShown && modal}
    </>
  );
};

export default Layout;
