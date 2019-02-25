import Axios from "axios";

const state = {
	category: {},
	categories: []
};

const getters = {};

const actions = {
	apiGetCategories({ state, rootState, commit }, siteUuid) {
		if (!rootState.isLoading) {
			commit("setLoading", true, { root: true });
		}
		Axios.get("/categories/" + siteUuid)
			.then(async r => {
				commit("setCategories", r.data.data);
				if (state.categories.length == 1) {
					commit("setCategory", state.categories[0]);
				} else {
					commit("setLoading", false, { root: true });
				}
			})
			.catch(e => {
				console.log(e);
			});
	},
	selectCategory({ commit, rootState }, categoryUuid) {
		if (!rootState.isLoading) {
			commit("setLoading", true, { root: true });
		}
		commit("setCategory", categoryUuid);
		if (categoryUuid != null) {
			this.dispatch("HsQuiz/apiGetQuiz", categoryUuid);
		}
	}
};

const mutations = {
	setCategories(state, payload) {
		state.categories = payload;
	},
	setCategory(state, payload) {
		state.category = state.categories.find(
			category => category.uuid === payload
		);
	}
};

const namespaced = true;

export default {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
