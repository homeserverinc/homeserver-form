<template>
    <div>
        <div class="form-group">
            <div class="row">
                <div class="col-lg-6">
                    <label for="firstName">First Name</label>
                    <input
                        v-validate="'required'"
                        type="text"
                        name="firstName"
                        id="firstName"
                        v-model="firstName"
                        class="form-control"
                        :class="{'is-invalid': errors.first('firstName')}"
                    >
                    <div class="invalid-feedback">{{ errors.first('firstName') }}</div>
                </div>
                <div class="col-lg-6">
                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        v-model="lastName"
                        class="form-control"
                    >
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-lg-6">
                    <label for="phone">Phone</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-phone"></i>
                            </div>
                        </div>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            v-model="phone"
                            class="form-control"
                            v-validate="{rules: {required: phoneIsRequired}}"
                            :class="{'is-invalid': errors.first('phone')}"
                            v-mask="'(###) ###-####'"
                            placeholder="(___) ___-____"
                        >
                        <div class="invalid-feedback">{{ errors.first('phone') }}</div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label for="email">E-mail</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-at"></i>
                            </div>
                        </div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            v-model="email"
                            class="form-control"
                            v-validate="{rules: {required: emailIsRequired, email: emailIsRequired}}"
                            :class="{'is-invalid': errors.first('email')}"
                        >
                        <div class="invalid-feedback">{{ errors.first('email') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mask } from "vue-the-mask";
import { mapFields } from "vuex-map-fields";
import { Validator } from "vee-validate";

const dictionary = {
    en: {
        attributes: {
            firstName: "First Name",
            email: "E-mail",
            phone: "Phone"
        }
    }
};

Validator.localize(dictionary);

export default {
    directives: {
        mask
    },
    computed: {
        ...mapFields("HsNameContact", [
            "firstName",
            "lastName",
            "phone",
            "email"
        ]),
        emailIsRequired() {
            return this.phone === "";
        },
        phoneIsRequired() {
            return this.email === "";
        }
    }
};
</script>
