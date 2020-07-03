<template>
  <input
    :type="type"
    class="input"
    v-bind="$attrs"
    :value="value"
    :checked="!!value"
    v-on="
      type === 'checkbox'
        ? {
            ...$listeners,
            change: event => $emit('input', event.target.checked)
          }
        : {
            ...$listeners,
            input: event => $emit('input', event.target.value)
          }
    "
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  inheritAttrs: false
})
export default class Input extends Vue {
  @Prop() value!: string;
  @Prop({ default: 'text' }) type!: string;
}
</script>
