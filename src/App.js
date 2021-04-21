import React from "react";
import PreapprovalPage1 from "./components/PreapprovalPage1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App container-fluid">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <PreapprovalPage1 />
    </div>
  );
}

export default App;
