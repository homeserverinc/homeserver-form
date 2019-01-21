
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Formats a phone number.
 * Example: 123-456-7890 => (123) 456-7890
 *
 * @param {String} phone
 * @return {Void}
 */
Vue.filter('phone', {
    read: (phone) => {
        return '$'+phone.toFixed(2)
    },
    write: (phone, oldPhone) => {
        return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
});


/* window.Vuex = require('vuex');  */

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example-component', require('./components/ExampleComponent.vue'));

//var csrf_token = $('meta[name="csrf-token"]').attr('content');

import hsForm from './components/HsForm.vue';
import store from './store';

const app = new Vue({
    el: '#app',
    store,
    components:{
        'hs-form': hsForm,
    },
});
