import axios from "axios";
import store from "../vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let refresh = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403 && !refresh) {
      refresh = true;

      const { status, data } = axios.post("auth/token", {
        username: store.getters.user.username,
        refreshToken: store.getters.user.refreshToken,
      });

      if (status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        return axios.request(error.config);
      } else if (status === 403) {
        axios.delete(`auth/logout?id=${store.getters.user.id}`);
        sessionStorage.clear();
        this.$router.push("/login");
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);
