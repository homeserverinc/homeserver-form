import { getField, updateField } from "vuex-map-fields";

const state = {
	deadlines: [
		{
			value: "im-flexible",
			label: "I'm flexible"
		},
		{
			value: "within-48-hours",
			label: "Within 48 hours"
		},
		{
			value: "within-a-week",
			label: "Within a week"
		},
		{
			value: "within-a-month",
			label: "Within a mouth"
		},
		{
			value: "within-a-year",
			label: "Within a year"
		}
	],
	deadline: null,
	projectDetails: ""
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
