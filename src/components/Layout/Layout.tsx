import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import MovieList from "../MovieList/MovieList";
import Footer from "../Footer/Footer";
import ErrBoundary from "../ErrorBoundary/ErrorBoundary";
import Modal from "../Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

const Layout = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMovieDetailsShow, setIsMovieDetailsShow] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:4000/movies");
        const moviesData = res.data.data;
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);
  useEffect(() => {
    if (movieId) {
      const foundMovie =
        movies.find((item: { id: number }) => movieId === item.id) || null;
      setMovie(foundMovie);
    }
  }, [movieId]);
  return (
    <>
      <Header
        onAddClick={setIsAddModalOpen}
        isMovieDetailsShow={isMovieDetailsShow}
        setIsMovieDetailsShow={setIsMovieDetailsShow}
        movie={movie}
      />
      <main className={`main-section mt-2 ${isLoading ? "h-full" : ""}`}>
        <div className={`container mx-auto ${isLoading ? "h-full" : ""}`}>
          <ErrBoundary>
            <Filter />
            <MovieList
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setIsMovieDetailsShow={setIsMovieDetailsShow}
              setMovieId={setMovieId}
              movies={movies}
              isLoading={isLoading}
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
