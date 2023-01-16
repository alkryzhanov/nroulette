import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAppSelector } from "./hooks";
import { MODALS } from "./constants";
import Modal from "./components/Modal/Modal";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import CongratsModal from "./components/CongratsModal";
import Main from "./components/Main/Main";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  const { isModalShown, modalType } = useAppSelector((state) => state.modal);

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
      <Routes>
        <Route path="/search" element={<Header />}>
          <Route index element={<Search />} />
          <Route path=":movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/search" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":searchQuery" element={<Main />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isModalShown && modal}
    </>
  );
}

export default App;
