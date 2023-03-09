import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Task from "./Task";
import {
  DarkModeContext,
  successContext,
  modalContext,
  userContext,
  loadingContext,
} from "./context";
import TaskInputField from "./TaskInputField";
import axios from "axios";

function Home() {
  const { isDark } = useContext(DarkModeContext);
  const { success, setSuccess } = useContext(successContext);
  const { user } = useContext(userContext);
  const { setModal } = useContext(modalContext);
  const { isLoading } = useContext(loadingContext);

  const [input, setInput] = useState({
    title: "",
    description: "",
    taskId: "",
  });
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortedBy, setSortedBy] = useState("all");
  const sortRef = useRef();

  const loadTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/tasks?user=${user.user._id}`);
      setTasks(data.data.tasks);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    if (user?.user?._id) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isNewTask, setIsNewTask] = useState(true);

  function getScreenSize() {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getScreenSize);

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenSize]);

  useEffect(() => {
    if (screenSize < 650) {
      setIsNewTask(false);
    } else {
      setIsNewTask(true);
    }
  }, [screenSize]);

  function openTaskInputField() {
    if (screenSize <= 650) {
      setIsNewTask(true);
    }
  }

  function handleOnChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  // const descriptionRef = useRef();

  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let date = `${day}/${month + 1}/${year}`;

  async function addTask(e, taskId) {
    e.preventDefault();
    try {
      if (!isEditing) {
        const { data } = await axios.post(
          "/api/v1/tasks",
          { title: input.title, task: input.description },
          {
            withCredentials: true,
            "Content-Type": "application/json",
          }
        );
        alert("saved successfully");
        setInput({ title: "", description: "" });
        setTasks(data.tasks);
      } else {
        const { data } = await axios.patch(
          `/api/v1/tasks/${taskId}`,
          { title: input.title, task: input.description },
          {
            withCredentials: true,
            "Content-Type": "application/json",
          }
        );
        setTasks(data.tasks);
        setInput({ title: "", description: "" });
        alert("edited successfully");
      }
      setIsEditing(false);
      // window.location.reload();
    } catch (err) {
      setModal(true);
      if (err.response.data.message === "jwt malformed") {
        setSuccess(false);
        // setMessage("Please login to continue");
      }
    }
  }

  function startEditMode(id) {
    tasks.forEach((task) => {
      if (task._id === id) {
        setInput({
          title: task.title,
          description: task.task,
          taskId: task._id,
        });
        openTaskInputField();
        setIsEditing(true);
      }
    });
  }

  function cancelEditing() {
    setIsNewTask(false);
    setIsEditing(false);
    setInput({ title: "", description: "", taskId: "" });
  }

  function getSortedByValue() {
    setSortedBy(sortRef.current.value);
  }

  useEffect(() => {
    if (tasks.length < 1) {
      return setFilteredTasks([]);
    }
    if (sortedBy === "completed") {
      const completedTasks = tasks.filter((task) => {
        return task.isComplete;
      });
      setFilteredTasks(completedTasks);
    } else if (sortedBy === "unCompleted") {
      const uncompletedTasks = tasks.filter((task) => {
        return !task.isComplete;
      });
      setFilteredTasks(uncompletedTasks);
    } else if (sortedBy === "all") {
      const allTasks = tasks.map((task) => {
        return task;
      });
      setFilteredTasks(allTasks);
    } else {
      return;
    }
  }, [sortedBy, tasks]);

  if (isLoading) {
    return <p className="main"></p>;
  }

  if (!success) {
    return window.location.assign("/");
  }

  // console.log(success);

  return (
    <>
      {
        success && (
          <main className="main">
            <section className="main--left">
              <p className="main--left__date">Today: {date}</p>
              <div className="main--left__addBtn" onClick={openTaskInputField}>
                <p className={isDark ? "p--darkMode" : ""}>+</p>
                <h3>Add New Task</h3>
              </div>
              {isNewTask && (
                <TaskInputField
                  input={input}
                  handleOnChange={handleOnChange}
                  descriptionRef
                  handleCancelButton
                  addTask={addTask}
                  tasks={tasks}
                  isEditing={isEditing}
                  cancelEditing={cancelEditing}
                />
              )}
            </section>
            <section className="main--right">
              <div className="main--right__sort">
                <i className="fa-solid fa-sort"></i>
                <p>Sorted by</p>
                <select ref={sortRef} onChange={getSortedByValue}>
                  <option>all</option>
                  <option>completed</option>
                  <option>unCompleted</option>
                </select>
              </div>
              <Task
                setTasks={setTasks}
                filteredTasks={filteredTasks}
                startEditMode={startEditMode}
                toggleComplete
                onDragStart
                onDragEnter
                onDragEnd
                input={input}
                handleOnChange={handleOnChange}
                descriptionRef
                handleCancelButton
                addTask={addTask}
                sortArray
                isSorting
                isNewTask
                sortedBy={sortedBy}
              />
            </section>
          </main>
        )
        //  : (
        //   document.location.assign("/")
        // )
      }
    </>
  );
}

export default Home;
