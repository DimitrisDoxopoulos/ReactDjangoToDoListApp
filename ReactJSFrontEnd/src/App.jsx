import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from "react";
import TodoForm from "./components/TodoForm.jsx";
import TableComponent from "./components/TableComponent.jsx";
import ResponsiveAppBar from "./components/ResponsiveAppBar.jsx";
import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home.jsx";

function App() {
  return (
      <React.Fragment>
          <div className="App">
              <ResponsiveAppBar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/create-todo" element={<TodoForm/>}/>
                  <Route path="/view-todos" element={<TableComponent/>}/>
              </Routes>
          </div>
      </React.Fragment>
  )
}

export default App
