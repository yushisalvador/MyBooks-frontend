import { createStore } from "vuex";

const state = {
  user: null || JSON.parse(sessionStorage.getItem("user")),
};

const store = createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  actions: {
    SET_USER(context, user) {
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
