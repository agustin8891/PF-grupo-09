import { DB_HEROKU } from "./actionTypes";
import axios from "axios";

export const postBuyMp = (cart) => {
    console.log("llego hasta aca", DB_HEROKU)
  return async function (dispatch) {
/*     try { */
      let result = await axios.post(`${DB_HEROKU}/payment`, cart);
      console.log("result.data", result?.data?.init_point);
      if (result?.data) {
        window.open(result?.data?.init_point);
      }
      return dispatch({
        type: "POST_MPBUY",
      });
/*     } catch (err) {
      console.log(err);
    } */
  };
};
