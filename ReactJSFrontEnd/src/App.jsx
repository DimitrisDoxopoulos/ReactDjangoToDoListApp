import './App.css'
import TodoForm from "./components/TodoForm.jsx";
import TableComponent from "./components/TableComponent.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from "axios";
import React, {useEffect, useState} from "react";


function App() {
    const [todos, setTodos] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
        console.log('Todos:', todos)
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/notes_api/")
            setTodos(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error); // Handle error
            setIsLoading(false); // Make sure loading state is updated
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

  return (
    <React.Fragment>
      <div className="bg-indigo-100 px-8 min-h-screen">
        <nav className="pt-8">
          <h1 className="text-5xl text-center mb-5">ToDo List</h1>
        </nav>
          <TodoForm />
          <TableComponent
              todos={todos}
              setTodos={setTodos}
              isLoading={isLoading}
          />
      </div>
    </React.Fragment>
  )
}

export default App
