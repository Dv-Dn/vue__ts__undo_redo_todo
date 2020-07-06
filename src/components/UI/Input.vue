<template>
  <input class="input" v-bind="$attrs" v-on="$listeners" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  inheritAttrs: false
})
export default class Input extends Vue {}
</script>
