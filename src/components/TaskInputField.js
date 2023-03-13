import React, { useEffect } from "react";
import { DarkModeContext } from "./context";
import { useContext, useRef } from "react";

function TaskInputField({
  input,
  handleOnChange,
  addTask,
  isEditing,
  cancelEditing,
  isNewTask,
}) {
  const { isDark } = useContext(DarkModeContext);
  const descriptionRef = useRef();

  useEffect(() => {
    const descriptionField = descriptionRef.current;
    let timeout;
    const onFocus = () => {
      let descriptionLength = descriptionField.value.length;
      descriptionField.setSelectionRange(descriptionLength, descriptionLength);
      descriptionRef.current.focus();
    };
    if (isNewTask && isEditing) {
      timeout = setTimeout(() => {
        onFocus();
      }, 100);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isNewTask, isEditing]);

  return (
    <div
    // ref={inputFieldRef}
    // className="main--left--task__div"
    // style={{
    //   paddingLeft: tasks.editMode ? "1em" : "0",
    // }}
    >
      <div
        className={
          isDark
            ? "main--left--task__div__textfield darkMode"
            : "main--left--task__div__textfield"
        }
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={input.title}
          onChange={handleOnChange}
        />
        <textarea
          ref={descriptionRef}
          placeholder="Description"
          name="description"
          value={input.description}
          onChange={handleOnChange}
        />
      </div>
      <div className="main--left--task__div__button">
        <button
          className={
            isDark
              ? "main--left--task__div__button__cancel darkMode"
              : "main--left--task__div__button__cancel"
          }
          onClick={cancelEditing}
        >
          Cancel
        </button>
        <button
          className={
            isDark
              ? "main--left--task__div__button__add darkMode"
              : "main--left--task__div__button__add"
          }
          onClick={(e) => addTask(e, input.taskId)}
        >
          {isEditing ? "Save edit" : "Add task"}
        </button>
      </div>
    </div>
  );
}

export default TaskInputField;
