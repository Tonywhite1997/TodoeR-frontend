import React from "react";
import { useContext } from "react";
import { DarkModeContext } from "./context";

function Contact() {
  const { isDark } = useContext(DarkModeContext);
  return (
    <>
      <main className="contact">
        <section className="contact--section">
          <div
            className={
              isDark
                ? "contact--section__div darkMode"
                : "contact--section__div"
            }
          >
            <div className="contact--section__div__name">
              <label>Name:</label>
              <input type="text" placeholder="name here" />
            </div>
            <div className="contact--section__div__email">
              <label>Email:</label>
              <input type="email" placeholder="email here" />
            </div>
            <textarea
              className="contact--section__div__textarea"
              placeholder="your message"
            />
            <button>Send</button>
          </div>
          <small>or</small>
          <p>Send me a message at tonywhite814.tw@gmail.com</p>
        </section>
      </main>
    </>
  );
}

export default Contact;
