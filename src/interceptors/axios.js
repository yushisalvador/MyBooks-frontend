import { router } from "@/main";
import axios from "axios";
import store from "../vuex";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${store.getters.user.accessToken}`;

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

      // if refreshing doesn't work
      if (!status) {
        store.dispatch("LOGOUT_USER");
        router.replace("/login");
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);
