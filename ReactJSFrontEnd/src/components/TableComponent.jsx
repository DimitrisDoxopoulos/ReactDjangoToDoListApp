import React, { useEffect, useState } from 'react';
import { Checkbox, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import LinearLoader from "./common/LinearLoader.jsx";
import {fetchToDos, deleteTodo, updateTodo} from "../services/TodoService.js";
import { formatDate } from "../helpers/HelperFunctions.js";
import ErrorPopup from "./common/ErrorPopup.jsx";
import SuccessPopup from "./common/SuccessPopup.jsx";
import ConfirmationDialogue from "./common/ConfirmationDialogue.jsx";
import UpdateTodoModal from "./UpdateTodoModal.jsx";

const TableComponent = () => {
    const headers = ['To Do', 'Status', 'Todo Date', 'Data Created', 'Date Updated', 'Actions'];
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [toDoToUpdate, setToDoToUpdate] = useState(null)

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        setTodoId(id)
        setDialogueOpen(true);
    }

    const updateToDo = async (toDo) => {
        setToDoToUpdate(toDo);
        setUpdateDialogOpen(true);
    }

    const onHandleUpdateClose = () => {
        setToDoToUpdate(null);
        setUpdateDialogOpen(false);
        fetchData()
    }

    const onDelete = async (id) => {
        try {
            setIsLoading(true);
            const response = await deleteTodo(id);
            if (response.status === 204) {
                setSuccess("The ToDo was successfully deleted")
                await fetchData()
            } else {
                const errorData = response.data;
                setError(errorData.message || 'There was an error while deleting the task');
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }
    const confirmDelete = () => {
        onDelete(todoId);
        setTodoId(null)
        setDialogueOpen(false);
    };

    const cancelDelete = () => {
        setTodoId(null)
        setDialogueOpen(false);
    };

    const handleUpdateCompleted = async (id, value) => {
        try {
            setIsLoading(true);
            const response = await updateTodo(id, {'completed': !value});
            if (response.status === 200) {
                setSuccess("The ToDo was successfully updated")
                await fetchData()
            } else {
                const errorData = response.data;
                setError(errorData.message || 'There was an error while updating the task');
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <React.Fragment>
            {success && !isLoading && <SuccessPopup message={success} open={true} onClose={() => setSuccess(null)} />}
            {error && !isLoading && <ErrorPopup message={error} open={true} onClose={() => setError(null)} />}

            {isLoading ? (
                <LinearLoader />
            ) : error ? (
                <ErrorPopup message={error} open={true} onClose={() => setError(null)} />
            ) : (
                <div className="py-32">
                    {dialogueOpen && <ConfirmationDialogue
                        open={dialogueOpen}
                        title="Delete Confirmation"
                        message="Are you sure you want to delete this ToDo?"
                        onConfirm={confirmDelete}
                        onClose={cancelDelete}
                    />}

                    {updateDialogOpen && <UpdateTodoModal
                        open={updateDialogOpen}
                        onClose={onHandleUpdateClose}
                        setIsLoading={setIsLoading}
                        setSUccess={setSuccess}
                        setError={setError}
                        setSuccess={setSuccess}
                        setToDoToUpdate={setToDoToUpdate}
                        toDoToUpdate={toDoToUpdate}
                        setUpdateDialogOpen={setUpdateDialogOpen}
                        fetchData={fetchData}
                    />}

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 850}} aria-label="todos-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox color="secondary" inputProps={{"aria-label": 'select all data'}}/>
                                    </TableCell>
                                    {headers.map((item, index) => (
                                        <TableCell key={index}
                                                   className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todos.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Tooltip title={item.completed ? 'Completed' : 'Not Completed yet'}>
                                                <Checkbox
                                                    checked={item.completed} color="secondary"
                                                    inputProps={{'aria-labelledby': `checkbox-${index}`}}
                                                    onClick={() => handleUpdateCompleted(item.id, item.completed)}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{item.body}</TableCell>
                                        <TableCell>{
                                            <span
                                                className={`px-2 py-1 text-white rounded-md ${item.completed ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {item.completed ? 'Completed' : 'Not completed yet'}
                                            </span>
                                        }</TableCell>
                                        <TableCell>{formatDate(item.dateOfTodo, 'dddd, D MMMM yyyy h:mm A')}</TableCell>
                                        <TableCell>{formatDate(item.created, 'dddd, D MMMM yyyy h:mm A')}</TableCell>
                                        <TableCell>{formatDate(item.updated, 'dddd, D MMMM yyyy h:mm A')}</TableCell>
                                        <TableCell
                                            className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                                            <span className="text-xl cursor-pointer px-2"><EditIcon
                                                onClick={() => updateToDo(item)}/></span>
                                            <span className="text-xl cursor-pointer px-2"><DeleteIcon
                                                onClick={() => handleDelete(item.id)}/></span>
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
