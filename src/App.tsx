import React from "react";
import "./styles.css";

import TimesTables from "./TimesTables";

export default function App() {
  // const reset = () => {
  //   if (window) {
  //     window.localStorage.clear();
  //   }
  // };
  return (
    <div className="App">
      <h1>Olá!</h1>
      <h5>É hora de aprender tabuada!</h5>
      <TimesTables base={2} numQuestions={60} />
    </div>
  );
}
