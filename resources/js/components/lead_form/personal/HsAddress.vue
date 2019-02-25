<template>
    <div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="street">Street</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                        </div>
                        <input
                            v-validate="'required'"
                            ref="autocomplete"
                            type="text"
                            name="street"
                            id="street"
                            class="form-control"
                            v-model="street"
                            :class="{'is-invalid': errors.first('street')}"
                        >
                        <div class="invalid-feedback">Please inform a valid Street.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-sm-12 col-md-8">
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" v-validate="'required'" name="city" id="city" class="form-control" v-model="city" :class="{'is-invalid': errors.first('city')}">
                        <div class="invalid-feedback">Please inform a valid City.</div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-2">
                    <div class="form-group">
                        <label for="state">State</label>
                        <input type="text" v-validate="'required'" name="state" id="state" class="form-control" v-model="state" :class="{'is-invalid': errors.first('state')}">
                        <div class="invalid-feedback">Please inform a valid State.</div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-2">
                    <div class="form-group">
                        <label for="zip">Zip</label>
                        <input type="text" v-validate="'required'" name="zip" id="zip" class="form-control" v-model="zip" :class="{'is-invalid': errors.first('zip')}">
                        <div class="invalid-feedback">Please inform a valid Zip.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapFields } from "vuex-map-fields";
export default {
    computed: {
        ...mapFields("HsAddress", [
            "address.street",
            "address.city",
            "address.state",
            "address.zip"
        ])
    },
    mounted() {
        this.autocomplete = new google.maps.places.Autocomplete(
            this.$refs.autocomplete,
            { types: ["geocode"] }
        );
        this.autocomplete.addListener("place_changed", () => {
            this.$store.dispatch(
                "HsAddress/getAddressFromApi",
                this.autocomplete.getPlace()
            );
        });
    }
};
</script>
