<template>
    <input 
        type="text" 
        name="address_field" 
        id="address_field"         
        @change="doOnChange"
        v-model="inputAddress"
        autocomplete="true">
</template>

<style lang="scss" scoped>

</style>

<script>
const URL = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json';
const ApiKEY = 'AIzaSyAXEKDJ6apFhd92r8DaBoNuFru26-8aR_I';

export default {
    data() {
        return {
            address: {}
        }
    },
    computed: {
        teste() {

        },
        inputAddress: {
            get() {
                return this._inputAddress;
            },
            set(value) {
                if (value.lenght > 2) {
                    
                }
            }
        }
    },
    methods: {
        doOnChange(e) {
            console.log(e);
        }
    }
}
</script>
