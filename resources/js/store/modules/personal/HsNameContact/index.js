import { getField, updateField } from "vuex-map-fields";

const state = {
	firstName: "",
	lastName: "",
	email: "",
	phone: ""
};

const getters = {
	getField
};

const actions = {};

const mutations = {
	updateField
};

const namespaced = true;

export default {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
