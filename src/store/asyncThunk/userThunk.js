import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_STATUS, setAlertMessage } from "../app/alertSlice";
import UserRequester from "../../service/userRequester";

export const thunkFetchListUser = createAsyncThunk(
  "thunkFetchListUser",
  async (_, thunkApi) => {
    try {
      const res = await UserRequester.listUser(thunkApi.signal);

      if (res.status === 200) {
        thunkApi.dispatch(
          setAlertMessage({
            message: "get list user successfully.",
            status: MESSAGE_STATUS.succes,
          })
        );
        return thunkApi.fulfillWithValue(res.data);
      }
    } catch (err) {
      thunkApi.dispatch(
        setAlertMessage({
          message: err.respose.data,
          status: MESSAGE_STATUS.error,
        })
      );
      thunkApi.rejectWithValue(err.respose.message);
    }
  }
);

export const thunkFetchUserDetail = createAsyncThunk(
  "thunkFetchUserDetail",
  async (payload, thunkApi) => {
    try {
      const res = await UserRequester.userDetail(payload.id, thunkApi.signal);


      if (res.status === 200) {
        payload.setOpenModal(true)
        return thunkApi.fulfillWithValue(res.data);

      }
    } catch (err) {
      if (thunkApi.signal.aborted) {
        return thunkApi.rejectWithValue("sinal aborted");
      }
      return thunkApi.rejectWithValue(err.respose.data);

    }
  }
);
