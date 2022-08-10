import { SORT_BY_STOCK,DB_HEROKU } from "./actionTypes";
import axios from 'axios'

export const sortByStock = (stock, destination, start, end) => {
  return async (dispatch) => {
    try {
      let result = await axios.get(
        `${DB_HEROKU}/packages?stock=${stock}&destination=${destination}&start=${start}`
      );
      return dispatch({
        type: SORT_BY_STOCK,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};