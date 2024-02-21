import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SaveAltOutlined } from '@mui/icons-material';
import { DesktopDateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControlCheckbox from './common/FormControlCheckbox.jsx';
import { updateTodo } from '../services/TodoService.js';
import moment from "moment";

const UpdateTodoModal = ({ open = false, onClose, setIsLoading, setSuccess, setError, toDoToUpdate, setToDoToUpdate }) => {
    const [formData, setFormData] = useState({
        body: '',
        dateOfTodo: null,
        completed: false
    });

    useEffect(() => {
        if (toDoToUpdate) {
            setFormData({
                body: toDoToUpdate.body || '',
                dateOfTodo: moment(toDoToUpdate.dateOfTodo) || null,
                completed: toDoToUpdate.completed || false
            });
        }
    }, [toDoToUpdate]);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await updateTodo(toDoToUpdate.id, formData);

            if (response.status === 200) {
                setSuccess('ToDo Updated Successfully');
                setFormData({ body: '', dateOfTodo: null, completed: false });
            } else {
                const errorData = response.data;
                setError(errorData.message || 'There was an error while updating the todo');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
            setToDoToUpdate(null);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Update ToDo</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', width: '35rem', marginTop:'1rem' }}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Description"
                            value={formData.body}
                            placeholder="Write the ToDo's description"
                            onChange={(e) => handleChange('body', e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: '1rem' }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDateTimePicker
                                label="Date and Time"
                                value={formData.dateOfTodo}
                                onChange={(newValue) => handleChange('dateOfTodo', newValue)}
                                required
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock
                                }}
                                sx={{ marginBottom: '1rem' }}
                            />
                        </LocalizationProvider>

                        <FormControlCheckbox
                            label="Completed"
                            ariaLabel="completed-task"
                            color="secondary"
                            onChange={(e) => handleChange('completed', e.target.checked)}
                            checked={formData.completed}
                            value={formData.completed}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: 'none' }} variant="outlined" onClick={onClose} color="secondary">
                        <CloseIcon /> Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        onClick={handleUpdate}
                        style={{ textTransform: 'none' }}
                    >
                        <SaveAltOutlined /> Update ToDo
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

UpdateTodoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    toDoToUpdate: PropTypes.object,
    setToDoToUpdate: PropTypes.func.isRequired
};

export default UpdateTodoModal;
