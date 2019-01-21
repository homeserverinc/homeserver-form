<template>
    <transition name="fade" mode="out-in" appear>
        <div>
            <div class="form-group">
                <label for="contact_time_div">When would you like to get this done?</label>
                <select name="dead_line" id="when-would-you-like-to-get-this-done" class="form-control selectpicker" v-model="deadLine">
                    <option value="im-flexible">I'm flexible</option>
                    <option value="within-48-hours">Within 48 hours</option>
                    <option value="within-a-week">Within a week</option>
                    <option value="within-a-month">Within a month</option>
                    <option value="within-a-year">Within a year</option>
                </select>
            </div>
            <div class="form-group">
                <label for="additional-info">Explain the project</label>
                <textarea name="additional_info" id="additional-info" cols="30" rows="4" class="form-control" v-model="additionalInfo"></textarea>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label for="name">First name</label>
                        <input type="text" name="name" id="name" class="form-control" v-model="firstName">
                    </div>
                    <div class="col-sm-12 col-md-6">
                    <label for="last-name">Last name</label>
                        <input type="text" name="last_name" id="last-name" class="form-control" v-model="lastName">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-4">
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fas fa-phone"></i>
                                </div>
                            </div>
                            <input ref="phone-number" type="tel" name="phone" id="phone" class="form-control" v-mask="'(###) ###-####'" v-model="phoneNumber">
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-8">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>
                            <input type="text" name="email" id="email" class="form-control" v-model="email">
                        </div>
                    </div>
                </div>
            </div>
            <hs-address-autocomplete></hs-address-autocomplete>
        </div>
    </transition>
</template>

<script>

import hsAddressAutocomplete from './HsAddressAutocomplete';
import {mask} from 'vue-the-mask'

export default {
    components: {
        'hs-address-autocomplete': hsAddressAutocomplete,        
    },
    directives: {
        mask
    },
    computed: {
        additionalInfo: {
            get() {
                return this.$store.state.project.additionalInfo;
            },
            set(value) {
                this.$store.commit('SET_PROJECT_ADDITIONAL_INFO', value);
            }
        },
        deadLine: {
            get() {
                return this.$store.state.project.deadLine;
            },
            set(value) {
                this.$store.commit('SET_PROJECT_DEAD_LINE', value);
            }
        },
        firstName: {
            get() {
                return this.$store.state.personalData.firstName;
            },
            set(value) {
                this.$store.commit('SET_PERSONAL_DATA_FIRST_NAME', value);
            }
        },
        lastName: {
            get() {
                return this.$store.state.personalData.lastName;
            },
            set(value) {
                this.$store.commit('SET_PERSONAL_DATA_LAST_NAME', value);
            }
        },
        phoneNumber: {
            get() {
                return this.$store.state.personalData.phone;
            },
            set(value) {
                this.$store.commit('SET_PERSONAL_DATA_PHONE', value);
            }
        },
        email: {
            get() {
                return this.$store.state.personalData.email;
            },
            set(value) {
                this.$store.commit('SET_PERSONAL_DATA_EMAIL', value);
            }
        }
    }
}
</script>

