<template>
	<transition name="fade" mode="in-out" appear>
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">Personal data</div>
					<div class="card-body pb-0">
						<div class="hs-question hs-title-overflow">
							<strong>First Name / Last Name</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">{{ firstName }} {{ lastName }}</div>
							</div>
						</div>
						<div class="hs-question hs-title-overflow">
							<strong>Phone</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">{{ phone }}</div>
							</div>
						</div>
						<div class="hs-question hs-title-overflow">
							<strong>E-mail</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">{{ email }}</div>
							</div>
						</div>
						<div class="hs-question hs-title-overflow">
							<strong>Address</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">
                                    {{ address.street }}, {{ address.city }}, {{ address.state }}, {{ address.zip }}
                                </div>
							</div>
						</div>
					</div>
				</div>
                <span style="margin-top: 0.75rem; display: block; position: relative"></span>
				<div class="card bg-light">
					<div class="card-header">Additional Info</div>
					<div class="card-body pb-0">
						<div class="hs-question hs-title-overflow">
							<strong>When would you like to get this done?</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">{{ projectDeadLine }}</div>
							</div>
						</div>
						<div class="hs-question hs-title-overflow">
							<strong>Explain the project</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div class="hs-answer">{{ (projectDetails != '') ? projectDetails : 'No aditional details.' }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-header">Project Details</div>
					<div class="card-body hs-questions-review pb-0">
						<div class="hs-question hs-title-overflow" v-for="q in questions" :key="q.uuid">
							<strong>{{ q.question }}</strong>
							<div :class="['hs-questions-review-item-'+suffixTheme, {'shadow': enableShadow}]">
								<div v-for="a in q.answers" :key="a.uuid" class="hs-answer">
									<div v-if="isSelected(q, a)">
										<i class="fas fa-check text-success"></i> {{ a.answer }}
										<div v-if="isOther(a)" :class="'hs-questions-review-item-other-'+suffixTheme">{{ q.custom_answer }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { PROJECT_DEADLINE } from "../../../constants";

export default {
	computed: {
		questions() {
			return this.$store.state.HsQuiz.answeredQuestions;
		},
		questionTypes() {
			return this.$store.state.HsQuiz.questionTypes;
		},
		answerTypes() {
			return this.$store.state.HsQuiz.answerTypes;
		},
		projectDeadLine() {
			return PROJECT_DEADLINE[this.$store.state.HsDetails.deadline];
		},
		projectDetails() {
			return this.$store.state.HsDetails.projectDetails;
		},
		firstName() {
			return this.$store.state.HsNameContact.firstName;
		},
		lastName() {
			return this.$store.state.HsNameContact.lastName;
		},
		phone() {
			return this.$store.state.HsNameContact.phone;
		},
		email() {
			return this.$store.state.HsNameContact.email;
		},
		address() {
			return this.$store.state.HsAddress.address;
		},
		suffixTheme() {
			return this.$store.state.suffixTheme;
		},
		enableShadow() {
			return this.$store.state.enableShadow;
		}
	},
	methods: {
		isSelected(q, a) {
			if (Array.isArray(q.selected_answers)) {
				return (
					q.selected_answers.find(sa => sa.uuid === a.uuid) !==
					undefined
				);
			} else {
				return q.selected_answers.uuid === a.uuid;
			}
		},
		isOther(a) {
			return (
				a.answer_type_uuid === this.answerTypes.SINGLE_CHOICE_TEXT ||
				a.answer_type_uuid === this.answerTypes.MULTIPLE_CHOICE_TEXT
			);
		}
	}
};
</script>
