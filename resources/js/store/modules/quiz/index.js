import Axios from "axios";
import { QUESTION_TYPES, ANSWER_TYPES } from "../../../constants";

const getInitialState = () => {
	return {
		quiz: {},
		answeredQuestions: [],
		answerTypes: ANSWER_TYPES,
		questionTypes: QUESTION_TYPES,
		currentQuestion: {
			answers: []
		},
		showQuestionTitle: true,
		currentQuestionAnswered: null
	}
}

const state = getInitialState();

const getters = {
	question: state => uuid => {
		return state.quiz.questions.find(q => q.uuid === uuid);
	},
	answer: state => uuid => {
		return state.currentQuestion.answers.find(a => a.uuid === uuid);
  },
  orderedAnswers: state => {
      return state.currentQuestion.answers.sort((a, b) => {
        return a.answer_order - b.answer_order;
      });
  },
	answerIsSelected: (state, getters) => uuid => {
		if (getters.singleChoiceQuestion) {
			return state.currentQuestion.selected_answers;
		} else {
			if (Array.isArray(state.currentQuestion.selected_answers)) {
				return state.currentQuestion.selected_answers.find(
					answer => answer.uuid === uuid
				);
			} else {
				return null;
			}
		}
	},
	questionAnswered: (state, getters) => uuid => {
		let q = getters.question(uuid);
		if (q.question_type.uuid === state.questionTypes.SINGLE_CHOICE) {
			if (q.selected_answers !== "" && q.selected_answers !== null) {
				let a = getters.answer(q.selected_answers.uuid);
				if (
					a.answer_type_uuid == state.answerTypes.SINGLE_CHOICE_TEXT
				) {
					return q.custom_answer !== "" && q.custom_answer !== null;
				} else {
					return true;
				}
			} else {
				return false;
			}
		} else {
			if (q.selected_answers === null || q.selected_answers === "") {
				return false;
			} else {
				if (q.selected_answers.length > 0) {
					var result = true;
					q.selected_answers.forEach(a => {
						if (getters.answerIsSelected(a.uuid) !== null) {
							let x = getters.answer(a.uuid);
							if (
								x.answer_type_uuid ===
								state.answerTypes.MULTIPLE_CHOICE_TEXT
							) {
								if (
									q.custom_answer === "" ||
									q.custom_answer === null
								) {
									result = false;
								}
							}
						}
					});
					return result;
				} else {
					return false;
				}
			}
		}
	},
	singleChoiceQuestion: state => {
		if (state.currentQuestion !== undefined) {
			if (typeof state.currentQuestion.question_type != "undefined") {
				return (
					state.currentQuestion.question_type.uuid ===
					state.questionTypes.SINGLE_CHOICE
				);
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	nextQuestion: (state, getters) => {
		if (state.currentQuestion !== undefined) {
			if (state.currentQuestion.hasOwnProperty("question_type")) {
				if (
					state.currentQuestion.question_type.uuid ===
					state.questionTypes.SINGLE_CHOICE
				) {
					if (state.currentQuestion.selected_answers === null) {
						return null;
					} else {
						let answer = getters.answer(
							state.currentQuestion.selected_answers.uuid
						);
						return answer
							? getters.question(answer.next_question_uuid)
							: null;
					}
				} else {
					let nq = state.currentQuestion.next_question_uuid;
					return nq ? getters.question(nq) : null;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	prevQuestion: state => {
		return state.answeredQuestions.slice(-1)[0];
	}
};

const actions = {
	apiGetQuiz({ state, commit, getters, rootState }, categoryUuid) {
		if (!rootState.isLoading) {
			commit("setLoading", true, { root: true });
		}
		Axios.get("/quiz/" + categoryUuid)
			.then(async r => {
				commit("setQuiz", r.data.data);
				commit("setCurrentQuestion", getters.question(state.quiz.first_question_uuid));
				commit("setLoading", false, { root: true });
			})
			.catch(e => {
				console.log(e);
			});
	},
	selectCheckboxes({ commit, state }, answer) {
		if (!Array.isArray(state.currentQuestion.selected_answers)) {
			commit("initSelectedAnswers");
		}
		if (answer.checked) {
			commit("addCheckedAnswer", { uuid: answer.value });
		} else {
			commit("delCheckedAnswer", answer.value);
		}
	},
	goToNextQuestion({ commit, state, getters, dispatch }) {
		dispatch("setAnsweredQuestion");
		if (state.currentQuestion.uuid !== getters.nextQuestion.uuid) {
			commit("setCurrentQuestion", getters.nextQuestion);
			commit("setCurrentQuestionAnswered", null);
		}
		commit("setAnswerVisible", true);
		commit("setShowQuestionTitle", true);
	},
	goToPrevQuestion({ commit, state, getters }) {
		if (typeof state.currentQuestion != "undefined") {
			commit("setShowQuestionTitle", false);
			commit("setAnswerVisible", false);
		}
		let prevq = getters.prevQuestion;
		if (prevq.uuid == state.currentQuestion.uuid) {
			commit("setCurrentQuestionAnswered", null);
			commit("setCurrentQuestion", getters.question(prevq.uuid));
			commit("setSelectedAnswer", prevq.selected_answers);
			commit("popAnsweredQuesiton");
		}
		prevq = getters.prevQuestion;
		//console.log(prevq);
		commit("setCurrentQuestionAnswered", null);
		commit("setCurrentQuestion", getters.question(prevq.uuid));
		commit("setSelectedAnswer", prevq.selected_answers);
		commit("popAnsweredQuesiton");
		commit("setAnswerVisible", true);
		commit("setShowQuestionTitle", true);
		commit("setBackDisabled", false, {root: true});
	},
	answerCurrentQuestion({ commit, dispatch, getters }, q) {
		commit("setSelectedAnswer", { uuid: q.uuid });
		if (getters.singleChoiceQuestion) {
			dispatch("next", q.component, { root: true });
		}
	},
	setAnsweredQuestion({ commit }) {
		commit("setShowQuestionTitle", false);
		commit("setAnswerVisible", false);
		commit("addAnsweredQuestion");
	}
};

const mutations = {
	resetState(state) {
		const s = getInitialState();
		Object.keys(s).forEach(k => state[k] = s[k]);
	},
	setQuiz(state, payload) {
		state.quiz = payload;
	},
	setCurrentQuestion(state, payload) {
		state.currentQuestion = payload;
	},
	initSelectedAnswers(state) {
		state.currentQuestion.selected_answers = [];
	},
	addCheckedAnswer(state, answer) {
		state.currentQuestion.selected_answers.push(answer);
	},
	delCheckedAnswer(state, answer) {
		state.currentQuestion.selected_answers = state.currentQuestion.selected_answers.filter(
			a => a.uuid != answer
		);
	},
	setShowQuestionTitle(state, payload) {
		state.showQuestionTitle = payload;
	},
	setCustomText(state, payload) {
		state.currentQuestion.custom_answer = payload;
	},
	setSelectedAnswer(state, payload) {
		state.currentQuestion.selected_answers = payload;
		state.currentQuestionAnswered = true;
	},
	setAnswerVisible(state, payload) {
		state.currentQuestion.answers.forEach(answer => {
			answer.visible = payload;
		});
	},
	addAnsweredQuestion(state) {
		if (
			state.answeredQuestions.some(
				q => q.uuid === state.currentQuestion.uuid
			)
		) {
			state.answeredQuestions = state.answeredQuestions.map(item => {
				if (item.uuid === state.currentQuestion.uuid) {
					item = state.currentQuestion;
				}
				return item;
			});
		} else {
			state.answeredQuestions.push(state.currentQuestion);
		}
	},
	popAnsweredQuesiton(state) {
		state.answeredQuestions.pop();
	},
	setCurrentQuestionAnswered(state, payload) {
		state.currentQuestionAnswered = payload;
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
