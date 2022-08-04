import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import { useContext } from "react";
import { DarkModeContext } from "./context";

function Home() {
  const { isDark } = useContext(DarkModeContext);
  return (
    <>
      <Header />
      <main className="main">
        <section className="main--left">
          <div className="main--left__addBtn">
            <p className={isDark ? "p--darkMode" : ""}>+</p>
            <h3>Add task</h3>
          </div>
          <div className="main--left--task__div">
            <div
              className={
                isDark
                  ? "main--left--task__div__textfield darkMode"
                  : "main--left--task__div__textfield"
              }
            >
              <input type="text" placeholder="Title" />
              <textarea placeholder="Description" />
            </div>
            <div className="main--left--task__div__button">
              <button
                className={
                  isDark
                    ? "main--left--task__div__button__cancel darkMode"
                    : "main--left--task__div__button__cancel"
                }
              >
                Cancel
              </button>
              <button
                className={
                  isDark
                    ? "main--left--task__div__button__add darkMode"
                    : "main--left--task__div__button__add"
                }
              >
                Add task
              </button>
            </div>
          </div>
        </section>
        <section className="main--right">
          <div className="main--right__sort">
            <i className="fa-solid fa-sort"></i>
            <p>Sorted by</p>
            <select>
              <option>default</option>
              <option>completed</option>
              <option>unCompleted</option>
              <option>date</option>
            </select>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
