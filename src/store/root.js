import { combineReducers } from "redux";
import helmetSlice from "./app/helmetSlice";
import authSlice from "./app/authSlice";
import alertSlice from "./app/alertSlice";


const rootReducer = combineReducers({
    helmet: helmetSlice,
    auth: authSlice,
    alert: alertSlice
});

export default rootReducer;
