import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "./context";

function Contact() {
  const { isDark } = useContext(DarkModeContext);
  const [message, setMessage] = useState({ name: "", email: "", message: "" });
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  function getMessageDetails(e) {
    setIsError(false);
    setSuccess(false);
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;
    setMessage((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function sendEmail(e) {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/contact-us", message);
      setMessage({ name: "", message: "", email: "" });
      setSuccess(true);
    } catch (err) {
      setIsError(true);
      console.log(err);
    }
  }

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
              <input
                type="text"
                placeholder="name here"
                name="name"
                value={message.name}
                onChange={getMessageDetails}
              />
            </div>
            <div className="contact--section__div__email">
              <label>Email:</label>
              <input
                type="email"
                placeholder="email here"
                name="email"
                value={message.email}
                onChange={getMessageDetails}
              />
            </div>
            <textarea
              className="contact--section__div__textarea"
              placeholder="your message"
              name="message"
              value={message.message}
              onChange={getMessageDetails}
            />
            {isError && <p style={{ color: "red" }}>Error, try again later.</p>}
            {success && (
              <p>Your mail has been delivered. We'll get back to you.</p>
            )}
            <button onClick={sendEmail}>Send</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;
