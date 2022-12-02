import React, { useState } from "react";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import MovieList from "../MovieList/MovieList";
import Footer from "../Footer/Footer";
import ErrBoundary from "../ErrorBoundary/ErrorBoundary";
import Modal from "../Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
// import { fetchAllMovies } from "../../store/movies-slice";
// import { useAppSelector, useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";

const Layout = () => {
  // const dispatch = useAppDispatch();
  // @ts-ignore
  const { isLoading, error } = useAppSelector((state) => state.movies);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isMovieDetailsShow, setIsMovieDetailsShow] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchAllMovies());
  // }, [dispatch]);

  return (
    <>
      <Header
        onAddClick={setIsAddModalOpen}
        isMovieDetailsShow={isMovieDetailsShow}
        setIsMovieDetailsShow={setIsMovieDetailsShow}
      />
      <main
        className={`main-section mt-2 ${isLoading || error ? "h-full" : ""}`}
      >
        <div
          className={`container mx-auto ${isLoading || error ? "h-full" : ""}`}
        >
          <ErrBoundary>
            <Filter />
            <MovieList
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setIsMovieDetailsShow={setIsMovieDetailsShow}
            />
          </ErrBoundary>
        </div>
      </main>
      <Footer />
      {isAddModalOpen && <Modal onCloseClick={setIsAddModalOpen} />}
      {isDeleteModalOpen && (
        <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )}
      {isEditModalOpen && <EditModal setIsEditModalOpen={setIsEditModalOpen} />}
    </>
  );
};

export default Layout;
