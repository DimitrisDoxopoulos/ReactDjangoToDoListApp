import {React, useState} from 'react'
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField} from "@mui/material";
import {blue} from "@mui/material/colors";
import {DesktopDateTimePicker, LocalizationProvider, renderTimeViewClock} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {SaveAltOutlined} from "@mui/icons-material";


const TodoForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        dateTIme: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('form submitted: ', formData)
        setFormData({ description: '', dateTIme: null})
    }

    return (
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
                            label="Description" value={formData.description}
                            placeholder="Write the ToDo's description"
                            onChange={handleChange}
                            fullWidth required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDateTimePicker
                                label="Date and Time"
                                value={formData.dateTIme}
                                onChange={handleChange}
                                required
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </LocalizationProvider>
                    </Stack>
                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined" color="secondary"
                    type="submit"
                    style={{ textTransform: 'none' }}
                >
                        <SaveAltOutlined /> Add ToDo
                </Button>
            </CardActions>
        </Card>
    )

}
export default TodoForm
