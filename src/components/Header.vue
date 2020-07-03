<template>
  <header class="header">
    <Btn icon @click="$router.push({ path: '/' })"><Icon>arrow_back</Icon></Btn>
    <h2 class="h2 header__title">{{ title }}</h2>
    <div>
      <Btn icon v-if="!editStatus" @click="$emit('onEdit')"
        ><Icon>create</Icon></Btn
      >
      <Btn icon v-if="editStatus" @click="$emit('onTitle')"
        ><Icon>title</Icon></Btn
      >
      <Btn icon v-if="editStatus" @click="$emit('onDelete')"
        ><Icon>delete</Icon></Btn
      >
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import { Btn, Icon } from '@/components/index.ts';
import Btn from './UI/Btn.vue';
import Icon from './UI/Icon.vue';
@Component({
  components: {
    Btn,
    Icon
  }
})
export default class Header extends Vue {
  @Prop() title!: string;
  @Prop() editStatus!: boolean;
}
</script>
