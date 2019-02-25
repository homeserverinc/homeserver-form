import Vue from 'vue';
import hsLeadForm from './components/lead_form/HsLeadForm';
import VeeValidate from 'vee-validate';
import store from './store'

Vue.use(VeeValidate);

new Vue({
    el: '#lead-form-placeholder',
    store,
    components: {
        'hs-lead-form': hsLeadForm
    }
})