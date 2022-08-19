export function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      userTasks: [...state.userTasks, action.payload],
      isModal: true,
      message: "Task Added.",
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
      isModal: updatedTasks.length > 1 ? true : false,
      message: "Task swapped.",
    };
  } else if (action.type === "RESET_MODAL") {
    return { ...state, isModal: false, message: "" };
  } else {
    return { ...state };
  }
}
