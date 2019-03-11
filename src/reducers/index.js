import { combineReducers } from "redux";
import login from "./loginReducer";
import menu from "./menuReducer";
import profile from "./profileReducer";
import openChannel from "./openChannelReducer";

export default combineReducers({
  login,
  menu,
  profile,
  openChannel
});
