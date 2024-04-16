import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the todo list and sorting criteria
const initialState = {
  todoList: [],
  sortCriteria: "All",
};

// Create a slice for managing the todo list state
const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Reducer to set the entire todo list
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    // Reducer to add a new todo item
    addTodo: (state, action) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    // Reducer to update the sorting criteria
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    // Reducer to update a specific todo item's task
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].task = task;
    },
    // Reducer to toggle the completed status of a specific todo item
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = !state.todoList[index].completed;
    },
  },
});

// Export the action creators and reducer from the slice
export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } =
  ToDoSlice.actions;

export default ToDoSlice.reducer;
