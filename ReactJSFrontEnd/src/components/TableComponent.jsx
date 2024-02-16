import React, { useEffect, useState } from 'react';
import { Checkbox, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Table from "@mui/material/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import LinearLoader from "./common/LinearLoader.jsx";
import { fetchToDos } from "../services/todoService.js";

const TableComponent = () => {
    const headers = ['To Do', 'Status', 'Todo Date', 'Data Created', 'Date Updated', 'Actions'];
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController(); // Create an abort controller
        const fetchData = async () => {
            try {
                const response = await fetchToDos({ signal: abortController.signal }); // Pass abort signal to fetch
                setTodos(response);
                setIsLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request aborted'); // Handle aborted requests
                } else {
                    setIsLoading(false);
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        // Clean-up function to cancel any ongoing requests
        return () => {
            abortController.abort(); // Abort the fetch request when the component unmounts
        };
    }, []);

    return (
        <React.Fragment>
            {isLoading ? <LinearLoader /> : (
                <div className="py-32">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 850 }} aria-label="todos-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox color="secondary" inputProps={{ "aria-label": 'select all data' }} />
                                    </TableCell>
                                    {headers.map((item, index) => (
                                        <TableCell key={index}>{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todos.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox color="secondary" inputProps={{ 'aria-labelledby': `checkbox-${index}` }} />
                                        </TableCell>
                                        <TableCell>{item.body}</TableCell>
                                        <TableCell>{item.completed}</TableCell>
                                        <TableCell>{item.dateOfTodo}</TableCell>
                                        <TableCell>{item.created}</TableCell>
                                        <TableCell>{item.updated}</TableCell>
                                        <TableCell className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                                            <span className="text-xl cursor-pointer px-2"><EditIcon /></span>
                                            <span className="text-xl cursor-pointer px-2"><DeleteIcon /></span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </React.Fragment>
    );
};

export default TableComponent;
