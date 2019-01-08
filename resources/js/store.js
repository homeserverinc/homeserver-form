import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Axios from 'axios';
import { QUESTION_TYPES, ANSWER_TYPES } from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        quiz: {},
        currentQuestion: {},
        answeredQuestions: [],
        services: [],
        service: {},
        site: {},
        answerTypes: {},
        questionTypes: {},
        isLoading: false
    },
    getters: {
        singleChoiceQuestion: (state) => {
            if (typeof state.currentQuestion.question_type != 'undefined') {
                return (state.currentQuestion.question_type.uuid === state.questionTypes.SINGLE_CHOICE);
            } else {
                return false;
            }
        },
        question: (state) => (uuid) => {
            if (state.quiz.questions != 'undefined') {
                if (state.quiz.questions.length > 0) {
                    return state.quiz.questions.find(question => question.uuid === uuid);
                } else {
                    return {}
                }
            } else {
                return {}
            }
        },
        answers: (state) => {
            if (typeof state.currentQuestion.answers !== 'undefined') {
                return state.currentQuestion.answers.sort((a, b) => {
                    return a.answer_order - b.answer_order;
                });
            } else {
                return false
            }
        },
        answer: (state) => (uuid) => {
            if (typeof state.currentQuestion.answers !== 'undefined') {
                return state.currentQuestion.answers.find(answer => answer.uuid === uuid);
            } else {
                return false
            }
        },
        answerIsSelected: (state, getters) => (uuid) => {
            if (getters.singleChoiceQuestion) { 
                    return state.currentQuestion.selected_answers;
            } else {
                if (Array.isArray(state.currentQuestion.selected_answers)) {
                        return state.currentQuestion.selected_answers.find(answer => answer.uuid === uuid);
                } else {
                    return false;
                }
            }
        },
        questionAnswered: (state) => {
            if (Array.isArray(state.currentQuestion.selected_answers)) {
                console.log(state.currentQuestion.selected_answers);
                return (state.currentQuestion.selected_answers.length > 0) ? true : false;
            } else {
                return (state.currentQuestion.selected_answers) ? state.currentQuestion.selected_answers.hasOwnProperty('uuid') : false; 
            }
        },
        nextQuestion: (state, getters) => {
            if (typeof state.currentQuestion.question_type != 'undefined') {
                if (state.currentQuestion.question_type.uuid === state.questionTypes.SINGLE_CHOICE) {
                    let answer = getters.answer(state.currentQuestion.selected_answers.uuid);
                    return (answer) ? getters.question(answer.next_question_uuid) : false;
                } else {
                    let nq = state.currentQuestion.next_question_uuid
                    return  (nq) ? getters.question(nq) : false;
                }
            }
        },
        prevQuestion: (state) => {
            return state.answeredQuestions.slice(-1)[0];
        },
        progressMax: (state) => {
            return 0;//(state.quiz.questions != 'undefined') ? state.quiz.questions.length : 0;
        },
        progressCurrent: (state, getters) => {
            return 0; //TODO
        }
    },
    actions: {
        getSite({ commit, dispatch }, siteUuid) {
            commit('SET_LOADING_STATE', true);
            Axios
                .get('/site/'+siteUuid)
                .then(async r => r.data.data)
                .then(site => {
                    commit('SET_SITE', site);
                    commit('SET_ANSWER_TYPES', ANSWER_TYPES);
                    commit('SET_QUESTION_TYPES', QUESTION_TYPES);
                    dispatch('getServices');
                   // commit('SET_LOADING_STATE', false);
                });
        },
        getServices({commit, dispatch, state}) {
            //commit('SET_LOADING_STATE', true);
            Axios
                .get('/services/'+state.site.uuid)
                .then(async r => r.data.data)
                .then(services => {
                    commit('SET_SERVICES', services);
                    if (services.length == 1) {
                        commit('SET_SELECTED_SERVICE', services[0].uuid);
                        dispatch('getQuiz');
                    } else {
                        commit('SET_LOADING_STATE', false);
                    }
                    //commit('SET_LOADING_STATE', false);
                });
        },
        getQuiz({commit, dispatch, state}) {
            commit('SET_LOADING_STATE', true);
            Axios
                .get('/quiz/'+state.service)
                .then(async r => r.data.data)
                .then(quiz => {
                    commit('SET_QUIZ', quiz);
                    dispatch('getQuestion');
                    commit('SET_LOADING_STATE', false);
                });
        },
        getQuestion({commit, state, getters}, uuid = null) {
            if (uuid === null) {
                commit('SET_CURRENT_QUESTION', getters.question(state.quiz.first_question_uuid));
            } else {
                commit('SET_CURRENT_QUESTION', getters.question(uuid));
            }
        },
        setSelectedService({commit, dispatch}, service) {
            commit('SET_SELECTED_SERVICE', service);
            dispatch('getQuiz');
        },
        setSelectedAnswer({commit}, answer) {
            commit('SET_SELECTED_ANSWER', answer);
        },
        selectCheckboxes({commit, state}, answer) {
            if (!Array.isArray(state.currentQuestion.selected_answers)) {
                commit('INIT_SELECTED_ANSWERS')
            }
            if (answer.checked) {
                commit('ADD_CHECKED_ANSWER', {uuid: answer.value});
            } else {
                commit('DEL_CHECKED_ANSWER', answer.value);
            }
        },
        setCustomText({commit}, customText) {
            commit('SET_CUSTOM_TEXT', customText);
        },
        goToNextQuestion({commit, getters}) {
            commit('ADD_ANSWERED_QUESTION');
            commit('SET_CURRENT_QUESTION', getters.nextQuestion);
        },
        goToPrevQuestion({commit, getters}) {
            let prevq = getters.prevQuestion;
            commit('SET_CURRENT_QUESTION', getters.question(prevq.uuid));
            commit('SET_SELECTED_ANSWER', prevq.selected_answers);
            commit('POP_ANSWERED_QUESTION');
        }
    },
    mutations: {
        CHECK_ANSWER(state, answer) {
            state.checkedAnswers = answer;
        },
        SET_ANSWER_TYPES(state, answerTypes) {
            state.answerTypes = answerTypes;
        },
        SET_QUESTION_TYPES(state, questionTypes) {
            state.questionTypes = questionTypes;
        },
        SET_SITE(state, site) {
            state.site = site;
        },
        SET_SERVICES(state, services) {
            state.services = services;
        },
        SET_SELECTED_SERVICE(state, service) {
            state.service = service;
        },
        SET_QUIZ(state, quiz) {
            state.quiz = quiz;
        },
        SET_CURRENT_QUESTION(state, question) {
            state.currentQuestion = question;
        },
        SET_SELECTED_ANSWER(state, answer) {
            state.currentQuestion.selected_answers = answer;
        },
        SET_CUSTOM_TEXT(state, customText) {
            state.currentQuestion.customText = customText;
        },
        ADD_ANSWERED_QUESTION(state) {
            state.answeredQuestions.push(state.currentQuestion);
        },
        INIT_SELECTED_ANSWERS(state) {
            state.currentQuestion.selected_answers = [];
        },
        ADD_CHECKED_ANSWER(state, answer) {
            state.currentQuestion.selected_answers.push(answer);
        },
        DEL_CHECKED_ANSWER(state, answer) {
            state.currentQuestion.selected_answers = state.currentQuestion.selected_answers.filter(a => a.uuid != answer);
        },
        POP_ANSWERED_QUESTION(state) {
            state.answeredQuestions.pop();
        },
        SET_LOADING_STATE(state, isLoading) {
            state.isLoading = isLoading;
        }
    }
});