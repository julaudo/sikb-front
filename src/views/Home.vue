<template>
    <span>Welcome to sikb-front</span>
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';

@Component
export default class Home extends Mixins(Utils, Validators) {
}
</script>
