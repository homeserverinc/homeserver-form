import { getField, updateField } from "vuex-map-fields";

var getAddressPart = (obj, part, shortName = true) => {
	let addr =
		obj !== null
			? obj.address_components.find(a => a.types.includes(part))
			: undefined;
	if (addr === undefined) {
		return undefined;
	} else {
		return shortName ? addr.short_name : addr.long_name;
	}
};

const state = {
	apiResObj: {},
	address: {
		street: "",
		city: "",
		state: "",
		zip: ""
	}
};

const getters = {
	getField
};

const actions = {
	getAddressFromApi({ commit }, value) {
		commit("apiResObj", value);
		commit("street", value.name);
		let cityPart =
			getAddressPart(value, "locality") === undefined
				? getAddressPart(value, "administrative_area_level_2")
				: getAddressPart(value, "locality");
		let statePart = getAddressPart(value, "administrative_area_level_1");
		let zipPart = getAddressPart(value, "postal_code");
		commit("city", cityPart);
		commit("state", statePart);
		commit("zip", zipPart);
	}
};

const mutations = {
	updateField,
	apiResObj(state, payload) {
		state.apiResObj = payload;
	},
	street(state, payload) {
		state.address.street = payload;
	},
	city(state, payload) {
		state.address.city = payload;
	},
	state(state, payload) {
		state.address.state = payload;
	},
	zip(state, payload) {
		state.address.zip = payload;
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
