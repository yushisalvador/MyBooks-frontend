import { createStore } from "vuex";

const state = {
  user: sessionStorage.getItem("user") || null,
  token: sessionStorage.getItem("token") || null,
};

const store = createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
});

export default store;
