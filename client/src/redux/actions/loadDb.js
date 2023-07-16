import axios from "axios";
import { DB_HEROKU} from "./actionTypes";

export const loadDb = () => {
  return async (dispatch) => {
    try {
      let result = await axios.get(
        `${DB_HEROKU}/loaddb`
      );
      return dispatch({
        type: "",
        payload: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
};



