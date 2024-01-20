import axios from "axios";
import {
  GET_Data_Error,
  GET_Data_Success,
  GET_Data_request,
} from "./actionTypes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const get_Data_request = () => {
  return {
    type: GET_Data_request,
  };
};
const get_Data_success = (payload) => {
  return {
    type: GET_Data_Success,
    payload,
  };
};

const get_Data_Error = () => {
  return {
    type: GET_Data_Error,
  };
};

export const Datafunc =
  (params = {}) =>
  (dispatch) => {
    dispatch(get_Data_request());

    axios
      .get(`https://brainstorm-t5ek.onrender.com/api/app/capsule`, params)
      .then((res) => {
        // console.log(res.data.capsules);
        dispatch(get_Data_success(res.data.capsules));
      })
      .catch((err) => {
        dispatch(get_Data_Error);
      });
  };

export const SingleDatafunc = (id) => (dispatch) => {
  dispatch(get_Data_request());

  axios
    .get(`https://brainstorm-t5ek.onrender.com/api/app/capsules/${id}`)
    .then((res) => {
      // console.log(res.data);
      dispatch(get_Data_success(res));
    })
    .catch((err) => {
      dispatch(get_Data_Error("Something went wrong"));
    });
};

export const getdataData = (params = {} ,query, filter) => (dispatch) => {
  if (filter === "") {
    dispatch(get_Data_request());
    axios
      .get(`https://brainstorm-t5ek.onrender.com/api/app/capsule?Original_lunches=${query}&status=${query}&type=${query}`, params)
      .then((res) => {
        dispatch(get_Data_success(res.data.capsules));
        console.log(res.data.capsules)
      })
      .catch((e) => {
        dispatch(get_Data_Error(e));
      });
  } else {
    dispatch(get_Data_request());
    axios
      .get(`https://brainstorm-t5ek.onrender.com/api/app/capsule?q=${filter}`)
      .then((res) => {
        dispatch(get_Data_success(res.data.capsules));
        console.log(res.data.capsules)
      })
      .catch((e) => {
        dispatch(get_Data_Error(e));
      });
  }
};
<ToastContainer position="top-right" />;
