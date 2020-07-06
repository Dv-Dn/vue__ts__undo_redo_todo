<template>
  <input
    type="checkbox"
    class="input"
    v-bind="$attrs"
    :checked="!!checked"
    @input="$emit('input', $event.target.checked)"
  />
</template>
<script lang="ts">
import { Vue, Component, Model } from 'vue-property-decorator';
@Component({
  inheritAttrs: false
})
export default class Checkbox extends Vue {
  @Model('input') readonly checked!: boolean;
}
</script>
