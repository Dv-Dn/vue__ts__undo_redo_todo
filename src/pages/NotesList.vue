<template>
  <div>
    <h1 class="h1">List of notes</h1>
    <div class="note-list">
      <NoteCard
        :key="a.id"
        :to="'note/' + index"
        v-for="(a, index) in notes"
        :note="a"
        @onEdit="$router.push({ path: 'note/' + index + '/edit' })"
        @onDelete="noteItemOnDeleteClick(index)"
      />

      <Icon
        fontSize="250"
        class="note-list__add-icon"
        @click="$router.push({ path: 'note/' + notes.length + '/new' })"
        >add_circle_outline
      </Icon>
    </div>
    <Dialog
      v-if="dialog.isOpen"
      @onCancel="dialog.onCancel"
      @onAccept="dialog.onAccept"
      :title="dialog.title"
      :text="dialog.text"
    />
    <Snackbar
      v-if="snackbar.isOpen"
      :text="snackbar.text"
      @onClose="snackbar.onClose"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { NoteCard, Dialog, Btn, Icon, Snackbar } from '@/components';
import { NoteType, DialogType, SnackbarType } from '@/types.ts';

import { namespace } from 'vuex-class';
const notes = namespace('notes');

@Component({
  components: {
    NoteCard,
    Dialog,
    Btn,
    Icon,
    Snackbar
  }
})
export default class Home extends Vue {
  @Prop() error?: string;

  public snackbar: SnackbarType = {
    isOpen: false,
    text: 'Note not found',
    onClose: () => (this.snackbar.isOpen = false)
  };
  public dialog: DialogType = {
    isOpen: false,
    title: 'Delete note',
    text: 'Are you sure you want to delete the note?',
    onCancel: () => (this.dialog.isOpen = false),
    onAccept: () => void {}
  };

  @notes.State
  public notes!: NoteType[];

  @notes.Mutation
  public removeNoteItemByIndex!: (index: number) => void;

  created() {
    if (this.error === 'noNote') {
      this.snackbar.isOpen = true;
      setTimeout(() => {
        this.snackbar.isOpen = false;
      }, 6000);
    }
  }
  public noteItemOnDeleteClick(index: number): void {
    this.dialog.isOpen = true;
    this.dialog.onAccept = () => {
      this.removeNoteItemByIndex(index);
      this.dialog.isOpen = false;
    };
  }

}
</script>
