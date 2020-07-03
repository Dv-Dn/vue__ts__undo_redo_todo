<template>
  <div class="sidebar">
    <div class="sidebar__block">
      <Btn icon @click="$emit('onUndo')"> <Icon>undo</Icon></Btn>
      <Btn icon @click="$emit('onRedo')"> <Icon>redo</Icon></Btn>
      <Btn icon @click="$emit('onClear')"><Icon>clear</Icon></Btn>
      <Btn icon @click="$emit('onSave')"> <Icon>done</Icon></Btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import { Btn, Icon } from '@/components';
import Btn from './UI/Btn.vue';
import Icon from './UI/Icon.vue';
@Component({
  components: {
    Btn,
    Icon
  }
})
export default class Sidebar extends Vue {}
</script>
