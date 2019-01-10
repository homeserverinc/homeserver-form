<template>
    <div style="overflow: hidden">
        <transition name="load-transition" mode="out-in">
            <div class="alert alert-success" v-if="isLoading" style="position: absolute; margin: auto; width: 100%; z-index=1001">
                <i class="fas fa-spinner fa-spin"></i>  Loading...
            </div>
        </transition>

        <div v-if="!isLoading">
            <hs-services-field></hs-services-field>
            <div class="card hs-card">
                <div class="card-header hs-card-header">
                    <span class="hs-card-title">{{title}}</span>
                </div>
                <hs-progress></hs-progress>
                <div class="card-body hs-card-body">
                    <hs-question></hs-question>
                </div>
                <div class="card-footer hs-card-footer">
                    <div class="float-left">
                        <transition appear name="fade">
                            <button class="btn hs-btn-prev hs-btn-prev" v-if="showPrevBtn" @click="previousQuestion">Previous</button>
                        </transition>
                    </div>
                    <div class="float-right">
                        <transition appear name="fade">
                            <button class="btn hs-btn-next hs-btn-next" v-if="showNextBtn" @click="nextQuestion">Next</button>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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
    .load-transition-leave-to {
        transition: 5s ease;
        transform: translateY(-60px);
        opacity: 0;
    }
</style>

<script>
import hsServicesField from './HsServicesField';
import hsQuestion from './HsQuestion';
import hsProgress from './form_controls/HsProgress';

export default {
    props: {
        title: String,
        siteUuid: String
    },
    components: {
        'hs-services-field': hsServicesField,
        'hs-question': hsQuestion,
        'hs-progress': hsProgress
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
        }
    },
    methods: {
        nextQuestion() {
            if (this.validateAnswer()) {
                return this.$store.dispatch('goToNextQuestion');
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
