<template>
    <div v-if="showMe">
        <div class="custom-control custom-radio hs-input">
            <input type="radio" :id="answer.uuid" name="answerRadio" class="custom-control-input hs-input-radio" :value="answer.uuid" v-model="selectAnswer">
            <label class="custom-control-label hs-label" :for="answer.uuid">{{answer.answer}}</label>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        uuid: String
    },
    computed: {
        selectAnswer: {
            get() {
                return this.$store.getters.answerIsSelected(this.uuid).uuid;
            },
            set(value) {
                this.$store.dispatch('setSelectedAnswer', { 'uuid': this.uuid });
            }
        },
        answer() {
            return this.$store.getters.answer(this.uuid);
        },
        showMe() {
            return (
                (this.answer.answer_type_uuid === this.$store.state.answerTypes.SINGLE_CHOICE) ||
                (this.answer.answer_type_uuid === this.$store.state.answerTypes.SINGLE_CHOICE_TEXT)
            )
        }
    }
}
</script>