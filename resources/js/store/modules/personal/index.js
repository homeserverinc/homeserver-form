import { getField, updateField } from 'vuex-map-fields';

var getAddressPart = (obj, part, shortName = true) => {
    let addr = (obj !== null) ? obj.address_components.find(a => a.types.includes(part)) : undefined;
    if (addr === undefined) {
        return undefined;
    } else {
        return (shortName) ? addr.short_name : addr.long_name;
    }
}  

const INIT_PERSONAL_STATE = {
    additionalInfo: null,
    deadline: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    address: {
        street: null,
        city: null,
        state: null,
        zip: null,
        apiResObj: null,
    },
    errors: {
        has: false,
        fields: []
    } 
}


const state = {
    additionalInfo: null,
    deadline: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    address: {
        street: null,
        city: null,
        state: null,
        zip: null,
        apiResObj: null,
    },
    errors: {
        has: false,
        fields: []
    } 
}

const getters = {
    getField,
}

const actions = {
    getAddressFromApi({commit, dispatch}, value) {
        commit('apiResObj', value);
        commit('street', value.name);
        let cityPart = (getAddressPart(value, 'locality') === undefined) ? getAddressPart(value, 'administrative_area_level_2') : getAddressPart(value, 'locality');
        let statePart =  getAddressPart(value, 'administrative_area_level_1'); 
        let zipPart = getAddressPart(value, 'postal_code')
        commit('city', cityPart);
        commit('state', statePart);
        commit('zip', zipPart);
    },
    validateForm({commit, state}) {
        commit('clearErrors');
        if (state.deadline === null) {
            commit('addError', 'deadline')
        }
        if (state.firstName === null || state.firstName.length < 3) {
            commit('addError', 'firstName');
        }
        if (state.lastName === null || state.lastName.length < 3) {
            commit('addError', 'lastName');
        }
        if (state.phoneNumber === null || state.phoneNumber.length != 14) {
            commit('addError', 'phoneNumber');
        }
        if (state.email === null || state.email.length < 3) {
            commit('addError', 'email');
        }
        if (state.address.street === null || state.address.street.length < 3) {
            commit('addError', 'street');
        }
        if (state.address.city === null || state.address.city.length < 3) {
            commit('addError', 'city');
        }
        if (state.address.state === null || state.address.state.length < 2) {
            commit('addError', 'state');
        }
        if (state.address.zip === null || state.address.zip.length < 5) {
            commit('addError', 'zip');
        }
    }
}

const mutations = {
    updateField,
    resetState(state) {
        state = Object.assign(state, INIT_PERSONAL_STATE);
    },
    apiResObj(state, value) {
        state.address.apiResObj = value;
    },
    street(state, value) {
        state.address.street = value;
    },
    city(state, value) {
        state.address.city = value;
    },
    state(state, value) {
        state.address.state = value;
    },
    zip(state, value) {
        state.address.zip = value;
    },
    clearErrors(state) {
        state.errors = {
            has: false,
            fields: []
        }
    },
    addError(state, field) {
        state.errors.has = true;
        state.errors.fields.push(field);
    }
}

const namespaced = true;

export default {    
    namespaced,
    state,
    getters,
    actions,
    mutations
}