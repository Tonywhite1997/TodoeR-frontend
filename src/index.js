import React from "react";
import ReactDom from "react-dom/client";
import "./css/root.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
