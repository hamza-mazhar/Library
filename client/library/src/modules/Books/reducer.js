import * as Types from "./types";

const book = (
  state = {
    data: [],
    error: null,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case Types.FETCH_ALL_BOOKS_PENDING:
      state = {
        ...state,
        loading: true
      };
      break;

    case Types.FETCH_ALL_BOOKS_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload
      };

      break;

    case Types.FETCH_ALL_BOOKS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.error
      };
      break;

    default:
      return state;
  }
  return state;
};

export default book;
