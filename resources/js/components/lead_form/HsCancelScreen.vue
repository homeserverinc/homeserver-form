<template>
    <div class="jumbotron mb-0 p-4">
        <img src="/demos/construction/images/logo.png" style="max-width: 12rem" class="mb-3">
        <h1 class="display-5">We can <strong>help you</strong> with your project needs!</h1>
        <p class="lead">Give us a call, and one of our pros will help you, getting your info and delivering you a great solution!</p>
        <hr class="my-4">
        <p class="btn btn-lg btn-block btn-outline btn-outline-secondary text-left mb-3 p-3"><i class="fas fa-phone fa-lg text-success"></i> Give us a call right now <strong>{{phoneNumber}}</strong>.</p>
        <button class="btn btn-lg btn-block btn-outline btn-outline-secondary text-left mb-3 p-3" @click="returnToProject"><i class="fas fa-arrow-left fa-lg text-success"></i> Return to current project.</button>
        <button class="btn btn-lg btn-block btn-outline btn-outline-secondary text-left p-3" data-dismiss="modal" @click="cancelProject"><i class="fas fa-times fa-lg text-danger"></i> Cancel this project.</button>
    </div>
</template>


<script>
export default {
    computed: {
        phoneNumber() {
            return this.$store.state.site.phone.friendly_name;
        }
    },
    methods: {
        returnToProject() {
            this.$store.commit('setShowingCancelScreen', false);
        },
        cancelProject() {
            this.$store.dispatch('resetState');
            this.$emit('onResetForm');
            this.returnToProject();
        }
    }
    
}
</script>
