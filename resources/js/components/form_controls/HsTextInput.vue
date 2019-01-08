<template>      
    <div v-if="showMe">
        <div style="margin-bottom: 1rem"></div>
        <textarea class="form-control hs-input-text" v-model="customText" cols="30" rows="5">
        </textarea>
    </div>
</template>

<script>
export default {
    props: {
        uuid: String
    },
    computed: {
        customTextId() {
            return this.uuid+'_text';
        },
        answer() {
            return this.$store.getters.answer(this.uuid);
        },
        showMe() {
            let answersSelecteds = this.$store.getters.answerIsSelected(this.uuid);
            return (
                (
                    (this.answer.answer_type_uuid == this.$store.state.answerTypes.SINGLE_CHOICE_TEXT) || 
                    (this.answer.answer_type_uuid == this.$store.state.answerTypes.MULTIPLE_CHOICE_TEXT)
                ) && (
                    answersSelecteds.uuid == this.uuid
                )
            )
        },
        isSingleChoice() {
            return (this.answer.answer_type_uuid == this.$store.state.answerTypes.SINGLE_CHOICE_TEXT);
        },
        customText: {
            get () {
                return this.$store.state.currentQuestion.customText;
            },
            set (value) {
                this.$store.dispatch('setCustomText', value);
            }
        }
    }
}
</script>