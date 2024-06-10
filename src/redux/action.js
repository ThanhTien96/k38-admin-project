import axios from "axios";
import { PRODUCT_REDUCER_TYPE } from "./productReducer";
import { APP_REDUCER_TYPE } from "./appReducer";

export const updateListShoeAction = function (payload) {
  return { type: PRODUCT_REDUCER_TYPE.updateListShoe, payload: payload };
};

export const updateShoeDetailAction = (payload) => ({
  type: PRODUCT_REDUCER_TYPE.updateShoeDetail,
  payload,
});

export const updateErrorAction = (payload) => ({
  type: PRODUCT_REDUCER_TYPE.updateError,
  payload,
})


export const updateAppLoadingAction = (payload) => ({type: APP_REDUCER_TYPE.updateAppLoading, payload})

// async thunk

export const thunkFetchListShoe = () => {
  return async (dispatch) => {
    dispatch(updateAppLoadingAction(true));
    try {
      const response = await axios({
        url: "https://66532115813d78e6d6d74b82.mockapi.io/shoes/abc",
        method: "GET",
      });

      if (response.status === 200) {
        dispatch({
          type: PRODUCT_REDUCER_TYPE.updateListShoe,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch(updateErrorAction(err))
    } finally {
      dispatch(updateAppLoadingAction(false));
    }
  };
};

export const thunkFetchShoeDetail = () => {
  return async function (dispatch) {
    dispatch(updateAppLoadingAction(true));
    try {
      const res = await axios({
        url: "https://66532115813d78e6d6d74b82.mockapi.io/shoes/2",
        method: "GET",
      });

      if (res.status === 200) {
        const action = updateShoeDetailAction(res.data);
        dispatch(action);
      }
    } catch (err) {
      dispatch(updateErrorAction(err))
    } finally {
      dispatch(updateAppLoadingAction(false));
    }
  };
};
