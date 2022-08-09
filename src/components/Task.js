import React from "react";
import TaskInputField from "./TaskInputField";

function Task({
  tasks,
  deleteTask,
  startEditMode,
  toggleComplete,
  onDragStart,
  onDragEnter,
  onDragEnd,

  handleOnChange,
  handleCancelButton,
  input,
  descriptionRef,
  addTask,

  sortArray,
  isSorting,
}) {
  const { userTasks } = tasks;

  return (
    <>
      {tasks.editMode && (
        <TaskInputField
          input={input}
          handleCancelButton={handleCancelButton}
          handleOnChange={handleOnChange}
          descriptionRef={descriptionRef}
          addTask={addTask}
          tasks={tasks}
        />
      )}

      <p className="modal__message">{tasks.isModal && tasks.message}</p>

      {!isSorting &&
        userTasks.map((task, index) => {
          return (
            <div
              key={task.key}
              className="main--right__task"
              draggable
              onDragStart={() => onDragStart(index)}
              onDragEnter={() => onDragEnter(index)}
              onDragEnd={onDragEnd}
            >
              <p>
                {task.isComplete
                  ? `Completed: ${task.completedDate}`
                  : `Created: ${task.createdDate}`}
              </p>
              <div className="main--right__task__text">
                <input
                  type="checkbox"
                  className="main--right__task__checkbox"
                  onChange={() => {
                    toggleComplete(task.key);
                  }}
                  checked={task.isComplete}
                />

                <div className="main--right__task__div">
                  <h4
                    style={{
                      textDecoration: task.isComplete ? "line-through" : "",
                      opacity: task.isComplete ? "0.5" : "1",
                    }}
                  >{`${task.title[0].toUpperCase()}${task.title.slice(1)}`}</h4>
                  <p
                    style={{
                      textDecoration: task.isComplete ? "line-through" : "none",
                      opacity: task.isComplete ? "0.5" : "1",
                    }}
                  >{`${task.description[0].toUpperCase()}${task.description.slice(
                    1
                  )}`}</p>
                </div>

                <div className="main--right__task__buttons">
                  <i
                    className="fa-solid fa-calendar-minus"
                    style={{ color: "#fa2036" }}
                    onClick={() => {
                      deleteTask(task.key);
                    }}
                  ></i>
                  {!task.isComplete && (
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "#2f52ed" }}
                      onClick={() => {
                        startEditMode(task.key);
                      }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {sortArray.length !== 0 &&
        sortArray.map((task, index) => {
          return (
            <div
              key={task.key}
              className="main--right__task"
              draggable
              onDragStart={() => onDragStart(index)}
              onDragEnter={() => onDragEnter(index)}
              onDragEnd={onDragEnd}
            >
              <p>
                {task.isComplete
                  ? `Completed: ${task.completedDate}`
                  : `Created: ${task.createdDate}`}
              </p>
              <div className="main--right__task__text">
                <input
                  type="checkbox"
                  className="main--right__task__checkbox"
                  onChange={() => {
                    toggleComplete(task.key);
                  }}
                  checked={task.isComplete}
                />

                <div className="main--right__task__div">
                  <h4
                    style={{
                      textDecoration: task.isComplete ? "line-through" : "",
                      opacity: task.isComplete ? "0.5" : "1",
                    }}
                  >{`${task.title[0].toUpperCase()}${task.title.slice(1)}`}</h4>
                  <p
                    style={{
                      textDecoration: task.isComplete ? "line-through" : "none",
                      opacity: task.isComplete ? "0.5" : "1",
                    }}
                  >{`${task.description[0].toUpperCase()}${task.description.slice(
                    1
                  )}`}</p>
                </div>

                <div className="main--right__task__buttons">
                  <i
                    className="fa-solid fa-calendar-minus"
                    style={{ color: "#fa2036" }}
                    onClick={() => {
                      deleteTask(task.key);
                    }}
                  ></i>
                  {!task.isComplete && (
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "#2f52ed" }}
                      onClick={() => {
                        startEditMode(task.key);
                      }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      {}
    </>
  );
}

export default Task;
