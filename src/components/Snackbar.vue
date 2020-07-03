<template>
  <div class="snackbar">
    {{ text }}
    <Btn @click="$emit('onClose')">close</Btn>
    <!-- <div class="snackbar_content"></div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Btn from './UI/Btn.vue';

@Component({
  components: {
    Btn
  }
})
export default class Snackbar extends Vue {
  @Prop() text!: string;
}
</script>
