import Vue from "vue";
import Vuex from "vuex";

/* modules */
import HsNameContact from "./store/modules/personal/HsNameContact";
import HsAddress from "./store/modules/personal/HsAddress";
import HsDetails from "./store/modules/personal/HsDetails";
import HsQuiz from "./store/modules/quiz";
import HsCategories from "./store/modules/categories";
import Axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		HsNameContact,
		HsAddress,
		HsDetails,
		HsQuiz,
		HsCategories
	},
	state: {
		components: [
			"HsNameContact",
			"HsCategories",
			"HsQuiz",
			"HsAddress",
			"HsDetails",
			"HsQuizReview",
			"HsFinished"
		],
		currentComponentIndex: 0,
		isLoading: true,
		site: {
			phone: {
				frindly_name: false
			}
		},
		suffixTheme: "info",
		enableShadow: false,
		leadUuid: null,
		customerUuid: null
	},
	getters: {
		currentComponent: state => {
			return state.components[state.currentComponentIndex];
		},
		isFirstComponent: state => {
			return state.currentComponentIndex === 0;
		},
		hasNextComponent: state => {
			return state.currentComponentIndex < state.components.length;
		},
		componentIndex: state => component => {
			return state.components.indexOf(component);
		}
	},
	actions: {
		next({ dispatch, getters, state, commit }, component) {
			if (component.$options._componentTag === "HsQuiz") {
				if (getters["HsQuiz/questionAnswered"](state.HsQuiz.currentQuestion.uuid)) {
					if (getters["HsQuiz/nextQuestion"] == null) {
						dispatch("HsQuiz/setAnsweredQuestion");
						dispatch("getNext", component);
					} else {
						dispatch("HsQuiz/goToNextQuestion");
					}
				} else {
					commit("HsQuiz/setCurrentQuestionAnswered", false);
				}
			} else {
				component.$validator.validate().then(async result => {
					if (result) {
						dispatch("getNext", component);
					}
				});
			}
		},
		prev({ state, dispatch, commit }, component) {
			if (component.$options._componentTag === "HsQuiz") {
				if (state.HsQuiz.answeredQuestions.length == 0) {
					commit("HsQuiz/setCurrentQuestionAnswered", null);
					dispatch("getPrev", component);
				} else {
					dispatch("HsQuiz/goToPrevQuestion");
				}
			} else {
				dispatch("getPrev", component);
			}
		},
		getNext({ state, commit, dispatch }, component) {
			let compName = component.$options._componentTag;
			switch (compName) {
				case "HsNameContact":
					if (state.leadUuid === null) {
						dispatch("preLeadStore");
					}
					if (state.HsCategories.categories.length > 1) {
						commit("currentComponentIndex", state.components.indexOf("HsCategories"));
					} else {
						//dispatch("HsCategories/selectCategory", state.HsCategories.categories[0].uuid);
						//dispatch("HsCategories/apiGetCategories", state.siteUuid);
						commit("currentComponentIndex", state.components.indexOf("HsQuiz"));
					}
					break;

				case "HsCategories":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsQuiz")
					);
					break;

				case "HsQuiz":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsAddress")
					);
					break;

				case "HsAddress":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsDetails")
					);
					break;

				case "HsDetails":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsQuizReview")
                    );
                    dispatch("postLead");
					break;
			}
		},
		getPrev({ state, commit }, component) {
			let compName = component.$options._componentTag;
			switch (compName) {
				case "HsCategories":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsNameContact")
					);
					break;

				case "HsQuiz":
					if (state.HsCategories.categories.length > 1) {
						commit(
							"currentComponentIndex",
							state.components.indexOf("HsCategories")
						);
					} else {
						commit(
							"currentComponentIndex",
							state.components.indexOf("HsNameContact")
						);
					}
					break;
				case "HsAddress":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsQuiz")
					);
					break;

				case "HsDetails":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsAddress")
					);
					break;

				case "HsQuizReview":
					commit(
						"currentComponentIndex",
						state.components.indexOf("HsDetails")
					);
					break;
			}
		},
		apiGetSite({ state, commit, dispatch }, siteUuid) {
			if (!state.isLoading) {
				commit("setLoading", true);
			}
			Axios.get("/site/" + siteUuid)
				.then(async r => {
					commit("setSite", r.data.data);
					dispatch("HsCategories/apiGetCategories", state.site.uuid);
				})
				.catch(e => {
					console.log(e);
				});
		},
		preLeadStore({ state, commit }) {
			let postData = {
				customer: {
					first_name: state.HsNameContact.firstName,
					last_name: state.HsNameContact.lastName,
					email1: state.HsNameContact.email,
					phone1: state.HsNameContact.phone
				}
			};
			Axios.post("/pre_lead", qs.stringify(postData))
				.then(async r => {
					commit("setLeadUuid", r.data.data.uuid);
					commit("setCustomerUuid", r.data.data.customer_uuid);
				})
				.catch(e => {
					console.log(e);
				});
		},
		postLead({ state, commit, getters }, verified = false) {
			let postData = {
				lead_uuid: state.leadUuid,
				customer: {
					uuid: state.customerUuid,
					first_name: state.HsNameContact.firstName,
					last_name: state.HsNameContact.lastName,
					email1: state.HsNameContact.email,
					phone1: state.HsNameContact.phone,
					street: state.HsAddress.address.street,
					city: state.HsAddress.address.city,
					state: state.HsAddress.address.state,
					zip: state.HsAddress.address.zip
				},
				category_uuid: state.HsCategories.category.uuid,
				quiz_uuid: state.HsQuiz.quiz.uuid,
				deadline: state.HsDetails.deadline,
				project_details: state.HsDetails.projectDetails,
				questions: state.HsQuiz.answeredQuestions,
				verified_data: verified
			};

			Axios.post("lead", qs.stringify(postData))
				.then(async r => {
					if (verified) {
						commit(
							"currentComponentIndex",
							getters.componentIndex("HsFinished")
						);
					}
				})
				.catch(e => {
					console.log(e);
				});
		}
	},
	mutations: {
		currentComponentIndex(state, payload) {
			state.currentComponentIndex = payload;
		},
		setLoading(state, payload) {
			state.isLoading = payload;
		},
		setSite(state, payload) {
			state.site = payload;
		},
		setSuffixTheme(state, payload) {
			state.suffixTheme = payload;
		},
		enableShadow(state, payload) {
			state.enableShadow = payload;
		},
		setLeadUuid(state, payload) {
			state.leadUuid = payload;
		},
		setCustomerUuid(state, payload) {
			state.customerUuid = payload;
		}
	}
});
