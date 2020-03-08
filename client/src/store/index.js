import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		token: null,
		isUserLoggedIn: false,
		isAdmin: false
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			if (token) {
				state.isUserLoggedIn = true;
			} else {
				state.isUserLoggedIn = false;
			}
		},
		setUserRights(state, role) {
			if (role === "admin") {
				state.isAdmin = true;
			} else {
				state.isAdmin = false;
			}
		}
	},
	actions: {
		setToken({ commit }, token) {
			commit("setToken", token);
		},
		setUserRights({ commit }, role) {
			commit("setUserRights", role);
		}
	}
});
