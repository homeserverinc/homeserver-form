<template>
	<div>
		<transition name="fade" mode="out-in">
			<div id="loader-wrapper" v-if="isLoading">
				<div id="loader">
				</div>
			</div>
		</transition>
		<transition name="fade" mode="in-out" appear v-cloak v-if="!isLoading">
			<div :class="'card hs-card-'+suffixTheme">
				<div :class="['card-header hs-card-header-'+suffixTheme, {'shadow-sm': enableShadow}]" style="min-height: 49px">
					<span :class="'hs-card-title-'+suffixTheme">{{ formTitle }}</span>
					<span
						:class="'float-right alert hs-card-title-phone-'+suffixTheme"
						v-if="site.phone.friendly_name"
					>
						<i class="fas fa-phone"></i>
						{{ site.phone.friendly_name }}
					</span>
				</div>
				<div :class="'card-body hs-card-body-'+suffixTheme">
					<keep-alive>
						<transition name="fade" mode="out-in" appear>
							<component v-bind:is="currentComponent"></component>
						</transition>
					</keep-alive>
				</div>
				<div
					:class="['card-footer hs-card-footer-'+suffixTheme, {'shadow-sm': enableShadow, 'pb-1': currentComponent === 'HsQuizReview'}]"
					v-if="currentComponent != 'HsFinished'"
				>
					<!-- <button class="btn btn-info" @click="toggle"><i class="fas fa-test"></i>Toggle</button> -->
					<div class="row ml-1" v-if="currentComponent === 'HsQuizReview'">
						<button class="btn btn-lg btn-success" @click="submitLead">
							<i class="fas fa-check fa-lg"></i>
							Submit this project
						</button>
					</div>
					<div class="row ml-1" v-else>
						<button class="btn btn btn-info" @click="next" :disabled="nextDisabled">
							Next
							<i class="fas fa-arrow-right"></i>
						</button>
					</div>
					<div class="row ml-1 mt-2" v-if="!backDisabled">
						<button class="btn btn btn-light" @click="prev">
							<i class="fas fa-arrow-left"></i>
							Back
						</button>
					</div>

					<div class="row mt-3" v-if="currentComponent === 'HsQuizReview'">
						<div class="col border-top p-1">
							<p class="hs-terms-conditions text-center m-0">
								{{ thisYear }} all rigths reserveds. By submitting this form, you agree with our
								<a
									href="#"
									class="btn-link"
									@click.prevent="openTermsAndConditions"
								>Terms and Conditions</a>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<b-modal ref="modalTaC" hide-footer title="Terms and Conditions">
			<div class="d-block text-justify">
				<p class="hs-p">
                    By submitting your contact information, you understand and agree that you may be contacted by few independent service providers and/or our partners regarding your home service request, using email, telephone or text messaging - including through autodialed and/or prerecorded calls or messages - to the telephone number provided above, which may include your mobile telephone number, if provided. 
                </p>
                <p class="hs-p">
                    You understand that consent is not a condition of purchase. Please note that this website connects consumers looking for home improvement services with a network of independent service providers, when it is unavailable to provide direct home repair or maintenance services.
                </p>
			</div>

			<div class="form-group mt-3 mb-0">
				<div class="row border-top pt-3 pl-3">
					<button class="btn btn-secondary" @click="closeTermsAndConditions">
						<i class="fas fa-times"></i>
						Close
					</button>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import HsNameContact from "./personal/HsNameContact";
import HsAddress from "./personal/HsAddress";
import HsDetails from "./personal/HsDetails";
import HsQuiz from "./quiz/HsQuiz";
import HsCategories from "./categories/HsCategories";
import HsQuizReview from "./review/HsQuizReview";
import HsFinished from "./HsFinished";
import bModal from "bootstrap-vue/es/components/modal/modal";
import bModalDirective from "bootstrap-vue/es/directives/modal/modal";

export default {
	components: {
		HsNameContact,
		HsAddress,
		HsDetails,
		HsQuiz,
		HsCategories,
		HsQuizReview,
		HsFinished,
		bModal
	},
	directives: {
		bModalDirective
	},
	props: {
		siteUuid: {
			type: String,
			default: ""
		},
		formTitle: {
			type: String,
			default: "No title defined!"
		},
		suffixTheme: {
			type: String,
			default: "info"
		},
		enableShadow: {
			type: String,
			default: "false"
		}
	},
	mounted() {
		this.$store.commit("setSuffixTheme", this.suffixTheme);
		this.$store.commit("enableShadow", Boolean(this.enableShadow));
		if (this.siteUuid != "") {
			this.$store.dispatch("apiGetSite", this.siteUuid);
		}
	},
	computed: {
		currentComponent() {
			return this.$store.getters.currentComponent;
		},
		backDisabled() {
			return this.$store.getters.isFirstComponent;
		},
		nextDisabled() {
			return !this.$store.getters.hasNextComponent;
		},
		site() {
			return this.$store.state.site;
		},
		isLoading() {
			return this.$store.state.isLoading;
		},
		thisYear() {
			return new Date().getFullYear();
		},
		curEl() {
			return this.$children.find(
				c => c.$options._componentTag === this.currentComponent
			);
		}
	},
	methods: {
		next() {
			this.$store.dispatch("next", this.curEl);
		},
		prev() {
			this.$store.dispatch("prev", this.curEl);
		},
		submitLead() {
			this.$store.dispatch("postLead", true);
		},
		openTermsAndConditions() {
			this.$refs.modalTaC.show();
		},
		closeTermsAndConditions() {
			this.$refs.modalTaC.hide();
		},
		toggle() {
			this.$store.commit('setLoading', !this.$store.state.isLoading);
		}
	}
};
</script>