<template>
    <transition appear mode="out-in"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        v-on:after-leav="beforeEnter"
        v-bind:css="false">
        <div class="list-group-item list-group-item-action" v-if="showMe" style="left: 40px">
            <hs-radio-input :uuid="uuid"></hs-radio-input>
            <hs-checkbox-input :uuid="uuid"></hs-checkbox-input>
            <hs-text-input :uuid="uuid"></hs-text-input>
        </div>
    </transition>
</template>

<script>
import hsTextInput from './HsTextInput';
import hsRadioInput from './HsRadioInput';
import hsCheckboxInput from './HsCheckboxInput';
import Velocity from 'velocity-animate';

export default {
    props: {
        uuid: String,
        animationDelay: null
    },
    data() {
        return {
            duration: 350,
        }
    },
    computed: {
        showMe() {
            return this.$store.getters.answer(this.uuid).visible;
            /* let hideComponents = this.$store.state.hideComponents;
            if (Array.isArray(hideComponents)) {
                let component = hideComponents.find(a => a === this.uuid);
                return (component == this.uuid) ? false : true;
            } else {
                return true;
            } */
        }
    },
    components: {
        'hs-radio-input': hsRadioInput,
        'hs-checkbox-input': hsCheckboxInput,
        'hs-text-input': hsTextInput
    },
    /* created() {
        this._showMe = true;
    }, */
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0;
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1, translateX: -40 }, { duration: this.duration + this.animationDelay}, {complete: done})           
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0}, { duration: this.duration + this.animationDelay}, {complete: done})
        }
    }
}
</script>