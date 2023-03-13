import { useContext } from "react";
import axios from "axios";
import { isModalContext } from "./context";

function Task({ filteredTasks, startEditMode, setTasks }) {
  const { setIsModalOpen, setMessage } = useContext(isModalContext);
  async function deleteTask(taskId) {
    try {
      const { data } = await axios.delete(`/api/v1/tasks/${taskId}`, {
        withCredentials: true,
      });
      setTasks(data.tasks);
      setMessage("Task deleted successfully");
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function markTaskComplete(taskId, isTaskComplete) {
    if (isTaskComplete) return;
    try {
      const { data } = await axios.patch(
        `/api/v1/tasks/${taskId}/markComplete`,
        null,
        {
          withCredentials: true,
        }
      );
      setTasks(data.tasks);
      setMessage("Task completed!");
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {filteredTasks.map((task) => {
        return (
          <div key={task._id} className="main--right__task">
            <div className="main--right__task__text">
              <input
                type="checkbox"
                className="main--right__task__checkbox"
                onClick={() => markTaskComplete(task._id, task.isComplete)}
                checked={task.isComplete}
                readOnly
              />

              <div className="main--right__task__div">
                <h4
                  style={{
                    textDecoration: task.isComplete ? "line-through" : "",
                    opacity: task.isComplete ? "0.5" : "1",
                  }}
                >
                  {`${task.title[0].toUpperCase()}${task.title.slice(1)}`}
                </h4>
                <p
                  style={{
                    textDecoration: task.isComplete ? "line-through" : "none",
                    opacity: task.isComplete ? "0.5" : "1",
                  }}
                >
                  {`${task.task[0].toUpperCase()}${task.task.slice(1)}`}
                </p>
              </div>

              <div className="main--right__task__buttons">
                <i
                  className="fa-solid fa-calendar-minus"
                  style={{ color: "#fa2036" }}
                  onClick={() => deleteTask(task._id)}
                ></i>
                {!task.isComplete && (
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={{ color: "#2f52ed" }}
                    onClick={() => startEditMode(task._id)}
                  ></i>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Task;
