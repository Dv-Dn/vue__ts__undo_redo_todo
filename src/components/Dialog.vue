<template>
  <div class="alert">
    <div class="alert__block">
      <h4 class="alert__title">{{ title }}</h4>
      <p class="alert__text">{{ text }}</p>
      <div class="alert__footer">
        <a class="alert__btn" @click="$emit('onAccept')">Accept</a>
        <a class="alert__btn" @click="$emit('onCancel')">Cancel</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
  @Prop() title!: string;
  @Prop() text!: string;
}
</script>
