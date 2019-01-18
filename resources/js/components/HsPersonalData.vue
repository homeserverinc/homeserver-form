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
                <hs-address-autocomplete></hs-address-autocomplete>
            </div>
        </div>
    </div>
</template>

<script>

import hsAddressAutocomplete from './HsAddressAutocomplete';

export default {
    components: {
        'hs-address-autocomplete': hsAddressAutocomplete
    }
}
</script>

