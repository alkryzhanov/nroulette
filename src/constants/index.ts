export const MOVIES_URL = "http://localhost:4000/movies";
export const PLACEHOLDER_IMG_LINK = `https://via.placeholder.com/400x600?text=`;

export enum SortingOptions {
  ReleaseDate = "release_date",
  Title = "title",
}

export enum MODALS {
  ADD_MOVIE_MODAL = "ADD_MOVIE_MODAL",
  CONGRATS_MODAL = "CONGRATS_MODAL",
  CONGRATS_DELETE_MODAL = "CONGRATS_DELETE_MODAL",
  CONGRATS_EDIT_MODAL = "CONGRATS_EDIT_MODAL",
  EDIT_MODAL = "EDIT_MODAL",
  DELETE_MODAL = "DELETE_MODAL",
}

export enum StatusValues {
  INITIAL = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
  DELETED = "deleted",
  UPDATED = "updated",
  ADDED = "added",
}
