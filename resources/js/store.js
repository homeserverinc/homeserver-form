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
        questionTypes: {}
    },
    getters: {
        question: (state) => (uuid) => {
            if (state.quiz.questions.length > 0) {
                return state.quiz.questions.find(question => question.uuid === uuid);
            } else {
                return {}
            }
        },
        answer: (state) => (uuid) => {
            if (state.currentQuestion.answers.length > 0) {
                return state.currentQuestion.answers.find(answer => answer.uuid === uuid);
            } else {
                return {}
            }
        },
        answerIsSelected: (state) => (uuid) => {
            return (state.currentQuestion.selected_answers === uuid);
        },
        questionAnswered: (state) => {
            return (state.currentQuestion.selected_answers);
        },
        nextQuestion: (state, getters) => {
            let answer = getters.answer(state.currentQuestion.selected_answers);
            return getters.question(answer.next_question_uuid);
        }
    },
    actions: {
        getSite({ commit, dispatch }, siteUuid) {
            Axios
                .get('/site/'+siteUuid)
                .then(async r => r.data.data)
                .then(site => {
                    commit('SET_SITE', site);
                    commit('SET_ANSWER_TYPES', ANSWER_TYPES);
                    commit('SET_QUESTION_TYPES', QUESTION_TYPES);
                    dispatch('getServices');
                });
        },
        getServices({commit, state}) {
            Axios
                .get('/services/'+state.site.uuid)
                .then(async r => r.data.data)
                .then(services => {
                    commit('SET_SERVICES', services);
                });
        },
        getQuiz({commit, dispatch, state}) {
            Axios
                .get('/quiz/'+state.service)
                .then(async r => r.data.data)
                .then(quiz => {
                    console.log(quiz);
                    commit('SET_QUIZ', quiz);
                    dispatch('getQuestion');
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
        setSelectedRadio({commit}, uuid) {
            commit('SET_SELECTED_ANSWER_RADIO', uuid);
        },
        setRadioCustomText({commit}, customText) {
            commit('SET_RADIO_CUSTOM_TEXT', customText);
        },
        nextQuestion({commit, state, getters}) {
            //console.log(state.currentQuestion.selected_answers);

            commit('ADD_ANSWERED_QUESTION');

            //console.log(getters.question(state.currentQuestion.selected_answers));

            commit('SET_CURRENT_QUESTION', getters.nextQuestion);
        }
    },
    mutations: {
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
        SET_SELECTED_ANSWER_RADIO(state, uuid) {
            state.currentQuestion.selected_answers = uuid;
        },
        SET_RADIO_CUSTOM_TEXT(state, customText) {
            state.currentQuestion.customText = customText;
        },
        ADD_ANSWERED_QUESTION(state) {
            state.answeredQuestions.push(state.currentQuestion);
        }
    }
});