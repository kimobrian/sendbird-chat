import {
  INIT_PROFILE,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "./types";
import { sbGetCurrentInfo, sbUpdateProfile } from "../sendbirdActions";

export const initProfile = () => ({ type: INIT_PROFILE });

export const getCurrentUserInfo = () => ({
  type: GET_PROFILE_SUCCESS,
  userInfo: sbGetCurrentInfo(),
});

export const updateProfile = nickname => (dispatch) => {
  sbUpdateProfile(nickname)
    .then(user => updateSuccess(dispatch, user))
    .catch(error => updateFail(dispatch, error));
};

const updateFail = (dispatch, error) => {
  dispatch({
    type: UPDATE_PROFILE_FAIL,
    error,
  });
};

const updateSuccess = (dispatch, user) => {
  dispatch({
    type: UPDATE_PROFILE_SUCCESS,
    userInfo: sbGetCurrentInfo(),
  });
};
