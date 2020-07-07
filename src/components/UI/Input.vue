<template>
  <input
    class="input"
    v-bind="$attrs"
    v-on="{ ...$listeners, input: event => $emit('input', event.target.value) }"
  />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  inheritAttrs: false
})
export default class Input extends Vue {}
</script>
