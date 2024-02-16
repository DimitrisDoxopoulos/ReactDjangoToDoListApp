import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TodoForm from "./components/TodoForm.jsx";
import React, {useEffect, useState} from "react";
import TableComponent from "./components/TableComponent.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";


function App() {
  return (
    <React.Fragment>
      <div className="bg-indigo-100 px-8 min-h-screen">
        <nav className="pt-8">
          <h1 className="text-5xl text-center mb-5">ToDo List</h1>
        </nav>
          <TodoForm />
          <ErrorBoundary>
              <TableComponent />
          </ErrorBoundary>
      </div>
    </React.Fragment>
  )
}

export default App
