import {
  fetchBooksPending,
  fetchBooksSuccess,
  fetchBooksError
} from "../../modules/Books/action";
import axios from "axios";

function fetchBooks() {
  return dispatch => {
    dispatch(fetchBooksPending());
    axios({
      method: "get",
      url: "/api/books",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: localStorage.getItem("token")
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
