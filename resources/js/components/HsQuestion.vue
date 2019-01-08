<template>
    <div v-if="question">
        <div class="hs-question">
            <h1>{{ question.question }}</h1>
        </div>
        <div class="list-group hs-answers">
            <div v-for="(answer, index) in answers" :key="index" class="list-group-item list-group-item-action hs-answer">
                <hs-form-input :uuid="answer.uuid">
                </hs-form-input>
            </div>
        </div>
    </div>
</template>

<script>
import hsFormInput from './form_controls/HsFormInput';

export default {
    components: {
        'hs-form-input': hsFormInput
    },
    computed: {
        question() {
            return this.$store.state.currentQuestion;
        },
        answers() {
            return this.$store.getters.answers;
        }
    }
}
</script>
