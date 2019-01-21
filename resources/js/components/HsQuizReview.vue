<template>
    <div class="hs-quiz-review">
        <transition-group appear name="slide" mode="out-in">
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
        </transition-group>
        <div class="m-3 b-1"></div>
        <transition appear name="slide" mode="out-in">
            <div class="hs-question hs-title-overflow">
                <strong>When would you like to get this done?</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ projectDeadLine }}
                    </div>
                </div>
            </div>
        </transition>
        <transition appear name="slide" mode="out-in" v-if="projectAdditionalInfo !== null">
            <div class="hs-question hs-title-overflow">
                <strong>Explain the project</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ projectAdditionalInfo }}
                    </div>
                </div>
            </div>
        </transition>
        <transition appear name="slide" mode="out-in">
            <div class="hs-question hs-title-overflow">
                <strong>First Name / Last Name</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ firstName }} {{ lastName }}
                    </div>
                </div>
            </div>
        </transition>
        <transition appear name="slide" mode="out-in" v-if="phone !== null">
            <div class="hs-question hs-title-overflow">
                <strong>Phone</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ phone }}
                    </div>
                </div>
            </div>
        </transition>
        <transition appear name="slide" mode="out-in" v-if="email !== null">
            <div class="hs-question hs-title-overflow">
                <strong>E-mail</strong>
                <div class="list-group hs-answers">
                    <div class="hs-answer">
                        {{ email }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .hs-answers {
        > div {
            margin-left: 0.75rem;
        }
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
            return this.$store.getters.getProjectDeadLine;
        },
        projectAdditionalInfo() {
            return this.$store.state.project.additionalInfo;
        },
        firstName() {
            return this.$store.state.personalData.firstName;
        },
        lastName() {
            return this.$store.state.personalData.lastName;
        },
        phone() {
            return this.$store.state.personalData.phone;
        },
        email() {
            return this.$store.state.personalData.email;
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
