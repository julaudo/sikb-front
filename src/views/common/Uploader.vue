<template>
    <div>
        <v-btn color="primary" dark class="mb-2" icon v-on:click="browse()">...</v-btn>

        <input type="file" :accept="accept"
               ref="fileInput" @change="onFileChange">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class Uploader extends Vue {
    @Prop() public accept!: string;

    public fileInput(): HTMLInputElement {
        return this.$refs.fileInput as HTMLInputElement;
    }

    public browse() {
        this.fileInput().click();
    }

    public onFileChange() {
        const files = this.fileInput().files;
        if (files) {
            this.$emit('input', files[0]);
        }
    }
}
</script>
<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>