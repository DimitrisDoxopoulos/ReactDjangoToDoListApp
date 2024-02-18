import {SaveAltOutlined} from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Stack,
    TextField
} from "@mui/material";
import {DesktopDateTimePicker, LocalizationProvider, renderTimeViewClock} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {blue} from "@mui/material/colors";
import React, {useState} from "react";
import ErrorPopup from "./common/ErrorPopup.jsx";
import LinearLoader from "./common/LinearLoader.jsx";
import {postTodo} from "../services/TodoService.js";
import SuccessPopup from "./common/SuccessPopup.jsx";
import FormControlCheckbox from "./common/FormControlCheckbox.jsx";

const TodoForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        body: '',
        dateOfTodo: null,
        completed: false
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await postTodo(formData);

            if (response.status === 201) {
                setSuccess('ToDo Created Successfully');
                setFormData({ body: '', dateOfTodo: null, completed: false });
            } else {
                const errorData = response.data;
                setError(errorData.message || 'There was an error while creating the task');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            {success && !isLoading && <SuccessPopup message={success} open={true} onClose={() => setSuccess(null)} />}
            {error && !isLoading && <ErrorPopup message={error} open={true} onClose={() => setError(null)} />}
            {isLoading ? (<LinearLoader />) : (
                <Card>
                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="Create a ToDo task"></Avatar>}
                        title="Create a new ToDo task"
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                                <TextField
                                    type="text" variant="outlined" color="secondary"
                                    label="Description" value={formData.body}
                                    placeholder="Write the ToDo's description"
                                    onChange={(e) => handleChange('body', e.target.value)}
                                    fullWidth required
                                />

                                <FormControlCheckbox
                                    label='Completed' ariaLabel='completed-task' color="secondary"
                                    onChange={(e) => handleChange('completed', e.target.checked)}
                                    checked={formData.completed} value={formData.completed}
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
                                            seconds: renderTimeViewClock,
                                        }}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <CardActions>
                                <Button
                                    variant="outlined" color="secondary"
                                    type="submit"
                                    style={{ textTransform: 'none' }}
                                >
                                    <SaveAltOutlined /> Add ToDo
                                </Button>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            )}
        </React.Fragment>
    );
}

export default TodoForm;
