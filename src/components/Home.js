import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Task from "./Task";
import {
  DarkModeContext,
  successContext,
  userContext,
  loadingContext,
  isModalContext,
} from "./context";
import TaskInputField from "./TaskInputField";
import Modal from "../utils/modal/Modal";

function Home() {
  const { isDark } = useContext(DarkModeContext);
  const { success, setSuccess } = useContext(successContext);
  const { isModalOpen, setIsModalOpen, message, setMessage } =
    useContext(isModalContext);
  const { user } = useContext(userContext);
  // const { setModal } = useContext(modalContext);
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
  // const [message, setMessage] = useState("");
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

  // const inputRef = useRef();
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
        setMessage("New task created!");
        setIsModalOpen(true);
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
        setMessage("Task has been updated!");
        setIsModalOpen(true);
      }
      setIsEditing(false);
      // window.location.reload();
    } catch (err) {
      // setModal(true);
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
        // inputRef.current.focus();
        setIsEditing(true);
      }
    });
  }

  // console.log(inputRef.current);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isModalOpen, setIsModalOpen]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      // return window.location.assign("/");
      navigate("/");
    }
  }, [success, navigate]);

  if (isLoading) {
    return <p className="main"></p>;
  }

  return (
    <>
      {
        success && (
          <main className="main">
            {isModalOpen && (
              <Modal>
                <p>{message}</p>
              </Modal>
            )}
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
                  isNewTask={isNewTask}
                  // inputRef={inputRef}
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
                input={input}
                handleOnChange={handleOnChange}
                descriptionRef
                handleCancelButton
                addTask={addTask}
                sortArray
                isSorting
                isNewTask
                sortedBy={sortedBy}
                // inputRef={inputRef}
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
