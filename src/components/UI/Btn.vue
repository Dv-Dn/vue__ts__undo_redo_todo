<template>
  <button
    :class="['btn', { btn_round: icon, btn_icon: icon }]"
    v-on="$listeners"
    type="button"
    v-bind="$attrs"
  >
    <span class="btn__content">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  inheritAttrs: false
})
export default class Btn extends Vue {
  @Prop({ default: 'Click' }) value!: string;
  @Prop({ type: Boolean, default: false }) icon!: boolean;
}
</script>
