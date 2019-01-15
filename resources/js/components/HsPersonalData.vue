<template>
    <div>
        <div class="form-group">
            <label for="customer_name">Name</label>
            <input type="text" class="form-control" id="customer_name" placeholder="Type your name">
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="customer_phone_number">Phone Number</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-phone"></i>
                            </div>
                            <input type="text" class="form-control" id="customer_phone_number" placeholder="Type Phone Number">
                        </div>
                    </div>
                </div>
                <div class="col">
                    <label for="customer_email">E-mail</label>
                    <input type="email" class="form-control" id="customer_email" placeholder="Type E-mail">
                        <!-- <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    @
                                </div>
                            </div>
                        </div> -->
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Address
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="customer_address_zip">Zip</label>
                            <input type="text" class="form-control" id="customer_address_zip" placeholder="Your Zip">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="customer_address_state">State</label>
                            <input type="text" class="form-control" id="customer_address_state" placeholder="Your State">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="customer_address_city">City</label>
                            <input type="text" class="form-control" id="customer_address_city" placeholder="Your City">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="customer_address_street">Street</label>
                            <input type="text" ref="customer_address_street" class="form-control" id="customer_address_street" placeholder="Your Street">
                        </div>
                    </div>
                </div>
                <!-- <vue-google-autocomplete
                    id="map"
                    classname="form-control"
                    placeholder="Start typing"
                    v-on:placechanged="getAddressData"
                > -->
                <!-- </vue-google-autocomplete> -->
                <!-- <hs-address-autocomplete></hs-address-autocomplete> -->
                <!-- <vue-bootstrap-typeahead>
                    
                </vue-bootstrap-typeahead> -->
            </div>
        </div>
    </div>
</template>

<script>

import VueGoogleAutocomplete from 'vue-google-autocomplete';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import HsAddressAutocomplete from './HsAddressAutocomplete';

export default {
    components: {
        'vue-google-autocomplete': VueGoogleAutocomplete,
        'hs-address-autocomplete': HsAddressAutocomplete,
        VueBootstrapTypeahead
    }
    /* mounted() {
        this.customer_address_street = new google.maps.places.Autocomplete(
            (this.$refs.customer_address_street),
            {types: ['geocode']}
        );
    } */
}
</script>

