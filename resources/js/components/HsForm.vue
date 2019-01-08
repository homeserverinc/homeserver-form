<template>
    <div>
        <div class="alert alert-success" v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i>  Loading...
        </div>
        <div v-else>
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
                    <div class="float-right">
                        <button class="btn hs-btn-prev hs-btn-prev" @click="previousQuestion">Previous</button>
                        <button class="btn hs-btn-next hs-btn-next" @click="nextQuestion">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
