<template>
    <div v-if="question">
        <h1>{{ question.question }}</h1>
        <div class="list-group">
            <div v-for="(answer, index) in question.answers" :key="index" class="list-group-item list-group-item-action">
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
            //console.log(this.$store.state.currentQuestion);
            return this.$store.state.currentQuestion;
        }
    }
}
</script>
