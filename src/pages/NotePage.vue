<template>
  <div class="note-page">
    <Header
      :title="noteItem.name"
      :editStatus="editStatus"
      @onEdit="editStatus = true"
      @onTitle="onNoteNameEdit"
      @onDelete="onNoteItemDelete"
    />

    <div class="note-page__input-block" v-if="editStatus">
      <Input
        @change="e => (tmpInput = e.target.value)"
        @keyup.enter="onSendButton"
        :placeholder="inputPlaceholder"
        ref="mainInput"
      />
      <Btn icon @click="onSendButton"><Icon>send</Icon></Btn>
    </div>

    <ul class="note-page__todo-list" v-if="noteItem.todoList">
      <h4 class="">Todo list</h4>
      <li class="todo-item" :key="a.id" v-for="(a, i) in noteItem.todoList">
        <Input
          type="checkbox"
          v-model="noteItem.todoList[i].completed"
          :disabled="!editStatus && !edit"
        />
        <Input
          @change="e => (tmpInput = e.target.value)"
          :value="a.title"
          :disabled="a.id != editItemId"
          :class="{ 'text-decoration_line-through': a.completed }"
          :ref="'input_' + a.id"
          class="todo-item__input"
        />
        <div v-if="editStatus">
          <Btn
            icon
            v-if="a.id != editItemId"
            @click="onEditTodoItem(a.id, a.title)"
            ><Icon>create</Icon></Btn
          >
          <Btn icon v-else @click="onAcceptTodoItem(i)"><Icon>done</Icon></Btn>
          <Btn icon @click="onRemoveTodoItem(i)"><Icon>delete</Icon></Btn>
        </div>
      </li>
    </ul>

    <Sidebar
      v-if="editStatus"
      @onUndo="onUndo"
      @onRedo="onRedo"
      @onSave="onSaveChanges"
      @onClear="onRevertChanges"
    />
    <Dialog
      v-if="dialog.isOpen"
      @onCancel="dialog.onCancel"
      @onAccept="dialog.onAccept"
      :title="dialog.title"
      :text="dialog.text"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import {
  Input,
  Btn,
  Icon,
  Dialog,
  Header,
  Sidebar,
  TodoItem
} from '@/components';
import {
  NoteType,
  TodoItemHistoryType,
  SetNoteType,
  DialogType,
  TodoItemType
} from '@/types.ts';
import { namespace } from 'vuex-class';
const notes = namespace('notes');

@Component({
  components: {
    Input,
    Btn,
    Icon,
    TodoItem,
    Dialog,
    Header,
    Sidebar
  }
})
export default class Todo extends Vue {
  @Prop() id!: number;
  @Prop() edit!: string;

  @notes.Getter
  getNoteItemByIndex!: (index: number) => NoteType;
  @notes.Mutation
  public removeNoteItemByIndex!: (index: number) => void;
  @notes.Mutation
  public setNote!: ({ index, note }: SetNoteType) => void;

  created() {
    if (!this.getNoteItemByIndex(this.id) && this.edit !== 'new')
      this.$router.push({ path: '/noNote' });
    else if (this.edit == 'new') {
      this.noteItem = this.generateNewNote();
      this.onNoteNameEdit();
    } else this.getNoteItemCopy();
  }

  // DATA
  editStatus = this.edit ? true : false;
  dialog: DialogType = {
    isOpen: false,
    title: '',
    text: '',
    onCancel: () => (this.dialog.isOpen = false),
    onAccept: () => {
      this.dialog.isOpen = false;
    }
  };
  targetNoteName = false;
  tmpInput = '';
  editItemId = '';
  noteNameEditStatus = false;
  inputPlaceholder = 'Add new task';
  noteItem = {} as NoteType;
  done: TodoItemHistoryType[] = [];
  undone: TodoItemHistoryType[] = [];

