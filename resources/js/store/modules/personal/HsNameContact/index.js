import { getField, updateField } from "vuex-map-fields";

const getInitialState = () => {
	return {
		firstName: "",
		lastName: "",
		email: "",
		phone: ""
	}
}

const state = getInitialState();

const getters = {
	getField
};

const actions = {};

const mutations = {
	updateField,
	resetState(state) {
		const s = getInitialState();
		Object.keys(s).forEach(k => state[k] = s[k]);
	},
};

const namespaced = true;

export default {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
