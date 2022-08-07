import axios from "axios";
import store from "../vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let refresh = false;

axios.interceptors.response.use(
  (resp) => {
    console.log("interceptor success path");
    console.log("header: ", axios.defaults.headers.common["Authorization"]);
    return resp;
  },
  async (error) => {
    console.log("interceptor error path");
    console.log("header: ", axios.defaults.headers.common["Authorization"]);
    console.log("status: ", error.response.status);
    console.log("refresh boolean: ", refresh);
    if (error.response.status === 403 && !refresh) {
      refresh = true;
      console.log("calling axios post with: ", {
        username: store.getters.user.username,
        refreshToken: store.getters.user.refreshToken,
      });

      const { status, data } = await axios.post("auth/token", {
        username: store.getters.user.username,
        refreshToken: store.getters.user.refreshToken,
      });

      console.log("response from axios post:", { status: status, data: data });

      if (status === 200) {
        console.log(
          "header right before update: ",
          axios.defaults.headers.common["Authorization"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        console.log(
          "header right after update: ",
          axios.defaults.headers.common["Authorization"]
        );
        console.log("calling axios again with new accessToken");
        return axios.request(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