  public getNoteItemCopy(): void {
    this.noteItem = JSON.parse(
      JSON.stringify(this.getNoteItemByIndex(this.id))
    );
  }

  // @Watch('noteItem', {
  //   // immediate: true,
  //   deep: true
  // })
  // noteItemChanged(val: NoteType, oldV: NoteType): void {

  // }
  public todoHistoryItem(type: string, index: number): TodoItemHistoryType {
    return {
      type,
      index,
      todo: { ...this.noteItem.todoList[index] }
    };
  }
  public onEditTodoItem(id: string, value: string): void {
    this.editItemId = id;
    this.tmpInput = value;
    // Велосипед, для перевода фокуса на инпут
    const input = this.$refs['input_' + id] as any;
    this.$nextTick((): void => {
      input[0].$el.focus();
    });
  }

  public onRemoveTodoItem(index: number): void {
    this.done = [];
    this.undone.push({
      type: 'del',
      index,
      todo: this.noteItem.todoList[index]
    });
    this.noteItem.todoList.splice(index, 1);
  }

  public onAcceptTodoItem(index: number): void {
    this.editItemId = '';
    if (
      this.tmpInput &&
      this.tmpInput !== this.noteItem.todoList[index].title
    ) {
      this.undone.push(this.todoHistoryItem('edit', index));
      this.noteItem.todoList[index].title = this.tmpInput;
      this.done = [];
    }
  }
  public onSendButton() {
    if (this.tmpInput) {
      if (this.targetNoteName) {
        this.noteItem.name = this.tmpInput;
        this.inputPlaceholder = 'Add new task';
        this.targetNoteName = false;
      } else {
        this.noteItem.todoList.push({
          id: Date.now().toString(),
          completed: false,
          title: this.tmpInput
        });
      }
    }
  }
  //_ Sidebar действия

  // UNDO REDO
  public onUndo(): void {
    const lastAction = this.undone[this.undone.length - 1];
    if (lastAction.type === 'del') {
      this.noteItem.todoList.splice(lastAction.index, 0, lastAction.todo);
    } else if (lastAction.type === 'edit') {
      this.noteItem.todoList[lastAction.index] = lastAction.todo;
    }
    this.done.push(lastAction);
    this.undone.splice(-1, 1);
  }

  public onRedo(): void {
    const lastAction = this.done[this.done.length - 1];
    if (lastAction.type === 'del') {
      this.noteItem.todoList.splice(lastAction.index, 1);
      this.undone.push(lastAction);
      this.done.splice(-1, 1);
    }
    if (lastAction.type === 'del') {
      this.noteItem.todoList.splice(lastAction.index, 1);
      this.undone.push(lastAction);
      this.done.splice(-1, 1);
    }
  }
  public generateNewNote(): NoteType {
    return {
      id: Date.now().toString(),
      name: 'New note',
      todoList: []
    };
  }
  public onNoteNameEdit() {
    this.inputPlaceholder = 'Enter new note name';
    this.targetNoteName = true;
    const input = this.$refs.mainInput as any;
    input.$el.focus();
  }
  public onNoteItemDelete() {
    this.dialog.isOpen = true;
    this.dialog.title = 'Delete note';
    this.dialog.text = 'Are you sure you want to delete the note?';
    this.dialog.onAccept = () => {
      this.removeNoteItemByIndex(this.id);
      this.dialog.isOpen = false;
      this.$router.push({ path: '/' });
    };
  }

  public onRevertChanges(): void {
    this.dialog.isOpen = true;
    this.dialog.onAccept = () => {
      this.getNoteItemCopy();
      this.done = [];
      this.undone = [];
      this.dialog.isOpen = false;
    };
    if (this.edit === 'new') {
      this.removeNoteItemByIndex(this.id);
      this.$router.push({ path: '/' });
    }
  }

  public onSaveChanges(): void {
    this.setNote({ index: this.id, note: this.noteItem });
    this.$router.push({ path: '/' });
  }
}
</script>
