import axios from "axios";
import { createStore } from "vuex";
import { router } from "./main";

const state = {
  user: null || JSON.parse(sessionStorage.getItem("user")),
  books: [],
  userBooks: [],
  errorMessage: null,
};

const store = createStore({
  state,

  getters: {
    user: (state) => {
      return state.user;
    },
    books: (state) => {
      return state.books;
    },
    userBooks: (state) => {
      return state.userBooks;
    },
    errorMessage: (state) => {
      return state.error;
    },
  },

  actions: {
    // AUTH
    async LOGIN_USER({ commit }, user) {
      try {
        const response = await axios.post("auth/login", user);
        const userData = response.data;
        sessionStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
        commit("user", userData);
      } catch (error) {
        let message;
        const status = error.response.status;
        if (status === 401) {
          message =
            "Could not verify user. Please make sure the password and username are correct.";
          commit("setErrorMessage", message);
        } else if (status === 404) {
          message =
            "Could not find user. Please make sure the username is correct.";
          commit("setErrorMessage", message);
        } else {
          message = error;
          commit("setErrorMessage", message);
        }
      }
    },

    async LOGOUT_USER({ commit }) {
      try {
        await axios.delete(`auth/logout?id=${state.user.id}`);
        commit("logout");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        router.push("/login");
      } catch (error) {
        commit("setErrorMessage", error);
      }
    },

    // BOOKS
    async GET_ALL_BOOKS({ commit }) {
      try {
        let books = await axios.get("books");
        commit("setAllBooks", books);
      } catch (error) {
        commit("setErrorMessage", error);
      }
    },

    async GET_USER_BOOKS({ commit }, username) {
      try {
        let myBooks = await axios.get(`books/mybooks?username=${username}`);
        commit("setUserBooks", myBooks);
      } catch (error) {
        if (error.response.status === 403) {
          let message = "Your session expired. Please log in again.";
          commit("setErrorMessage", message);
        } else {
          commit("setErrorMessage", error.response.data);
        }
      }
    },

    async ADD_BOOK({ commit }, book) {
      try {
        await axios.post("books", book);
      } catch (error) {
        if (error.response.status === 403) {
          let message = "Your session expired. Please log in again.";
          commit("setErrorMessage", message);
        } else {
          commit("setErrorMessage", error.response.data);
        }
      }
    },

    async DELETE_BOOK({ commit }, deleteBook) {
      try {
        await axios.delete(`books?id=${deleteBook}`);
        commit("removeBook", deleteBook);
      } catch (error) {
        if (error.response.status === 403) {
          let message = "Your session expired. Please log in again.";
          commit("setErrorMessage", message);
        } else {
          commit("setErrorMessage", error.response.data);
        }
      }
    },

    async UPDATE_BOOK({ commit }, { id, payload }) {
      let message;
      try {
        await axios.put(`books?id=${id}`, payload);
        this.GET_ALL_BOOKS({ commit: commit });
      } catch (error) {
        if (error.response.status === 404) {
          message = "Please complete the form!";
        } else if (error.response.status === 403) {
          message = "Your session expired. Please log in again.";
          commit("setErrorMessage", message);
        } else {
          commit("setErrorMessage", error.response.data);
        }
      }
    },
  },

  mutations: {
    user(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    setAllBooks(state, books) {
      state.books = books;
    },
    removeBook(state, deleteBook) {
      state.books = state.books.filter((book) => book.id !== deleteBook);
    },
    setUserBooks(state, userBooks) {
      state.userBooks = userBooks;
    },
    setErrorMessage(state, error) {
      state.error = error;
    },
  },
});

export default store;
