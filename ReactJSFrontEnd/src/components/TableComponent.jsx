import React, { useEffect, useState } from 'react';
import { Checkbox, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import LinearLoader from "./common/LinearLoader.jsx";
import { fetchToDos } from "../services/TodoService.js";
import { formatDate } from "../helpers/HelperFunctions.js";
import ErrorPopup from "./common/ErrorPopup.jsx";

const TableComponent = () => {
    const headers = ['To Do', 'Status', 'Todo Date', 'Data Created', 'Date Updated', 'Actions'];
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchToDos();
                setTodos(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message); // Set error message in case of failure
            }
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (
                <LinearLoader />
            ) : error ? (
                <ErrorPopup message={error} open={true} onClose={() => setError(null)} />
            ) : (
                <div className="py-32">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 850 }} aria-label="todos-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox color="secondary" inputProps={{ "aria-label": 'select all data' }} />
                                    </TableCell>
                                    {headers.map((item, index) => (
                                        <TableCell key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todos.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Tooltip title={item.completed ? 'Completed' : 'Not Completed yet'}>
                                                <Checkbox checked={item.completed} color="secondary" inputProps={{ 'aria-labelledby': `checkbox-${index}` }} />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{item.body}</TableCell>
                                        <TableCell>{
                                            <span className={`px-2 py-1 text-white rounded-md ${item.completed ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {item.completed ? 'Completed' : 'Not completed yet'}
                                            </span>
                                        }</TableCell>
                                        <TableCell>{formatDate(item.dateOfTodo)}</TableCell>
                                        <TableCell>{formatDate(item.created)}</TableCell>
                                        <TableCell>{formatDate(item.updated)}</TableCell>
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
