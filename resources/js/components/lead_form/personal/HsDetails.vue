<template>
    <div>
        <div class="form-group">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-clock fa-lg"></i> When would you like to get this done?
                </div>
                <div class="card-body" :class="{'is-invalid': errors.has('deadline')}">
                    <div class="row">
                        <div class="col-md" v-for="(item, index) in deadlines" :key="index">
                            <div class="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    :id="item.value"
                                    name="deadline"
                                    class="custom-control-input"
                                    :value="item.value"
                                    v-model="deadline"
                                    v-validate="'required'"
                                >
                                <label
                                    class="custom-control-label"
                                    :for="item.value"
                                >{{ item.label }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="errors.has('deadline')" class="hs-invalid-feedback">Please select one option.</div>
            </div>
        </div>
        <div class="form-group">
            <label for="projectDetails">Explain the project</label>
            <textarea
                name="projectDetails"
                id="projectDetails"
                cols="30"
                rows="4"
                class="form-control"
                v-model="projectDetails"
            ></textarea>
        </div>
    </div>
</template>


<script>
import { mapFields } from "vuex-map-fields";
import { Validator } from "vee-validate";

const dictionary = {
    en: {
        attributes: {
            deadline: ""
        }
    }
};

export default {
    computed: {
        ...mapFields("HsDetails", ["deadline", "projectDetails"]),
        deadlines() {
            return this.$store.state.HsDetails.deadlines;
        }
    }
};
</script>
