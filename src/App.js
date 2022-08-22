import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Books from "./screens/Books";
import Authors from "./screens/Authors"
import Logger from "./components/Logger";

export default function App() {
  return (
      <Router>
          <Logger/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sign_in" element={<SignIn/>} />
            <Route path="/sign_up" element={<SignUp/>} />
            <Route path="/books" element={<Books/>} />
            <Route path="/authors" element={<Authors/>} />
          </Routes>
      </Router>
  );
}
