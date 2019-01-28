<template>
    <div style="overflow: hidden">
        <transition name="load-transition" mode="out-in">
            <div class="alert alert-success" v-if="isLoading" style="position: absolute; margin: auto; width: 100%; z-index=1000" key="0">
                <i class="fas fa-spinner fa-spin"></i>  Loading...
            </div>
        </transition>
        <hs-notifications></hs-notifications>
        <transition name="fade" mode="out-in" appear>
            <div v-if="!isLoading" key="1">
                <hs-services-field v-if="!finishedQuiz"></hs-services-field>
                <div class="card hs-card">
                    <div class="card-header hs-card-header">
                        <span class="hs-card-title">{{title}}</span>
                        <span class="float-right alert alert-success hs-card-title-phone" v-if="phone">
                            <i class="fas fa-phone"></i>
                            {{ phone }}
                        </span>
                    </div>
                    <hs-progress></hs-progress>
                    <div class="card-body hs-card-body">
                        <hs-question v-if="!finishedQuiz"></hs-question>
                        <hs-personal-data v-if="showingPersonalDataForm"></hs-personal-data>
                        <hs-quiz-review v-if="showingReviewData"></hs-quiz-review>
                    </div>
                    <div class="card-footer hs-card-footer">
                        <div class="float-left">
                            <transition  name="fade" key="2">
                                <button class="btn hs-btn-prev" v-if="showPrevBtn" @click="previousQuestion">{{prevBtnText}}</button>
                            </transition>
                        </div>
                        <div v-if="showPrevBtn" class="m-1 float-left"></div>
                        <div class="float-left">
                            <transition  name="fade" key="3">
                                <button class="btn hs-btn-next" v-if="showNextBtn" @click="nextQuestion">{{nextBtnText}}</button>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
    
    .hs-card-header {
        padding: 0 !important;
    }

    .hs-card-title {
        margin: 0.75rem 1.25rem !important;
        position: absolute;
    }

    .hs-card-title-phone {
        margin-bottom: 0 !important;
    }

    .fade-leave-active,
    .fade-enter-active {
        transition: .8s ease;
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .load-transition-leave-active,
    .load-transition-enter-active {
        transition: .8s ease;
        opacity: 1;
    }
    .load-transition-enter {
        transform: translateY(-60px);
        opacity: 0;
    }
    .load-transition-leave {
        position: absolute;
    }
    .load-transition-leave-to {
        transition: .5s ease;
        transform: translateY(-60px);
        opacity: 0;
    }
</style>

<script>
import hsServicesField from './HsServicesField';
import hsQuestion from './HsQuestion';
import hsProgress from './form_controls/HsProgress';
import hsQuizReview from './HsQuizReview';
import hsNotifications from './HsNotifications';
import hsPersonalData from './HsPersonalData';

export default {
    props: {
        title: String,
        siteUuid: String,
        phoneNumber: String
    },
    components: {
        'hs-services-field': hsServicesField,
        'hs-question': hsQuestion,
        'hs-progress': hsProgress,
        'hs-quiz-review': hsQuizReview,
        'hs-notifications': hsNotifications,
        'hs-personal-data': hsPersonalData
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }, 
        showPrevBtn() {
            return this.$store.getters.showPrevBtn;
        },
        showNextBtn() {
            return true;//this.$store.state.finishedQuiz;
        },
        finishedQuiz() {
            return this.$store.state.finishedQuiz;
        },
        phone() {
            return this.phoneNumber || this.$store.state.site.phone.friendly_name;
        },
        showingPersonalDataForm() {
            return this.$store.state.showingPersonalDataForm;
        },
        showingReviewData() {
            return this.$store.state.showingReviewData;
        },
        nextBtnText() {
            return (this.showingReviewData) ? 'Submit the projext' : 'Next';
        },
        prevBtnText() {
            return (this.showingReviewData) ? 'Go back' : 'Previous';
        }
    },
    methods: {
        nextQuestion() {
            if (!this.finishedQuiz) {
                if (this.validateAnswer()) {
                    return this.$store.dispatch('goToNextQuestion');
                } else {
                    this.$store.dispatch('addNotification', {
                        title: 'Question is not answered.',
                        text: 'No answer selected. Please, verify before go ahead.',
                        type: 'danger',
                        duration: 8000
                    });
                }
            } else {
                if (this.$store.state.showingPersonalDataForm) {
                    this.$store.dispatch('personal/validateForm')
                    if (!this.$store.state.personal.errors.has) {
                        this.$store.dispatch('sendLeadData');
                        this.$store.dispatch('setShowingReviewData', true);
                    }
                } else if (this.$store.state.showingReviewData) {
                    this.$store.dispatch('sendLeadData', true);
                }
            }
        },
        previousQuestion() {
            if (this.$store.state.showingReviewData) {
                this.$store.dispatch('setShowingReviewData', false);
            } else {
                if (this.showingPersonalDataForm) {
                    this.$store.commit('SET_SHOWING_PERSONAL_DATA_FORM', false);
                }
                return this.$store.dispatch('goToPrevQuestion');
            }
        },
        validateAnswer() {
            return this.$store.getters.questionAnswered;
        }
    },
    mounted() {
        this.$store.dispatch('getSite', this.siteUuid);
    }
}
</script>
