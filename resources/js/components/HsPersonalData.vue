<template>
    <transition name="fade" mode="out-in" appear>
        <div>
            <div class="form-group">
                <label for="contact_time_div">When would you like to get this done?</label>
                <select name="dead_line" id="when-would-you-like-to-get-this-done" class="form-control selectpicker">
                    <option value="im-flexible">I'm flexible</option>
                    <option value="within-48-hours">Within 48 hours</option>
                    <option value="within-a-week">Within a week</option>
                    <option value="within-a-month">Within a month</option>
                    <option value="within-a-year">Within a year</option>
                </select>
            </div>
            <div class="form-group">
                <label for="additional-info">Anything else to tell the pros?</label>
                <textarea name="additional_info" id="additional-info" cols="30" rows="4" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6">
                    <label for="last-name">Last name</label>
                        <input type="text" name="last_name" id="last-name" class="form-control">
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
                            <input ref="phone-number" type="text" name="phone" id="phone" class="form-control" @keyup="formatPhone">
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-8">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                            </div>
                            <input type="text" name="email" id="email" class="form-control">
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

export default {
    components: {
        'hs-address-autocomplete': hsAddressAutocomplete
    },
    methods: {
        formatPhone() {
            let x = this.$refs('phone-number');
            x.val(x.val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1)$2-$3"));
        }
    }
}
</script>

