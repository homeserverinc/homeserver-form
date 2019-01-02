<template>
    <div>
        <hs-services-field></hs-services-field>
        <div class="card hs-card">
            <div class="card-header hs-card-header">
                <span class="hs-card-title">{{title}}</span>
            </div>
            <div class="card-body hs-card-body">
                <hs-question></hs-question>
            </div>
            <div class="card-footer hs-card-footer">
                <div class="float-right">
                    <button class="btn hs-btn-prev">Previous</button>
                    <button class="btn hs-btn-next" @click="nextQuestion">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hsServicesField from './HsServicesField';
import hsQuestion from './HsQuestion';

export default {
    props: {
        title: String,
        siteUuid: String
    },
    components: {
        'hs-services-field': hsServicesField,
        'hs-question': hsQuestion
    },
    methods: {
        nextQuestion() {
            if (this.validateAnswer()) {
                /* return this.$store.dispatch('nextQuestion'); */
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
