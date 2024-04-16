import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  updateTodo,
  sortTodo,
  toggleCompleted,
} from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.png";

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [showList, setshowList] = useState(false);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(true);
    }
  };

  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);
    }
  };

  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria));
  }

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-[75%]">
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <input
                className="border p-2 rounded-md outline-none mb-8"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={
                  currentTodo ? "Update your task here" : "Enter your task here"
                }
              />
              <div className="flex justify-between">
                {currentTodo ? (
                  <>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        handleUpdateToDoList(currentTodo.id, newTask);
                      }}
                      className="bg-blue-500 text-white py-3 px-10 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 rounded-md text-black py-3 px-10"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-300 rounded-md text-black py-3 px-10"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white py-3 px-10 rounded-md"
                      onClick={() => {
                        handleAddTodo(newTask);
                        setShowModal(false);
                      }}
                    >
                      Add
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center flex-col">
          {todoList.length === 0 ? (
            <div className="mb-6">
              <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] min-[250px]">
                <img src={empty} alt="" />
              </div>
              <p className="text-center text-gray-500">
                You have no todo's, please add one.
              </p>
            </div>
          ) : (
            <>
              {showList && (
                <div className="container mx-auto mt-6">
                  <div className="flex justify-center mb-6">
                    <select
                      onChange={(e) => handleSort(e.target.value)}
                      className="p-1 outline-none text-sm"
                    >
                      <option value="All" className="text-sm">
                        All
                      </option>
                      <option value="Completed" className="text-sm">
                        Completed
                      </option>
                      <option value="Not Completed" className="text-sm">
                        Not Completed
                      </option>
                    </select>
                  </div>
                  <div>
                    {sortToDoList.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center justify-between mb-6 bg-gray-200 rounded-md p-4"
                      >
                        <div
                          className={`${
                            todo.completed
                              ? "line-through text-green-500"
                              : "text-orange-500"
                          }`}
                          onClick={() => {
                            handleToggleCompleted(todo.id);
                          }}
                        >
                          {todo.task}
                        </div>
                        <div>
                          <button
                            className="bg-blue-500 text-white p-1 rounded-md ml-2"
                            onClick={() => {
                              setShowModal(true);
                              setCurrentTodo(todo);
                              setNewTask(todo.task);
                            }}
                          >
                            <TiPencil />
                          </button>
                          <button
                            className="bg-orange-500 text-white p-1 rounded-md ml-2"
                            onClick={() => handleDeleteToDo(todo.id)}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <button
            className="bg-blue-500 text-center text-white py-3 px-10 rounded-md"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Task
          </button>
          <button
            className="bg-blue-500 text-center text-white py-3 px-10 my-5 rounded-md"
            onClick={() => {
              setshowList(!showList);
            }}
          >
            {showList ? "Hide List" : "View List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
