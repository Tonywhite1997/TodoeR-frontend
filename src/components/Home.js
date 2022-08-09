import React, {
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { nanoid } from "nanoid";
import Header from "./Header";
import Footer from "./Footer";
import Task from "./Task";
import { DarkModeContext } from "./context";
import TaskInputField from "./TaskInputField";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      userTasks: [...state.userTasks, action.payload],
    };
  } else if (action.type === "DELETE_TASK") {
    return {
      ...state,
      userTasks: state.userTasks.filter((task) => {
        return task.key !== action.payload;
      }),
      isModal: true,
      message: "Task Deleted.",
    };
  } else if (action.type === "EDIT_MODE") {
    return { ...state, editMode: true, editKey: action.payload };
  } else if (action.type === "SWITCH_BACK_FROM_EDIT_MODE") {
    return { ...state, editMode: false, editKey: "" };
  } else if (action.type === "EDIT_TASK") {
    return {
      ...state,
      userTasks: state.userTasks.map((task) => {
        if (task.key === state.editKey) {
          return { ...action.payload };
        } else {
          return task;
        }
      }),
      editKey: "",
      editMode: false,
      isModal: true,
      message: "Task Edited.",
    };
  } else if (action.type === "LOAD_STORED_DATA") {
    return action.payload;
  } else if (action.type === "TOGGLE_COMPLETE") {
    return {
      ...state,
      userTasks: state.userTasks.map((task) => {
        if (task.key === action.payload.key) {
          return {
            ...task,
            isComplete: true,
            completedDate: action.payload.date,
          };
        } else {
          return task;
        }
      }),
      isModal: true,
      message: "Task completed.",
    };
  } else if (action.type === "REARRANGE_TASKS") {
    const { dragStartRef, dragEnterRef } = action.payload;
    const updatedTasks = state.userTasks;
    const temp = updatedTasks[dragStartRef.current];
    updatedTasks[dragStartRef.current] = updatedTasks[dragEnterRef.current];
    updatedTasks[dragEnterRef.current] = temp;
    return {
      ...state,
      isModal: state.userTasks.length > 1 ? true : false,
      message: "Task swapped.",
    };
  } else if (action.type === "RESET_MODAL") {
    return { ...state, isModal: false, message: "" };
  }
}

function Home() {
  const { isDark } = useContext(DarkModeContext);
  const [input, setInput] = useState({
    title: "",
    description: "",
    createdDate: "",
    completedDate: "",
    isComplete: false,
    key: "",
  });

  const [tasks, dispatcher] = useReducer(reducer, {
    userTasks: [],
    editKey: "",
    editMode: false,
    isModal: true,
    message: "",
  });

  function handleOnChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const descriptionRef = useRef();

  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let date = `${day}/${month}/${year}`;

  function addTask() {
    if (!tasks.editMode) {
      if (input.title && input.description) {
        dispatcher({
          type: "ADD_TASK",
          payload: {
            ...input,
            key: nanoid(),
            createdDate: date,
          },
        });
        setInput((prevState) => {
          return { ...prevState, title: "", description: "" };
        });
      }
      return;
    } else {
      dispatcher({ type: "EDIT_TASK", payload: input });
      setInput((prevState) => {
        return { ...prevState, title: "", description: "" };
      });
    }
  }

  function handleCancelButton() {
    if (tasks.editMode) {
      dispatcher({ type: "SWITCH_BACK_FROM_EDIT_MODE" });
      setInput((prevState) => {
        return { ...prevState, title: "", description: "" };
      });
    } else {
      setInput((prevState) => {
        return { ...prevState, title: "", description: "" };
      });
    }
  }

  function deleteTask(key) {
    dispatcher({ type: "DELETE_TASK", payload: key });
  }

  function startEditMode(key) {
    descriptionRef.current.focus();
    tasks.userTasks.find((task) => {
      if (task.key === key) {
        setInput({ ...task });
      }
      return dispatcher({ type: "EDIT_MODE", payload: key });
    });
  }

  useEffect(() => {
    window.addEventListener("load", () => {
      dispatcher({ type: "SWITCH_BACK_FROM_EDIT_MODE" });
    });
  }, []);

  function toggleComplete(key) {
    dispatcher({ type: "TOGGLE_COMPLETE", payload: { key, date } });
  }

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      dispatcher({ type: "LOAD_STORED_DATA", payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatcher({ type: "RESET_MODAL" });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  const dragStartRef = useRef();
  const dragEnterRef = useRef();

  function onDragStart(index) {
    dragStartRef.current = index;
  }

  function onDragEnter(index) {
    dragEnterRef.current = index;
  }

  function onDragEnd() {
    dispatcher({
      type: "REARRANGE_TASKS",
      payload: { dragStartRef, dragEnterRef },
    });
  }

  const [sortArray, setSortArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  function handleSortValueChange(e) {
    dispatcher({ type: "SWITCH_BACK_FROM_EDIT_MODE" });
    setInput({ title: "", description: "" });
    if (e.target.value === "completed") {
      setIsSorting(true);
      setSortArray(() => {
        return tasks.userTasks.filter((task) => {
          return task.isComplete;
        });
      });
    } else if (e.target.value === "unCompleted") {
      setIsSorting(true);
      setSortArray(() => {
        return tasks.userTasks.filter((task) => {
          return !task.isComplete;
        });
      });
    } else if (e.target.value === "default") {
      setSortArray([]);
      setIsSorting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="main">
        <section className="main--left">
          <div className="main--left__addBtn">
            <p className={isDark ? "p--darkMode" : ""}>+</p>
            <h3>Add task</h3>
          </div>
          {!tasks.editMode && (
            <TaskInputField
              input={input}
              handleOnChange={handleOnChange}
              descriptionRef={descriptionRef}
              handleCancelButton={handleCancelButton}
              addTask={addTask}
              tasks={tasks}
            />
          )}
        </section>
        <section className="main--right">
          <p className="main--right__date">Today: {date}</p>
          <div className="main--right__sort">
            <i className="fa-solid fa-sort"></i>
            <p>Sorted by</p>
            <select onChange={handleSortValueChange}>
              <option>default</option>
              <option>completed</option>
              <option>unCompleted</option>
            </select>
          </div>
          <Task
            tasks={tasks}
            deleteTask={deleteTask}
            startEditMode={startEditMode}
            toggleComplete={toggleComplete}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            input={input}
            handleOnChange={handleOnChange}
            descriptionRef={descriptionRef}
            handleCancelButton={handleCancelButton}
            addTask={addTask}
            sortArray={sortArray}
            isSorting={isSorting}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
