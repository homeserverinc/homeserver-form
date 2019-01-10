<template>
    <div v-if="showMe">
        <div class="custom-control custom-checkbox hs-input">
            <input type="checkbox" class="custom-control-input hs-input-check" 
                :id="answer.uuid" 
                :value="answer.uuid" 
                :checked="checkedAnswer"
                @change="selectAnswer">
            <label class="custom-control-label hs-label" :for="answer.uuid">{{ answer.answer }}</label>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        uuid: String
    },
    methods: {
        selectAnswer(e) {
            this.$store.dispatch('selectCheckboxes', e.target);
        }
    },
    computed: {
        checkedAnswer() {
            if (Array.isArray(this.$store.state.currentQuestion.selected_answers)) {
                let x = this.$store.state.currentQuestion.selected_answers.find(a => a.uuid === this.uuid)
                return (x) ? x.uuid : false;
            }

        },
        answer() {
            return this.$store.getters.answer(this.uuid);
        },
        showMe() {
            return (
                (this.answer.answer_type_uuid === this.$store.state.answerTypes.MULTIPLE_CHOICE) ||
                (this.answer.answer_type_uuid === this.$store.state.answerTypes.MULTIPLE_CHOICE_TEXT)
            )
        }
    }
}
</script>