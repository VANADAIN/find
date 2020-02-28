import Vue from "vue";
import Vuex from "vuex";
import pageForm from "./modules/pageForm";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pageForm
	}
});
