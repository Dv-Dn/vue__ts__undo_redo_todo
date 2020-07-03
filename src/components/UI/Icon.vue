<template>
  <i
    class="icon material-icons"
    :style="{ 'font-size': fontSize + 'px' }"
    v-on="$listeners"
    ref="icon"
  >
    <slot></slot>
  </i>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop({ default: '24' }) fontSize!: string;
}
</script>
