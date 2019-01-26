<template>
    <transition name="fade" mode="in-out" appear>
        <div class="hs-quiz-review">
            <div class="hs-question hs-title-overflow" v-for="q in questions" :key="q.uuid">
                <strong>{{ q.question }}</strong>
                <div class="list-group hs-answers">
                    <div v-for="a in q.answers" :key="a.uuid" class="hs-answer">
                        <div v-if="isSelected(q, a)">
                            {{ a.answer }}
                            <div v-if="isOther(a)">
                                {{ q.custom_answer }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="hs-question hs-title-overflow">
                <strong>When would you like to get this done?</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ projectDeadLine }}
                    </div>
                </div>
            </div>
            <div class="hs-question hs-title-overflow">
                <strong>Explain the project</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ projectAdditionalInfo }}
                    </div>
                </div>
            </div>
            <div class="hs-question hs-title-overflow">
                <strong>First Name / Last Name</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ firstName }} {{ lastName }}
                    </div>
                </div>
            </div>
            <div class="hs-question hs-title-overflow">
                <strong>Phone</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ phone }}
                    </div>
                </div>
            </div>
            <div class="hs-question hs-title-overflow">
                <strong>E-mail</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ email }}
                    </div>
                </div>
            </div>
            <div class="hs-question hs-title-overflow">
                <strong>Address</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ address.street }}, {{ address.city }}, {{ address.state }}, {{ address.zip }}
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    hr {
        border-top: 1px solid #8c8b8b;
        border-bottom: 1px solid #fff;
    }
</style>

<script>
import { PROJECT_DEADLINE } from '../constants';

export default {
    computed: {
        questions() {
            return this.$store.state.answeredQuestions;
        },
        questionTypes() {
            return this.$store.state.questionTypes;
        },
        answerTypes() {
            return this.$store.state.answerTypes;
        },
        projectDeadLine() {
            return PROJECT_DEADLINE[this.$store.state.personal.deadline];
        },
        projectAdditionalInfo() {
            return this.$store.state.personal.additionalInfo;
        },
        firstName() {
            return this.$store.state.personal.firstName;
        },
        lastName() {
            return this.$store.state.personal.lastName;
        },
        phone() {
            return this.$store.state.personal.phoneNumber;
        },
        email() {
            return this.$store.state.personal.email;
        },
        address() {
            return this.$store.state.personal.address;
        }
    },
    methods: {
        isSelected(q, a) {
            if (Array.isArray(q.selected_answers)) {
                return (q.selected_answers.find(sa => sa.uuid === a.uuid) !== undefined);
            } else {
                return (q.selected_answers.uuid === a.uuid);
            }
        },
        isOther(a) {
            return ((a.answer_type === this.answerTypes.SINGLE_CHOICE_TEXT) || (a.answer_type === this.answerTypes.MULTIPLE_CHOICE_TEXT))
        } 
    }
}
</script>
