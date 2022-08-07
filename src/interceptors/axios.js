import axios from "axios";
import store from "../vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let refresh = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403 && !refresh) {
      refresh = true;

      const { status, data } = await axios.post("auth/token", {
        username: store.getters.user.username,
        refreshToken: store.getters.user.refreshToken,
      });

      if (status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        return axios.request(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
