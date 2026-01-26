export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  state: State;
}

type State = 'Pending' | 'Completed';