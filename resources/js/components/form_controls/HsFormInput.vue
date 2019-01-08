<template>
    <transition appear mode="out-in"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        v-bind:css="false">
        <div class="hs-input-container" v-if="showMe">
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
            duration: 250,
            showMe: false
        }
    },
    components: {
        'hs-radio-input': hsRadioInput,
        'hs-checkbox-input': hsCheckboxInput,
        'hs-text-input': hsTextInput
    },
    created() {
        this.showMe = true;
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1}, { duration: this.duration + this.animationDelay }, { complete: done })           
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0}, { duration: this.duration + this.animationDelay }, { complete: done })
        }
    }
}
</script>