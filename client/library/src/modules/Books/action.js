import * as Types from "./types";

function fetchBooksPending() {
  return {
    type: Types.FETCH_ALL_BOOKS_PENDING
  };
}

function fetchBooksSuccess(books) {
  return {
    type: Types.FETCH_ALL_BOOKS_SUCCESS,
    payload: books
  };
}

function fetchBooksError(error) {
  return {
    type: Types.FETCH_ALL_BOOKS_FAILURE,
    error: error
  };
}

export { fetchBooksPending, fetchBooksSuccess, fetchBooksError };
