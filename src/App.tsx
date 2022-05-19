import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleForm from "./components/SimpleForm";
import FormwithFormik from "./components/FormWithFormik";

function App() {
  return (
    <div className="App">
      <SimpleForm />
      <FormwithFormik />
    </div>
  );
}

export default App;
