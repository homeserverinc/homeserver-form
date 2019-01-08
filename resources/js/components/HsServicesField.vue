<template>
    <div v-if="showMe" class="form-group hs-select-container">
        <label class="form-control-label hs-label" for="selectService">What service do you need?</label>
        <select ref="selectService" v-model="selectService" class="form-control selectpicker hs-input-select" data-style="btn-secondary" data-live-search="true" name="selectService" id="selectService" >
            <option selected="selected" :value="null"> Nothing Selected </option>
            <option v-for="(service, index) in services" :key="index" :value="service.uuid"> {{ service.service_description }} </option>
        </select>
    </div>
</template>

<script>
export default {
    computed: {
        selectService: {
            get() {
                return this.$store.state.service;
            },
            set(value) {
                this.$store.dispatch('setSelectedService', value);
            }
        },
        services: {
            get() {
                return this.$store.state.services;
            }
        },
        showMe() {
            if (this.$store.state.services != 'undefined') {
                if (Array.isArray(this.$store.state.services)) {
                    return this.$store.state.services.length > 1;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
</script>