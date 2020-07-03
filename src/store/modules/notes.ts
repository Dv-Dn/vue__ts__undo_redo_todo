import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { NoteType, SetNoteType } from '@/types';

@Module({ namespaced: true })
class Notes extends VuexModule {
  public notes: NoteType[] = [];

  @Mutation
  public removeNoteItemByIndex(index: number): void {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  @Mutation
  public getNotesFromLocalStorage(): void {
    if (localStorage.notes) this.notes = JSON.parse(localStorage.notes);
  }

  @Mutation
  public setNote({ index, note }: SetNoteType): void {
    this.notes[index] = note;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  @Action
  public updateName(newName: string): void {
    this.context.commit('setName', newName);
  }

  get getNoteItemByIndex() {
    return (index: number): NoteType => this.notes[index];
  }
}
export default Notes;
