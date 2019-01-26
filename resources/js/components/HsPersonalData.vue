<template>
    <transition name="fade" mode="in-out" appear>
        <div>
            <div class="form-group">
                <label for="contact_time_div">When would you like to get this done?</label>
                <select name="dead_line" id="when-would-you-like-to-get-this-done" class="form-control selectpicker" :class="{'is-invalid': errors.fields.includes('deadline')}" v-model="deadline">
                    <option value="im-flexible">I'm flexible</option>
                    <option value="within-48-hours">Within 48 hours</option>
                    <option value="within-a-week">Within a week</option>
                    <option value="within-a-month">Within a month</option>
                    <option value="within-a-year">Within a year</option>
                </select>
                <div class="invalid-feedback">
                    Please select one option.
                </div>
            </div>
            <div class="form-group">
                <label for="additional-info">Explain the project</label>
                <textarea name="additional_info" id="additional-info" cols="30" rows="4" class="form-control" v-model="additionalInfo"></textarea>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label for="name">First name</label>
                        <input type="text" name="name" id="name" class="form-control" :class="{'is-invalid': errors.fields.includes('firstName')}" v-model="firstName">
                        <div class="invalid-feedback">
                            Please type your first name.
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <label for="last-name">Last name</label>
                        <input type="text" name="last_name" id="last-name" class="form-control" :class="{'is-invalid': errors.fields.includes('lastName')}" v-model="lastName">
                        <div class="invalid-feedback">
                            Please type your last name.
                        </div>
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
                            <input ref="phone-number" type="tel" name="phone" id="phone" class="form-control" v-mask="'(###) ###-####'" :class="{'is-invalid': errors.fields.includes('phoneNumber')}" v-model="phoneNumber">
                            <div class="invalid-feedback">
                                Please inform a valid Phone Number.
                            </div>
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
                            <input type="text" name="email" id="email" class="form-control" :class="{'is-invalid': errors.fields.includes('email')}" v-model="email">
                            <div class="invalid-feedback">
                                Please inform a valid E-mail address.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                    <label for="street">Street</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                        </div>
                        <input ref="autocomplete" type="text" name="street" id="street" class="form-control" :class="{'is-invalid': errors.fields.includes('street')}" onfocus="value = ''" v-model="street">
                        <div class="invalid-feedback">
                            Please inform a valid Street.
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-12 col-md-8">
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" name="" id="city" class="form-control" :class="{'is-invalid': errors.fields.includes('city')}" v-model="city">
                        <div class="invalid-feedback">
                            Please inform a valid City.
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-2">
                    <div class="form-group">
                        <label for="state">State</label>
                        <input type="text" name="" id="state" class="form-control" :class="{'is-invalid': errors.fields.includes('state')}" v-model="state">
                        <div class="invalid-feedback">
                            Please inform a valid State.
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-2">
                    <div class="form-group">
                        <label for="zip">Zip</label>
                        <input type="text" name="" id="zip" class="form-control" :class="{'is-invalid': errors.fields.includes('zip')}" v-model="zip">
                        <div class="invalid-feedback">
                            Please inform a valid Zip.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import {mask} from 'vue-the-mask';
import { mapFields } from 'vuex-map-fields';
import personal from '../store/modules/personal';

export default {
    directives: {
        mask
    },
    created() {
        this.$store.registerModule('personal', personal);
    },
    mounted() {
        this.autocomplete = new google.maps.places.Autocomplete(
            (this.$refs.autocomplete),
            {types: ['geocode']}
        );
            this.autocomplete.addListener('place_changed', () => {
            this.$store.dispatch('personal/getAddressFromApi', this.autocomplete.getPlace());
        });
    },  
    computed: {
        ...mapFields('personal', [
            'additionalInfo',
            'deadline',
            'firstName',
            'lastName',
            'phoneNumber',
            'email',
            'address.street',
            'address.city',
            'address.state',
            'address.zip',
            'errors'
        ])
    }
}
</script>

