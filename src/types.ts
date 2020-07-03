export type NoteType = {
  id: string;
  name: string;
  todoList: TodoItemType[];
};

export type TodoItemType = {
  id: string;
  title: string;
  completed: boolean;
};
export type SetNoteType = {
  index: number;
  note: NoteType;
};

export type DialogType = {
  isOpen: boolean;
  title: string;
  text: string;
  onAccept: Function;
  onCancel: Function;
};

export type SnackbarType = {
  isOpen: boolean;
  text: string;
  onClose: Function;
};

export type TodoItemHistoryType = {
  type: string;
  index: number;
  todo: TodoItemType;
};
