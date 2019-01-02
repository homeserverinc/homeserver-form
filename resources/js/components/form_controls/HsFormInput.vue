<template>
    <div>
        <hs-radio-input :uuid="uuid"></hs-radio-input>
        <!-- <hs-checkbox-input :answerUuid="answer"></hs-checkbox-input> -->
        <hs-text-input :uuid="uuid"></hs-text-input>
    </div>
</template>

<script>
import hsTextInput from './HsTextInput';
import hsRadioInput from './HsRadioInput';
import hsCheckboxInput from './HsCheckboxInput';

export default {
    props: {
        uuid: String
    },
    components: {
        'hs-radio-input': hsRadioInput,
        'hs-checkbox-input': hsCheckboxInput,
        'hs-text-input': hsTextInput
    }
}
</script>