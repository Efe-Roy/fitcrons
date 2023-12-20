import { combineReducers } from "redux";
import authSliceReducer from "./features/authSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
});

export default rootReducer;