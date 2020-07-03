<template>
  <div class="App">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const notes = namespace('notes');
@Component
export default class App extends Vue {
  @notes.Mutation
  public getNotesFromLocalStorage!: () => void;
  created() {
    this.getNotesFromLocalStorage();
  }
}
</script>

<style lang="scss">
@import '@/scss/main';
</style>
