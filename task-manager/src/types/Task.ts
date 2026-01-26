export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  state: State;
}

export enum State {
  PENDING = 'Pending',
  COMPLETED = 'Completed'
}