<template>
    <div class="container-fluid">
        <button class="btn btn-primary" @click="qs2json">Qs2Json</button>
        <button class="btn btn-primary" @click="json2qs">Json2Qs</button>
        <div class="card">
            <div class="card-header">Query String</div>
            <div class="card-body">
                <textarea class="form-control" name="qs_str" id="qs_str" cols="30" rows="10" v-model="qs_str">

                </textarea>
            </div>
        </div>
        <div class="card">
            <div class="card-header">JSON</div>
            <div class="card-body">
                <textarea class="form-control" name="json_str" id="json_str" cols="30" rows="10" v-model="json_str">

                </textarea>
            </div>
        </div>
    </div>    
</template>


<script>
import qs from 'qs';

export default {
    data: () => {
        return {
            qs_str: '',
            json_str: ''
        }
    },
    methods: {
        log() {
            console.log(this.qs_str);
            console.log(this.json_str);
        },
        qs2json() {
            this.json_str = qs.parse(this.qs_str, {arrayLimit: 1000});
            this.log();
        },
        json2qs() {
            this.qs_str = qs.stringify(this.json_str);
            this.log();
        }
    }
}
</script>
