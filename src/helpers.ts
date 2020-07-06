import { NoteType } from '@/types';
export function deepCopy(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
export function generateNewNote(): NoteType {
  return {
    id: Date.now().toString(),
    name: 'New note',
    todoList: []
  };
}
