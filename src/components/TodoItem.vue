<template>
  <li class="todo-item">
    <Input type="checkbox" />
    <Input
      :disabled="isEdit"
      @input="$emit('xxx')"
      :value="value"
      class="todo-item__input"
    />
    <Btn icon><Icon>create</Icon></Btn>
    <Btn icon><Icon>done</Icon></Btn>
    <Btn icon><Icon>delete</Icon></Btn>
  </li>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Btn, Input, Icon } from '@/components';
@Component({
  components: {
    Input,
    Btn,
    Icon
  }
})
export default class TodoItem extends Vue {
  @Prop({ default: false }) ison!: boolean;
  @Prop({ default: false }) completed!: boolean;
  @Prop() value!: string;

  @Prop() isEdit!: boolean;

  @Emit()
  inputValue(e: string): string {
    return e;
  }
}
</script>
