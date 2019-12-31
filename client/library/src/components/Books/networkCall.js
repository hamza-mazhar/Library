import {
  fetchBooksPending,
  fetchBooksSuccess,
  fetchBooksError
} from "../../modules/Books/action";
import axios from "axios";
import { header } from "../../common/header";
function fetchBooks() {
  return dispatch => {
    dispatch(fetchBooksPending());
    axios({
      method: "get",
      url: "/api/books",
      headers: {
        ...header
      }
    })
      // .get("/api/books")
      .then(response => {
        if (response.data) {
          dispatch(fetchBooksSuccess(response.data));
          return response.data;
        }
      })
      .catch(error => {
        dispatch(fetchBooksError("Can not get books " + error));
      });
  };
}

export default fetchBooks;
