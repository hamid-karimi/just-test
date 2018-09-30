import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import { push } from "react-router-redux";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import { updateLocalStorage } from "utils/localStorage";

function* login(action) {
  const { data } = action.payload;
  const data1 = { token: Math.random(), setting: "ok" };
  try {
    yield put(loadingAction(constants.LOGIN, true));
    yield put(userAction.setUser(data1));
    yield call(updateLocalStorage);
    // yield put(push("/"));
  } catch (e) {
    console.error("i`m here with error");
  }
}

export function* loginRequestSaga() {
  yield takeEvery(constants.LOGIN_REQUEST, login);
}
export default [loginRequestSaga()];
