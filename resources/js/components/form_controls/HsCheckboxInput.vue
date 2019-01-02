<template>
    <div v-if="showMe">
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" :id="parent.answer.uuid">
            <label class="custom-control-label" :for="parent.answer.uuid">{{ parent.answer.answer }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        parent: Object
    },
    computed: {
        showMe() {
            return (
                (this.parent.answer.answer_type_uuid === this.$store.state.answerTypes.MULTIPLE_CHOICE) ||
                (this.parent.answer.answer_type_uuid === this.$store.state.answerTypes.MULTIPLE_CHOICE_TEXT)
            )
        }
    }
}
</script>