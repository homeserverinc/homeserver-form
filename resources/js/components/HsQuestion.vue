<template>
    <div v-if="question">
        <div class="hs-question hs-title-overflow">
            <transition appear name="slide" mode="out-in">
                <h1 :key="question.uuid" v-if="showTitle">{{ question.question }}</h1>
            </transition>
        </div>
        <div class="list-group hs-answers">
            <div v-for="(answer, index) in answers" :key="answer.uuid" class="hs-answer">
                <hs-form-input :uuid="answer.uuid" :animation-delay="index * 80">
                </hs-form-input>
            </div>
        </div>
    </div>
</template>

<style>
    .hs-title-overflow {
        overflow: hidden !important;
    }
    .slide-leave-active,
    .slide-enter-active {
        transition: .3s ease;
        opacity: 1;
    }
    .slide-enter {
        transform: translate(10%, 0);
        opacity: 0;
    }
    .slide-leave-to {
        transition: .2s ease-out;
        opacity: 0;
    }
</style>


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
        },
        showTitle() {
            return this.$store.state.showQuestionTitle;
        }
    }
}
</script>
