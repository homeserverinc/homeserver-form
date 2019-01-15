<template>
    <div style="overflow: hidden">
        <transition name="load-transition" mode="out-in">
            <div class="alert alert-success" v-if="isLoading" style="position: absolute; margin: auto; width: 100%; z-index=1000" key="0">
                <i class="fas fa-spinner fa-spin"></i>  Loading...
            </div>
        </transition>
        <hs-notifications></hs-notifications>

        <!-- <transition name="load-transition" mode="out-in">
            <div class="alert alert-danger" v-if="isLoading" style=" margin: auto; width: 100%; z-index=1">
                <i class="fas fa-alert"></i>  Exemplo de mensagem de erro
            </div>
        </transition> -->

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
                        <!-- <hs-personal-data></hs-personal-data> -->
                        <hs-quiz-review v-else></hs-quiz-review>
                    </div>
                    <div class="card-footer hs-card-footer">
                        <div class="float-left">
                            <transition  name="fade" key="2">
                                <button class="btn hs-btn-prev hs-btn-prev" v-if="showPrevBtn" @click="previousQuestion">Previous</button>
                            </transition>
                        </div>
                        <div class="float-right">
                            <transition  name="fade" key="3">
                                <button class="btn hs-btn-next hs-btn-next" v-if="showNextBtn" @click="nextQuestion">Next</button>
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
        siteUuid: String
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
            return !this.$store.state.finishedQuiz;
        },
        finishedQuiz() {
            return this.$store.state.finishedQuiz;
        },
        phone() {
            return this.$store.state.site.phone.friendly_name;
        }
    },
    methods: {
        nextQuestion() {
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
        },
        previousQuestion() {
            return this.$store.dispatch('goToPrevQuestion');

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
