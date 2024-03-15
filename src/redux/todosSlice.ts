import { PayloadAction, createSlice, isAction } from '@reduxjs/toolkit';

interface todo {
  id: number;
  text: string;
  completed: boolean;
}

interface todos {
  todosIndex: number;
  todos: todo[];
}

const initialState: todos = {
  todosIndex: 0,
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todosIndex += 1;
      state.todos.push({
        id: state.todosIndex,
        text: action.payload.text,
        completed: false,
      });
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) toggledTodo.completed = !toggledTodo.completed;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const editTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (editTodo) editTodo.text = action.payload.text;
    },
    updateTodosOrder: (state, action: PayloadAction<todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
  updateTodosOrder,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
