<template>
  <article class="note">
    <router-link :to="to">
      <h4 class="note__title">
        {{ note.name }}
      </h4></router-link
    >
    <ul class="note-todo">
      <li
        :key="a.id"
        :class="['note-todo__item', { todo_completed: a.completed }]"
        v-for="a in note.todoList.length < 5
          ? note.todoList
          : note.todoList.slice(0, 4)"
      >
        {{ a.title }}
      </li>
    </ul>
    <div class="note__menu">
      <Btn icon @click="$emit('onEdit')"><Icon>create</Icon></Btn>
      <Btn icon @click="$emit('onDelete')"><Icon>delete</Icon></Btn>
    </div>
  </article>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import { Btn, Icon } from '@/components/index';
import Btn from './UI/Btn.vue';
import Icon from './UI/Icon.vue';
import { NoteType } from '@/types.ts';

@Component({
  components: {
    Btn,
    Icon
  }
})
export default class NoteCard extends Vue {
  @Prop({ required: true }) note!: NoteType;
  @Prop() to!: string;
}
</script>
